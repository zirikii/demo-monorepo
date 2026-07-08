import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../components/layout/Header";

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("renders the Paytm-UPI logo from the brand folder", () => {
    renderHeader();
    const logo = screen.getByAltText("Paytm and UPI");
    expect(logo).toHaveAttribute("src", "/brand/paytm-upi-logo.svg");
  });

  it("opens and closes a mega-menu on click", async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = screen.getByRole("button", { name: /recharge & bills/i });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Mobile Recharge" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("walks through the mock sign-in flow", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: /sign in/i }));
    await user.type(screen.getByLabelText(/mobile number/i), "9876543210");
    await user.click(screen.getByRole("button", { name: /proceed securely/i }));
    await user.type(screen.getByLabelText(/one-time password/i), "123456");
    await user.click(screen.getByRole("button", { name: /verify & sign in/i }));

    expect(screen.getByText(/you're signed in as/i)).toBeInTheDocument();
  });
});
