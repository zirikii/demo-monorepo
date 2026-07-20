import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { PersonaHero } from "@/components/marketing/PersonaHero";
import { FlightsTable } from "@/components/fly/FlightsTable";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { destinations } from "@/data/destinations";
import { flights } from "@/data/flights";

function LocationProbe() {
  const location = useLocation();

  return <output aria-label="Current query string">{location.search}</output>;
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

  it("restores filters from the URL query string", () => {
    render(
      <MemoryRouter initialEntries={["/fly/flights?dir=departure&q=Tokyo&status=Delayed"]}>
        <FlightsTable />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: /departures/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByLabelText(/Search flights/i)).toHaveValue("Tokyo");
    expect(screen.getByLabelText(/Filter by status/i)).toHaveValue("Delayed");
    expect(screen.getByText("NH121")).toBeInTheDocument();
  });

  it("syncs filter changes back to URL query params", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/fly/flights?foo=bar"]}>
        <FlightsTable />
        <LocationProbe />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /departures/i }));
    await user.type(screen.getByLabelText(/Search flights/i), "Tokyo");
    await user.selectOptions(screen.getByLabelText(/Filter by status/i), "Delayed");

    await waitFor(() => {
      const params = new URLSearchParams(
        screen.getByLabelText(/Current query string/i).textContent ?? "",
      );
      expect(params.get("foo")).toBe("bar");
      expect(params.get("dir")).toBe("departure");
      expect(params.get("q")).toBe("Tokyo");
      expect(params.get("status")).toBe("Delayed");
    });

    await user.clear(screen.getByLabelText(/Search flights/i));

    await waitFor(() => {
      const params = new URLSearchParams(
        screen.getByLabelText(/Current query string/i).textContent ?? "",
      );
      expect(params.get("q")).toBeNull();
      expect(params.get("dir")).toBe("departure");
      expect(params.get("status")).toBe("Delayed");
    });
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
