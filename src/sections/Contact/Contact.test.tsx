import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Contact } from "./Contact";

afterEach(() => vi.unstubAllGlobals());

describe("Contact", () => {
  it("offers email and LinkedIn", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: "Write me an email" })).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:clara@claratoloba\.com/),
    );
    expect(screen.getByRole("link", { name: /Connect on LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/claratoloba",
    );
  });

  it("copies the address when the clipboard is available", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    vi.stubGlobal("isSecureContext", true);
    render(<Contact />);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("clara@claratoloba.com");
    expect(await screen.findByRole("button", { name: /Copied/ })).toBeInTheDocument();
  });

  it("falls back to selecting the address without a secure clipboard", async () => {
    vi.stubGlobal("isSecureContext", false);
    render(<Contact />);
    await userEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(await screen.findByRole("button", { name: "Selected" })).toBeInTheDocument();
    expect(window.getSelection()?.toString()).toBe("clara@claratoloba.com");
  });
});
