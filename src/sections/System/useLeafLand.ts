import { useEffect, type RefObject } from "react";

/** Where the stage is a grid (the desktop collage has useLeafFall). */
const QUERY = "(prefers-reduced-motion: no-preference) and (max-width: 1240px)";
/** Drop height, sway and spin at the start of the fall. */
const DROP = 50;
const SWAY = 18;
const SPIN = 8;
/** A block has landed when its top reaches this fraction of the viewport. */
const LAND_AT = 0.65;

/**
 * The grid version of the leaf fall: each fragment lands on its own as it
 * scrolls in. It drops from DROP px above its place with a sine sway and a spin
 * that straightens, and is flat by the time its top reaches 65% of the
 * viewport. Scroll-linked, so it reverses on the way back up. Opacity is never
 * touched: content is readable at every frame.
 *
 * Each block's resting page position is measured once (and again when the
 * stage resizes, e.g. after fonts load); the scroll loop only reads scrollY and
 * writes transforms. Keyboard focus entering the stage lands every block, so an
 * interactive fragment is usable the moment it is reached.
 */
export function useLeafLand(stageRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const mq = window.matchMedia(QUERY);
    const blocks = Array.from(stage.children) as HTMLElement[];
    let tops: number[] = [];
    let raf = 0;
    let focusInside = false;
    let active = false;

    const reset = () =>
      blocks.forEach((b) => {
        b.style.translate = "";
        b.style.rotate = "";
      });

    // Read every resting position first (transforms cleared), then write.
    const measure = () => {
      reset();
      tops = blocks.map((b) => b.getBoundingClientRect().top + scrollY);
    };

    const apply = () => {
      raf = 0;
      const vh = innerHeight;
      const y0 = scrollY;
      blocks.forEach((b, i) => {
        const top = tops[i] - y0;
        const p = focusInside ? 1 : Math.min(1, Math.max(0, (vh - top) / (vh * (1 - LAND_AT))));
        const eased = 1 - Math.pow(1 - p, 3);
        const rest = 1 - eased;
        const side = i % 2 ? -1 : 1;
        const x = side * SWAY * Math.sin(eased * Math.PI * 2.4) * rest;
        const y = -DROP * rest;
        const r = side * SPIN * Math.sin(eased * Math.PI * 2.4 + 0.7) * rest;
        b.style.translate = rest ? `${x.toFixed(1)}px ${y.toFixed(1)}px` : "";
        b.style.rotate = rest ? `${r.toFixed(2)}deg` : "";
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const ro = new ResizeObserver(() => {
      if (!active) return;
      measure();
      apply();
    });

    const setup = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      window.removeEventListener("scroll", schedule);
      active = mq.matches;
      if (active) {
        measure();
        apply();
        window.addEventListener("scroll", schedule, { passive: true });
        ro.observe(stage);
      } else {
        ro.disconnect();
        reset();
      }
    };

    const onFocusIn = () => {
      focusInside = true;
      if (active) apply();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (stage.contains(event.relatedTarget as Node | null)) return;
      focusInside = false;
      if (active) schedule();
    };

    setup();
    mq.addEventListener("change", setup);
    stage.addEventListener("focusin", onFocusIn);
    stage.addEventListener("focusout", onFocusOut);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      mq.removeEventListener("change", setup);
      stage.removeEventListener("focusin", onFocusIn);
      stage.removeEventListener("focusout", onFocusOut);
      reset();
    };
  }, [stageRef]);
}
