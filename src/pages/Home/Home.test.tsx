import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Home } from "./Home";

/* Smoke test for the whole page: every section mounts and the page keeps a
   sound structure (one h1, landmarks, working in-page anchors, unique ids). */
describe("Home", () => {
  it("renders every section without throwing", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("main#main")).toBeInTheDocument();
    for (const id of ["top", "experience", "approach", "about", "contact"]) {
      expect(container.querySelector(`#${id}`), `#${id}`).toBeInTheDocument();
    }
  });

  it("has exactly one h1 and named landmarks", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  });

  it("every in-page link points at an element that exists", () => {
    const { container } = render(<Home />);
    const broken = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
      .map((a) => a.getAttribute("href")!)
      .filter((href) => href.length > 1 && !container.querySelector(href));
    expect(broken).toEqual([]);
  });

  it("has no duplicate ids", () => {
    const { container } = render(<Home />);
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it("aria references (labelledby, controls, describedby) resolve", () => {
    const { container } = render(<Home />);
    const dangling: string[] = [];
    for (const attr of ["aria-labelledby", "aria-controls", "aria-describedby"]) {
      for (const el of container.querySelectorAll(`[${attr}]`)) {
        for (const id of el.getAttribute(attr)!.split(/\s+/)) {
          if (!container.querySelector(`#${CSS.escape(id)}`)) dangling.push(`${attr}=${id}`);
        }
      }
    }
    expect(dangling).toEqual([]);
  });

  it("every image has an alt attribute", () => {
    const { container } = render(<Home />);
    const missing = [...container.querySelectorAll("img")].filter((img) => !img.hasAttribute("alt"));
    expect(missing.map((img) => img.getAttribute("src"))).toEqual([]);
  });

  it("links that open a new tab say so to screen readers", () => {
    const { container } = render(<Home />);
    const silent = [...container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')].filter(
      (a) => !/new tab/i.test(a.textContent ?? "") && !/new tab/i.test(a.getAttribute("aria-label") ?? ""),
    );
    expect(silent.map((a) => a.getAttribute("href"))).toEqual([]);
  });

  it("offers the skip link and the CV download", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
    const banner = screen.getByRole("banner");
    expect(within(banner).getAllByRole("link", { name: /CV/ })[0]).toHaveAttribute("href", "/clara_toloba_cv.pdf");
  });
});
