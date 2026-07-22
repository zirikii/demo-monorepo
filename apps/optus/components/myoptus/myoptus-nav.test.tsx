import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

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
    "aria-current"?: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { MyOptusNav } from "@/components/myoptus/myoptus-nav";

afterEach(() => cleanup());

describe("MyOptusNav", () => {
  it("marks Dashboard as active and exposes Network tools", () => {
    render(<MyOptusNav userName="Olivia Taylor" />);
    const link = screen.getByRole("link", { name: "Dashboard" });
    expect(link).toHaveAttribute("data-active", "true");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Network tools" })).toHaveAttribute("href", "/network-tools");
  });
});
