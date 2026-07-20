import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { FlightsTable } from "@/components/fly/FlightsTable";
import {
  flightStatuses,
  type FlightDirection,
  type FlightStatus,
  type FlightStatusFilter,
} from "@/data/flights";

const defaultDirection: FlightDirection = "arrival";
const defaultStatus: FlightStatusFilter = "All";

function parseDirection(direction: string | null): FlightDirection {
  return direction === "departure" ? "departure" : defaultDirection;
}

function parseStatus(status: string | null): FlightStatusFilter {
  return flightStatuses.includes(status as FlightStatus) ? (status as FlightStatus) : defaultStatus;
}

export function FlightsPage() {
  useDocumentTitle("Flight Information");
  const [params, setParams] = useSearchParams();
  const direction = useMemo(() => parseDirection(params.get("dir")), [params]);
  const query = params.get("q") ?? "";
  const status = useMemo(() => parseStatus(params.get("status")), [params]);
  const updateFilters = useCallback(
    (
      updates: Partial<{ direction: FlightDirection; query: string; status: FlightStatusFilter }>,
    ) => {
      const nextDirection = updates.direction ?? direction;
      const nextQuery = updates.query ?? query;
      const nextStatus = updates.status ?? status;
      const nextParams = new URLSearchParams(params);

      nextParams.delete("dir");
      nextParams.delete("q");
      nextParams.delete("status");

      if (nextDirection !== defaultDirection) nextParams.set("dir", nextDirection);
      if (nextQuery) nextParams.set("q", nextQuery);
      if (nextStatus !== defaultStatus) nextParams.set("status", nextStatus);

      setParams(nextParams, { replace: true });
    },
    [direction, params, query, setParams, status],
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
