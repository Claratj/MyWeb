import { useRef, useState, type CSSProperties } from "react";
import { Mark } from "../../components/Mark/Mark";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { brandSwatches, contrastPairs } from "../../data/system";
import { useLeafFall } from "./useLeafFall";
import styles from "./System.module.css";

/** Ten fragments of the design system behind the work: what can be shown under NDA. */
export function System() {
  const stageRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [picked, setPicked] = useState<(typeof brandSwatches)[number]>(brandSwatches[1]);
  useLeafFall(stageRef, headRef);

  return (
    <section className={styles.sys} aria-labelledby="sys-title">
      <div ref={headRef} className={`container ${styles.head}`}>
        <div>
          <Eyebrow>Inside the system</Eyebrow>
          <h2 id="sys-title" className={styles.title}>
            No client screenshots. The system behind them.
          </h2>
        </div>
        <p className={styles.side}>
          Fragments of how I build a design system: tokens, components, the audits and the guardrails around them.
        </p>
      </div>

      <div ref={stageRef} className={styles.stage} role="group" aria-label="Design system fragments">
        {/* 1 · token picker */}
        <div className={`${styles.blk} ${styles.light} ${styles.b1}`}>
          <p className={styles.label}>tokens / color</p>
          <div className={styles.swatches}>
            {brandSwatches.map((s) => (
              <button
                key={s.name}
                type="button"
                className={styles.swatch}
                aria-pressed={picked.name === s.name}
                onClick={() => setPicked(s)}
              >
                <span style={{ background: s.bg }} />
                <em>{s.name}</em>
              </button>
            ))}
          </div>
          <p className={styles.mono}>
            --embr-brand-primary: var(--embr-color-<span className={styles.tok}>{picked.name}</span>);
          </p>
          <p className={styles.hint}>Pick a token: the Primary button follows.</p>
        </div>

        {/* 2 · token audit */}
        <div className={`${styles.blk} ${styles.terminal} ${styles.b2}`}>
          <p className={styles.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </p>
          <p className={styles.dim}>&gt; /audit-tokens</p>
          <p className={styles.dim}>token-auditor · no hex in component CSS</p>
          <p>
            <span className={styles.err}>✖</span>  Hero.module.css:20  #5a1545
          </p>
          <p className={styles.dim}>   → use var(--color-heading)</p>
          <p>
            <span className={styles.ok}>✔</span>  0 violations · JSON in sync
          </p>
        </div>

        {/* 3 · components */}
        <div className={`${styles.blk} ${styles.light} ${styles.page} ${styles.b3}`}>
          <p className={styles.label}>components / button · badge</p>
          <div className={styles.row}>
            <span className={styles.demoBtn} style={{ "--demo-bg": picked.bg, "--demo-fg": picked.fg } as CSSProperties}>
              Primary
            </span>
            <span className={`${styles.demoBtn} ${styles.demoOutline}`}>Outline</span>
          </div>
          <div className={styles.row}>
            <span className={`${styles.badge} ${styles.info}`}>info</span>
            <span className={`${styles.badge} ${styles.success}`}>success</span>
            <span className={`${styles.badge} ${styles.warning}`}>warning</span>
            <span className={`${styles.badge} ${styles.danger}`}>danger</span>
          </div>
        </div>

        {/* 4 · contrast fix */}
        <div className={`${styles.blk} ${styles.teal} ${styles.b4}`}>
          <p className={styles.labelOn}>WCAG audit · link on surface</p>
          <p className={styles.fix}>
            <s>4.26</s>
            <span aria-hidden="true">→</span>
            <b>
              5.94<small>:1</small>
            </b>
          </p>
          <p className={styles.onNote}>Dark-mode link moved to a lighter orange. Fixed at the token, nowhere else.</p>
        </div>

        {/* 5 · type */}
        <div className={`${styles.blk} ${styles.light} ${styles.b5}`}>
          <p className={styles.labelHeading}>type</p>
          <p className={styles.specimen} aria-hidden="true">
            Aa
          </p>
          <p className={styles.note}>Montserrat 800 for display · Mulish for reading · fluid clamp() scale</p>
        </div>

        {/* 6 · the mark */}
        <div className={`${styles.blk} ${styles.plum} ${styles.b6}`}>
          <Mark size={170} label="Clara Toloba logo" className={styles.markOnPlum} />
        </div>

        {/* 7 · token tiers */}
        <div className={`${styles.blk} ${styles.light} ${styles.b7}`}>
          <p className={styles.label}>tokens / two tiers</p>
          <ul className={styles.tiers} role="list">
            <li>
              <small>Primitive</small>
              <code>
                <i aria-hidden="true" />
                --embr-color-orange · #C54120
              </code>
            </li>
            <li>
              <small>Semantic</small>
              <code>--embr-brand-primary</code>
            </li>
            <li>
              <small>Read by</small>
              <code>components, never the primitive</code>
            </li>
          </ul>
          <p className={styles.note}>Two tiers, no component tokens. Rebrand the primitive and every consumer follows.</p>
        </div>

        {/* 8 · contrast pairs */}
        <div className={`${styles.blk} ${styles.light} ${styles.b8}`}>
          <p className={styles.label}>WCAG · pairs in use</p>
          <ul className={styles.pairs} role="list">
            {contrastPairs.map((p) => (
              <li key={p.label} className={p.fails ? styles.fails : undefined} style={{ color: p.fg, background: p.bg }}>
                <b aria-hidden="true">Aa</b>
                <span>
                  {p.label}
                  <em>{p.ratio}</em>
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.note}>Five pairs clear AA 4.5:1. The sixth is the old dark link the audit retired.</p>
        </div>

        {/* 9 · motion */}
        <div className={`${styles.blk} ${styles.terminal} ${styles.b9}`}>
          <p className={styles.labelDim}>motion / --embr-motion-easing-out</p>
          <svg className={styles.curve} viewBox="0 0 100 40" aria-hidden="true">
            <path d="M0 40 H100 M0 0 V40" className={styles.axis} />
            <path d="M0 40 L22 0 M100 0 L36 0" className={styles.handles} />
            <path d="M0 40 C22 0 36 0 100 0" className={styles.ease} />
            <circle cx="22" cy="0" r="1.6" className={styles.handleDot} />
            <circle cx="36" cy="0" r="1.6" className={styles.handleDot} />
          </svg>
          <div className={styles.track} aria-hidden="true">
            <i />
          </div>
          <p>cubic-bezier(0.22, 1, 0.36, 1)</p>
          <p className={styles.dim}>The system’s only easing curve · 140ms fast · 240ms base.</p>
        </div>

        {/* 10 · button states */}
        <div className={`${styles.blk} ${styles.light} ${styles.page} ${styles.b10}`}>
          <p className={styles.label}>states / button</p>
          <div className={styles.states}>
            <div>
              <em>Default</em>
              <span className={styles.st}>Primary</span>
            </div>
            <div>
              <em>Hover</em>
              <span className={`${styles.st} ${styles.stHover}`}>Primary</span>
            </div>
            <div>
              <em>Focus-visible</em>
              <span className={`${styles.st} ${styles.stFocus}`}>Primary</span>
            </div>
            <div>
              <em>Disabled</em>
              <span className={`${styles.st} ${styles.stOff}`}>Primary</span>
            </div>
          </div>
          <p className={styles.note}>Global :focus-visible: 2px plum, 2px offset. Disabled at 0.5 opacity.</p>
        </div>
      </div>
    </section>
  );
}
