import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { FlightSearchForm, type FlightSearch } from "../components/travel/FlightSearchForm";
import { SearchResultsList } from "../components/travel/SearchResultsList";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { cities, popularFlightRoutes } from "../data/travel";
import { formatInr } from "../lib/format";

const flightFaqs = [
  { q: "Do special fares need proof at the airport?", a: "Yes — student and armed-forces fares require a valid ID at check-in; senior-citizen fares apply for travellers 60 and above." },
  { q: "Are these live prices?", a: "No, this demo lists sample fares to showcase the booking flow. The real product fetches live inventory across airlines." },
  { q: "Can I cancel after booking?", a: "The real flow supports free-cancellation add-ons and refunds to source. The demo stops at a simulated confirmation." },
];

const infoSections = [
  {
    heading: "Cheap flights, minus twelve open tabs",
    paragraphs: [
      "Compare airlines on one screen with student, senior-citizen, and armed-forces fares surfaced up front. Fare alerts watch your route and ping you when prices dip, and round trips unlock extra savings automatically.",
      "From quick Delhi–Mumbai hops to international itineraries, the booking flow keeps taps to a minimum — search, pick, pay, boarding pass.",
    ],
  },
];

export function FlightsPage() {
  useDocumentTitle("Flight Ticket Booking");
  const [params] = useSearchParams();
  const [search, setSearch] = useState<FlightSearch | null>(null);

  const initialFrom = params.get("from") ?? "DEL";
  const initialTo = params.get("to") ?? "BOM";

  const fromName = cities.find((c) => c.code === (search?.fromCode ?? initialFrom))?.name ?? "Delhi";
  const toName = cities.find((c) => c.code === (search?.toCode ?? initialTo))?.name ?? "Mumbai";

  return (
    <PageLayout withCategoryStrip>
      <h1 className="sr-only">Book flight tickets online</h1>
      <section className="bg-gradient-to-r from-[#0080c4] via-paytm-cyan to-[#31c7f5] pb-10 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-white">Book Flight Tickets</h2>
            <img src="/brand/paytm-travel-logo.svg" alt="Paytm Travel" className="h-6 brightness-0 invert" />
          </div>
          <FlightSearchForm initialFrom={initialFrom} initialTo={initialTo} onSearch={setSearch} />
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        {search ? <SearchResultsList fromName={fromName} toName={toName} /> : null}

        <section aria-label="Popular routes" className="rounded-2xl bg-card p-6 shadow-card">
          <h2 className="text-sm font-bold text-ink">Popular Flight Routes</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularFlightRoutes.map((r) => (
              <li key={r.id}>
                <Link
                  to={`/flights?from=${cities.find((c) => c.name === r.from)?.code ?? "DEL"}&to=${cities.find((c) => c.name === r.to)?.code ?? "BOM"}`}
                  className="flex items-center justify-between rounded-xl border border-hairline px-4 py-3 transition-colors hover:border-paytm-cyan"
                >
                  <span className="text-sm font-semibold text-ink">
                    {r.from} → {r.to}
                  </span>
                  <span className="text-xs text-ink-soft">
                    from <span className="font-bold text-paytm-navy">{formatInr(r.price)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FaqSection faqs={flightFaqs} />
      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
