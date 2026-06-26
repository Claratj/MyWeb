# ClaraWebsite — claratoloba.com

Personal portfolio. Single-page React (scroll sections, no router). Sole developer: Clara.
The source of truth is the CODE, not the README (which is stale).

## Stack
- React 19.2 · TypeScript 6.0 (strict) · Vite 8 + @vitejs/plugin-react 6
- Animation: Framer Motion 12 (the only real UI dep) · CSS base: normalize.css
- No router, no state lib, no forms lib, no UI kit — every component is hand-built
- Runtime deps kept minimal on purpose: react, react-dom, framer-motion, normalize.css
- TS 6 / Vite 8 / React 19 are very recent: verify APIs against current docs, don't assume.

## Structure (all code in src/)
- `main.tsx` — entry (createRoot + StrictMode)
- `App.tsx` — only renders <Home/>
- `index.css` — import order: tokens → fonts → global
- `components/` — design-system primitives (Badge, Button, CaseCard, Chip, Eyebrow, Pillar, Reveal). Barrel: index.ts
- `sections/` — page blocks (About, Approach, Contact, Footer, Hero, Nav, SelectedWork, TrustStrip). Barrel: index.ts
- `pages/Home/` — the single page; composes the sections
- `data/` — typed content (pillars.ts, stack.ts, work.ts)
- `types/content.ts` — shared types (CaseStudy, Pillar, Tech)
- `styles/` — tokens.css, fonts.css, global.css

Each component lives in `Name/Name.tsx` + `Name/Name.module.css`.
Placement rule: reusable primitive → components/; page block → sections/; assembly → pages/.

## Conventions
- TS strict, no implicit any. Shared types in types/content.ts (don't duplicate).
- Named exports ONLY, never default. Update the barrel (index.ts) when adding a component/section.
- PascalCase for components; camelCase for data. CSS Modules (Name.module.css) per component.
- Formatting: double quotes, 2 spaces (not enforced — keep it by hand).

## Design tokens (important)
- Source of truth: `src/styles/tokens.css` (custom properties).
- Layers: raw warm palette → WCAG-AA derivatives (ratios annotated) → semantic roles (--color-bg, --color-cta, --color-heading, --color-focus…) + fluid typography (clamp), 8px-based spacing, radii, shadows, motion, z-index.
- HARD RULE: component CSS consumes custom properties ONLY. No hex in component CSS.
- `design-tokens.json` (root) is a MIRROR in W3C format, not the source. If it diverges from tokens.css, tokens.css wins. Report divergences.

## Accessibility (public UI — keep the bar high)
- WCAG-AA contrast solved at the token level.
- Respect prefers-reduced-motion (e.g. Button uses useReducedMotion()).
- Use the --color-focus token for focus states.
- Polymorphic elements: render <a> vs <button> by semantics (Button does this based on href).

## Commands
- `npm run dev` — Vite (port 3000, opens browser) · `npm run build` (does NOT type-check) · `npm run preview`
- Type-check (canonical gate): `npx tsc --noEmit`
- No ESLint, no Prettier, no test runner. Quality gates today: `npx tsc --noEmit` + `npm run build`.

## Git
- Default branch: `main` (no develop). Feature branch → PR → merge to main → Netlify deploy.
- Conventional Commits: feat:, fix:, chore:, docs:, build:, refactor: (with scope, e.g. refactor(ui):).

## Ignore / do not use as source
- `README.md` (partially stale: mentions React Router, MUI, AOS, Lottie, Sass — none used).
- `_archive/` (legacy CRA, doesn't compile), `TimelineData.json`, Lottie `scroll.json` (unused).
