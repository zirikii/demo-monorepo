import { useState } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { PersonaHero } from "@/components/marketing/PersonaHero";
import { FlightsTable } from "@/components/fly/FlightsTable";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { destinations } from "@/data/destinations";
import { flights } from "@/data/flights";
import { FlightsPage } from "@/pages/Flights";

function FilterableFlightsTable() {
  const [query, setQuery] = useState("");

  return (
    <FlightsTable
      direction="arrival"
      query={query}
      status="All"
      onDirectionChange={() => undefined}
      onQueryChange={setQuery}
      onStatusChange={() => undefined}
    />
  );
}

function FlightsPageWithSearch() {
  const location = useLocation();

  return (
    <>
      <FlightsPage />
      <output aria-label="Current flight filters">{location.search}</output>
    </>
  );
}

function renderFlightsPage(initialEntry: string) {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/fly/flights" element={<FlightsPageWithSearch />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
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
    render(<FilterableFlightsTable />);
    const input = screen.getByLabelText(/Search flights/i);
    await user.clear(input);
    await user.type(input, "ZZZNOPE");
    expect(screen.getByText(/No flights match your filters/i)).toBeInTheDocument();
  });

  it("hydrates filters from the URL", () => {
    renderFlightsPage("/fly/flights?dir=departure&q=qantas&status=Boarding");

    expect(screen.getByLabelText(/Search flights/i)).toHaveValue("qantas");
    expect(screen.getByLabelText(/Filter by status/i)).toHaveValue("Boarding");
    expect(screen.getByRole("button", { name: /Departures/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("QF107")).toBeInTheDocument();
    expect(screen.queryByText("SQ100")).not.toBeInTheDocument();
  });

  it("syncs filter changes to URL query params", async () => {
    const user = userEvent.setup();
    renderFlightsPage("/fly/flights");

    await user.click(screen.getByRole("button", { name: /Departures/i }));
    await user.type(screen.getByLabelText(/Search flights/i), "Tokyo");
    await user.selectOptions(screen.getByLabelText(/Filter by status/i), "Boarding");

    expect(screen.getByLabelText(/Current flight filters/i)).toHaveTextContent(
      "?dir=departure&q=Tokyo&status=Boarding",
    );
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
