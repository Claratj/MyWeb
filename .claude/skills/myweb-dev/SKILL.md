---
name: myweb-dev
description: >-
  Development helper for the claratoloba.com portfolio repo (ClaraWebsite — React 19 + TypeScript 6 strict + Vite 8, framer-motion 12, CSS Modules + CSS design tokens, no router/state/UI-kit). Use when scaffolding or editing UI in THIS repo: creating a new primitive under src/components or a page block under src/sections, wiring it into the barrel (components/index.ts / sections/index.ts), writing a *.module.css that uses ONLY tokens, adding typed content in src/data against src/types/content.ts, or (only if asked) setting up tests. Triggers: "new component", "add a section", "scaffold", "create primitive", "add to data", "add a case study / pillar / tech", "add a test", "test this component", "CSS module", "use a token", "Button/Chip/Badge/CaseCard/Pillar/Eyebrow/Reveal", "Hero/About/Approach/SelectedWork/TrustStrip/Contact/Nav/Footer".
---

# myweb-dev

Repetitive tasks for **ClaraWebsite** (claratoloba.com). Confirmed stack: React **19.2**, TypeScript **6** (`strict`), Vite **8**, `framer-motion` **12**, styling via **CSS Modules + custom-property tokens**. No router, state lib, forms lib, or UI kit. **Gate before done:** `npx tsc --noEmit` + `npm run build` (no lint, no test runner; `vite build` does not typecheck).

**Always ignore** `_archive/`, `TimelineData.json`, and `README.md` (stale). Source of truth is the code + `CLAUDE.md`.

## Verify recent APIs first (Context7 MCP)

React 19 / Vite 8 / TS 6 / framer-motion 12 are very recent and may differ from training data. **Before proposing a non-trivial pattern** (a new React 19 hook/API, Vite config, framer-motion API, TS 6 feature), use the **Context7 MCP** to fetch current docs: `resolve-library-id` then `query-docs` for that library. Don't guess APIs from memory.

## Conventions (apply to everything)

Named exports only (never default) · PascalCase folders/components, camelCase data files · import primitives via barrels · **component CSS uses `var(--…)` tokens only — zero hex** · gate with `npx tsc --noEmit` + `npm run build` after changes.

## Task 1 — Scaffold a component (`src/components/<Name>/`)

Reusable design-system primitives. Mirror `components/Button/Button.tsx`.

1. `src/components/<Name>/<Name>.tsx`:
   ```tsx
   import type { ReactNode } from "react";
   import styles from "./<Name>.module.css";

   type <Name>Props = {
     children: ReactNode;
     className?: string;
   };

   export function <Name>({ children, className }: <Name>Props) {
     const classes = [styles.root, className].filter(Boolean).join(" ");
     return <div className={classes}>{children}</div>;
   }
   ```
   - Interactive → real `<button>`/`<a>`; link-or-button → discriminated-union props keyed on `href` (Button pattern).
   - Animated → import from `framer-motion` and gate motion behind `useReducedMotion()`.
2. `src/components/<Name>/<Name>.module.css` with `.root`, using ONLY tokens (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--fs-*`/`--fw-*`, `--dur-*`/`--ease-*`). No hex.
3. **Add to barrel** `src/components/index.ts`: `export { <Name> } from "./<Name>/<Name>";`
4. `npx tsc --noEmit` + `npm run build`.

## Task 2 — Scaffold a section (`src/sections/<Name>/`)

Page-specific blocks composed into `pages/Home/Home.tsx`. Same file pattern, but lives in `sections/`, is exported from `src/sections/index.ts`, and rendered inside `Home`. Sections compose existing primitives and pull copy from `src/data/*` — they don't define new generic primitives (extract those to `components/`). Wrap content in a semantic landmark (`<section>`/`<nav>`/`<footer>`). **Placement rule:** reusable → `components/`; page block → `sections/`.

## Task 3 — Typed content (`src/data/*` + `src/types/content.ts`)

Content is typed and separated from presentation.
1. Check/extend the type in `src/types/content.ts` (`CaseStudy`, `Pillar`, `Tech`) **first** if a new field is needed — don't duplicate shapes elsewhere.
2. Add the entry to the matching `src/data/*.ts` (`work.ts`, `pillars.ts`, `stack.ts`) satisfying the type. For `CaseStudy.accent`, use a token name like `"--c-teal"`.
3. `npx tsc --noEmit`.

## Task 4 — Tests (no runner — do not assume Vitest)

This repo has **no test runner**; do not invent `npm test` or generate tests against a non-existent runner. If tests are requested:
1. **First propose** adding **Vitest + React Testing Library** (Vite-native) and get confirmation: `npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom`.
2. Add a `test` block to `vite.config.ts` (`environment:"jsdom"`, `globals:true`, setup importing `@testing-library/jest-dom`) and a `"test":"vitest"` script — verify the current Vitest/Vite config API via Context7 before writing it.
3. Co-locate `src/components/<Name>/<Name>.test.tsx` (RTL, role/text queries). Single test: `npx vitest run <path>` or `npx vitest -t "<name>"`.

## Task 5 — Tokens

`src/styles/tokens.css` is the source of truth; `design-tokens.json` (root) mirrors it. Add/change a token in `tokens.css`, mirror it into `design-tokens.json`, replace any hardcoded literal with `var(--…)`, then `npx tsc --noEmit` and optionally run `/audit-tokens`.
