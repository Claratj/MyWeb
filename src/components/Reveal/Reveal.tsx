import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type RevealEffect = "up" | "left" | "right" | "scale" | "fade" | "blur" | "lift";

type RevealProps = {
  children: ReactNode;
  /** Stagger helper: delay in seconds. */
  delay?: number;
  /** Entrance effect. */
  from?: RevealEffect;
  className?: string;
};

const hidden: Record<RevealEffect, Record<string, number | string>> = {
  up: { opacity: 0, y: 28 },
  left: { opacity: 0, x: -36 },
  right: { opacity: 0, x: 36 },
  scale: { opacity: 0, scale: 0.92 },
  fade: { opacity: 0 },
  blur: { opacity: 0, filter: "blur(10px)", y: 16 },
  lift: { opacity: 0, y: 40, scale: 0.97 },
};

const shown = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

/** Fade-and-move on scroll. No-op when reduced motion is on. */
export function Reveal({ children, delay = 0, from = "up", className }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : hidden[from]}
      whileInView={reduce ? undefined : shown}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
