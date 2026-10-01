import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { EventItem } from "@/data/types";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { venueSummary } from "@/lib/eventFilters";
import { formatRange } from "@/lib/format";

const ROTATE_MS = 6000;

export function HeroCarousel({ slides }: { slides: EventItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  if (count === 0) return null;
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section aria-roledescription="carousel" aria-label="Featured events" className="relative overflow-hidden bg-midnight">
      <div className="relative mx-auto aspect-[2340/765] max-h-[460px] w-full max-w-[1600px] min-h-[220px]">
        {slides.map((event, i) => (
          <div
            key={event.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${event.name}`}
            aria-hidden={i !== index}
            className={cn("absolute inset-0 transition-opacity duration-700", i === index ? "opacity-100" : "pointer-events-none opacity-0")}
          >
            <Link to={`/shows/${event.slug}`} tabIndex={i === index ? 0 : -1} className="block size-full">
              <img src={asset(event.banner ?? event.image)} alt="" className="size-full object-cover" fetchPriority={i === 0 ? "high" : "auto"} />
              <span className="sr-only">
                {event.name}: {formatRange(event.performances.map((p) => p.startsAt))}, {venueSummary(event)}. Get tickets
              </span>
            </Link>
          </div>
        ))}
      </div>
      {count > 1 && (
        <div className="container-tk absolute inset-x-0 bottom-3 flex items-center justify-end gap-2 md:bottom-5">
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="grid size-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30">
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <div className="flex items-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}: ${s.name}`}
                aria-current={i === index}
                className={cn("h-2 rounded-full transition-all", i === index ? "w-6 bg-tk-pink" : "w-2 bg-white/50 hover:bg-white")}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next slide" className="grid size-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30">
            <ChevronRight className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play carousel" : "Pause carousel"}
            className="grid size-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30"
          >
            {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
          </button>
        </div>
      )}
    </section>
  );
}
