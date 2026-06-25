import type { CaseStudy } from "../../types/content";
import { Chip } from "../Chip/Chip";
import styles from "./CaseCard.module.css";

type CaseCardProps = {
  study: CaseStudy;
};

/** Selected-work card: problem → role → stack → result. */
export function CaseCard({ study }: CaseCardProps) {
  const { company, role, period, problem, contribution, result, stack } = study;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.period}>{period}</span>
        <h3 className={styles.company}>{company}</h3>
        <p className={styles.role}>{role}</p>
      </header>

      <dl className={styles.body}>
        <div className={styles.field}>
          <dt className={styles.label}>Problem</dt>
          <dd className={styles.value}>{problem}</dd>
        </div>
        <div className={styles.field}>
          <dt className={styles.label}>My role</dt>
          <dd className={styles.value}>{contribution}</dd>
        </div>
        <div className={styles.field}>
          <dt className={styles.label}>Result</dt>
          <dd className={styles.value}>{result}</dd>
        </div>
      </dl>

      <ul className={styles.stack} role="list" aria-label={`${company} stack`}>
        {stack.map((tech) => (
          <li key={tech}>
            <Chip variant="solid">{tech}</Chip>
          </li>
        ))}
      </ul>
    </article>
  );
}
