import { useState } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { SelectField } from "../components/ui/SelectField";
import { Button } from "../components/ui/Button";
import { SuccessModal } from "../components/shared/SuccessModal";
import { useDisclosure } from "../hooks/useDisclosure";
import { popularBusRoutes, busOperators } from "../data/travel";
import { formatInr, formatDayDate, todayIso } from "../lib/format";

const busCities = ["Delhi", "Jaipur", "Mumbai", "Pune", "Bengaluru", "Chennai", "Hyderabad", "Vijayawada", "Ahmedabad", "Manali"];

const busFaqs = [
  { q: "Can I pick my boarding point?", a: "Yes — after choosing a bus you select boarding and dropping points with timings; the demo confirms the route summary." },
  { q: "What amenities do buses list?", a: "Sleeper/seater layouts, AC, charging points, water bottles, and live tracking are listed per operator on the real product." },
  { q: "How do refunds work for cancellations?", a: "Refund amounts depend on the operator's cancellation window and are credited to source within a few days." },
];

const infoSections = [
  {
    heading: "Bus journeys, booked in under a minute",
    paragraphs: [
      "Compare dozens of operators on every route with ratings, punctuality data, and seat maps. Filter by AC, sleeper, departure window, or boarding point, and grab women-only seats where offered.",
    ],
  },
];

export function BusTicketsPage() {
  useDocumentTitle("Bus Ticket Booking");
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Jaipur");
  const success = useDisclosure();

  return (
    <PageLayout withCategoryStrip>
      <h1 className="sr-only">Book bus tickets online</h1>
      <section className="bg-gradient-to-r from-[#0080c4] via-paytm-cyan to-[#31c7f5] pb-10 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-5 text-2xl font-extrabold text-white">Book Bus Tickets</h2>
          <form
            aria-label="Search buses"
            className="grid gap-5 rounded-2xl bg-card p-6 shadow-float sm:grid-cols-[1fr_1fr_1fr_auto]"
            onSubmit={(e) => {
              e.preventDefault();
              success.open();
            }}
          >
            <SelectField
              label="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              options={busCities.filter((c) => c !== to).map((c) => ({ value: c, label: c }))}
            />
            <SelectField
              label="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              options={busCities.filter((c) => c !== from).map((c) => ({ value: c, label: c }))}
            />
            <div>
              <span className="text-xs font-medium text-ink-soft">Travel Date</span>
              <span className="mt-1 block border-b border-hairline pb-2 text-sm font-bold text-ink">
                {formatDayDate(todayIso())}
              </span>
            </div>
            <Button type="submit" size="lg" className="self-end">
              Search Buses
            </Button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <section aria-label="Popular bus routes" className="rounded-2xl bg-card p-6 shadow-card">
          <h2 className="text-sm font-bold text-ink">Popular Bus Routes</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularBusRoutes.map((r) => (
              <li key={r.id} className="rounded-xl border border-hairline px-4 py-3">
                <p className="text-sm font-semibold text-ink">
                  {r.from} → {r.to}
                </p>
                <p className="mt-1 text-xs text-ink-soft">
                  {r.operators} operators · from{" "}
                  <span className="font-bold text-paytm-navy">{formatInr(r.fareFrom)}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Top operators" className="rounded-2xl bg-card p-6 shadow-card">
          <h2 className="text-sm font-bold text-ink">Top Bus Operators</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {busOperators.map((op) => (
              <li key={op} className="rounded-full border border-hairline px-4 py-1.5 text-xs font-semibold text-ink-soft">
                {op}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FaqSection faqs={busFaqs} />
      <SeoTextBlock sections={infoSections} />

      <SuccessModal
        open={success.isOpen}
        onClose={success.close}
        title="Buses Found (Demo)"
        lines={[
          { label: "Route", value: `${from} → ${to}` },
          { label: "Date", value: formatDayDate(todayIso()) },
          { label: "Operators", value: "38 buses available" },
        ]}
      />
    </PageLayout>
  );
}
