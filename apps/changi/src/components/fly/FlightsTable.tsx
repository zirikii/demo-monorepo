import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { flights, type FlightDirection, type FlightStatus } from "@/data/flights";
import { statusTone } from "@/lib/format";
import { Badge } from "../ui/Badge";
import { EmptyState } from "../ui/EmptyState";
import { cn } from "@/lib/cn";

type Props = {
  initialDirection?: FlightDirection;
  initialQuery?: string;
};

type StatusFilter = FlightStatus | "All";

const statusFilters = [
  "On Time",
  "Boarding",
  "Landed",
  "Delayed",
  "Gate Closed",
  "Departed",
] as const satisfies readonly FlightStatus[];

function parseDirection(value: string | null, fallback: FlightDirection): FlightDirection {
  return value === "arrival" || value === "departure" ? value : fallback;
}

function parseStatus(value: string | null): StatusFilter {
  return statusFilters.includes(value as FlightStatus) ? (value as FlightStatus) : "All";
}

export function FlightsTable({ initialDirection = "arrival", initialQuery = "" }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const direction = parseDirection(searchParams.get("dir"), initialDirection);
  const query = searchParams.get("q") ?? initialQuery;
  const status = parseStatus(searchParams.get("status"));

  function updateFilters(nextFilters: {
    direction?: FlightDirection;
    query?: string;
    status?: StatusFilter;
  }) {
    const nextDirection = nextFilters.direction ?? direction;
    const nextQuery = nextFilters.query ?? query;
    const nextStatus = nextFilters.status ?? status;
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("dir", nextDirection);
    if (nextQuery) {
      nextParams.set("q", nextQuery);
    } else {
      nextParams.delete("q");
    }
    if (nextStatus === "All") {
      nextParams.delete("status");
    } else {
      nextParams.set("status", nextStatus);
    }

    setSearchParams(nextParams, { replace: true });
  }

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
              onClick={() => updateFilters({ direction: dir })}
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
            onChange={(e) => updateFilters({ query: e.target.value })}
            placeholder="Search flight no, airline, or city"
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none ring-purple focus:ring-2"
            aria-label="Search flights"
          />
          <select
            value={status}
            onChange={(e) => updateFilters({ status: e.target.value as StatusFilter })}
            className="rounded-md border border-line bg-surface px-3 py-2 text-sm"
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="On Time">On Time</option>
            <option value="Boarding">Boarding</option>
            <option value="Landed">Landed</option>
            <option value="Delayed">Delayed</option>
            <option value="Gate Closed">Gate Closed</option>
            <option value="Departed">Departed</option>
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
