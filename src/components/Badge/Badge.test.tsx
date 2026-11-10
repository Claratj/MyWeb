import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("uses Embr's status API: neutral by default, info on request", () => {
    const { rerender } = render(<Badge>Draft</Badge>);
    expect(screen.getByText("Draft")).toHaveClass("badge", "neutral");
    rerender(<Badge status="info" dot>Available</Badge>);
    expect(screen.getByText("Available")).toHaveClass("badge", "info");
  });
});
