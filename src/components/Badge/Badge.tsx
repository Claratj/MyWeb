import type { ReactNode } from "react";
import styles from "./Badge.module.css";

type BadgeProps = {
  children: ReactNode;
  /** Shows a pulsing status dot (used for "Available"). */
  dot?: boolean;
  tone?: "available" | "neutral";
  className?: string;
};

export function Badge({ children, dot = false, tone = "available", className }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[tone], className].filter(Boolean).join(" ")}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
