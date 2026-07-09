import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { EmiCalculator } from "../components/finance/EmiCalculator";

describe("EmiCalculator", () => {
  it("shows the EMI for its default inputs", () => {
    render(<EmiCalculator />);
    // ₹3,00,000 at 11.5% for 36 months ≈ ₹9,893/month
    expect(screen.getByTestId("emi-monthly")).toHaveTextContent("₹9,893");
  });

  it("recalculates when the amount slider moves", () => {
    render(<EmiCalculator />);
    const amountSlider = screen.getByLabelText(/loan amount/i);

    fireEvent.change(amountSlider, { target: { value: "600000" } });
    // Double the principal doubles the EMI: ≈ ₹19,786
    expect(screen.getByTestId("emi-monthly")).toHaveTextContent("₹19,786");
  });

  it("recalculates when tenure changes", () => {
    render(<EmiCalculator />);
    const tenureSlider = screen.getByLabelText(/tenure/i);

    fireEvent.change(tenureSlider, { target: { value: "12" } });
    expect(screen.getByTestId("emi-monthly")).toHaveTextContent("₹26,585");
  });
});
