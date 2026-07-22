import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({ push: () => undefined, refresh: () => undefined }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    "data-active"?: boolean;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { MyOptusNav } from "@/components/myoptus/myoptus-nav";

describe("MyOptusNav", () => {
  it("marks Dashboard as active", () => {
    render(<MyOptusNav userName="Mia Sullivan" />);
    const link = screen.getByRole("link", { name: "Dashboard" });
    expect(link).toHaveAttribute("data-active", "true");
    expect(link).toHaveAttribute("aria-current", "page");
  });
});
