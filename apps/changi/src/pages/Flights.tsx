import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { FlightsTable } from "@/components/fly/FlightsTable";

export function FlightsPage() {
  useDocumentTitle("Flight Information");

  return (
    <PageLayout>
      <PageHero
        title="Flight Information"
        subtitle="Demo arrivals and departures — search by flight number, airline, or city."
        crumbs={[{ label: "Fly", to: "/fly" }, { label: "Flight Information" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <FlightsTable />
      </section>
    </PageLayout>
  );
}
