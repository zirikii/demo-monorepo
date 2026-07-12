import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import type { Outlet } from "@/data/dine";

/** Directory card for a dining or retail outlet. */
export function OutletCard({ outlet }: { outlet: Outlet }) {
  return (
    <Link
      to={`/dine-and-shop/${outlet.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-sand-deep bg-card shadow-card transition-shadow hover:shadow-float"
    >
      <div className={cn("changi-aurora relative flex h-32 items-start justify-between bg-gradient-to-br p-4", outlet.tint)}>
        <Badge tint={outlet.category === "dine" ? "amber" : "purple"} className="capitalize">
          {outlet.category}
        </Badge>
        <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold text-plum">
          {outlet.terminal}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-ink group-hover:text-magenta">{outlet.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-ink-faint">{outlet.kind}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{outlet.blurb}</p>
        <div className="mt-4 space-y-1.5 text-xs text-ink-soft">
          <p className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-magenta" aria-hidden />
            {outlet.location}
          </p>
          <p className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-magenta" aria-hidden />
            {outlet.hours}
          </p>
        </div>
      </div>
    </Link>
  );
}
