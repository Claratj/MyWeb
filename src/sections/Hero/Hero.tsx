import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "../../components/Button/Button";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Reveal } from "../../components/Reveal/Reveal";
import { TokenComposition } from "./TokenComposition";
import styles from "./Hero.module.css";

export function Hero() {
  const reduce = useReducedMotion();
  // Below the grid breakpoint the layout stacks and the quotes overlap the copy,
  // so we freeze their drift and tilt there as well as under reduced-motion.
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 880px)");
    const update = () => setStacked(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const off = reduce || stacked;

  const { scrollY } = useScroll();
  // Decorative layers drift at different speeds to give the hero scroll depth.
  const q1Y = useTransform(scrollY, (v) => (off ? 0 : v * 0.45));
  const q2Y = useTransform(scrollY, (v) => (off ? 0 : v * -0.38));
  const panelY = useTransform(scrollY, (v) => (off ? 0 : v * -0.22));

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <motion.span
        className={`${styles.quote} ${styles.q1}`}
        style={{ y: q1Y }}
        initial={reduce ? false : { rotate: -18 }}
        animate={{ rotate: -4 }}
        transition={
          reduce ? { duration: 0 } : { type: "spring", stiffness: 30, damping: 4.5, mass: 1.6 }
        }
        aria-hidden="true"
      >
        &#8220;
      </motion.span>
      <motion.span
        className={`${styles.quote} ${styles.q2}`}
        style={{ y: q2Y }}
        initial={reduce ? false : { rotate: 20 }}
        animate={{ rotate: 6 }}
        transition={
          reduce ? { duration: 0 } : { type: "spring", stiffness: 26, damping: 4, mass: 1.7 }
        }
        aria-hidden="true"
      >
        &#8221;
      </motion.span>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <Reveal delay={0}>
            <Eyebrow>Frontend Engineer · Design Systems</Eyebrow>
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
              never left behind. I work in the space between design and engineering,
              tokenising systems and getting them adopted in React and TypeScript.
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
          <p className={styles.peek}>A peek at the system</p>
          <motion.div style={{ y: panelY }}>
            <TokenComposition />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
