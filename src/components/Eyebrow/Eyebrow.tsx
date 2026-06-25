import type { ReactNode, ElementType } from "react";
import styles from "./Eyebrow.module.css";

type EyebrowProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/** Small uppercase magenta label that sits above headings. */
export function Eyebrow({ children, as: Tag = "p", className }: EyebrowProps) {
  return (
    <Tag className={[styles.eyebrow, className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
