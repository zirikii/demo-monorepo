import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { PersonaHero } from "@/components/marketing/PersonaHero";
import { FlightsTable } from "@/components/fly/FlightsTable";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { destinations } from "@/data/destinations";
import { flights } from "@/data/flights";

function LocationSearch() {
  const location = useLocation();

  return <output aria-label="Current search">{location.search}</output>;
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

  it("hydrates filters from the URL and syncs filter changes back", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/fly/flights?dir=departure&q=Tokyo&status=Delayed"]}>
        <FlightsTable />
        <LocationSearch />
      </MemoryRouter>,
    );

    const input = screen.getByLabelText(/Search flights/i);
    const statusSelect = screen.getByLabelText(/Filter by status/i);

    expect(screen.getByRole("button", { name: /Departures/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(input).toHaveValue("Tokyo");
    expect(statusSelect).toHaveValue("Delayed");

    await user.click(screen.getByRole("button", { name: /Arrivals/i }));
    await user.clear(input);
    await user.type(input, "London");
    await user.selectOptions(statusSelect, "Landed");

    expect(screen.getByLabelText(/Current search/i)).toHaveTextContent(
      "?dir=arrival&q=London&status=Landed",
    );
    expect(screen.getByText("BA114")).toBeInTheDocument();
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
