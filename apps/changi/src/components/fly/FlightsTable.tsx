import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { flights, type FlightDirection, type FlightStatus } from "@/data/flights";
import { statusTone } from "@/lib/format";
import { Badge } from "../ui/Badge";
import { EmptyState } from "../ui/EmptyState";
import { cn } from "@/lib/cn";

const statusOptions = [
  "All",
  "On Time",
  "Boarding",
  "Landed",
  "Delayed",
  "Gate Closed",
  "Departed",
] as const satisfies readonly (FlightStatus | "All")[];

type FlightStatusFilter = (typeof statusOptions)[number];

type Props = {
  initialDirection?: FlightDirection;
  initialQuery?: string;
  initialStatus?: FlightStatusFilter;
};

function parseDirection(value: string | null, fallback: FlightDirection): FlightDirection {
  if (value === "arrival" || value === "departure") {
    return value;
  }

  return fallback;
}

function parseStatus(value: string | null, fallback: FlightStatusFilter): FlightStatusFilter {
  return statusOptions.includes(value as FlightStatusFilter)
    ? (value as FlightStatusFilter)
    : fallback;
}

function buildSearchParams(
  currentParams: URLSearchParams,
  direction: FlightDirection,
  query: string,
  status: FlightStatusFilter,
) {
  const nextParams = new URLSearchParams(currentParams);
  const normalizedQuery = query.trim();

  if (direction === "departure") {
    nextParams.set("dir", direction);
  } else {
    nextParams.delete("dir");
  }

  if (normalizedQuery) {
    nextParams.set("q", normalizedQuery);
  } else {
    nextParams.delete("q");
  }

  if (status === "All") {
    nextParams.delete("status");
  } else {
    nextParams.set("status", status);
  }

  return nextParams;
}

export function FlightsTable({
  initialDirection = "arrival",
  initialQuery = "",
  initialStatus = "All",
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilters = useMemo(
    () => ({
      direction: parseDirection(searchParams.get("dir"), initialDirection),
      query: searchParams.get("q") ?? initialQuery,
      status: parseStatus(searchParams.get("status"), initialStatus),
    }),
    [initialDirection, initialQuery, initialStatus, searchParams],
  );
  const [direction, setDirection] = useState<FlightDirection>(urlFilters.direction);
  const [query, setQuery] = useState(urlFilters.query);
  const [status, setStatus] = useState<FlightStatusFilter>(urlFilters.status);

  useEffect(() => {
    setDirection(urlFilters.direction);
    setQuery(urlFilters.query);
    setStatus(urlFilters.status);
  }, [urlFilters.direction, urlFilters.query, urlFilters.status]);

  useEffect(() => {
    const nextParams = buildSearchParams(searchParams, direction, query, status);

    if (nextParams.toString() === searchParams.toString()) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setSearchParams(nextParams, { replace: true });
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [direction, query, searchParams, setSearchParams, status]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return flights.filter((f) => {
      if (f.direction !== direction) return false;
      if (status !== "All" && f.status !== status) return false;
      if (!q) return true;
      return (
        f.flightNo.toLowerCase().includes(q) ||
        f.city.toLowerCase().includes(q) ||
        f.airline.toLowerCase().includes(q)
      );
    });
  }, [direction, query, status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-line bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-lg bg-surface p-1">
          {(["arrival", "departure"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => setDirection(dir)}
              aria-pressed={direction === dir}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-bold capitalize",
                direction === dir ? "bg-purple text-white" : "text-ink-soft hover:text-ink",
              )}
            >
              {dir}s
            </button>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2 sm:max-w-xl sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flight no, airline, or city"
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none ring-purple focus:ring-2"
            aria-label="Search flights"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as FlightStatusFilter)}
            className="rounded-md border border-line bg-surface px-3 py-2 text-sm"
            aria-label="Filter by status"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "All statuses" : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No flights match your filters"
          description="Try another flight number, city, or clear the status filter."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface text-[11px] uppercase tracking-wider text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-bold">Time</th>
                <th className="px-4 py-3 font-bold">Flight</th>
                <th className="px-4 py-3 font-bold">{direction === "arrival" ? "From" : "To"}</th>
                <th className="px-4 py-3 font-bold">Terminal</th>
                <th className="px-4 py-3 font-bold">Gate</th>
                <th className="px-4 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((f) => (
                <tr key={f.id} className="border-t border-line hover:bg-sand/50">
                  <td className="px-4 py-3 font-bold tabular-nums">{f.scheduled}</td>
                  <td className="px-4 py-3">
                    <div className="font-bold">{f.flightNo}</div>
                    <div className="text-xs text-ink-faint">{f.airline}</div>
                  </td>
                  <td className="px-4 py-3">{f.city}</td>
                  <td className="px-4 py-3">T{f.terminal}</td>
                  <td className="px-4 py-3">{f.gate}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(f.status)}>{f.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-ink-faint">
        Showing {rows.length} demo flights — not live operational data.
      </p>
    </div>
  );
}
