import type { Pillar } from "../types/content";

/** "Designer's eye, engineer's rigor" — the three pillars of how Clara works. */
export const pillars: Pillar[] = [
  {
    id: "eye",
    title: "Designer's eye",
    body: "I came up through graphic design and art direction, so I read an interface the way a designer does — spacing, hierarchy, type — and I hold the built UI to the original intent.",
  },
  {
    id: "rigor",
    title: "Engineer's rigor",
    body: "Product UI in React and TypeScript, architected to last: feature-based structure, atomic components, and a real testing habit with Cypress and Jest on data-heavy products.",
  },
  {
    id: "bridge",
    title: "The bridge: tokens & systems",
    body: "I push design systems to be tokenised and actually adopted in code — keeping Figma and the codebase in sync with design tokens, Storybook and Figma MCP, so design and engineering stop drifting apart.",
  },
];
