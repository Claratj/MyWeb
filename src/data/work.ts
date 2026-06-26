import type { CaseStudy } from "../types/content";

/** Selected work — the case studies shown in the work section. */
export const work: CaseStudy[] = [
  {
    id: "sermes",
    company: "Sermes CRO",
    role: "Sole frontend · Design systems",
    problem:
      "A clinical trial management system (CTMS) that had to stay visually consistent and maintainable while one frontend scaled it. Built in React 18, TypeScript and Vite.",
    contribution:
      "I reworked the frontend architecture early on. It is a feature-based structure with Domain-Driven Design and hexagonal architecture, so the business logic stays separate from the UI and external services. I broke the interface into small, atomic components as the base of a design system we can actually maintain, moved styling onto design tokens, and kept Tailwind aligned with Figma. I also set up a Figma MCP integration so tokens and components don't drift between design and code.",
    result:
      "A maintainable, token-based component system the CTMS now builds on, with design and code kept in sync.",
    stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Figma tokens", "DevExtreme"],
  },
  {
    id: "apto",
    company: "Apto Payments",
    role: "Frontend · Cross-framework design system",
    problem:
      "A fintech platform with real-time data, card management and account flows, plus a second product to launch. Both needed one consistent UI.",
    contribution:
      "I built and maintained the core of the platform in React with TanStack Query, and launched a second platform from scratch in Vue.js, integrating several third-party financial APIs. I also wrote a cross-framework design system in React and Vue, documented in Storybook and used across both products.",
    result:
      "One design system shared across both products, documented in Storybook and used by the whole team.",
    stack: ["React", "Vue.js", "TanStack Query", "Storybook", "Docusaurus", "Cypress"],
  },
  {
    id: "impulsum",
    company: "Impulsum Studio",
    role: "Frontend · Product UI & state",
    problem:
      "Marketing landing pages plus an onboarding flow on the IH platform that was leaking users and adding load to support.",
    contribution:
      "I built and tuned landing pages in Next.js with Contentful, and rebuilt the onboarding flow with XState state machines. I also contributed to Composer (cmpsr.dev), an open-source tool for composing components. Everything stayed under Cypress and Jest.",
    result:
      "A smoother onboarding flow that improved conversion and took load off support.",
    stack: ["Next.js", "TypeScript", "XState", "Contentful", "Cypress", "Jest"],
  },
];
