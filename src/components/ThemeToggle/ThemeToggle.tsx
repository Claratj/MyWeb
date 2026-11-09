import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useReducedMotion } from "framer-motion";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const STORAGE_KEY = "ct-theme";
const darkQuery = "(prefers-color-scheme: dark)";

function systemTheme(): Theme {
  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

function readTheme(): Theme {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return systemTheme();
}

/** Pin `theme` as an override, or clear the override when it matches the device,
 *  so the page goes back to following the OS (and its later changes). */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const followSystem = theme === systemTheme();
  if (followSystem) root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
  try {
    if (followSystem) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage blocked: the choice lasts for this page view only */
  }
}

/**
 * Light/dark switch. By default the page follows the device (prefers-color-scheme),
 * live. Picking the opposite theme pins it as an override (data-theme on <html>,
 * stored); picking the device's theme again drops the override. index.html
 * pre-paints a stored override so there is no flash.
 */
export function ThemeToggle() {
  const reduce = useReducedMotion();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(readTheme());
    const mq = window.matchMedia(darkQuery);
    // The device switched (e.g. sunset auto-dark). If it now matches the override,
    // drop the override so the page follows the device from here on.
    const onChange = () => {
      if (document.documentElement.getAttribute("data-theme") === systemTheme()) applyTheme(systemTheme());
      setTheme(readTheme());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const apply = () => {
        applyTheme(next);
        flushSync(() => setTheme(next));
      };

      if (reduce || !document.startViewTransition) {
        apply();
        return;
      }
      // The new theme spreads out from the toggle as a growing circle.
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document.startViewTransition(apply).ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
    },
    [theme, reduce],
  );

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
}
