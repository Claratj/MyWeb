import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

/* A controllable prefers-color-scheme: `setDark()` flips the device theme and
   fires the change listeners, like the OS switching at sunset. */
function mockSystem(initialDark: boolean) {
  let dark = initialDark;
  const listeners = new Set<() => void>();
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        get matches() {
          return query.includes("dark") ? dark : false;
        },
        media: query,
        addEventListener: (_: string, cb: () => void) => listeners.add(cb),
        removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
      }) as unknown as MediaQueryList,
  );
  return {
    setDark(next: boolean) {
      dark = next;
      act(() => listeners.forEach((cb) => cb()));
    },
  };
}

const root = document.documentElement;
afterEach(() => vi.restoreAllMocks());

/* jsdom has no document.startViewTransition, so the toggle takes the instant path. */
describe("ThemeToggle", () => {
  it("follows a light device by default, with no override", () => {
    mockSystem(false);
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Switch to dark theme" })).toBeInTheDocument();
    expect(root).not.toHaveAttribute("data-theme");
  });

  it("follows a dark device by default, with no override", () => {
    mockSystem(true);
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
    expect(root).not.toHaveAttribute("data-theme");
  });

  it("picking the opposite theme pins an override; picking the device theme drops it", async () => {
    mockSystem(false);
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(root).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("ct-theme")).toBe("dark");

    await userEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(root).not.toHaveAttribute("data-theme");
    expect(localStorage.getItem("ct-theme")).toBeNull();
  });

  it("tracks the device live while there is no override", () => {
    const system = mockSystem(false);
    render(<ThemeToggle />);
    system.setDark(true);
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
    system.setDark(false);
    expect(screen.getByRole("button", { name: "Switch to dark theme" })).toBeInTheDocument();
  });

  it("keeps an override when the device changes away from it", () => {
    const system = mockSystem(true);
    root.setAttribute("data-theme", "light");
    localStorage.setItem("ct-theme", "light");
    render(<ThemeToggle />);
    system.setDark(true);
    expect(root).toHaveAttribute("data-theme", "light");
    expect(screen.getByRole("button", { name: "Switch to dark theme" })).toBeInTheDocument();
  });

  it("drops the override once the device catches up with it", () => {
    const system = mockSystem(false);
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("ct-theme", "dark");
    render(<ThemeToggle />);
    system.setDark(true);
    expect(root).not.toHaveAttribute("data-theme");
    expect(localStorage.getItem("ct-theme")).toBeNull();
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
  });
});
