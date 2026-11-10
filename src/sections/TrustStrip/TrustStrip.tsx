import { stack } from "../../data/stack";
import styles from "./TrustStrip.module.css";

/**
 * The stack as a slow marquee. The list is rendered twice so the loop is
 * seamless; the copy is hidden from assistive tech. Hover pauses it; under
 * reduced motion it is a static, wrapped list. No pause button (a deliberate
 * design decision): WCAG 2.2.2 is not met for pointer-less or touch users who
 * keep motion on.
 */
export function TrustStrip() {
  const items = stack.map((t) => <li key={t}>{t}</li>);

  return (
    <section className={styles.strip} aria-labelledby="stack-label">
      <h2 id="stack-label" className="visually-hidden">
        Stack
      </h2>
      <div className={styles.marquee}>
        <ul role="list">{items}</ul>
        <ul role="list" aria-hidden="true">
          {items}
        </ul>
      </div>
    </section>
  );
}
