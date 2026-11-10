import { useRef, type PointerEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useVelocity } from "framer-motion";
import { nudgeQuotesNear, usePendulum } from "../../hooks/usePendulum";
import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button/Button";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Reveal } from "../../components/Reveal/Reveal";
import styles from "./Hero.module.css";

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
    nudgeQuotesNear(event, dx, [
      [q1Ref.current, q1],
      [q2Ref.current, q2],
    ]);
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
          <Badge status="info" dot className={styles.availHero}>
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
              <Button href="#experience" size="lg">
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
