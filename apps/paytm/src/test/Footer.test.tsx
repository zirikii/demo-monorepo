import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "../components/layout/Footer";

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
}

describe("Footer", () => {
  it("shows the demo disclaimer and trust badges", () => {
    renderFooter();
    expect(screen.getByText(/not affiliated with paytm/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "24x7 Help" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "100% Assurance" })).toBeInTheDocument();
  });

  it("expands an accordion group to reveal its links", async () => {
    const user = userEvent.setup();
    renderFooter();

    expect(screen.queryByRole("link", { name: "Mobile Recharge" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /recharge & pay bills/i }));
    expect(screen.getByRole("link", { name: "Mobile Recharge" })).toBeVisible();
  });

  it("lists the payment network icons", () => {
    renderFooter();
    expect(screen.getByAltText("Visa")).toBeInTheDocument();
    expect(screen.getByAltText("Mastercard")).toBeInTheDocument();
    expect(screen.getByAltText("RuPay")).toBeInTheDocument();
  });
});
