import type { ExperienceEntry, Sector } from "../types/content";

/** Experience, most recent first. Client detail stays under NDA: sector and scope, not screenshots. */
export const experience: ExperienceEntry[] = [
  {
    id: "sermes",
    label: "Latest",
    period: "Jun 2025 – Aug 2026",
    sector: "health",
    sectorName: "Healthcare",
    sectorDetail: "Clinical trial management system",
    company: "Sermes CRO",
    role: "Sole frontend · Design systems",
    summary:
      "Tokens generated from Figma, a lint check that fails the build on raw hex, and a documented WCAG audit with a remediation backlog.",
    stack: ["React 18", "TypeScript", "Figma tokens", "DDD"],
    featured: true,
  },
  {
    id: "impulsum",
    label: "Previous",
    period: "May 2024 – Feb 2025",
    sector: "health",
    sectorName: "Healthcare",
    sectorDetail: "Consultancy specialised in healthcare products",
    company: "Impulsum Studio",
    role: "Frontend · Product UI & state",
    summary:
      "Product UI for healthcare clients: rebuilt a conversion-critical onboarding flow with XState state machines and built Next.js landing pages with Contentful, all under Cypress and Jest. Worked on the design system the studio ran with Composer across its projects.",
    stack: ["Next.js", "XState", "Contentful", "Cypress"],
  },
  {
    id: "john-deere",
    label: "Before that",
    period: "Apr 2023 – Apr 2024",
    sector: "enterprise",
    sectorName: "Enterprise",
    sectorDetail: "Large internal platform, multi-team",
    company: "John Deere",
    role: "Frontend · Platform",
    summary:
      "Maintained and extended a large internal platform in TypeScript, React and Redux, and improved its reliability with Cypress tests and a round of frontend performance work.",
    stack: ["React", "TypeScript", "Redux", "Cypress"],
  },
  {
    id: "apto",
    label: "Earlier",
    period: "Oct 2021 – Nov 2022",
    sector: "fintech",
    sectorName: "Fintech",
    sectorDetail: "Card management and account flows",
    company: "Apto Payments",
    role: "Frontend · Cross-framework design system",
    summary:
      "Launched a second platform from scratch in Vue.js and wrote a multi-framework design system in React and Vue, documented in Storybook and used across both products.",
    stack: ["React", "Vue.js", "Storybook", "TanStack Query"],
  },
  {
    id: "before-code",
    label: "Before code",
    period: "2018 – 2020",
    sector: "design",
    sectorName: "Design",
    sectorDetail: "Art history, graphic design, art direction",
    company: "Art direction",
    summary:
      "BA in Art History, a Master's in Design and Art Direction, then graphic design, photography and a Marketing & Design Manager role. That is where the eye for hierarchy, type and spacing comes from.",
  },
];

export const sectorLegend = [
  { sector: "health", name: "Healthcare" },
  { sector: "enterprise", name: "Enterprise" },
  { sector: "fintech", name: "Fintech" },
  { sector: "design", name: "Design" },
] as const satisfies ReadonlyArray<{ sector: Sector; name: string }>;
