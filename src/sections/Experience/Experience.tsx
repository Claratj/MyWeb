import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ExperienceCard } from "../../components/ExperienceCard/ExperienceCard";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { experience, sectorLegend } from "../../data/experience";
import styles from "./Experience.module.css";

const TILTS = [-4, 3, -2, 2.4, 3.4];
const PIN_QUERY = "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 1024px)";

/**
 * Most recent first. On mouse/trackpad desktops the section pins and vertical
 * scroll slides the cards sideways; each card straightens as it reaches the
 * centre. Touch tablets keep a native swipe; phones stack; reduced motion gets
 * the native track with no pin.
 */
export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const layout = () => {
      const on = mq.matches;
      setPinned(on);
      if (on && trackRef.current && pinRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - pinRef.current.clientWidth));
      }
    };
    layout();
    mq.addEventListener("change", layout);
    window.addEventListener("resize", layout);
    return () => {
      mq.removeEventListener("change", layout);
      window.removeEventListener("resize", layout);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => (pinned ? -v * distance : 0));
  const bar = useTransform(scrollYProgress, (v) => (pinned ? v : 0));

  // Straighten and lift each card by its distance from the viewport centre.
  useMotionValueEvent(x, "change", () => {
    const track = trackRef.current;
    if (!track || !pinned) return;
    const mid = window.innerWidth / 2;
    Array.from(track.querySelectorAll<HTMLElement>("article")).forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const d = Math.min(1, Math.abs(r.left + r.width / 2 - mid) / (window.innerWidth * 0.55));
      card.style.transform = `translateY(${(-12 * (1 - d)).toFixed(1)}px) rotate(${(TILTS[i % TILTS.length] * d).toFixed(2)}deg)`;
    });
  });
  useEffect(() => {
    if (pinned) return;
    trackRef.current?.querySelectorAll<HTMLElement>("article").forEach((card) => (card.style.transform = ""));
  }, [pinned]);

  const height = pinned ? `calc(100vh + ${Math.max(distance * 2.2, 0.6 * (typeof window === "undefined" ? 800 : window.innerHeight))}px)` : undefined;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`${styles.xp} ${pinned ? styles.pinned : ""}`}
      style={{ height }}
      aria-labelledby="xp-title"
    >
      <div ref={pinRef} className={styles.pin}>
        <div className={`container ${styles.head}`}>
          <div>
            <Eyebrow>Experience</Eyebrow>
            <h2 id="xp-title" className={styles.title}>
              Where design and code had to meet
            </h2>
            <p className={styles.note}>Most recent first. Client details stay under NDA.</p>
            <ul className={styles.legend} role="list" aria-label="Sector colour code">
              {sectorLegend.map((s) => (
                <li key={s.sector} data-sector={s.sector}>
                  <i aria-hidden="true" />
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
          {pinned && (
            <div className={styles.progress} aria-hidden="true">
              <span>2026</span>
              <span className={styles.bar}>
                <motion.i style={{ scaleX: bar }} />
              </span>
              <span>Before code</span>
            </div>
          )}
        </div>

        <motion.div
          ref={trackRef}
          className={styles.track}
          style={{ x }}
          role="region"
          aria-label="Experience, most recent first"
          tabIndex={pinned ? -1 : 0}
        >
          {experience.map((item, i) => (
            <div key={item.id} className={styles.slide}>
              <ExperienceCard item={item} tilt={pinned ? TILTS[i % TILTS.length] : 0} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
