import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { FlightsTable } from "@/components/fly/FlightsTable";
import type { FlightDirection, FlightStatus } from "@/data/flights";

const flightStatuses = new Set<FlightStatus>([
  "On Time",
  "Boarding",
  "Landed",
  "Delayed",
  "Gate Closed",
  "Departed",
]);

function parseDirection(value: string | null): FlightDirection {
  return value === "departure" ? "departure" : "arrival";
}

function parseStatus(value: string | null): FlightStatus | "All" {
  return value && flightStatuses.has(value as FlightStatus) ? (value as FlightStatus) : "All";
}

export function FlightsPage() {
  useDocumentTitle("Flight Information");
  const [params, setParams] = useSearchParams();
  const direction = useMemo<FlightDirection>(() => {
    return parseDirection(params.get("dir"));
  }, [params]);
  const query = params.get("q") ?? "";
  const status = useMemo(() => parseStatus(params.get("status")), [params]);

  const updateFilters = useCallback(
    (updates: { direction?: FlightDirection; query?: string; status?: FlightStatus | "All" }) => {
      setParams(
        (current) => {
          const next = new URLSearchParams(current);
          const nextDirection = updates.direction ?? parseDirection(current.get("dir"));
          const nextQuery = updates.query ?? current.get("q") ?? "";
          const nextStatus = updates.status ?? parseStatus(current.get("status"));

          if (nextDirection === "departure") {
            next.set("dir", nextDirection);
          } else {
            next.delete("dir");
          }

          if (nextQuery.trim()) {
            next.set("q", nextQuery);
          } else {
            next.delete("q");
          }

          if (nextStatus === "All") {
            next.delete("status");
          } else {
            next.set("status", nextStatus);
          }

          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  return (
    <PageLayout>
      <PageHero
        title="Flight Information"
        subtitle="Demo arrivals and departures — search by flight number, airline, or city."
        crumbs={[{ label: "Fly", to: "/fly" }, { label: "Flight Information" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <FlightsTable
          direction={direction}
          query={query}
          status={status}
          onDirectionChange={(nextDirection) => updateFilters({ direction: nextDirection })}
          onQueryChange={(nextQuery) => updateFilters({ query: nextQuery })}
          onStatusChange={(nextStatus) => updateFilters({ status: nextStatus })}
        />
      </section>
    </PageLayout>
  );
}
