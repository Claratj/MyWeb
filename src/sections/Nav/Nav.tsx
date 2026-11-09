import { useEffect, useRef, useState } from "react";
import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button/Button";
import { Mark } from "../../components/Mark/Mark";
import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle";
import { DownloadIcon } from "../../assets/icons/DownloadIcon";
import { CV_URL } from "../../data/links";
import styles from "./Nav.module.css";


const links = [
  { href: "#experience", label: "Experience" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/**
 * Three groups, as the mockup: brand left, links centre, actions right.
 * Sticky (a deliberate departure from the mockup) but transparent at the top,
 * so the hero glow runs underneath it; it frosts only once you scroll.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    // DOM order puts the links before the menu button, so move focus into the
    // card on open; otherwise Tab from the button would skip to the hero.
    // (Only below 900px: on desktop the links are always visible.)
    // Retried per frame: under reduced motion the global 0.01ms transition
    // override makes the links' inherited visibility flip a few frames late,
    // and a hidden link cannot take focus.
    let raf = 0;
    const focusFirst = (tries: number) => {
      const menu = menuRef.current;
      const first = menu?.querySelector<HTMLElement>("a");
      if (!menu || !first || getComputedStyle(menu).position !== "absolute") return;
      first.focus();
      if (document.activeElement !== first && tries > 0) raf = requestAnimationFrame(() => focusFirst(tries - 1));
    };
    raf = requestAnimationFrame(() => focusFirst(10));
    const onFocusIn = (event: FocusEvent) => {
      const t = event.target as Node;
      if (!menuRef.current?.contains(t) && !toggleRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("focusin", onFocusIn);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!innerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div ref={innerRef} className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label="Clara Toloba, home">
          <Mark size={46} />
          <b className={styles.wordmark} aria-hidden="true">
            Clara Toloba
          </b>
        </a>

        <nav
          ref={menuRef}
          id="primary-menu"
          className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
          aria-label="Primary"
        >
          <ul className={styles.links} role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className={styles.menuCv}>
              <a href={CV_URL} className={styles.link} target="_blank" rel="noopener" onClick={close}>
                CV <span className="visually-hidden">(PDF, opens in new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Badge dot className={styles.avail}>
            Available · Remote
          </Badge>
          <ThemeToggle />
          <Button
            href={CV_URL}
            size="xs"
            iconRight={<DownloadIcon />}
            target="_blank"
            rel="noopener"
            className={styles.cv}
          >
            CV <span className="visually-hidden">(PDF, opens in new tab)</span>
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="primary-menu"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
