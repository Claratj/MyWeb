import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ExperienceCard } from "../../components/ExperienceCard/ExperienceCard";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { experience, sectorLegend } from "../../data/experience";
import styles from "./Experience.module.css";

const TILTS = [-4, 3, -2, 2.4, 3.4];
const PIN_QUERY = "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 1024px)";
/** Phones, where the track stacks (matches the 759px breakpoint in the CSS). */
const DEAL_QUERY = "(prefers-reduced-motion: no-preference) and (max-width: 759px)";
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);

/**
 * Phones: each card is dealt onto the stack as it scrolls in. It arrives
 * tilted (the same alternating tilts the desktop carousel uses, tripled),
 * lower and smaller, and lands flat by the time its top reaches 55%
 * of the viewport. Scroll-linked, so it reverses on the way back up.
 */
function DealtSlide({ tilt, className, children }: { tilt: number; className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 55%"] });
  const p: MotionValue<number> = useTransform(scrollYProgress, easeOut);
  const rotate = useTransform(p, [0, 1], [tilt * 3, 0]);
  const y = useTransform(p, [0, 1], [110, 0]);
  const scale = useTransform(p, [0, 1], [0.88, 1]);
  return (
    <motion.div ref={ref} className={className} style={{ rotate, y, scale, transformOrigin: tilt < 0 ? "0% 100%" : "100% 100%" }}>
      {children}
    </motion.div>
  );
}

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
  const [dealt, setDealt] = useState(false);
  const [distance, setDistance] = useState(0);
  // Touch tablets swipe the track; phones stack it. Only a track that overflows
  // needs to be a Tab stop (keyboard scrolling); otherwise it is an empty stop.
  const [scrollable, setScrollable] = useState(false);
  // Card centres relative to the untranslated track, measured once per layout so
  // the scroll handler only writes (no getBoundingClientRect per frame).
  const geom = useRef<{ trackLeft: number; centres: number[] }>({ trackLeft: 0, centres: [] });
  // The x the track was last painted at. The tilt is computed from that position
  // (as the original getBoundingClientRect version effectively did, since the
  // change event fires before the new transform is painted), which keeps the
  // resting pose of the cards exactly as designed.
  const painted = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const deal = window.matchMedia(DEAL_QUERY);
    const layout = () => {
      const on = mq.matches;
      setPinned(on);
      setDealt(deal.matches);
      if (on && trackRef.current && pinRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - pinRef.current.clientWidth));
      }
      const track = trackRef.current;
      setScrollable(!on && !!track && track.scrollWidth > track.clientWidth + 1);
    };
    layout();
    mq.addEventListener("change", layout);
    deal.addEventListener("change", layout);
    window.addEventListener("resize", layout);
    return () => {
      mq.removeEventListener("change", layout);
      deal.removeEventListener("change", layout);
      window.removeEventListener("resize", layout);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => (pinned ? -v * distance : 0));
  const bar = useTransform(scrollYProgress, (v) => (pinned ? v : 0));

  // Measure card centres after each layout change (pin on/off, new distance, resize).
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !pinned) return;
    const measure = () => {
      const t = track.getBoundingClientRect();
      const trackLeft = t.left - x.get();
      painted.current = x.get();
      geom.current = {
        trackLeft,
        centres: Array.from(track.querySelectorAll<HTMLElement>("article")).map((card) => {
          const r = card.getBoundingClientRect();
          return r.left + r.width / 2 - t.left;
        }),
      };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned, distance, x]);

  // Straighten and lift each card by its distance from the viewport centre.
  useMotionValueEvent(x, "change", (latest) => {
    const track = trackRef.current;
    if (!track || !pinned) return;
    const mid = window.innerWidth / 2;
    const { trackLeft, centres } = geom.current;
    const at = painted.current;
    painted.current = latest;
    Array.from(track.querySelectorAll<HTMLElement>("article")).forEach((card, i) => {
      const centre = trackLeft + at + (centres[i] ?? 0);
      const d = Math.min(1, Math.abs(centre - mid) / (window.innerWidth * 0.55));
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
          tabIndex={scrollable ? 0 : -1}
        >
          {experience.map((item, i) =>
            dealt ? (
              <DealtSlide key={item.id} tilt={TILTS[i % TILTS.length]} className={styles.slide}>
                <ExperienceCard item={item} tilt={0} />
              </DealtSlide>
            ) : (
              <div key={item.id} className={styles.slide}>
                <ExperienceCard item={item} tilt={pinned ? TILTS[i % TILTS.length] : 0} />
              </div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}
