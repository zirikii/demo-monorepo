import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceGrid } from "@/components/shared/ServiceGrid";
import { Card } from "@/components/ui/Card";
import { airportServices } from "@/data/services";
import { flights } from "@/data/flights";
import { filterFlights } from "@/lib/flightFilters";
import type { Flight } from "@/types";

const statuses: (Flight["status"] | "All")[] = ["All", "On time", "Boarding", "Delayed", "Arrived"];

export function FlyPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Flight["status"] | "All">("All");
  const visibleFlights = useMemo(() => filterFlights(flights, query, status), [query, status]);
  return (
    <PageLayout>
      <PageHero eyebrow="Fly" title="Fly with Changi Airport: Flights, Airlines & Travel Info" description="Flight information, airline details, arrival, departure, transit guidance, and lounges for a smooth Changi journey.">
        <Card><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806d5d]">Live-style board</p><p className="mt-3 text-4xl font-black text-[#2f271f]">{visibleFlights.length}</p><p className="text-sm text-[#665448]">mock flights currently visible</p></Card>
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><ServiceGrid services={airportServices.slice(0, 3)} /></section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-[#2f271f]">Flight Information</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input aria-label="Search flights" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search city, airline, flight" className="focus-ring rounded-full border border-[#d8cabb] px-4 py-3" />
              <select aria-label="Filter status" value={status} onChange={(event) => setStatus(event.target.value as Flight["status"] | "All")} className="focus-ring rounded-full border border-[#d8cabb] px-4 py-3">{statuses.map((item) => <option key={item}>{item}</option>)}</select>
            </div>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-[#806d5d]"><tr><th className="py-3">Time</th><th>Flight</th><th>Destination</th><th>Airline</th><th>Terminal</th><th>Status</th></tr></thead>
              <tbody className="divide-y divide-[#eadfd3]">
                {visibleFlights.map((flight) => <tr key={flight.id}><td className="py-4 font-bold">{flight.time}</td><td>{flight.id}</td><td>{flight.destination}</td><td>{flight.airline}</td><td>{flight.terminal}</td><td><span className="rounded-full bg-[#f2e7dc] px-3 py-1 font-bold text-[#806d5d]">{flight.status}</span></td></tr>)}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </PageLayout>
  );
}
