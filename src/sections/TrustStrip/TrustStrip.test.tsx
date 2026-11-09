import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { stack } from "../../data/stack";
import { TrustStrip } from "./TrustStrip";

describe("TrustStrip", () => {
  it("exposes the stack once to assistive tech (the loop copy is hidden)", () => {
    render(<TrustStrip />);
    expect(screen.getAllByRole("list")).toHaveLength(1);
    expect(screen.getAllByRole("listitem")).toHaveLength(stack.length);
  });
});
