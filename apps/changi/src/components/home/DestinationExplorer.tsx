import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DestinationCard } from "@/components/shared/DestinationCard";
import { destinations } from "@/data/destinations";

export function DestinationExplorer() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * 460, behavior: "smooth" });
  }

  return (
    <section className="bg-sand-alt py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Fly with Changi"
            title="Explore cities we are flying to today"
            copy="Get inspired for your next trip with curated guides to the destinations Changi connects you to."
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Scroll destinations left"
              className="flex size-11 items-center justify-center rounded-full border border-sand-deep bg-card text-ink hover:bg-sand-deep/40"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Scroll destinations right"
              className="flex size-11 items-center justify-center rounded-full border border-sand-deep bg-card text-ink hover:bg-sand-deep/40"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="scrollbar-none mt-12 flex snap-x gap-5 overflow-x-auto pb-2"
        >
          {destinations.map((destination) => (
            <div key={destination.code + destination.city} className="snap-start">
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
