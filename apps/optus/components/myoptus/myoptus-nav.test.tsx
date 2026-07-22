import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MyOptusNav } from "@/components/myoptus/myoptus-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

describe("MyOptusNav", () => {
  it("marks Dashboard as the current page", () => {
    render(<MyOptusNav />);
    const dash = screen.getByRole("link", { name: "Dashboard" });
    expect(dash).toHaveAttribute("aria-current", "page");
  });
});
