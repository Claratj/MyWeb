import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button/Button";
import { DownloadIcon } from "../../assets/icons/DownloadIcon";
import logo from "../../assets/img/logo1-01.svg";
import styles from "./Nav.module.css";

const links = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label="Clara Toloba — home">
          <motion.img
            className={styles.logo}
            src={logo}
            alt=""
            width={44}
            height={44}
            whileHover={reduce ? undefined : { scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
          />
        </a>

        <nav
          id="primary-menu"
          className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
          aria-label="Primary"
        >
          <ul className={styles.links} role="list">
            {links.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  className={styles.link}
                  onClick={() => setOpen(false)}
                  whileHover={reduce ? undefined : { scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Badge dot>Available · Remote</Badge>
            <Button
              href="/clara_toloba_cv.pdf"
              size="xs"
              iconRight={<DownloadIcon />}
              target="_blank"
              rel="noopener"
            >
              CV
            </Button>
          </div>
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          <span className={`${styles.bar} ${open ? styles.barTop : ""}`} aria-hidden="true" />
          <span className={`${styles.bar} ${open ? styles.barMid : ""}`} aria-hidden="true" />
          <span className={`${styles.bar} ${open ? styles.barBot : ""}`} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
