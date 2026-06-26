import { Button } from "../../components/Button/Button";
import { Badge } from "../../components/Badge/Badge";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Reveal } from "../../components/Reveal/Reveal";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-title">
      <Reveal from="blur" className={`container ${styles.inner}`}>
        <Eyebrow tone="onDark">Contact</Eyebrow>
        <h2 id="contact-title" className={styles.title}>
          Let's build a system worth adopting
        </h2>
        <p className={styles.sub}>
          Open to remote frontend and design-systems roles, EU or global. The fastest way
          to reach me is email.
        </p>

        <div className={styles.actions}>
          <Button href="mailto:clara@claratoloba.com" size="lg" variant="onDark">
            clara@claratoloba.com
          </Button>
          <Button
            href="https://www.linkedin.com/in/claratoloba"
            size="lg"
            variant="onDark"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </Button>
        </div>

        <div className={styles.status}>
          <Badge dot>Available · Remote</Badge>
        </div>
      </Reveal>
    </section>
  );
}
