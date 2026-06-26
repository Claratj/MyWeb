import styles from "./Pillar.module.css";

type PillarProps = {
  index: number;
  title: string;
  body: string;
};

/** One of the three "Approach" pillars. */
export function Pillar({ index, title, body }: PillarProps) {
  return (
    <article className={styles.pillar}>
      <span className={styles.index} aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </article>
  );
}
