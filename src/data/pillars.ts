import type { Pillar } from "../types/content";

/** "Designer's eye, engineer's rigor" — the three pillars of how Clara works. */
export const pillars: Pillar[] = [
  {
    id: "eye",
    title: "Designer's eye",
    body: "I came up through graphic design and art direction, so I read an interface the way a designer does. I pay attention to spacing, hierarchy and type, and I hold the built UI to the original intent.",
  },
  {
    id: "rigor",
    title: "Engineer's rigor",
    body: "Product UI in React and TypeScript, architected to last. Feature-based structure, atomic components, and a real habit for testing and accessibility, with Cypress, Jest and WCAG audits on data-heavy products.",
  },
  {
    id: "bridge",
    title: "The bridge: tokens & systems",
    body: "I push design systems to be tokenised and actually adopted in code. I keep Figma and the codebase in sync with design tokens, Storybook and a Figma MCP integration, so design and engineering stop drifting apart.",
  },
  {
    id: "ai",
    title: "AI in the loop",
    body: "I don't just use AI, I build the tooling around it: custom Claude Code agents, slash commands and skills that scaffold components, generate tests, review PRs and keep Figma tokens in sync with code. The repetitive work gets automated. The architecture and the judgment calls stay mine.",
  },
];
