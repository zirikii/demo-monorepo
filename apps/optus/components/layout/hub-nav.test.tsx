import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HubNav } from "@/components/layout/hub-nav";
vi.mock("next/navigation", () => ({ usePathname: () => "/fleet" }));
describe("HubNav", () => {
  it("marks the active hub route", () => {
    render(<HubNav />);
    expect(screen.getByRole("link", { name: /fleet manager/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: /overview/i })).not.toHaveAttribute("aria-current");
  });
});
