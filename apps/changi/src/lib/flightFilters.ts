import type { Flight } from "@/types";

export function filterFlights(flights: Flight[], query: string, status: Flight["status"] | "All" = "All") {
  const normalized = query.trim().toLowerCase();
  return flights.filter((flight) => {
    const matchesQuery = !normalized || [flight.destination, flight.airline, flight.id, flight.terminal].some((value) => value.toLowerCase().includes(normalized));
    const matchesStatus = status === "All" || flight.status === status;
    return matchesQuery && matchesStatus;
  });
}
