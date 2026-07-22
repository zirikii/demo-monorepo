import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MyOptusNav } from "@/components/myoptus/myoptus-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/usage",
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

describe("MyOptusNav", () => {
  it("renders the user name and nav items", () => {
    render(<MyOptusNav userName="Alex Demo" />);
    expect(screen.getByText("Alex Demo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Usage" })).toBeInTheDocument();
  });

  it("marks the active route with aria-current", () => {
    render(<MyOptusNav userName="Alex Demo" />);
    expect(screen.getByRole("link", { name: "Usage" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute("aria-current");
  });
});
