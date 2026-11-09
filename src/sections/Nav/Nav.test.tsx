import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("lists the section links", () => {
    render(<Nav />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const [name, href] of [
      ["Experience", "#experience"],
      ["Approach", "#approach"],
      ["About", "#about"],
      ["Contact", "#contact"],
    ]) {
      expect(nav.querySelector(`a[href="${href}"]`)).toHaveTextContent(name);
    }
  });

  it("menu button toggles aria-expanded", async () => {
    render(<Nav />);
    const btn = screen.getByRole("button", { name: "Menu" });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(btn).toHaveAttribute("aria-controls", "primary-menu");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("Escape closes the menu and returns focus to the button", async () => {
    render(<Nav />);
    const btn = screen.getByRole("button", { name: "Menu" });
    await userEvent.click(btn);
    await userEvent.keyboard("{Escape}");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(btn).toHaveFocus();
  });

  it("choosing a link closes the menu", async () => {
    render(<Nav />);
    const btn = screen.getByRole("button", { name: "Menu" });
    await userEvent.click(btn);
    await userEvent.click(screen.getByRole("link", { name: "About" }));
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("a click outside closes the menu", async () => {
    render(
      <>
        <Nav />
        <p>outside</p>
      </>,
    );
    const btn = screen.getByRole("button", { name: "Menu" });
    await userEvent.click(btn);
    await userEvent.click(screen.getByText("outside"));
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });
});
