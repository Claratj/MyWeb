import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "../../components/Button/Button";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Reveal } from "../../components/Reveal/Reveal";
import { TokenComposition } from "./TokenComposition";
import styles from "./Hero.module.css";

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Decorative layers drift at different speeds for scroll depth.
  // NOTE: exaggerated for tuning — spec speeds are 0.14 / -0.11 / -0.06.
  const q1Y = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.45));
  const q2Y = useTransform(scrollY, (v) => (reduce ? 0 : v * -0.38));
  const panelY = useTransform(scrollY, (v) => (reduce ? 0 : v * -0.22));

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <motion.span
        className={`${styles.quote} ${styles.q1}`}
        style={reduce ? { y: q1Y, rotate: -4 } : { y: q1Y }}
        animate={reduce ? undefined : { rotate: [-4, 2, -4] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      >
        &#8220;
      </motion.span>
      <motion.span
        className={`${styles.quote} ${styles.q2}`}
        style={reduce ? { y: q2Y, rotate: 6 } : { y: q2Y }}
        animate={reduce ? undefined : { rotate: [6, -3, 6] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      >
        &#8221;
      </motion.span>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <Reveal delay={0}>
            <Eyebrow>Frontend Engineer — Design Systems</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 id="hero-title" className={styles.title}>
              I build <span className={styles.accent}>design systems</span> that scale
              across frameworks
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className={styles.sub}>
              Frontend engineer with six years in product UI and a design background I
              never left behind. I work in the space between design and engineering —
              tokenising systems and getting them adopted in React, TypeScript and Vue.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className={styles.ctas}>
              <Button href="#work" size="lg">
                See selected work
              </Button>
              <Button href="#contact" size="lg" variant="outline">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal from="right" delay={0.2} className={styles.visual}>
          <motion.div style={{ y: panelY }}>
            <TokenComposition />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
