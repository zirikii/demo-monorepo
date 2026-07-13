import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";

const guides = [
  { title: "Flight Information", body: "Live-style arrival and departure listings for demo journeys through Changi.", to: "/fly/flights" },
  { title: "Arrival Guide", body: "Immigration, customs, baggage, and leaving the airport.", to: "/fly" },
  { title: "Departure Guide", body: "Getting to Changi, check-in options, security, and tax refunds.", to: "/fly" },
  { title: "Transiting Guide", body: "Connections, free Singapore tours, and transit hotels.", to: "/fly" },
  { title: "Lounges", body: "Airline lounges, pay-per-use options, and free rest areas.", to: "/fly" },
  { title: "Airline Information", body: "Passenger and freighter airline directories for planning.", to: "/fly" },
];

export function FlyPage() {
  useDocumentTitle("Fly");
  return (
    <PageLayout>
      <PageHero
        title="Fly"
        subtitle="Everything you need before, during, and after your journey through Changi Airport."
        crumbs={[{ label: "Fly" }]}
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {guides.map((g) => (
          <Link key={g.title} to={g.to} className="rounded-2xl border border-line bg-card p-5 shadow-sm transition hover:border-purple/30 hover:shadow-card">
            <h2 className="text-lg font-black text-ink-deep">{g.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{g.body}</p>
          </Link>
        ))}
      </section>
    </PageLayout>
  );
}
