import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

/* jsdom has no document.startViewTransition, so the toggle takes the instant path. */
describe("ThemeToggle", () => {
  it("starts in light theme when nothing is set", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Switch to dark theme" })).toBeInTheDocument();
  });

  it("switches to dark and back, persisting the choice", async () => {
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("ct-theme")).toBe("dark");

    await userEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem("ct-theme")).toBe("light");
  });

  it("respects a theme already set on <html>", () => {
    document.documentElement.setAttribute("data-theme", "dark");
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
  });
});
