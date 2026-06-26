# claratoloba.com

Personal portfolio of Clara Toloba — Frontend Engineer specialising in design systems. A single-page site (scroll-driven sections, no routing) deployed on [Netlify](https://www.netlify.com/) at **[claratoloba.com](https://claratoloba.com)**.

This repo is also a small demonstration of how I work: a maintainable token architecture, accessibility handled at the source, and a deliberately small dependency surface.

## Stack

| Concern | Choice | Version |
| --- | --- | --- |
| UI library | React | 19.2 |
| Language | TypeScript (`strict`) | 6.0 |
| Build tool / dev server | Vite (`@vitejs/plugin-react`) | 8 |
| Animation | Framer Motion | 12 |
| CSS reset | normalize.css | 8 |
| Styling | CSS Modules + CSS custom properties | — |

The runtime dependency list is, on purpose, four packages: `react`, `react-dom`, `framer-motion`, `normalize.css`.

**What's deliberately absent — and why.** There is no router, no state-management library, no UI kit, and no forms library. A one-page portfolio doesn't navigate, so it doesn't need React Router; it holds no cross-cutting client state, so it doesn't need Redux/Zustand; and the entire point of the site is the design system, so pulling in MUI would defeat it. Every component is hand-built on top of the token layer. Fewer dependencies means a smaller bundle, less to keep patched, and full control over markup and accessibility — which is the right trade for a site this size.

## Design system

The core of this repo is `src/styles/tokens.css` — a single source of truth consumed everywhere as CSS custom properties. It is organised in three layers:

1. **Raw palette** — the warm brand hues and their derived tints/shades (`--c-terracotta`, `--c-plum`, `--c-teal`, …). Intended for accents and large text.
2. **WCAG-AA-safe derivatives** — deeper/lighter variants (`--c-terracotta-cta`, `--c-terracotta-ink`, `--c-sage-light`, …) computed so that *small* text and UI hit AA. The exact contrast ratios are recorded as comments next to each value (e.g. filled CTA = 4.8:1, link hover on cream = 7.7:1), so accessibility is verifiable in the source rather than asserted.
3. **Semantic roles** — meaning-named tokens (`--color-bg`, `--color-cta`, `--color-heading`, `--color-link`, `--color-focus`, …) that reference the layers above. Components consume *these*, so a palette change propagates without touching component CSS.

Beyond colour, the same file defines a **fluid type scale** (`clamp()`-based, from `--fs-eyebrow` to `--fs-h1`), an **8px-based spacing scale** (`--space-1`…`--space-10`), and radii, elevation, layout and motion tokens.

**The hard rule:** component CSS consumes custom properties only — **zero raw hex**. Raw values live exclusively in `tokens.css`. A W3C-format mirror exists at `design-tokens.json`; if the two ever diverge, `tokens.css` wins.

## Accessibility

Accessibility is solved structurally, not bolted on:

- **Contrast at the token layer** — the AA-safe derivative tokens (above) mean correct contrast is the default path, with ratios documented inline.
- **Reduced motion respected** — every Framer Motion animation checks `useReducedMotion()` and drops to a static state when the user prefers reduced motion (see the parallax layers in `src/sections/Hero/Hero.tsx` and the hover wobble in `src/components/Button/Button.tsx`).
- **Dedicated focus token** — `--color-focus` drives visible focus states.
- **Semantics over `div`s** — polymorphic primitives render the correct element for their role. `Button`, for instance, renders an `<a>` when given an `href` and a `<button>` otherwise, via discriminated-union props.

## Architecture

All source lives in `src/`, organised by role with a clear placement rule:

```
src/
  main.tsx          App entry (createRoot + StrictMode)
  App.tsx           renders <Home/>
  index.css         import order: tokens → fonts → global
  components/       design-system primitives  (Badge, Button, CaseCard, Chip,
                    Eyebrow, Pillar, Reveal) — barrel: index.ts
  sections/         page blocks  (Hero, About, Approach, SelectedWork,
                    TrustStrip, Contact, Nav, Footer) — barrel: index.ts
  pages/Home/       the single page; composes the sections
  data/             typed content  (work.ts, pillars.ts, stack.ts)
  types/            shared content types  (CaseStudy, Pillar, Tech)
  styles/           tokens.css, fonts.css, global.css
```

- **`components/` vs `sections/` vs `pages/`** — reusable primitive → `components/`; page-specific block → `sections/`; assembly → `pages/`.
- **Content is data, not markup** — copy lives in `src/data/*.ts`, typed against `src/types/content.ts`, so content and presentation stay decoupled and type-checked.
- **Conventions** — named exports only (never default); each component is a `Name/Name.tsx` + `Name/Name.module.css` pair; primitives and sections are re-exported through their barrel `index.ts`.

## Engineering workflow

This repo doubles as a small demonstration of how I work with AI tooling in a
design-system context: **audit-first, never auto-edit.**

The `.claude/` directory holds a set of strictly read-only auditor subagents
(`tools: Read, Grep, Glob`; write tools explicitly disallowed). They report
findings — I review and decide what changes. The AI never touches the code.

- **`token-auditor`** — enforces the core rule of this system: component CSS
  consumes custom properties only, never raw hex. Also flags tokens
  defined-but-unused or used-but-undefined, and any drift between `tokens.css`
  (the source of truth) and the `design-tokens.json` mirror.
- **`pr-auditor`** — reviews a branch against `main`: strict typing,
  named-exports + barrel hygiene, correct placement (`components/` vs
  `sections/` vs `pages/`), and the token rule.
- **`a11y-auditor`** — a WCAG pass over the public UI: contrast, focus
  visibility, heading order, and `prefers-reduced-motion` coverage.
- **`health-checker`** — static scan for design-system debt across the codebase.

A `/full-audit` orchestrator collects `git diff`, `tsc --noEmit` and
`vite build` once, then runs all four auditors in parallel against that shared
context.

Quality gates are deliberately lean for a project this size — `tsc --noEmit`
plus `vite build`, no linter or test runner — and the auditors cover the
design-system discipline that automated linting wouldn't catch anyway.

This is the same governance approach I apply to production design systems,
scaled down to a portfolio.

## Getting started

Requires Node **22.x**.

```bash
npm install
npm run dev       # Vite dev server with HMR on http://localhost:3000 (auto-opens)
npm run build     # production build → dist/  (note: does NOT type-check)
npm run preview   # serve the production build locally
```

**Quality gates.** There is no ESLint, Prettier or test runner in this project. Correctness is enforced by two gates:

```bash
npx tsc --noEmit  # type-check (strict) — add as an `npm run typecheck` script if you like
npm run build     # the build must succeed
```

`vite build` does **not** run the type-checker, so run `npx tsc --noEmit` separately before considering a change done.

**Deployment.** Hosted on Netlify (config in [`netlify.toml`](./netlify.toml)): build `npm run build`, publish `dist`, with an SPA fallback redirect. Every pull request gets a Netlify deploy preview; merging to `main` ships to production.
