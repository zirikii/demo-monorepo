import type { FlightStatus } from "@/data/flights";

export function formatPoints(points: number): string {
  return points.toLocaleString("en-SG");
}

export function statusTone(status: FlightStatus): "ok" | "warn" | "info" | "muted" {
  switch (status) {
    case "On Time":
    case "Landed":
    case "Departed":
      return "ok";
    case "Delayed":
      return "warn";
    case "Boarding":
      return "info";
    default:
      return "muted";
  }
}

export function titleCase(value: string): string {
  return value.replace(/\b\w/g, (c) => c.toUpperCase());
}
