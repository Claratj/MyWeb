import type { ReactNode } from "react";
import styles from "./Chip.module.css";

type ChipProps = {
  children: ReactNode;
  /** Visual emphasis: "solid" for stacks on cards, "outline" for the trust strip. */
  variant?: "outline" | "solid";
  className?: string;
};

/** Small label for technologies (trust strip, case-study stacks). */
export function Chip({ children, variant = "outline", className }: ChipProps) {
  return (
    <span className={[styles.chip, styles[variant], className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
