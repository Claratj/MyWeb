import { useEffect, type RefObject } from "react";
import { useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * A colour band that opens from a point as it scrolls in and ends on a clean
 * cut: returns a clip-path motion value for the band. No clip under reduced motion.
 * While keyboard focus is inside the band the clip is dropped, so a focused
 * control is never hidden by a half-open circle (WCAG 2.4.7) on short screens.
 */
export function useBloom(ref: RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion();
  const focused = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 30%"] });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onIn = () => focused.set(1);
    const onOut = (event: FocusEvent) => {
      if (!el.contains(event.relatedTarget as Node | null)) focused.set(0);
    };
    el.addEventListener("focusin", onIn);
    el.addEventListener("focusout", onOut);
    return () => {
      el.removeEventListener("focusin", onIn);
      el.removeEventListener("focusout", onOut);
    };
  }, [ref, focused]);

  return useTransform([scrollYProgress, focused], ([v, f]: number[]) =>
    reduce || f ? "none" : `circle(${(0.6 + v * 99.4).toFixed(2)}% at 50% 42%)`,
  );
}
