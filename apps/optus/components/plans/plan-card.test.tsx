import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlanCard } from "@/components/plans/plan-card";
import type { Plan } from "@/lib/types";

const plan: Plan = {
  id: "m-1",
  name: "Choice Plus",
  category: "Mobile",
  price: 49,
  billing: "per month",
  data: "50GB",
  popular: true,
  features: ["5G access", "No excess data charges"],
};

describe("PlanCard", () => {
  it("renders plan details and popular badge", () => {
    render(<PlanCard plan={plan} />);
    expect(screen.getByText("Choice Plus")).toBeInTheDocument();
    expect(screen.getByText("$49")).toBeInTheDocument();
    expect(screen.getByText("Popular")).toBeInTheDocument();
  });

  it("disables unavailable plan actions", () => {
    render(<PlanCard plan={{ ...plan, unavailable: true }} />);
    expect(screen.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  });
});
