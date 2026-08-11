import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RepaymentsCalculator } from "@/components/calculators/RepaymentsCalculator";
import { ProductCard } from "@/components/products/ProductCard";
import { AuthProvider } from "@/hooks/useAuth";
import { getProduct } from "@/data/products";
import { LoginPage } from "@/pages/Login";

function renderWithRouter(ui: React.ReactNode, route = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>,
  );
}

describe("SiteHeader", () => {
  it("renders the CommBank logo and primary navigation", () => {
    renderWithRouter(<SiteHeader />);

    expect(screen.getByAltText("CommBank")).toHaveAttribute("src", "/brand/logo.svg");
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("button", { name: /Banking/ })).toBeInTheDocument();
    expect(within(nav).getByRole("button", { name: /Home loans/ })).toBeInTheDocument();
    expect(within(nav).getByRole("button", { name: /CommBank Yello/ })).toBeInTheDocument();
  });

  it("opens a mega menu and reports its expanded state", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    const trigger = within(nav).getByRole("button", { name: /Home loans/ });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Digi Home Loan" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Repayments calculator" })).toBeInTheDocument();
  });

  it("shows the log on menu with NetBank, CommBiz and CommSec", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /Log on/ }));

    expect(screen.getByRole("link", { name: /NetBank/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /CommBiz/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /CommSec/ })).toBeInTheDocument();
  });
});

describe("LoginPage", () => {
  it("renders the default NetBank log-on page", () => {
    renderWithRouter(<LoginPage />, "/login");

    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
    expect(screen.getByText("Everyday personal banking", { selector: "p" })).toBeInTheDocument();
  });

  it("renders the CommBiz log-on page from the service query", () => {
    renderWithRouter(<LoginPage />, "/login?service=commbiz");

    expect(screen.getByRole("heading", { name: "Log on to CommBiz" })).toBeInTheDocument();
    expect(screen.getByText("Business banking", { selector: "p" })).toBeInTheDocument();
  });
});

describe("ProductCard", () => {
  it("renders the headline rate and links to the product detail page", () => {
    const product = getProduct("netbank-saver");
    if (!product) throw new Error("expected the NetBank Saver fixture to exist");

    renderWithRouter(<ProductCard product={product} />);

    expect(screen.getByRole("heading", { name: "NetBank Saver" })).toBeInTheDocument();
    expect(screen.getByText("5.20% p.a.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open a NetBank Saver" })).toHaveAttribute(
      "href",
      "/products/netbank-saver",
    );
  });
});

describe("RepaymentsCalculator", () => {
  it("shows a repayment for the default loan and updates when inputs change", async () => {
    const user = userEvent.setup();
    renderWithRouter(<RepaymentsCalculator />);

    expect(screen.getByTestId("repayment-amount")).toHaveTextContent("$3,851.23");

    await user.click(screen.getByRole("tab", { name: "Fortnightly" }));
    expect(screen.getByTestId("repayment-amount")).toHaveTextContent("$1,776.64");

    await user.click(screen.getByRole("tab", { name: "Interest Only" }));
    expect(screen.getByTestId("repayment-amount")).toHaveTextContent("$1,472.50");
  });

  it("warns about Lenders' Mortgage Insurance above an 80% LVR", async () => {
    const user = userEvent.setup();
    renderWithRouter(<RepaymentsCalculator />);

    expect(screen.queryByText(/Lenders’ Mortgage Insurance is likely to apply/)).toBeNull();

    const loanAmount = screen.getByLabelText("Loan amount");
    await user.clear(loanAmount);
    await user.type(loanAmount, "800000");

    expect(screen.getByText(/Lenders’ Mortgage Insurance is likely to apply/)).toBeInTheDocument();
  });
});
