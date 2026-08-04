import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import type { ReactElement } from "react";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { RateTable } from "@/components/ui/RateTable";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterChips } from "@/components/ui/Tabs";
import { Accordion } from "@/components/ui/Accordion";
import { ToggleField } from "@/components/ui/Field";
import { RepaymentCalculator } from "@/components/tools/RepaymentCalculator";
import { BranchLocator } from "@/components/tools/BranchLocator";
import { AuthProvider } from "@/hooks/useAuth";
import { ownerOccupiedVariableRates } from "@/data/homeLoans";

function renderWithRouter(ui: ReactElement, route = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>,
  );
}

describe("SiteHeader", () => {
  it("renders the CommBank wordmark and a link home", () => {
    renderWithRouter(<SiteHeader />);
    expect(screen.getByRole("link", { name: /CommBank homepage/i })).toHaveAttribute("href", "/");
    expect(screen.getByText("CommBank")).toBeInTheDocument();
  });

  it("renders the seven primary nav items collapsed by default", () => {
    renderWithRouter(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const buttons = within(nav).getAllByRole("button");

    expect(buttons).toHaveLength(7);
    expect(buttons.map((button) => button.textContent)).toEqual([
      "Banking",
      "Home loans",
      "Insurance",
      "Investing & Super",
      "Business",
      "Institutional",
      "CommBank Yello",
    ]);
    buttons.forEach((button) => expect(button).toHaveAttribute("aria-expanded", "false"));
  });

  it("opens the Banking mega menu and exposes its links", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    const banking = within(nav).getByRole("button", { name: /Banking/ });

    await user.click(banking);

    expect(banking).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Credit cards" })).toHaveAttribute(
      "href",
      "/banking/credit-cards",
    );
    expect(screen.getByText("Bank & savings accounts")).toBeInTheDocument();
  });

  it("opens the log on menu with NetBank, CommBiz and CommSec", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /^Log on/ }));

    expect(screen.getByRole("link", { name: /NetBank log on/ })).toHaveAttribute(
      "href",
      "/logon?service=netbank",
    );
    expect(screen.getByRole("link", { name: /CommBiz log on/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /CommSec log on/ })).toBeInTheDocument();
  });

  it("reveals the search field when the search button is pressed", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);

    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByLabelText("Search CommBank")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Interest rates & fees" })).toBeInTheDocument();
  });
});

describe("RateTable", () => {
  it("renders a caption and formatted rates for each row", () => {
    render(<RateTable caption="Owner Occupied variable rates" rows={ownerOccupiedVariableRates} />);

    expect(screen.getByText("Owner Occupied variable rates")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(ownerOccupiedVariableRates.length + 1);
    expect(screen.getByText("5.79% p.a.")).toBeInTheDocument();
    expect(screen.getByText("6.19% p.a.")).toBeInTheDocument();
  });
});

describe("ProductCard", () => {
  it("renders the headline, badge and every feature", () => {
    renderWithRouter(
      <ProductCard
        name="NetBank Saver"
        tagline="Introductory rate for new savers"
        headline="5.20% p.a."
        headlineLabel="Variable introductory rate"
        badge="Intro offer"
        features={["Move money in and out", "No minimum deposit"]}
        ctaLabel="Open an account"
        ctaTo="/register"
      />,
    );

    expect(screen.getByRole("heading", { name: "NetBank Saver" })).toBeInTheDocument();
    expect(screen.getByText("5.20% p.a.")).toBeInTheDocument();
    expect(screen.getByText("Intro offer")).toBeInTheDocument();
    expect(screen.getByText("No minimum deposit")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open an account" })).toHaveAttribute(
      "href",
      "/register",
    );
  });
});

describe("FilterChips", () => {
  it("marks only the selected chip as pressed and reports changes", async () => {
    const user = userEvent.setup();
    const seen: string[] = [];

    render(
      <FilterChips
        options={["All", "Awards", "Low Rate"]}
        value="All"
        onChange={(option) => seen.push(option)}
        ariaLabel="Filter cards"
      />,
    );

    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Awards" })).toHaveAttribute("aria-pressed", "false");

    await user.click(screen.getByRole("button", { name: "Awards" }));
    expect(seen).toEqual(["Awards"]);
  });
});

describe("Accordion", () => {
  it("expands and collapses a panel", async () => {
    const user = userEvent.setup();
    render(
      <Accordion
        items={[{ id: "redraw", title: "What is redraw?", content: "Access extra repayments." }]}
      />,
    );

    const trigger = screen.getByRole("button", { name: "What is redraw?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Access extra repayments.")).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Access extra repayments.")).toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

describe("ToggleField", () => {
  it("exposes switch semantics and toggles", async () => {
    const user = userEvent.setup();
    const seen: boolean[] = [];

    render(<ToggleField label="Lock card" checked={false} onChange={(next) => seen.push(next)} />);

    const toggle = screen.getByRole("switch", { name: "Lock card" });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await user.click(toggle);
    expect(seen).toEqual([true]);
  });
});

describe("RepaymentCalculator", () => {
  it("recalculates the repayment when the loan amount changes", async () => {
    const user = userEvent.setup();
    render(<RepaymentCalculator />);

    expect(screen.getByText("$3,851.23")).toBeInTheDocument();

    const amount = screen.getByLabelText("Loan amount");
    await user.clear(amount);
    await user.type(amount, "300000");

    expect(screen.getByText("$1,777.49")).toBeInTheDocument();
    expect(screen.queryByText("$3,851.23")).not.toBeInTheDocument();
  });

  it("switches to interest-only payments", async () => {
    const user = userEvent.setup();
    render(<RepaymentCalculator />);

    await user.click(screen.getByLabelText(/Interest Only payments/));

    // 650,000 at 5.89% p.a. over one month is 650000 * 0.0589 / 12.
    expect(screen.getByText("$3,190.42")).toBeInTheDocument();
  });
});

describe("BranchLocator", () => {
  it("filters locations by postcode", async () => {
    const user = userEvent.setup();
    render(<BranchLocator />);

    await user.type(screen.getByLabelText("Search by suburb or postcode"), "2150");

    expect(screen.getByRole("heading", { name: "Parramatta" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Melbourne CBD" })).not.toBeInTheDocument();
  });

  it("filters locations by type", async () => {
    const user = userEvent.setup();
    render(<BranchLocator />);

    await user.click(screen.getByRole("button", { name: "ATM" }));

    expect(screen.getByRole("heading", { name: "Newtown ATM" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Sydney CBD" })).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<BranchLocator />);

    await user.type(screen.getByLabelText("Search by suburb or postcode"), "9999");

    expect(screen.getByText("No locations match those filters")).toBeInTheDocument();
  });
});
