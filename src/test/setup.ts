import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";

/* Node-environment suites (e.g. tokens.test.ts) share this file: DOM setup only
   runs where there is a DOM. */
if (typeof window !== "undefined") {
  const { cleanup } = await import("@testing-library/react");

  afterEach(() => {
    cleanup();
    document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.clear();
    } catch {
      /* storage unavailable */
    }
  });

  /* jsdom gaps: browser APIs the components touch on mount. */
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }

  class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  if (!("IntersectionObserver" in window)) Object.assign(window, { IntersectionObserver: NoopObserver });
  if (!("ResizeObserver" in window)) Object.assign(window, { ResizeObserver: NoopObserver });
}
