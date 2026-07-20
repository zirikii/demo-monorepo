import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { PersonaHero } from "@/components/marketing/PersonaHero";
import { FlightsTable } from "@/components/fly/FlightsTable";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RewardsPage } from "@/pages/Rewards";
import { destinations } from "@/data/destinations";
import { flights } from "@/data/flights";
import { readSession, writeSession } from "@/lib/auth";

function LoginRedirectTarget() {
  const location = useLocation();
  return <p>Login redirect target {location.search}</p>;
}

describe("data seeds", () => {
  it("has enough destinations and flights", () => {
    expect(destinations.length).toBeGreaterThanOrEqual(20);
    expect(flights.length).toBeGreaterThanOrEqual(25);
  });
});

describe("PersonaHero", () => {
  it("switches passenger direction", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PersonaHero />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Useful information for arriving passengers/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /ARRIVING/i }));
    await user.click(screen.getByRole("option", { name: /DEPARTING/i }));
    expect(screen.getByText(/Useful information for departing passengers/i)).toBeInTheDocument();
  });
});

describe("FlightsTable", () => {
  it("filters by query", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <FlightsTable initialDirection="arrival" />
      </MemoryRouter>,
    );
    const input = screen.getByLabelText(/Search flights/i);
    await user.clear(input);
    await user.type(input, "ZZZNOPE");
    expect(screen.getByText(/No flights match your filters/i)).toBeInTheDocument();
  });
});

describe("SiteHeader", () => {
  it("renders official logo", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <SiteHeader />
        </MemoryRouter>
      </AuthProvider>,
    );
    const logo = screen.getByAltText(/Changi Airport Singapore/i);
    expect(logo).toHaveAttribute("src", "/brand/logo.svg");
    expect(screen.getByRole("navigation", { name: /Primary/i })).toBeInTheDocument();
  });
});

describe("RewardsPage", () => {
  it("deducts points and confirms a successful redeem", async () => {
    const user = userEvent.setup();
    writeSession({
      email: "traveller@example.com",
      name: "Alex",
      points: 2000,
      memberSince: "2024-01-01",
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/rewards"]}>
          <RewardsPage />
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByText(/Your balance:/i)).toHaveTextContent("2,000 pts");
    await user.click(screen.getByRole("button", { name: /Redeem S\$10 Dining Voucher/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Redeemed S$10 Dining Voucher. Your new balance is 1,000 points.",
    );
    expect(screen.getByText(/Your balance:/i)).toHaveTextContent("1,000 pts");
    expect(readSession()?.points).toBe(1000);
  });

  it("shows an error and preserves points when balance is insufficient", async () => {
    const user = userEvent.setup();
    writeSession({
      email: "traveller@example.com",
      name: "Alex",
      points: 500,
      memberSince: "2024-01-01",
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/rewards"]}>
          <RewardsPage />
        </MemoryRouter>
      </AuthProvider>,
    );

    await user.click(screen.getByRole("button", { name: /Redeem S\$10 Dining Voucher/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "You need 500 more points to redeem S$10 Dining Voucher.",
    );
    expect(screen.getByText(/Your balance:/i)).toHaveTextContent("500 pts");
    expect(readSession()?.points).toBe(500);
  });

  it("redirects signed-out users to login and returns to rewards", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/rewards"]}>
          <Routes>
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/login" element={<LoginRedirectTarget />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    await user.click(screen.getByRole("button", { name: /Redeem S\$10 Dining Voucher/i }));

    expect(screen.getByText("Login redirect target ?redirect=%2Frewards")).toBeInTheDocument();
  });
});
