import { motion, useReducedMotion, type Variants } from "framer-motion";
import { stack } from "../../data/stack";
import styles from "./TrustStrip.module.css";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export function TrustStrip() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.strip} aria-label="Tools and technologies">
      <div className={`container ${styles.inner}`}>
        <p className={styles.label}>Working day to day with</p>
        <motion.ul
          className={styles.list}
          role="list"
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, amount: 0.4 }}
        >
          {stack.map((tech) => (
            <motion.li key={tech} className={styles.item} variants={reduce ? undefined : item}>
              {tech}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
