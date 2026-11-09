import type { RefObject } from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * A colour band that opens from a point as it scrolls in and ends on a clean
 * cut: returns a clip-path motion value for the band. No clip under reduced motion.
 */
export function useBloom(ref: RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 30%"] });
  return useTransform(scrollYProgress, (v) => (reduce ? "none" : `circle(${(0.6 + v * 99.4).toFixed(2)}% at 50% 42%)`));
}
