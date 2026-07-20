import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { PersonaHero } from "@/components/marketing/PersonaHero";
import { FlightsTable } from "@/components/fly/FlightsTable";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DineShopPage } from "@/pages/DineShop";
import { destinations } from "@/data/destinations";
import { flights } from "@/data/flights";

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

describe("DineShopPage", () => {
  it("filters outlets by search query", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <MemoryRouter>
          <DineShopPage />
        </MemoryRouter>
      </AuthProvider>,
    );

    const input = screen.getByLabelText(/Search Dine & Shop outlets/i);
    await user.type(input, "twg");

    expect(screen.getByText("TwG Tea")).toBeInTheDocument();
    expect(screen.queryByText("Jumbo Seafood")).not.toBeInTheDocument();
  });

  it("filters outlets by terminal across dining and shopping", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <MemoryRouter>
          <DineShopPage />
        </MemoryRouter>
      </AuthProvider>,
    );

    await user.selectOptions(screen.getByLabelText(/Filter outlets by terminal/i), "T4");

    expect(screen.getByText("Staff Café Food Court")).toBeInTheDocument();
    expect(screen.queryByText("Jumbo Seafood")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Shopping" }));

    expect(screen.getByText("FairPrice Xpress")).toBeInTheDocument();
    expect(screen.queryByText("Staff Café Food Court")).not.toBeInTheDocument();
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
