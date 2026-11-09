import { useState } from "react";
import { stack } from "../../data/stack";
import styles from "./TrustStrip.module.css";

/**
 * The stack as a slow marquee. The list is rendered twice so the loop is
 * seamless; the copy is hidden from assistive tech. Moving content gets a real
 * pause control (WCAG 2.2.2) — hover and focus pause it too. Under reduced
 * motion it is a static, wrapped list.
 */
export function TrustStrip() {
  const [paused, setPaused] = useState(false);
  const items = stack.map((t) => <li key={t}>{t}</li>);

  return (
    <section className={styles.strip} aria-labelledby="stack-label">
      <h2 id="stack-label" className="visually-hidden">
        Stack
      </h2>
      <div className={`${styles.marquee} ${paused ? styles.paused : ""}`}>
        <ul role="list">{items}</ul>
        <ul role="list" aria-hidden="true">
          {items}
        </ul>
      </div>
      <button
        type="button"
        className={styles.pause}
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
      >
        <span className="visually-hidden">{paused ? "Play" : "Pause"} the stack ticker</span>
        {paused ? (
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2 1l7 4-7 4z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" />
          </svg>
        )}
      </button>
    </section>
  );
}
