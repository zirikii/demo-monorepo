import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { PricingCards } from "@/components/marketing/PricingCards";

describe("PricingCards", () => {
  it("renders all tiers", () => {
    render(
      <MemoryRouter>
        <PricingCards />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("tier-essentials")).toBeInTheDocument();
    expect(screen.getByTestId("tier-engage")).toBeInTheDocument();
    expect(screen.getByTestId("tier-elite")).toBeInTheDocument();
    expect(screen.getByTestId("tier-unlimited")).toBeInTheDocument();
    expect(screen.getByText("HR Engage")).toBeInTheDocument();
  });
});
