import { motion, useReducedMotion } from "framer-motion";
import styles from "./TokenComposition.module.css";

const swatches = [
  "--c-terracotta",
  "--c-amber",
  "--c-plum",
  "--c-magenta",
  "--c-teal",
  "--c-sage",
];

/**
 * Decorative "the medium is the message" panel: a miniature design system —
 * a token swatch grid and a type specimen. Purely visual, hidden from AT.
 */
export function TokenComposition() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={styles.panel}
      aria-hidden="true"
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
    >
      <p className={styles.caption}>Color tokens</p>
      <div className={styles.swatches}>
        {swatches.map((token) => (
          <span
            key={token}
            className={styles.swatch}
            style={{ backgroundColor: `var(${token})` }}
          />
        ))}
      </div>

      <p className={styles.caption}>Type</p>
      <div className={styles.specimen}>
        <span className={styles.specimenDisplay}>Aa</span>
        <div className={styles.specimenMeta}>
          <strong>Montserrat</strong>
          <span>Display · 800</span>
        </div>
      </div>
    </motion.div>
  );
}
