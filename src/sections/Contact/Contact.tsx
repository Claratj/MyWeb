import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/Button/Button";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Reveal } from "../../components/Reveal/Reveal";
import { useBloom } from "../../hooks/useBloom";
import styles from "./Contact.module.css";

const EMAIL = "clara@claratoloba.com";

/** The plum band. One filled action (email), LinkedIn as the quieter one, and the
 *  address in plain text with a copy button for anyone without a mail client. */
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const clip = useBloom(ref);
  const addrRef = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");

  const settle = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  };
  const selectAddress = () => {
    const el = addrRef.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setState("selected");
    settle();
  };
  const copy = async () => {
    if (!navigator.clipboard || !window.isSecureContext) return selectAddress();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setState("copied");
      settle();
    } catch {
      selectAddress();
    }
  };

  const status =
    state === "copied" ? "Email address copied" : state === "selected" ? "Address selected, press Command C or Control C to copy" : "";

  return (
    <div className={styles.lift}>
      <motion.section
        ref={ref}
        id="contact"
        className={styles.contact}
        style={{ clipPath: clip }}
        aria-labelledby="contact-title"
      >
        <Reveal from="up" className={`container ${styles.inner}`}>
          <Eyebrow tone="onDark">Contact</Eyebrow>
          <h2 id="contact-title" className={styles.title}>
            I think about how an interface is built and how it looks at the same time.
          </h2>
          <p className={styles.sub}>
            I'm open to full-time remote roles in frontend, product UI and design systems, in the EU or anywhere else.
            Tell me about the product and the team.
          </p>

          <div className={styles.actions}>
            <Button href={`mailto:${EMAIL}?subject=Frontend%20role`} size="lg" variant="onDarkSolid">
              Write me an email
            </Button>
            <Button href="https://www.linkedin.com/in/claratoloba" size="lg" variant="onDark" target="_blank" rel="noopener">
              Connect on LinkedIn <span className="visually-hidden">(opens in new tab)</span>
            </Button>
          </div>

          <p className={styles.mailrow}>
            <code ref={addrRef} id="contact-email">
              {EMAIL}
            </code>
            <button
              type="button"
              className={`${styles.copy} ${state === "copied" ? styles.done : ""}`}
              aria-describedby="contact-email"
              onClick={copy}
            >
              {state === "copied" ? "Copied" : state === "selected" ? "Selected" : "Copy"}
              {state === "copied" && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              )}
            </button>
            <span className="visually-hidden" role="status">
              {status}
            </span>
          </p>
        </Reveal>
      </motion.section>
    </div>
  );
}
