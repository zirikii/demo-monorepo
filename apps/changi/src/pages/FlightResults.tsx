import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { FlightBoard } from "@/components/shared/FlightBoard";
import { cn } from "@/lib/cn";
import { generateFlights, type FlightDirection } from "@/lib/flights";

const DEPARTURES = generateFlights("departures");
const ARRIVALS = generateFlights("arrivals");

export function FlightResultsPage() {
  const [direction, setDirection] = useState<FlightDirection>("departures");
  const [query, setQuery] = useState("");

  const flights = useMemo(() => {
    const source = direction === "departures" ? DEPARTURES : ARRIVALS;
    const q = query.trim().toLowerCase();
    if (!q) return source;
    return source.filter(
      (flight) =>
        flight.city.toLowerCase().includes(q) ||
        flight.code.toLowerCase().includes(q) ||
        flight.airline.toLowerCase().includes(q) ||
        flight.flightNo.toLowerCase().includes(q),
    );
  }, [direction, query]);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Fly"
        title="Flight information"
        copy="Search live-style arrivals and departures across all four terminals. This demo board uses stable sample data."
        crumbs={[{ label: "Home", to: "/" }, { label: "Fly", to: "/fly" }, { label: "Flight Information" }]}
      />

      <section className="bg-sand py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="inline-flex rounded-full border border-sand-deep bg-card p-1"
              role="tablist"
              aria-label="Flight direction"
            >
              {(["departures", "arrivals"] as FlightDirection[]).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  role="tab"
                  aria-selected={direction === dir}
                  onClick={() => setDirection(dir)}
                  className={cn(
                    "rounded-full px-6 py-2 text-sm font-semibold capitalize transition-colors",
                    direction === dir ? "bg-magenta text-white" : "text-ink hover:bg-sand-deep/40",
                  )}
                >
                  {dir}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
                aria-hidden
              />
              <label htmlFor="flight-search" className="sr-only">
                Search flights by city, airline or flight number
              </label>
              <input
                id="flight-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="City, airline or flight no."
                className="w-full rounded-full border border-sand-deep bg-card py-2.5 pl-10 pr-4 text-sm text-ink outline-none focus:border-magenta focus:ring-2 focus:ring-magenta/30"
              />
            </div>
          </div>

          <p className="mt-4 text-sm text-ink-soft" role="status">
            Showing {flights.length} {direction}
            {query ? ` matching “${query}”` : ""}.
          </p>

          <div className="mt-6">
            <FlightBoard flights={flights} direction={direction} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
