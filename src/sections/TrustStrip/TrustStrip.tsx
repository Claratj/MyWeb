import { motion, useReducedMotion, type Variants } from "framer-motion";
import { coreStack, aiStack } from "../../data/stack";
import styles from "./TrustStrip.module.css";

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function ChipRow({ items, ai, reduce }: { items: string[]; ai?: boolean; reduce: boolean | null }) {
  return (
    <motion.ul
      className={styles.list}
      role="list"
      variants={reduce ? undefined : container}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, amount: 0.4 }}
    >
      {items.map((t) => (
        <motion.li
          key={t}
          className={`${styles.chip} ${ai ? styles.chipAi : ""}`}
          variants={reduce ? undefined : item}
        >
          {t}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function TrustStrip() {
  const reduce = useReducedMotion();
  return (
    <section className={styles.strip} aria-label="Tools and technologies">
      <div className={`container ${styles.inner}`}>
        <div className={styles.group}>
          <p className={styles.label}>Core stack, day to day</p>
          <ChipRow items={coreStack} reduce={reduce} />
        </div>
        <span className={styles.rule} aria-hidden="true" />
        <div className={styles.group}>
          <p className={`${styles.label} ${styles.labelAi}`}>
            <span className={styles.spark} aria-hidden="true" />
            AI in my workflow
          </p>
          <ChipRow items={aiStack} ai reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
