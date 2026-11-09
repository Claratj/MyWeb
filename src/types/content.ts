/** Shared content types — keep data files and components in sync. */

export type Sector = "health" | "enterprise" | "fintech" | "design";

export type Experience = {
  id: string;
  /** Position in the timeline: "Latest", "Previous", "Before code"… */
  label: string;
  period: string;
  sector: Sector;
  /** The sector word shown large on the card. */
  sectorName: string;
  /** One line of context under the sector word. */
  sectorDetail: string;
  company: string;
  role?: string;
  summary: string;
  stack?: string[];
  /** The most recent role gets the plum card. */
  featured?: boolean;
};

export type Pillar = {
  id: string;
  title: string;
  body: string;
};

export type Tech = {
  name: string;
};
