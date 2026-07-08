import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RechargeForm } from "../components/recharge/RechargeForm";

describe("RechargeForm", () => {
  it("validates mobile, operator, and amount before proceeding", async () => {
    const user = userEvent.setup();
    render(<RechargeForm />);

    await user.click(screen.getByRole("button", { name: /proceed to recharge/i }));

    expect(screen.getByText(/valid 10-digit mobile number/i)).toBeInTheDocument();
    expect(screen.getByText(/select an operator/i)).toBeInTheDocument();
    expect(screen.getByText(/amount between/i)).toBeInTheDocument();
  });

  it("opens the simulated success modal for a valid prepaid recharge", async () => {
    const user = userEvent.setup();
    render(<RechargeForm />);

    await user.type(screen.getByLabelText(/mobile number/i), "9876543210");
    await user.selectOptions(screen.getByLabelText(/operator/i), "jio");
    await user.type(screen.getByLabelText(/^amount$/i), "299");
    await user.click(screen.getByRole("button", { name: /proceed to recharge/i }));

    expect(await screen.findByRole("dialog", { name: /recharge successful/i })).toBeInTheDocument();
    expect(screen.getByText("98765 43210")).toBeInTheDocument();
    expect(screen.getByText("₹299")).toBeInTheDocument();
  });

  it("switches to postpaid mode and hides the amount field", async () => {
    const user = userEvent.setup();
    render(<RechargeForm />);

    await user.click(screen.getByRole("radio", { name: /postpaid/i }));

    expect(screen.queryByLabelText(/^amount$/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /proceed to pay bill/i })).toBeInTheDocument();
  });
});
