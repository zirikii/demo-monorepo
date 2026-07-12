import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Promo } from "@/data/promos";

/** "What's Happening" style promo card with a gradient art panel. */
export function PromoCard({ promo }: { promo: Promo }) {
  return (
    <Link
      to={promo.to}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-sand-deep bg-card shadow-card transition-shadow hover:shadow-float"
    >
      <div className={cn("changi-aurora relative h-40 bg-gradient-to-br", promo.tint)}>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-plum">
          {promo.eyebrow}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-ink">{promo.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{promo.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-magenta group-hover:underline">
          Find out more
          <ArrowRight className="size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
