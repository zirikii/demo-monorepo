import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";

export function DestinationsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(360, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="border-y border-line bg-surface py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-ink-deep sm:text-3xl">
              Explore cities <span className="text-purple">we are flying to</span> today
            </h2>
            <p className="mt-1 text-sm text-ink-soft">Travel inspiration from Now Boarding destinations.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/happenings" className="text-sm font-bold text-purple hover:underline">
              View All
            </Link>
            <button
              type="button"
              aria-label="Previous destinations"
              onClick={() => scrollBy(-1)}
              className="rounded-full border border-line bg-card p-2 hover:bg-sand"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next destinations"
              onClick={() => scrollBy(1)}
              className="rounded-full border border-line bg-card p-2 hover:bg-sand"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {destinations.map((city, idx) => (
            <article
              key={city.id}
              className="w-44 shrink-0 animate-slide-in overflow-hidden rounded-2xl border border-line bg-card shadow-sm sm:w-52"
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              <div className="aspect-square overflow-hidden bg-sand">
                <img src={city.image} alt={city.city} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <h3 className="text-base font-black text-ink-deep">{city.city}</h3>
                <p className="mt-0.5 text-xs text-ink-soft">{city.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
