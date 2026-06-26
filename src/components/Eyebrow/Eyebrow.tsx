import type { ReactNode, ElementType } from "react";
import styles from "./Eyebrow.module.css";

type EyebrowProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "onDark" switches the label to amber for contrast on dark bands. */
  tone?: "default" | "onDark";
};

/** Small uppercase magenta label that sits above headings. */
export function Eyebrow({ children, as: Tag = "p", className, tone = "default" }: EyebrowProps) {
  return (
    <Tag
      className={[styles.eyebrow, tone === "onDark" && styles.onDark, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
