import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MyOptusNav } from "@/components/myoptus/myoptus-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/bills",
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

describe("MyOptusNav", () => {
  it("marks the active account route", () => {
    render(<MyOptusNav userName="Alex Morgan" />);
    expect(screen.getByRole("link", { name: "Bills" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
  });
});
