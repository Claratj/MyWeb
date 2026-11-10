import type { ReactNode, ElementType } from "react";
import styles from "./Eyebrow.module.css";

type EyebrowProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "inverse" switches the label to sage-light for the teal and plum bands (Embr name). */
  tone?: "default" | "inverse";
};

/** Small uppercase label that sits above headings. */
export function Eyebrow({ children, as: Tag = "p", className, tone = "default" }: EyebrowProps) {
  return (
    <Tag
      className={[styles.eyebrow, tone === "inverse" && styles.inverse, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
