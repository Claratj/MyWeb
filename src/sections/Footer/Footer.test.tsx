import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("marks the Spanish greeting so screen readers switch language (WCAG 3.1.2)", () => {
    render(<Footer />);
    expect(screen.getByText("Hola Caracola")).toHaveAttribute("lang", "es");
  });
});
