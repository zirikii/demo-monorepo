import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { fromPrice } from "@/data/events";
import type { EventItem } from "@/data/types";
import { useFan } from "@/features/fan/FanProvider";
import { useRegion } from "@/hooks/useRegion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { matchingPerformances, venueSummary } from "@/lib/eventFilters";
import { formatCurrency, formatRange } from "@/lib/format";

export function EventBadge({ badge, className }: { badge: NonNullable<EventItem["badge"]>; className?: string }) {
  const tone =
    badge === "Selling fast" || badge === "Last tickets"
      ? "bg-tk-yellow text-midnight"
      : badge === "Presale"
        ? "bg-tk-jacaranda text-white"
        : "tk-gradient text-midnight";
  return <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide", tone, className)}>{badge}</span>;
}

export function FavouriteButton({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const { profile, toggleFavourite, signedIn } = useFan();
  if (!signedIn) return null;
  const on = profile.favourites.includes(slug);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggleFavourite(slug);
      }}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
      className={cn("grid size-9 place-items-center rounded-full bg-white/90 text-midnight shadow-tk backdrop-blur hover:bg-white", className)}
    >
      <Heart className={cn("size-4", on && "fill-tk-pink text-tk-pink")} aria-hidden />
    </button>
  );
}

type EventCardProps = { event: EventItem; reason?: string; className?: string };

export function EventCard({ event, reason, className }: EventCardProps) {
  const { region } = useRegion();
  const perfs = matchingPerformances(event, { region });
  const shown = perfs.length ? perfs : matchingPerformances(event, {});
  const price = fromPrice(event);
  return (
    <Link
      to={`/shows/${event.slug}`}
      className={cn("group flex flex-col overflow-hidden rounded-tk bg-surface shadow-tk transition-shadow hover:shadow-tk-lift focus-visible:shadow-tk-lift", className)}
    >
      <div className="relative aspect-[105/52] overflow-hidden bg-midnight">
        <img
          src={asset(event.image)}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {event.badge && <EventBadge badge={event.badge} className="absolute left-2.5 top-2.5" />}
        <FavouriteButton slug={event.slug} name={event.name} className="absolute right-2.5 top-2.5" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        {reason && <p className="mb-1.5 text-xs font-semibold text-tk-jacaranda">{reason}</p>}
        <h3 className="text-base font-bold leading-snug text-ink group-hover:text-tk-blue">{event.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-ink-soft">{event.subtitle}</p>
        <div className="mt-auto pt-3 text-sm text-ink-soft">
          <p className="font-medium text-ink">{shown.length ? formatRange(shown.map((p) => p.startsAt)) : "Dates to be announced"}</p>
          <p className="line-clamp-1">{venueSummary(event, region)}</p>
          {price > 0 && <p className="mt-1 text-xs text-ink-faint">From {formatCurrency(price)}</p>}
        </div>
      </div>
    </Link>
  );
}

export function EventGrid({ events, reasons, emptyText = "No events match." }: { events: EventItem[]; reasons?: Record<string, string>; emptyText?: string }) {
  if (events.length === 0) return <p className="main-content-box p-8 text-center text-ink-soft">{emptyText}</p>;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((e) => (
        <li key={e.slug} className="flex">
          <EventCard event={e} reason={reasons?.[e.slug]} className="w-full" />
        </li>
      ))}
    </ul>
  );
}

export function SectionHeading({ title, action, eyebrow }: { title: string; eyebrow?: string; action?: { label: string; to: string } }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-xs font-bold uppercase tracking-wider text-tk-jacaranda">{eyebrow}</p>}
        <h2 className="text-xl font-bold text-ink md:text-2xl">{title}</h2>
      </div>
      {action && (
        <Link to={action.to} className="link shrink-0 text-sm">
          {action.label}
        </Link>
      )}
    </div>
  );
}
