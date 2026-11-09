import { useEffect } from "react";
import {
  animate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * A quote that hangs from its top edge: it swings in (once `active`), swings
 * again with scroll velocity and when the pointer brushes past, then settles
 * on `base` degrees. Static under reduced motion.
 */
export function usePendulum(
  base: number,
  entryFrom: number,
  direction: 1 | -1,
  scrollVelocity: MotionValue<number>,
  active = true,
) {
  const reduce = useReducedMotion();
  const entry = useMotionValue(reduce ? 0 : entryFrom - base);
  const nudge = useMotionValue(0);
  const nudgeSpring = useSpring(nudge, { stiffness: 120, damping: 5 });
  const swing = useSpring(
    useTransform(scrollVelocity, [-2400, 0, 2400], [-18 * direction, 0, 18 * direction], { clamp: true }),
    { stiffness: 110, damping: 7 },
  );

  useEffect(() => {
    if (reduce || !active) return;
    const controls = animate(entry, 0, { type: "spring", stiffness: 30, damping: 4.5, mass: 1.6 });
    return () => controls.stop();
  }, [entry, reduce, active]);

  const rotate = useTransform<number, number>([entry, swing, nudgeSpring], ([e, s, n]) =>
    reduce ? base : base + e + s + n,
  );

  /** Push the quote in the direction the pointer is travelling. */
  const push = (dx: number) => {
    if (reduce) return;
    nudge.set(Math.max(-16, Math.min(16, dx * 0.6)));
    requestAnimationFrame(() => nudge.set(0));
  };

  return { rotate, push };
}

/** Pushes each quote whose box (plus a margin) the pointer is crossing. */
export function nudgeQuotesNear(
  event: { clientX: number; clientY: number },
  dx: number,
  quotes: Array<[HTMLElement | null, { push: (dx: number) => void }]>,
) {
  for (const [el, quote] of quotes) {
    if (!el) continue;
    const r = el.getBoundingClientRect();
    const pad = 40;
    if (event.clientX > r.left - pad && event.clientX < r.right + pad && event.clientY > r.top - pad && event.clientY < r.bottom + pad) {
      quote.push(dx);
    }
  }
}
