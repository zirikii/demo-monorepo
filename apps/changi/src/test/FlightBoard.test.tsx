import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FlightBoard } from "@/components/shared/FlightBoard";
import { generateFlights } from "@/lib/flights";

describe("FlightBoard", () => {
  it("renders a row for every flight with a status badge", () => {
    const flights = generateFlights("departures", 6);
    render(<FlightBoard flights={flights} direction="departures" />);

    // header + one row per flight
    expect(screen.getAllByRole("row")).toHaveLength(flights.length + 1);
    expect(screen.getByText(flights[0].flightNo)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Destination" })).toBeInTheDocument();
  });

  it("labels the city column by direction", () => {
    render(<FlightBoard flights={generateFlights("arrivals", 3)} direction="arrivals" />);
    expect(screen.getByRole("columnheader", { name: "Origin" })).toBeInTheDocument();
  });

  it("shows an empty state when there are no flights", () => {
    render(<FlightBoard flights={[]} direction="departures" />);
    expect(screen.getByText(/no flights match your search/i)).toBeInTheDocument();
  });
});
