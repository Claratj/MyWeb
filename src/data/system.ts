/** "Inside the system" — the contrast pairs shown in the WCAG fragment.
 *  `fg`/`bg` are token names (resolved as CSS custom properties) except the
 *  retired rust, which no longer exists as a token: it is shown as the failure. */
export type ContrastPair = {
  label: string;
  ratio: string;
  fg: string;
  bg: string;
  fails?: boolean;
};

export const contrastPairs: ContrastPair[] = [
  { label: "ink · n1", ratio: "15.2", fg: "var(--c-n3)", bg: "var(--c-n1)" },
  { label: "orange deep", ratio: "6.2", fg: "var(--c-orange-deep)", bg: "var(--c-n1)" },
  { label: "white · orange", ratio: "5.1", fg: "var(--c-n2)", bg: "var(--c-orange)" },
  { label: "sage l · teal", ratio: "8.3", fg: "var(--c-sage-light)", bg: "var(--c-teal)" },
  { label: "orange l · slate", ratio: "5.9", fg: "var(--c-orange-light)", bg: "var(--c-d2)" },
  { label: "retired rust", ratio: "4.3 ✕", fg: "#ee5325", bg: "var(--c-d2)", fails: true },
];

/** The token picker: each swatch re-skins the demo Primary button. */
export const brandSwatches = [
  { name: "plum", bg: "var(--c-plum)", fg: "var(--c-n1)" },
  { name: "orange", bg: "var(--c-orange)", fg: "var(--c-n2)" },
  { name: "teal", bg: "var(--c-teal)", fg: "var(--c-n1)" },
  { name: "sage", bg: "var(--c-sage)", fg: "var(--c-n3)" },
] as const;
