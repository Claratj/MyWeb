import { useRef, type PointerEvent } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform, useVelocity } from "framer-motion";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Reveal } from "../../components/Reveal/Reveal";
import { nudgeQuotesNear, usePendulum } from "../../hooks/usePendulum";
import photo from "../../assets/img/clara-about.png";
import styles from "./About.module.css";

export function About() {
  const reduce = useReducedMotion();
  const figRef = useRef<HTMLElement>(null);
  const q1Ref = useRef<HTMLSpanElement>(null);
  const q2Ref = useRef<HTMLSpanElement>(null);
  const lastX = useRef(0);
  const inView = useInView(figRef, { once: true, amount: 0.4 });

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const q1 = usePendulum(-4, -18, 1, velocity, inView);
  const q2 = usePendulum(6, 20, -1, velocity, inView);

  // The portrait moves inside its circle as the section scrolls past: a window, not a sticker.
  const { scrollYProgress } = useScroll({ target: figRef, offset: ["start end", "end start"] });
  const pan = useTransform(scrollYProgress, (v) => (reduce ? "0%" : `${(-5 + v * 10).toFixed(2)}%`));

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
    <section id="about" className="section" aria-labelledby="about-title" onPointerMove={onPointerMove}>
      <div className={`container ${styles.grid}`}>
        <figure ref={figRef} className={styles.photo}>
          <div className={styles.frame}>
            <motion.span ref={q1Ref} className={`${styles.quote} ${styles.qOpen}`} style={{ rotate: q1.rotate }} aria-hidden="true">
              &#8220;
            </motion.span>
            <div className={styles.ring}>
              <motion.img
                src={photo}
                width={500}
                height={333}
                loading="lazy"
                alt="Clara Toloba"
                style={{ y: pan, scale: reduce ? 1 : 1.08 }}
              />
            </div>
            <motion.span ref={q2Ref} className={`${styles.quote} ${styles.qClose}`} style={{ rotate: q2.rotate }} aria-hidden="true">
              &#8221;
            </motion.span>
          </div>
          <figcaption className={styles.caption}>
            <span>Clara Toloba</span>
            <span>Madrid</span>
          </figcaption>
        </figure>

        <Reveal from="right" className={styles.copy}>
          <Eyebrow>About</Eyebrow>
          <h2 id="about-title" className={styles.statement}>
            A designer who moved into code, and <em>stayed in both</em>.
          </h2>
          <p>
            I studied Art History, trained in design and art direction, and then moved into code. Today I work closely
            with Product Design across the UX/UI to frontend flow, and I take features end to end, from design to
            production.
          </p>
          <p>
            At Sermes CRO I was the only frontend developer on a clinical trial management system, so the architecture,
            the design system and the accessibility work were mine end to end. Based in Madrid, CET.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
