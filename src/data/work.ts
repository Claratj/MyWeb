import type { CaseStudy } from "../types/content";

/**
 * Selected work. Copy is drawn from Clara's CV — keep it faithful.
 * Metrics are intentionally left as `TODO Clara:` placeholders; never invent numbers.
 */
export const work: CaseStudy[] = [
  {
    id: "sermes",
    company: "Sermes CRO",
    role: "Sole frontend · Design systems",
    period: "2025 — Present",
    problem:
      "A clinical trial management system (CTMS) that had to stay visually consistent and maintainable while a single frontend scaled it — built in React 18, TypeScript and Vite.",
    contribution:
      "I reworked the frontend architecture early on — a feature-based structure with Domain-Driven Design and hexagonal architecture — so business logic stays separate from the UI and external services. I broke the interface into small, atomic components as the base of a design system we can actually maintain, moved styling onto design tokens, kept Tailwind aligned with Figma, and set up a Figma MCP integration so tokens and components don't drift between design and code.",
    result:
      "TODO Clara: e.g. number of tokenised components, share of the CTMS migrated onto the system, reduction in design↔code drift.",
    stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Figma tokens", "DevExtreme"],
  },
  {
    id: "apto",
    company: "Apto Payments",
    role: "Frontend · Cross-framework design system",
    period: "2021 — 2022",
    problem:
      "A fintech platform with real-time data, card management and account flows — plus a second product to launch — both needing one consistent UI.",
    contribution:
      "I built and maintained the core of the platform in React with TanStack Query, launched a second platform from scratch in Vue.js integrating several third-party financial APIs, and wrote a cross-framework design system in React and Vue, documented in Storybook and used across both products.",
    result:
      "TODO Clara: e.g. components shared across both products, Storybook coverage, ramp-up time saved for new devs.",
    stack: ["React", "Vue.js", "TanStack Query", "Storybook", "Docusaurus", "Cypress"],
  },
  {
    id: "impulsum",
    company: "Impulsum Studio",
    role: "Frontend · Product UI & state",
    period: "2024 — 2025",
    problem:
      "Marketing landing pages plus an onboarding flow on the IH platform that was leaking users and load onto support.",
    contribution:
      "I built and tuned landing pages in Next.js with Contentful, rebuilt the onboarding flow with XState state machines, and contributed to Composer (cmpsr.dev), an open-source tool for composing components — all kept under Cypress and Jest.",
    result:
      "Improved onboarding conversion and took load off support. TODO Clara: conversion uplift %, support-ticket reduction.",
    stack: ["Next.js", "TypeScript", "XState", "Contentful", "Cypress", "Jest"],
  },
];
