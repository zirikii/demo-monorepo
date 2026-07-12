import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { destinations } from "@/data/destinations";

export function DestinationGrid() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading title="Explore cities we are flying to today" description="Travel inspiration shaped from the live Changi homepage destination list." />
          <Link to="/fly" className="self-center rounded-full border border-[#d8cabb] px-5 py-3 text-sm font-bold text-[#806d5d]">View All</Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {destinations.map((destination) => (
            <Link key={destination.slug} to={`/destinations/${destination.slug}`} className="group rounded-[1.75rem] bg-[#f7f3ee] p-5 ring-1 ring-[#eadfd3] transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
              <span aria-hidden="true" className="block h-2 w-16 rounded-full" style={{ backgroundColor: destination.accent }} />
              <h3 className="mt-5 text-2xl font-black text-[#2f271f]">{destination.city}</h3>
              <p className="mt-1 text-sm font-semibold text-[#806d5d]">{destination.tagline}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[#7b6b5e]">{destination.region} · {destination.flightTime}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
