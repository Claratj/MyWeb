import type { Pillar } from "../types/content";

/** "Designer's eye, engineer's rigor" — four pillars, each a mechanism a hiring manager can probe. */
export const pillars: Pillar[] = [
  {
    id: "eye",
    title: "Designer's eye",
    body: "I hold the built UI to the original intent: spacing, hierarchy and type.",
  },
  {
    id: "rigor",
    title: "Engineer's rigor",
    body: "Domain-Driven Design and hexagonal layers, atomic components, API contracts agreed with backend, Cypress and Jest, and WCAG audits on data-heavy products.",
  },
  {
    id: "systems",
    title: "Tokens & systems",
    body: "Design tokens from Figma synced to code through an MCP integration, and a component library with naming and consistency criteria agreed with design.",
  },
  {
    id: "ai",
    title: "AI, with guardrails",
    body: "Claude Code agents and slash commands that scaffold components, generate tests and review PRs. The architecture and the judgment calls stay mine.",
  },
];
