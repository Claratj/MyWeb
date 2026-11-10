# claratoloba.com

Personal portfolio of Clara Toloba, Frontend Engineer · Product UI & Design Systems. A single-page site (scroll-driven sections, no routing) deployed on [Netlify](https://www.netlify.com/) at **[claratoloba.com](https://claratoloba.com)**.

This repo is also a small demonstration of how I work: a token architecture with guardrails, accessibility handled at the source, tests that protect the design system, and a deliberately small dependency surface.

## Stack

| Concern | Choice | Version |
| --- | --- | --- |
| UI library | React | 19.2 |
| Language | TypeScript (`strict`) | 6.0 |
| Build tool / dev server | Vite (`@vitejs/plugin-react`) | 8 |
| Animation | Framer Motion | 12 |
| CSS reset | normalize.css | 8 |
| Styling | CSS Modules + CSS custom properties | — |
| Tests | Vitest + React Testing Library (jsdom) | 5 |

The runtime dependency list is, on purpose, four packages: `react`, `react-dom`, `framer-motion`, `normalize.css`.

**What's deliberately absent, and why.** There is no router, no state-management library, no UI kit and no forms library. A one-page portfolio doesn't navigate, so it doesn't need React Router; it holds no cross-cutting client state, so it doesn't need Redux or Zustand; and the point of the site is the design system, so pulling in MUI would defeat it. Every component is hand-built on top of the token layer. Fewer dependencies means a smaller bundle, less to keep patched, and full control over markup and accessibility.

## Design system

The core of this repo is `src/styles/tokens.css`, a single source of truth consumed everywhere as CSS custom properties. The palette is shared with the Embr design system: **plum** for identity, **orange** for action, **teal** (with its sage tones) for calm surfaces. The file is organised in layers:

1. **Raw palette.** Brand hues (`--c-plum`, `--c-orange`, `--c-teal`, `--c-sage`, …), light neutrals `n1`–`n5` and a dark ramp `d1`–`d4`.
2. **WCAG-AA derivatives.** Variants computed so that small text and UI pass AA (`--c-orange-deep` for orange text, `--c-orange-light` for orange on dark, `--c-sage-light` for text on teal and plum). The contrast ratio is recorded next to each value, for example white on the orange CTA at 5.06:1 and plum on the page at 13.2:1.
3. **Semantic roles.** Meaning-named tokens (`--color-bg`, `--color-cta`, `--color-heading`, `--color-link`, `--color-focus`, …) that reference the layers above. Components consume *these*, so a palette change propagates without touching component CSS.

The same file defines a **fluid type scale** (`clamp()`-based, `--fs-eyebrow` to `--fs-h1`), an **8px-based spacing scale** (`--space-1` to `--space-8`), and radii, elevation, layout and motion tokens.

**The hard rule:** component CSS consumes custom properties only, with **zero raw hex**. Raw values live in `tokens.css` alone.

`design-tokens.json` is a W3C-format (DTCG) mirror for tooling. It is generated, not hand-edited: after changing `tokens.css`, run `npm run tokens:json`. If the two ever diverge, `tokens.css` wins, and a test fails.

### Light and dark

The site follows the device's colour scheme by default (`prefers-color-scheme`), and switches live if the OS changes, for example at sunset. The theme toggle in the nav only stores an override when you pick the opposite of your device; picking the device's theme again drops it. A small inline script in `index.html` applies a stored override before first paint, so there is no flash.

Dark mode is semantic overrides only: the same roles re-pointed at the dark ramp, with their own AA ratios (for example orange-light focus at 7.12:1 on `d1`).

## Accessibility

Accessibility is solved structurally, not bolted on:

- **Contrast at the token layer.** The AA derivatives mean correct contrast is the default path, and tests assert the key pairs in both themes.
- **Reduced motion respected.** Every scroll-driven and Framer Motion effect has a static path when the user prefers reduced motion (`useReducedMotion()` or a `prefers-reduced-motion` query), with a global CSS safety net.
- **Visible focus.** `--color-focus` drives every focus ring, re-pointed on the plum and teal bands so it stays AA there too.
- **Semantics over `div`s.** Polymorphic primitives render the right element for their role: `Button` renders an `<a>` when given an `href` and a `<button>` otherwise, via discriminated-union props. Landmarks, a skip link, one `h1`, and links that open a new tab or a PDF announce it.

## Architecture

All source lives in `src/`, organised by role:

```
src/
  main.tsx          app entry (createRoot + StrictMode)
  App.tsx           renders <Home/>
  index.css         import order: tokens → fonts → global
  components/       design-system primitives  (Badge, Button, Eyebrow, Mark,
                    Pillar, Reveal, ThemeToggle, ExperienceCard, EdgeLabels)
                    barrel: index.ts
  sections/         page blocks, in page order  (Nav, Hero, TrustStrip, System,
                    Experience, Approach, About, Contact, Footer)
                    barrel: index.ts
  pages/Home/       the single page; composes the sections
  hooks/            shared motion hooks  (usePendulum, useBloom)
  data/             typed content  (experience, pillars, stack, system, links)
  types/            shared content types  (content.ts)
  styles/           tokens.css, fonts.css, global.css
  test/             Vitest setup
```

- **`components/` vs `sections/` vs `pages/`.** Reusable primitive goes in `components/`, page-specific block in `sections/`, assembly in `pages/`.
- **Content is data, not markup.** Copy lives in `src/data/*.ts`, typed against `src/types/content.ts`, so content and presentation stay decoupled and type-checked. Contact destinations (email, LinkedIn, CV) live in one place, `data/links.ts`.
- **Conventions.** Named exports only (never default); each component is a `Name/Name.tsx` + `Name/Name.module.css` pair; primitives and sections are re-exported through their barrel `index.ts`; tests sit next to the code they cover.

The primitives are meant to move into a shared design-system package over time, so the boundary matters: a primitive should take generic props and never import page content. Two components still cross that line (`ExperienceCard` and `Pillar` read content types) and are next to be split into a generic primitive plus a portfolio-side wrapper.

## Tests

Vitest with React Testing Library. Part of the suite tests the UI; the other part guards the design system itself, so a broken token fails CI instead of shipping:

- **Tokens** (`src/styles/tokens.test.ts`): every `var()` in the codebase resolves to a declared property, aliases resolve without cycles, no raw hex in component CSS, `design-tokens.json` matches `tokens.css`, the two dark-theme blocks stay identical, and the key colour pairs meet WCAG AA in light and dark.
- **Page structure** (`Home.test.tsx`): every section renders, exactly one `h1`, named landmarks, no broken in-page anchors, no duplicate ids, every `aria-*` reference resolves, every image has `alt`, and new-tab links say so.
- **Components**: `Button` element by `href`, the mobile menu's keyboard behaviour, the theme toggle following the OS and storing overrides, the copy-email button and its fallback.

## How I work with AI here

I use Claude Code on this repo as a pair, with structure around it. It drafts code, tests and audits; I review every change and decide what lands. Two things keep that honest:

- **Read-only auditors.** I keep a set of auditor agents locally (not committed here) for tokens, PR review, accessibility and repo health. They can read and report, never edit, and run in parallel against a diff that is collected once.
- **Gates that don't trust anyone.** Whoever wrote the change, it has to pass the type-check, the test suite and the build before Netlify ships it.

This is the same governance approach I apply to production design systems, scaled down to a portfolio.

## Getting started

Requires Node **22.x**.

```bash
npm install
npm run dev          # Vite dev server with HMR on http://localhost:3000 (auto-opens)
npm run build        # production build → dist/  (does NOT type-check)
npm run preview      # serve the production build locally
npm test             # run the test suite once
npm run test:watch   # tests in watch mode
npm run typecheck    # strict type-check of the app and the tests
npm run tokens:json  # regenerate design-tokens.json from tokens.css
```

**Quality gates.** There is no ESLint or Prettier. A change is done when these pass:

```bash
npm run typecheck
npm test
npm run build
```

`vite build` does **not** run the type-checker, which is why `typecheck` is a separate gate.

**Deployment.** Hosted on Netlify (config in [`netlify.toml`](./netlify.toml)). The build command runs `typecheck`, `test` and `build` in that order, so a type error or a failing test stops the deploy before anything ships. Every pull request gets a deploy preview; merging to `main` ships to production.
