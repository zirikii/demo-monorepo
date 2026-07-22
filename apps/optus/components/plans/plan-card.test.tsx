import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlanCard } from "@/components/plans/plan-card";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("PlanCard", () => {
  it("renders Optus mobile plan pricing and CTA", () => {
    render(
      <PlanCard
        plan={{
          id: "sim-49",
          name: "Optus Plus Everyday",
          price: 49,
          data: "80GB data",
          network: "Optus 5G network",
          features: ["Unlimited standard national talk and text"],
          tag: "Popular",
        }}
      />,
    );
    expect(screen.getByText("Optus Plus Everyday")).toBeInTheDocument();
    expect(screen.getByText(/\$49/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Choose plan" })).toHaveAttribute("href", "/signup");
  });
});
