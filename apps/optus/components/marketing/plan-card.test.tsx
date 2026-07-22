import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlanCard } from "@/components/marketing/plan-card";
import type { MobilePlan } from "@/lib/types";

const plan: MobilePlan = {
  id: "plan-medium",
  name: "Medium",
  price: 59,
  data: "100GB",
  dataNote: "+ rollover",
  network: "5G",
  contract: "SIM only",
  features: ["Unlimited talk & text", "Optus Sport included"],
  tag: "Most popular",
  highlight: true,
};

describe("PlanCard", () => {
  it("renders the plan name, price and data", () => {
    render(<PlanCard plan={plan} />);
    expect(screen.getByRole("heading", { name: "Medium" })).toBeInTheDocument();
    expect(screen.getByText("$59")).toBeInTheDocument();
    expect(screen.getByText("100GB")).toBeInTheDocument();
  });

  it("renders each feature and the tag", () => {
    render(<PlanCard plan={plan} />);
    expect(screen.getByText("Most popular")).toBeInTheDocument();
    expect(screen.getByText("Optus Sport included")).toBeInTheDocument();
  });

  it("links to sign in with a Choose CTA", () => {
    render(<PlanCard plan={plan} />);
    const cta = screen.getByRole("link", { name: /choose medium/i });
    expect(cta).toHaveAttribute("href", "/login");
  });
});
