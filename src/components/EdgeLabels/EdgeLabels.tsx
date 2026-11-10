import styles from "./EdgeLabels.module.css";

type EdgeLabelsProps = {
  left: string;
  right: string;
};

/** Fixed vertical labels on the viewport edges. Decorative: hidden from assistive tech. */
export function EdgeLabels({ left, right }: EdgeLabelsProps) {
  return (
    <>
      <span className={`${styles.edge} ${styles.left}`} aria-hidden="true">
        {left}
      </span>
      <span className={`${styles.edge} ${styles.right}`} aria-hidden="true">
        {right}
      </span>
    </>
  );
}
