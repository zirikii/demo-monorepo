import { flights } from "@/data/flights";
import { filterFlights } from "@/lib/flightFilters";

test("filters flights by destination and status", () => {
  expect(filterFlights(flights, "Tokyo", "Delayed")).toEqual([expect.objectContaining({ destination: "Tokyo", status: "Delayed" })]);
  expect(filterFlights(flights, "Singapore Airlines", "On time")).toHaveLength(1);
});
