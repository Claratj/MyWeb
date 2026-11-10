// Regenerates design-tokens.json (W3C DTCG format) from src/styles/tokens.css.
// tokens.css is the source of truth; run `npm run tokens:json` after editing it.
// Existing $description texts in the JSON are kept; new tokens take the inline
// comment from tokens.css. The light :root block is mirrored; dark overrides are
// listed under color.dark.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(root, "src/styles/tokens.css"), "utf8");
const jsonPath = join(root, "design-tokens.json");
const old = JSON.parse(readFileSync(jsonPath, "utf8"));

/** name → { value, comment } for one block body. */
function parse(body) {
  const map = new Map();
  for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);[ \t]*(?:\/\*\s*(.*?)\s*\*\/)?/g)) {
    map.set(m[1], { value: m[2].trim().replace(/\s+/g, " "), comment: m[3]?.trim() });
  }
  return map;
}
const lightBody = css.match(/(^|\n):root\s*\{([\s\S]*?)\n\}/)[2];
const light = parse(lightBody);
const darkBody = css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)[1];
const dark = parse(darkBody);
const padWide = css.match(/@media \(min-width: (\d+px)\) \{\s*:root \{\s*--container-pad:\s*([^;]+);/);

const oldDesc = (path) => path.reduce((o, k) => o?.[k], old)?.$description;
function entry(path, name, value) {
  const t = light.get(name) ?? dark.get(name);
  const e = { $value: value ?? t.value };
  const d = oldDesc(path) ?? t?.comment;
  if (d) e.$description = d;
  return e;
}
const pick = (re) => [...light.keys()].filter((k) => re.test(k));
function group(path, names, keyOf, meta = {}) {
  const g = { ...meta };
  for (const n of names) g[keyOf(n)] = entry([...path, keyOf(n)], n);
  return g;
}
const strip = (prefix) => (n) => n.slice(prefix.length);

const BRAND = ["plum", "orange", "orange-deep", "orange-light", "teal", "sage", "sage-light"];
const isAlpha = (n) => /^--c-.+-\d{1,2}$/.test(n);
const isStatus = (n) => /^--c-(info|success|warning|danger)-/.test(n);
const neutralNames = pick(/^--c-/).filter((n) => !BRAND.includes(n.slice(4)) && !isAlpha(n) && !isStatus(n));

// Semantic roles: --color-x: var(--c-y) → {color.<group>.y}
const groupOf = (prim) => {
  const k = prim.slice(4);
  if (BRAND.includes(k)) return "brand";
  if (isAlpha(prim)) return "alpha";
  if (isStatus(prim)) return "status";
  return "neutral";
};
const alias = (value) => {
  const m = value.match(/^var\((--c-[\w-]+)\)$/);
  return m ? `{color.${groupOf(m[1])}.${m[1].slice(4)}}` : value;
};
const semantic = { $description: oldDesc(["color", "semantic"]) };
for (const n of pick(/^--color-/)) {
  const key = n.slice("--color-".length);
  semantic[key] = entry(["color", "semantic", key], n, alias(light.get(n).value));
}
const darkGroup = {
  $description: "Dark-theme overrides (:root[data-theme=\"dark\"], mirrored for prefers-color-scheme). Values alias the primitives above.",
};
for (const [n, t] of dark) darkGroup[n.slice(2)] = { $value: alias(t.value), ...(t.comment ? { $description: t.comment } : {}) };

const out = {
  $schema: old.$schema,
  $description: old.$description,
  color: {
    $type: "color",
    brand: group(["color", "brand"], BRAND.map((k) => `--c-${k}`), strip("--c-"), { $description: oldDesc(["color", "brand"]) }),
    neutral: group(["color", "neutral"], neutralNames, strip("--c-"), { $description: oldDesc(["color", "neutral"]) }),
    status: group(["color", "status"], pick(/^--c-/).filter(isStatus), strip("--c-"), {
      $description: "Functional status pairs (subtle fill / on-colour), plus dark on-values. Not part of the brand look.",
    }),
    alpha: group(["color", "alpha"], pick(/^--c-/).filter(isAlpha), strip("--c-"), { $description: oldDesc(["color", "alpha"]) }),
    semantic,
    sector: group(["color", "sector"], pick(/^--sector-/), strip("--sector-"), {
      $description: "Experience sector code: rgb triplets for card edge/glow, -hl for the highlighter under the sector word.",
    }),
    dark: darkGroup,
  },
  ornament: group(["ornament"], pick(/^--(quote|glow)-/), strip("--"), {
    $description: "Hero ornaments: quote colours live in color.semantic; these are their opacities.",
  }),
  font: {
    family: old.font.family,
    weight: group(["font", "weight"], pick(/^--fw-/), strip("--fw-"), { $type: "fontWeight" }),
    size: group(["font", "size"], pick(/^--fs-/), strip("--fs-"), { $type: "dimension", $description: oldDesc(["font", "size"]) }),
    lineHeight: group(["font", "lineHeight"], pick(/^--lh-/), strip("--lh-"), { $type: "number" }),
    letterSpacing: group(["font", "letterSpacing"], pick(/^--tracking-/), strip("--tracking-"), { $type: "dimension" }),
  },
  space: group(["space"], pick(/^--space-/), strip("--space-"), { $type: "dimension", $description: oldDesc(["space"]) }),
  radius: group(["radius"], pick(/^--radius-/), strip("--radius-"), { $type: "dimension" }),
  shadow: group(["shadow"], [...pick(/^--shadow-/), ...pick(/^--band-drop/)], (n) => n.replace(/^--(shadow-)?/, ""), { $type: "shadow" }),
  layout: (() => {
    const g = group(["layout"], ["--container-max", "--container-pad", "--nav-h", "--section-gap"], strip("--"), { $type: "dimension" });
    if (padWide) g["container-pad"].$description = `${light.get("--container-pad").value} below ${padWide[1]}, ${padWide[2]} from ${padWide[1]}`;
    return g;
  })(),
  motion: {
    easing: old.motion.easing,
    duration: group(["motion", "duration"], pick(/^--dur-/), strip("--dur-"), { $type: "duration" }),
  },
  z: group(["z"], pick(/^--z-/), strip("--z-"), { $type: "number" }),
};
// Weights the @font-face rules actually load, so the description cannot drift.
const fonts = readFileSync(join(root, "src/styles/fonts.css"), "utf8");
for (const fam of ["display", "body"]) {
  const name = out.font.family[fam].$value[0];
  const weights = [...fonts.matchAll(new RegExp(`font-family:\\s*"${name}";[^}]*?font-weight:\\s*(\\d+)`, "g"))].map((m) => m[1]);
  out.font.family[fam].$description = out.font.family[fam].$description.replace(/weights [\d/]+/, `weights ${weights.join("/")}`);
}
const clean = (o) => JSON.parse(JSON.stringify(o, (k, v) => (v === undefined ? undefined : v)));
writeFileSync(jsonPath, JSON.stringify(clean(out), null, 2) + "\n");
console.log("design-tokens.json updated");
