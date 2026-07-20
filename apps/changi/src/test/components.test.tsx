import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { PersonaHero } from "@/components/marketing/PersonaHero";
import { FlightsPage } from "@/pages/Flights";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/layout/SiteHeader";
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
  function LocationProbe() {
    const location = useLocation();
    return <output aria-label="Current search">{location.search}</output>;
  }

  function renderFlightsPage(initialEntry = "/fly/flights") {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Routes>
            <Route
              path="/fly/flights"
              element={
                <>
                  <FlightsPage />
                  <LocationProbe />
                </>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );
  }

  function currentParams() {
    const search = screen.getByLabelText(/Current search/i).textContent ?? "";
    return new URLSearchParams(search);
  }

  it("initializes from URL query params", () => {
    renderFlightsPage("/fly/flights?dir=departure&q=Tokyo&status=Departed");

    expect(screen.getByLabelText(/Search flights/i)).toHaveValue("Tokyo");
    expect(screen.getByLabelText(/Filter by status/i)).toHaveValue("Departed");
    expect(screen.getByText("To")).toBeInTheDocument();
  });

  it("syncs filter changes to URL query params", async () => {
    const user = userEvent.setup();
    renderFlightsPage();

    const input = screen.getByLabelText(/Search flights/i);
    await user.clear(input);
    await user.type(input, "Sydney");
    expect(currentParams().get("q")).toBe("Sydney");

    await user.selectOptions(screen.getByLabelText(/Filter by status/i), "Delayed");
    expect(currentParams().get("status")).toBe("Delayed");

    await user.click(screen.getByRole("button", { name: /departures/i }));
    expect(currentParams().get("dir")).toBe("departure");

    await user.clear(input);
    expect(currentParams().has("q")).toBe(false);
  });

  it("filters by query", async () => {
    const user = userEvent.setup();
    renderFlightsPage();

    await user.type(screen.getByLabelText(/Search flights/i), "ZZZNOPE");
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
