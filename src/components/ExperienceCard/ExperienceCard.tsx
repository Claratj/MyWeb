import { useRef, type CSSProperties, type PointerEvent } from "react";
import type { ExperienceEntry } from "../../types/content";
import styles from "./ExperienceCard.module.css";

type ExperienceCardProps = {
  item: ExperienceEntry;
  /** Resting tilt in degrees; the carousel straightens it as the card reaches the centre. */
  tilt?: number;
};

/** One role on the timeline: sector (colour-coded), company, role, what I did, stack. */
export function ExperienceCard({ item, tilt = 0 }: ExperienceCardProps) {
  const ref = useRef<HTMLElement>(null);
  const { label, period, sector, sectorName, sectorDetail, company, role, summary, stack, featured } = item;

  // A soft light follows the pointer inside the card (mouse/trackpad only).
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${event.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${event.clientY - r.top}px`);
    ref.current.style.setProperty("--spot", "0.16");
  };
  const onPointerLeave = () => ref.current?.style.setProperty("--spot", "0");

  return (
    <article
      ref={ref}
      className={`${styles.card} ${featured ? styles.featured : styles.plain}`}
      data-sector={sector}
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        <span className={styles.when}>{period}</span>
      </div>
      <div className={styles.sector}>
        <b>{sectorName}</b>
        <span>{sectorDetail}</span>
      </div>
      <h3 className={styles.company}>{company}</h3>
      {role && <p className={styles.role}>{role}</p>}
      <p className={styles.summary}>{summary}</p>
      {stack && (
        <ul className={styles.chips} role="list" aria-label={`${company} stack`}>
          {stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
