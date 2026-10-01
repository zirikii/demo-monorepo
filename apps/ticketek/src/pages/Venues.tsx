import { Accessibility, Bus, Luggage, MapPin, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EventGrid } from "@/components/events/EventCard";
import { events } from "@/data/events";
import { REGIONS } from "@/data/nav";
import type { RegionId } from "@/data/types";
import { getVenue, venues } from "@/data/venues";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { filterEvents } from "@/lib/eventFilters";
import { NotFoundPage } from "./NotFound";

export function VenuesPage() {
  useDocumentTitle("Venues");
  const [region, setRegion] = useState<RegionId>("national");
  const list = useMemo(() => venues.filter((v) => region === "national" || v.state === region).sort((a, b) => a.name.localeCompare(b.name)), [region]);
  return (
    <div className="container-tk py-8">
      <h1 className="text-3xl font-extrabold">Venues</h1>
      <p className="mt-1 text-ink-soft">Getting there, accessibility and what&apos;s on at Ticketek venues around Australia.</p>
      <div role="group" aria-label="Filter by state" className="mt-5 flex flex-wrap gap-2">
        {REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={region === r.id}
            onClick={() => setRegion(r.id)}
            className={cn("rounded-full border px-3.5 py-1.5 text-sm font-medium", region === r.id ? "border-midnight bg-midnight text-white" : "border-line bg-white")}
          >
            {r.label}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v) => {
          const count = events.filter((e) => e.performances.some((p) => p.venueId === v.id)).length;
          return (
            <li key={v.id}>
              <Link to={`/venues/${v.id}`} className="main-content-box block h-full p-5 hover:shadow-tk-lift">
                <p className="font-bold text-tk-blue">{v.name}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
                  <MapPin className="size-3.5" aria-hidden /> {v.city}, {v.stateLabel}
                </p>
                <p className="mt-3 text-xs text-ink-faint">{count === 1 ? "1 event" : `${count} events`}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function VenuePage() {
  const { id = "" } = useParams();
  const venue = getVenue(id);
  useDocumentTitle(venue?.name ?? "Venue");
  const upcoming = useMemo(() => filterEvents({}).filter((e) => e.performances.some((p) => p.venueId === id)), [id]);
  if (!venue) return <NotFoundPage />;
  return (
    <div className="container-tk py-8">
      <nav aria-label="Breadcrumb" className="mb-3 text-sm text-ink-soft">
        <Link to="/venues" className="link">
          Venues
        </Link>{" "}
        / {venue.name}
      </nav>
      <h1 className="text-3xl font-extrabold">{venue.name}</h1>
      <p className="mt-1 text-ink-soft">{venue.address}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          { Icon: Users, title: "Capacity", body: venue.capacity.toLocaleString("en-AU") },
          { Icon: Bus, title: "Getting there", body: venue.transport },
          { Icon: Luggage, title: "Bags", body: venue.bagPolicy },
          { Icon: Accessibility, title: "Accessibility", body: venue.accessibility.join(". ") },
        ].map(({ Icon, title, body }) => (
          <div key={title} className="main-content-box p-4">
            <Icon className="size-5 text-tk-jacaranda" aria-hidden />
            <p className="mt-2 text-sm font-bold">{title}</p>
            <p className="mt-1 text-sm text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
      <h2 className="mb-4 mt-10 text-xl font-bold">What&apos;s on at {venue.name}</h2>
      <EventGrid events={upcoming} emptyText="No upcoming events at this venue." />
    </div>
  );
}
