import { Mark } from "../../components/Mark/Mark";
import styles from "./Footer.module.css";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <Mark size={34} />
          <p className={styles.copyright}>© {year} Clara Toloba</p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          <a href="mailto:clara@claratoloba.com">Email</a>
          <a href="https://www.linkedin.com/in/claratoloba" target="_blank" rel="noopener">
            LinkedIn <span className="visually-hidden">(opens in new tab)</span>
          </a>
          <a href="/clara_toloba_cv.pdf" target="_blank" rel="noopener">
            CV <span className="visually-hidden">(PDF, opens in new tab)</span>
          </a>
        </nav>

        <p className={styles.shell} title="Hi there 👋">
          Hola Caracola <span aria-hidden="true">🐚</span>{" "}
          <span className="visually-hidden">(Hi there)</span>
        </p>
      </div>
    </footer>
  );
}
