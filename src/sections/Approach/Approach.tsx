import { useRef } from "react";
import { motion } from "framer-motion";
import { useBloom } from "../../hooks/useBloom";
import { pillars } from "../../data/pillars";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Pillar } from "../../components/Pillar/Pillar";
import styles from "./Approach.module.css";

/**
 * The teal band opens from a point as it scrolls in and ends on a clean cut,
 * floating above the page on a shadow that follows its shape (drop-shadow on a
 * wrapper, so the clipped circle casts it too).
 */
export function Approach() {
  const ref = useRef<HTMLElement>(null);
  const clip = useBloom(ref);

  return (
    <div className={styles.lift}>
      <motion.section
        ref={ref}
        id="approach"
        className={styles.approach}
        style={{ clipPath: clip }}
        aria-labelledby="approach-title"
      >
        <div className={`container ${styles.inner}`}>
          <div>
            <Eyebrow tone="inverse">Approach</Eyebrow>
            <h2 id="approach-title" className={styles.title}>
              Designer's eye, engineer's rigor
            </h2>
          </div>
          <div className={styles.grid}>
            {pillars.map((pillar, i) => (
              <Pillar key={pillar.id} title={pillar.title} body={pillar.body} order={i} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
