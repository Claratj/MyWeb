/** Shared content types — keep data files and components in sync. */

export type Sector = "health" | "enterprise" | "fintech" | "design";

export type ExperienceEntry = {
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

/** A foreground/background pair in the System WCAG fragment. `fg`/`bg` are CSS
 *  values (normally a token var()); the retired rust is a literal on purpose. */
export type ContrastPair = {
  label: string;
  ratio: string;
  fg: string;
  bg: string;
  fails?: boolean;
};
