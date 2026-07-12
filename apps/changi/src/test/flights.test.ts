import { describe, expect, it } from "vitest";
import { generateFlights, statusTone } from "@/lib/flights";

describe("generateFlights", () => {
  it("produces at least 25 rows by default", () => {
    expect(generateFlights("departures").length).toBeGreaterThanOrEqual(25);
    expect(generateFlights("arrivals").length).toBeGreaterThanOrEqual(25);
  });

  it("is deterministic across calls", () => {
    const a = generateFlights("departures");
    const b = generateFlights("departures");
    expect(a.map((f) => f.id)).toEqual(b.map((f) => f.id));
  });

  it("sorts rows by scheduled time", () => {
    const flights = generateFlights("arrivals");
    const times = flights.map((f) => f.time);
    expect([...times].sort((x, y) => x.localeCompare(y))).toEqual(times);
  });

  it("tags every row with the requested direction", () => {
    expect(generateFlights("departures").every((f) => f.direction === "departures")).toBe(true);
  });
});

describe("statusTone", () => {
  it("returns a tailwind class for a known status", () => {
    expect(statusTone("Boarding")).toContain("bg-badge-green");
    expect(statusTone("Delayed")).toContain("bg-badge-amber");
  });
});
