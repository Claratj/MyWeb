import type { ReactNode } from "react";
import styles from "./Badge.module.css";

type BadgeProps = {
  children: ReactNode;
  /** Shows a pulsing status dot (used for "Available"). */
  dot?: boolean;
  /** Embr status role. Only the two the site uses are styled; same default as Embr. */
  status?: "neutral" | "info";
  className?: string;
};

export function Badge({ children, dot = false, status = "neutral", className }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[status], className].filter(Boolean).join(" ")}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
