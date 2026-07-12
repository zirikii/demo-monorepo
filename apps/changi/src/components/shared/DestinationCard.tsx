import { cn } from "@/lib/cn";
import type { Destination } from "@/data/destinations";

/** Compact destination tile for the "cities we fly to" strip. */
export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <div className="group w-52 shrink-0 overflow-hidden rounded-card border border-sand-deep bg-card shadow-card">
      <div className={cn("changi-aurora relative flex h-32 items-end bg-gradient-to-br p-4", destination.tint)}>
        <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold text-plum">
          {destination.code}
        </span>
      </div>
      <div className="p-4">
        <p className="text-base font-semibold text-ink">{destination.city}</p>
        <p className="mt-1 text-sm leading-snug text-ink-soft">{destination.tagline}</p>
      </div>
    </div>
  );
}
