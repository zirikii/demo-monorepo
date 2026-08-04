import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoanCalculator } from "@/components/banking/LoanCalculator";

describe("LoanCalculator", () => {
  it("shows estimated monthly repayment", () => {
    render(<LoanCalculator />);
    expect(screen.getByTestId("monthly-repayment")).toBeInTheDocument();
    expect(screen.getByText(/illustrative only/i)).toBeInTheDocument();
  });
});
