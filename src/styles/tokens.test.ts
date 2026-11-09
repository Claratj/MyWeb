// @vitest-environment node
/* Token integrity: the palette swap must not leave a dangling var(), a raw hex
   in component CSS, a drifted JSON mirror, or a contrast claim that no longer holds. */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "..", "..");
const src = join(root, "src");

function walk(dir: string, exts: string[]): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full, exts);
    return exts.some((e) => name.endsWith(e)) ? [full] : [];
  });
}

const tokensCss = readFileSync(join(src, "styles", "tokens.css"), "utf8");
const cssFiles = walk(src, [".css"]);
const codeFiles = walk(src, [".ts", ".tsx"]).filter((f) => !/\.test\.tsx?$/.test(f));
const stripComments = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, "");

/** Declarations of the :root block only (the light theme), name → raw value. */
function rootBlock(css: string): Map<string, string> {
  const body = stripComments(css).match(/(^|\n):root\s*\{([\s\S]*?)\n\}/)?.[2] ?? "";
  const map = new Map<string, string>();
  for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) map.set(m[1], m[2].trim());
  return map;
}
const rootTokens = rootBlock(tokensCss);

/** Resolve var() chains down to a literal. */
function resolve(name: string, seen = new Set<string>()): string {
  if (seen.has(name)) throw new Error(`cycle at ${name}`);
  seen.add(name);
  const value = rootTokens.get(name);
  if (value === undefined) throw new Error(`undefined token ${name}`);
  const ref = value.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(ref[1], seen) : value;
}

/* Every custom property declared anywhere: in any stylesheet, or set from TS(X)
   as a string key (style={{ "--x": … }}, setProperty("--x")). */
const declared = new Set<string>();
for (const f of cssFiles) {
  for (const m of stripComments(readFileSync(f, "utf8")).matchAll(/(--[\w-]+)\s*:/g)) declared.add(m[1]);
}
for (const f of codeFiles) {
  for (const m of readFileSync(f, "utf8").matchAll(/["'`](--[\w-]+)["'`]/g)) declared.add(m[1]);
}

describe("tokens.css", () => {
  it("every var() in src resolves to a declared custom property", () => {
    const missing: string[] = [];
    for (const f of [...cssFiles, ...codeFiles]) {
      const text = f.endsWith(".css") ? stripComments(readFileSync(f, "utf8")) : readFileSync(f, "utf8");
      for (const m of text.matchAll(/var\(\s*(--[\w-]+)\s*(,)?/g)) {
        // a name ending in "-" is a code sample rendered as text (System.tsx), not a reference
        if (m[1].endsWith("-")) continue;
        if (!declared.has(m[1]) && !m[2]) missing.push(`${relative(root, f)} → ${m[1]}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("every :root token resolves without cycles", () => {
    for (const name of rootTokens.keys()) expect(() => resolve(name)).not.toThrow();
  });

  it("the dark theme only points at tokens that exist", () => {
    const dark = stripComments(tokensCss).match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\}/)?.[1] ?? "";
    expect(dark).not.toBe("");
    for (const m of dark.matchAll(/(--[\w-]+)\s*:\s*var\((--[\w-]+)\)/g)) {
      expect(rootTokens.has(m[1]), `${m[1]} overrides nothing`).toBe(true);
      expect(rootTokens.has(m[2]), `${m[1]} points at missing ${m[2]}`).toBe(true);
    }
  });

  it("component CSS uses no raw hex colours", () => {
    const offenders = walk(src, [".module.css"]).flatMap((f) =>
      [...stripComments(readFileSync(f, "utf8")).matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map(
        (m) => `${relative(root, f)}: ${m[0]}`,
      ),
    );
    expect(offenders).toEqual([]);
  });
});

describe("design-tokens.json mirror", () => {
  const json = JSON.parse(readFileSync(join(root, "design-tokens.json"), "utf8"));
  const groups = ["brand", "neutral", "alpha"] as const;

  for (const group of groups) {
    it(`color.${group} matches tokens.css`, () => {
      const drift: string[] = [];
      for (const [key, token] of Object.entries<any>(json.color[group])) {
        if (key.startsWith("$")) continue;
        const css = rootTokens.get(`--c-${key}`);
        if (css === undefined) drift.push(`--c-${key} missing in tokens.css`);
        else if (css.toLowerCase().replace(/\s/g, "") !== String(token.$value).toLowerCase().replace(/\s/g, ""))
          drift.push(`--c-${key}: css ${css} ≠ json ${token.$value}`);
      }
      expect(drift).toEqual([]);
    });
  }

  it("semantic roles alias the same raw colour as tokens.css", () => {
    const lookup = (alias: string) => {
      const [, group, name] = alias.match(/^\{color\.(\w+)\.([\w-]+)\}$/) ?? [];
      return json.color[group]?.[name]?.$value as string | undefined;
    };
    const drift: string[] = [];
    for (const [key, token] of Object.entries<any>(json.color.semantic)) {
      if (key.startsWith("$")) continue;
      const jsonValue = lookup(token.$value);
      const cssName = `--color-${key}`;
      if (!rootTokens.has(cssName)) drift.push(`${cssName} missing in tokens.css`);
      else if (jsonValue?.toLowerCase() !== resolve(cssName).toLowerCase())
        drift.push(`${cssName}: css ${resolve(cssName)} ≠ json ${jsonValue}`);
    }
    expect(drift).toEqual([]);
  });
});

/* WCAG 2.x relative-luminance contrast. */
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(fg: string, bg: string): number {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

describe("WCAG AA contrast (borrador 3)", () => {
  const AA = 4.5;
  const NON_TEXT = 3;
  const cases: Array<[label: string, fg: string, bg: string, min: number]> = [
    ["ink on page", "--c-n3", "--c-n1", AA],
    ["muted ink on page", "--c-n4", "--c-n1", AA],
    ["plum heading/link/focus on page", "--c-plum", "--c-n1", AA],
    ["orange-deep text on page", "--c-orange-deep", "--c-n1", AA],
    ["white label on orange CTA", "--c-n2", "--c-orange", AA],
    ["white label on orange-deep hover", "--c-n2", "--c-orange-deep", AA],
    ["sage-light on teal", "--c-sage-light", "--c-teal", AA],
    ["sage-light on plum", "--c-sage-light", "--c-plum", AA],
    ["ink on alt background", "--c-n3", "--c-n-alt", AA],
    ["orange CTA border on page (non-text)", "--c-orange", "--c-n1", NON_TEXT],
    ["dark: text on page", "--c-n1", "--c-d1", AA],
    ["dark: muted text on page", "--c-d4", "--c-d1", AA],
    ["dark: heading on page", "--c-sage-light", "--c-d1", AA],
    ["dark: orange-light link/focus on page", "--c-orange-light", "--c-d1", AA],
    ["dark: orange-light on surface", "--c-orange-light", "--c-d2", AA],
    ["dark: link hover on page", "--c-orange-light-hover", "--c-d1", AA],
    ["dark: border on page (non-text)", "--c-d3", "--c-d1", NON_TEXT],
  ];

  it.each(cases)("%s", (_label, fg, bg, min) => {
    expect(contrast(resolve(fg), resolve(bg))).toBeGreaterThanOrEqual(min);
  });
});
