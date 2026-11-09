import { motion, useReducedMotion } from "framer-motion";
import type { Pillar as PillarData } from "../../types/content";
import styles from "./Pillar.module.css";

type PillarProps = Pick<PillarData, "title" | "body"> & {
  /** Position in the row: staggers the rule being drawn. */
  order?: number;
};

/** One Approach pillar, for dark bands: a rule drawn on scroll, a label and a line of proof. */
export function Pillar({ title, body, order = 0 }: PillarProps) {
  const reduce = useReducedMotion();
  return (
    <article className={styles.pillar}>
      <motion.span
        className={styles.rule}
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: order * 0.12 }}
      />
      <h3 className={styles.title}>{title}</h3>
      <motion.p
        className={styles.body}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + order * 0.12 }}
      >
        {body}
      </motion.p>
    </article>
  );
}
