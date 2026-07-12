import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { FlightsTable } from "@/components/fly/FlightsTable";
import type { FlightDirection } from "@/data/flights";

export function FlightsPage() {
  useDocumentTitle("Flight Information");
  const [params] = useSearchParams();
  const direction = useMemo<FlightDirection>(() => {
    return params.get("dir") === "departure" ? "departure" : "arrival";
  }, [params]);
  const query = params.get("q") ?? "";

  return (
    <PageLayout>
      <PageHero
        title="Flight Information"
        subtitle="Demo arrivals and departures — search by flight number, airline, or city."
        crumbs={[{ label: "Fly", to: "/fly" }, { label: "Flight Information" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <FlightsTable initialDirection={direction} initialQuery={query} />
      </section>
    </PageLayout>
  );
}
