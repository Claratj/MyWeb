import { Mark } from "../../components/Mark/Mark";
import { CV_URL, EMAIL, LINKEDIN_URL } from "../../data/links";
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
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener">
            LinkedIn <span className="visually-hidden">(opens in new tab)</span>
          </a>
          <a href={CV_URL} target="_blank" rel="noopener">
            CV <span className="visually-hidden">(PDF, opens in new tab)</span>
          </a>
        </nav>

        <p className={styles.shell} title="Hi there 👋">
          <span lang="es">Hola Caracola </span><span aria-hidden="true">🐚</span>{" "}
          <span className="visually-hidden">(Hi there)</span>
        </p>
      </div>
    </footer>
  );
}
