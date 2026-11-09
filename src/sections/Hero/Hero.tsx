import { useEffect, useRef, type PointerEvent } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button/Button";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Reveal } from "../../components/Reveal/Reveal";
import styles from "./Hero.module.css";

/** A quote that hangs from its top edge: it swings in on load, swings again
 *  with scroll velocity and when the pointer brushes past, then settles. */
function usePendulum(base: number, entryFrom: number, direction: 1 | -1, scrollVelocity: MotionValue<number>) {
  const reduce = useReducedMotion();
  const entry = useMotionValue(reduce ? 0 : entryFrom - base);
  const nudge = useMotionValue(0);
  const nudgeSpring = useSpring(nudge, { stiffness: 120, damping: 5 });
  const swing = useSpring(
    useTransform(scrollVelocity, [-2400, 0, 2400], [-18 * direction, 0, 18 * direction], { clamp: true }),
    { stiffness: 110, damping: 7 },
  );

  useEffect(() => {
    if (reduce) return;
    const controls = animate(entry, 0, { type: "spring", stiffness: 30, damping: 4.5, mass: 1.6 });
    return () => controls.stop();
  }, [entry, reduce]);

  const rotate = useTransform<number, number>([entry, swing, nudgeSpring], ([e, s, n]) =>
    reduce ? base : base + e + s + n,
  );

  /** Give the quote a push in the direction the pointer is travelling. */
  const push = (dx: number) => {
    if (reduce) return;
    nudge.set(Math.max(-16, Math.min(16, dx * 0.6)));
    requestAnimationFrame(() => nudge.set(0));
  };

  return { rotate, push };
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const q1Ref = useRef<HTMLSpanElement>(null);
  const q2Ref = useRef<HTMLSpanElement>(null);
  const lastX = useRef(0);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const q1 = usePendulum(-4, -18, 1, velocity);
  const q2 = usePendulum(6, 20, -1, velocity);

  // Depth on the way out: the glow sinks (far), the quotes rise (near) and the
  // headline's three lines slide apart while the copy fades.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const still = (v: number) => (reduce ? 0 : v);
  const glowY = useTransform(p, (v) => still(v * 140));
  const q1Y = useTransform(p, (v) => still(v * -110));
  const q2Y = useTransform(p, (v) => still(v * -60));
  const line1X = useTransform(p, (v) => still(v * 48));
  const bigX = useTransform(p, (v) => still(v * -64));
  const line3X = useTransform(p, (v) => still(v * 36));
  const fade = useTransform(p, (v) => (reduce ? 1 : 1 - v * 0.55));

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const dx = event.clientX - lastX.current;
    lastX.current = event.clientX;
    for (const [el, quote] of [
      [q1Ref.current, q1],
      [q2Ref.current, q2],
    ] as const) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const pad = 40;
      if (
        event.clientX > r.left - pad &&
        event.clientX < r.right + pad &&
        event.clientY > r.top - pad &&
        event.clientY < r.bottom + pad
      ) {
        quote.push(dx);
      }
    }
  };

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title" onPointerMove={onPointerMove}>
      <motion.div className={styles.glow} style={{ y: glowY }} aria-hidden="true">
        <i className={styles.g3} />
        <i className={styles.g4} />
        <i className={styles.g1} />
        <i className={styles.g2} />
      </motion.div>

      <div className={`container ${styles.inner}`}>
        <motion.span
          ref={q1Ref}
          className={`${styles.quote} ${styles.q1}`}
          style={{ rotate: q1.rotate, y: q1Y }}
          aria-hidden="true"
        >
          &#8220;
        </motion.span>

        <motion.div className={styles.copy} style={{ opacity: fade }}>
          <Badge dot className={styles.availHero}>
            Available · Remote
          </Badge>
          <Reveal delay={0}>
            <Eyebrow>Frontend Engineer · Product UI &amp; Design Systems</Eyebrow>
          </Reveal>

          <h1 id="hero-title" className={styles.title} aria-label="Six years of frontend, with an art director’s eye">
            <motion.span className={styles.small} style={{ x: line1X }} aria-hidden="true">
              Six years of
            </motion.span>
            <span className={styles.reveal} aria-hidden="true">
              <motion.span
                className={styles.big}
                style={{ x: bigX }}
                initial={reduce ? false : { y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                Frontend
              </motion.span>
            </span>
            <motion.span className={`${styles.small} ${styles.end}`} style={{ x: line3X }} aria-hidden="true">
              with an art director’s eye
              <motion.span
                ref={q2Ref}
                className={`${styles.quote} ${styles.q2}`}
                style={{ rotate: q2.rotate, y: q2Y }}
              >
                &#8221;
              </motion.span>
            </motion.span>
          </h1>

          <Reveal delay={0.24}>
            <div className={styles.ctas}>
              <Button href="#work" size="lg">
                See experience
              </Button>
              <Button href="#contact" size="lg" variant="outline">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
