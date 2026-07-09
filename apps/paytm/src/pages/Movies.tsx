import { useState } from "react";
import { Star, MapPin } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { SuccessModal } from "../components/shared/SuccessModal";
import { useDisclosure } from "../hooks/useDisclosure";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { nowShowing, liveEvents, movieCities, type Movie } from "../data/entertainment";
import { formatInr, formatDate } from "../lib/format";

const infoSections = [
  {
    heading: "Movie nights without the box-office line",
    paragraphs: [
      "Pick a film, choose seats on a live layout, and walk in with a QR ticket. Language and format filters (2D, 3D, IMAX) keep big releases easy to find, and offers apply automatically at checkout.",
      "Beyond cinema, the same tickets flow covers concerts, standup, plays, and conferences in your city — one history, one wallet, zero printouts.",
    ],
  },
];

export function MoviesPage() {
  useDocumentTitle("Movie Tickets & Events");
  const [city, setCity] = useState(movieCities[0]);
  const [picked, setPicked] = useState<Movie | null>(null);
  const success = useDisclosure();

  return (
    <PageLayout withCategoryStrip>
      <PageHero
        title={
          <>
            Movies, events &amp; <span className="text-paytm-cyan">endless entertainment</span>
          </>
        }
        subtitle="Now-showing films and live events in your city — seat selection, QR entry, and instant refunds on cancellations."
      >
        <label className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-card">
          <MapPin aria-hidden="true" className="h-4 w-4 text-paytm-cyan" />
          <span className="text-xs font-semibold text-ink-soft">City</span>
          <select
            aria-label="Choose city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-transparent text-sm font-bold text-paytm-navy outline-none"
          >
            {movieCities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </PageHero>

      <section aria-label="Now showing" className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Now Showing in {city}</h2>
        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {nowShowing.map((movie) => (
            <li key={movie.id}>
              <button
                type="button"
                onClick={() => {
                  setPicked(movie);
                  success.open();
                }}
                className="group w-full overflow-hidden rounded-2xl bg-card text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-float"
              >
                <div
                  aria-hidden="true"
                  style={{ backgroundImage: `linear-gradient(150deg, ${movie.poster.from}, ${movie.poster.to})` }}
                  className="flex h-44 items-end p-3"
                >
                  <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white">
                    {movie.certificate}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="truncate text-sm font-bold text-ink group-hover:text-paytm-cyan">
                    {movie.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {movie.language} · {movie.genre}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-ink">
                    <Star aria-hidden="true" className="h-3.5 w-3.5 fill-warning text-warning" />
                    {movie.rating}/10
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section id="events" aria-label="Live events" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Live Events</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveEvents.map((ev) => (
            <li key={ev.id} className="flex flex-col rounded-2xl bg-card p-5 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <Badge tone="cyan">{ev.kind}</Badge>
                <span className="text-xs text-ink-faint">{formatDate(ev.date)}</span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-ink">{ev.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{ev.city}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-sm font-extrabold text-paytm-navy">
                  from {formatInr(ev.priceFrom)}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setPicked(null);
                    success.open();
                  }}
                >
                  Get Tickets
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="pt-12">
        <SeoTextBlock sections={infoSections} />
      </div>

      <SuccessModal
        open={success.isOpen}
        onClose={success.close}
        title="Tickets Reserved"
        lines={
          picked
            ? [
                { label: "Movie", value: picked.title },
                { label: "City", value: city },
                { label: "Seats (sample)", value: "G12, G13" },
                { label: "Amount (sample)", value: formatInr(560) },
              ]
            : [
                { label: "Event", value: "Live event" },
                { label: "City", value: city },
                { label: "Tickets (sample)", value: "2 × General" },
              ]
        }
      />
    </PageLayout>
  );
}
