import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlanCard } from "@/components/plans/plan-card";
import type { MobilePlan } from "@/lib/types";

afterEach(() => {
  cleanup();
});

const plan: MobilePlan = {
  id: "plan-medium",
  name: "Optus Choice Plus",
  price: 69,
  data: "180GB",
  dataNote: "Includes SubHub credit",
  features: ["Unlimited national talk & text", "Optus Sport included"],
  tag: "Most popular",
  highlight: true,
};

describe("PlanCard", () => {
  it("renders name, data, tag and features", () => {
    render(<PlanCard plan={plan} />);
    expect(screen.getByText("Optus Choice Plus")).toBeInTheDocument();
    expect(screen.getByText("180GB")).toBeInTheDocument();
    expect(screen.getByText("Most popular")).toBeInTheDocument();
    expect(screen.getByText(/Optus Sport included/)).toBeInTheDocument();
  });

  it("fires onSelect when Choose plan is pressed", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<PlanCard plan={plan} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: /choose optus choice plus/i }));
    expect(onSelect).toHaveBeenCalledWith("plan-medium");
  });
});
