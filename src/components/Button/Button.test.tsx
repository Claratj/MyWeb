import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders an <a> when href is set", () => {
    render(<Button href="/cv.pdf">CV</Button>);
    const link = screen.getByRole("link", { name: "CV" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/cv.pdf");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // fireEvent, not userEvent: userEvent also hovers, and the wobble would start a
  // frame after the test has unmounted the button.
  it("renders a <button> without href and fires onClick", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Send</Button>);
    const button = screen.getByRole("button", { name: "Send" });
    expect(button.tagName).toBe("BUTTON");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies the variant and size classes (defaults primary / md)", () => {
    const { rerender } = render(<Button>Go</Button>);
    let el = screen.getByRole("button");
    expect(el).toHaveClass("btn", "primary", "md");
    rerender(<Button variant="inverse-solid" size="lg" className="extra">Go</Button>);
    el = screen.getByRole("button");
    expect(el).toHaveClass("btn", "inverse-solid", "lg", "extra");
    expect(el).not.toHaveClass("primary");
  });

  it("renders icons alongside the label", () => {
    render(
      <Button iconLeft={<svg data-testid="left" />} iconRight={<svg data-testid="right" />}>
        Label
      </Button>,
    );
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  it("passes native attributes through", () => {
    render(<Button href="https://x.test" target="_blank" rel="noopener">Out</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });
});
