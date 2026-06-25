/** Shared content types — keep data files and components in sync. */

export type CaseStudy = {
  id: string;
  company: string;
  role: string;
  period: string;
  /** The challenge / context. */
  problem: string;
  /** What Clara owned. */
  contribution: string;
  /** Outcome — use a clear placeholder when the metric isn't filled in yet. */
  result: string;
  stack: string[];
  /** Optional accent token name, e.g. "--c-teal", to tint the card. */
  accent?: string;
};

export type Pillar = {
  id: string;
  title: string;
  body: string;
};

export type Tech = {
  name: string;
};
