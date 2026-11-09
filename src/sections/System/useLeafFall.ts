import { useEffect, type RefObject } from "react";

const QUERY = "(prefers-reduced-motion: no-preference) and (min-width: 1241px)";

/**
 * The fragments fall into place like leaves as the stage scrolls in, and have
 * landed by the time it is centred. Progress follows the scroll through a lerp
 * (so it glides between wheel steps) and each path is built from sines (no
 * keyframe corners). A block stays hidden while it is still above the heading.
 * Writes translate/rotate/opacity straight to the DOM in one rAF; React never
 * re-renders. Off under reduced motion and below 1241px, where the stage is a grid.
 */
export function useLeafFall(stageRef: RefObject<HTMLElement | null>, headRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const mq = window.matchMedia(QUERY);
    const blocks = Array.from(stage.children) as HTMLElement[];
    let current = 0;
    let target = 0;
    let raf = 0;

    const measure = () => {
      const r = stage.getBoundingClientRect();
      const start = innerHeight * 0.85;
      const end = innerHeight / 2 - r.height / 2;
      target = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
    };

    const apply = () => {
      const stageTop = stage.getBoundingClientRect().top;
      const headBottom = headRef.current ? headRef.current.getBoundingClientRect().bottom : -Infinity;
      blocks.forEach((b, i) => {
        const delay = (i / blocks.length) * 0.45;
        const local = Math.min(1, Math.max(0, (current - delay) / (1 - delay * 0.9)));
        const eased = 1 - Math.pow(1 - local, 3);
        const rest = 1 - eased;
        const side = i % 2 ? -1 : 1;
        const x = side * 70 * Math.sin(eased * Math.PI * 2.4) * rest;
        const y = -0.5 * innerHeight * rest;
        const r = side * 24 * Math.sin(eased * Math.PI * 2.4 + 0.7) * rest;
        const top = stageTop + b.offsetTop + y;
        const belowHead = Math.min(1, Math.max(0, (top - headBottom + 20) / 140));
        const near = Math.max(0, 1 - Math.abs(y) / 110);
        const fadeIn = Math.min(1, Math.max(0, (local - 0.06) / 0.22));
        b.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
        b.style.rotate = `${r.toFixed(2)}deg`;
        b.style.opacity = (fadeIn * Math.max(belowHead, near)).toFixed(3);
      });
    };

    const loop = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.0005) current = target;
      apply();
      raf = current !== target ? requestAnimationFrame(loop) : 0;
    };
    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const reset = () => blocks.forEach((b) => {
      b.style.translate = "";
      b.style.rotate = "";
      b.style.opacity = "";
    });
    const setup = () => {
      window.removeEventListener("scroll", onScroll);
      if (mq.matches) {
        window.addEventListener("scroll", onScroll, { passive: true });
        measure();
        current = target;
        apply();
      } else {
        reset();
      }
    };
    const onResize = () => {
      if (!mq.matches) return;
      measure();
      current = target;
      apply();
    };

    setup();
    mq.addEventListener("change", setup);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", setup);
      reset();
    };
  }, [stageRef, headRef]);
}
