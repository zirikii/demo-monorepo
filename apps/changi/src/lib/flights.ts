import { airlines } from "@/data/airlines";
import { destinations } from "@/data/destinations";

export type FlightDirection = "departures" | "arrivals";
export type FlightStatus =
  | "On time"
  | "Boarding"
  | "Last call"
  | "Departed"
  | "Landed"
  | "Delayed"
  | "Check-in"
  | "Gate open";

export interface Flight {
  id: string;
  flightNo: string;
  airline: string;
  airlineCode: string;
  city: string;
  code: string;
  terminal: "T1" | "T2" | "T3" | "T4";
  gate: string;
  time: string;
  status: FlightStatus;
  direction: FlightDirection;
}

const DEPARTURE_STATUSES: FlightStatus[] = [
  "On time",
  "Check-in",
  "Gate open",
  "Boarding",
  "Last call",
  "Departed",
  "Delayed",
];
const ARRIVAL_STATUSES: FlightStatus[] = ["On time", "Delayed", "Landed", "Gate open"];
const TERMINALS: Flight["terminal"][] = ["T1", "T2", "T3", "T4"];

/**
 * Deterministic pseudo-random generator (mulberry32) so the mock flight board
 * is stable across renders/tests — no live feed, no flakiness.
 */
function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, list: T[]): T {
  return list[Math.floor(rng() * list.length)];
}

/** Build a believable board of flights for a direction (>=25 rows). */
export function generateFlights(direction: FlightDirection, count = 28): Flight[] {
  const rng = mulberry32(direction === "departures" ? 1972 : 2019);
  const statuses = direction === "departures" ? DEPARTURE_STATUSES : ARRIVAL_STATUSES;
  const flights: Flight[] = [];

  for (let i = 0; i < count; i += 1) {
    const airline = pick(rng, airlines);
    const dest = pick(rng, destinations);
    const terminal = airline.terminals[Math.floor(rng() * airline.terminals.length)] ?? "T1";
    const hour = 5 + Math.floor(rng() * 18);
    const minute = Math.floor(rng() * 12) * 5;
    const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    const flightNo = `${airline.code}${100 + Math.floor(rng() * 899)}`;

    flights.push({
      id: `${direction}-${flightNo}-${i}`,
      flightNo,
      airline: airline.name,
      airlineCode: airline.code,
      city: dest.city,
      code: dest.code,
      terminal,
      gate: `${pick(rng, TERMINALS)}-${String.fromCharCode(65 + Math.floor(rng() * 6))}${1 + Math.floor(rng() * 24)}`,
      time,
      status: pick(rng, statuses),
      direction,
    });
  }

  return flights.sort((a, b) => a.time.localeCompare(b.time));
}

/** Tailwind tint classes for a status badge. */
export function statusTone(status: FlightStatus): string {
  switch (status) {
    case "Boarding":
    case "Gate open":
    case "Landed":
      return "bg-badge-green text-emerald-800";
    case "Last call":
    case "Delayed":
      return "bg-badge-amber text-amber-800";
    case "Departed":
      return "bg-sand-deep text-ink-soft";
    default:
      return "bg-badge-blue text-blue-800";
  }
}
