import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlanCard } from "@/components/plans/plan-card";

describe("PlanCard", () => {
  it("renders plan name, price, and highlight badge", () => {
    render(
      <PlanCard
        plan={{
          id: "choice",
          name: "Choice",
          price: 55,
          data: "50GB",
          features: ["Endless Data", "Unlimited calls"],
          tag: "Popular",
          highlight: true,
        }}
      />,
    );
    expect(screen.getByText("Choice")).toBeInTheDocument();
    expect(screen.getByText("$55")).toBeInTheDocument();
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByTestId("plan-card-choice")).toBeInTheDocument();
  });
});
