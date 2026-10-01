import { AlertTriangle, CalendarDays, Clock, Headset, Info, MapPin, Share2, Smartphone, Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EventBadge, FavouriteButton } from "@/components/events/EventCard";
import { PerformanceStatusPill } from "@/components/events/PerformanceStatus";
import { fromPrice, getEvent } from "@/data/events";
import { CATEGORY_LABELS, REGIONS } from "@/data/nav";
import type { RegionId } from "@/data/types";
import { requireVenue } from "@/data/venues";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useFan } from "@/features/fan/FanProvider";
import { DELIVERY } from "@/features/fan/orders";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useRegion } from "@/hooks/useRegion";
import { asset } from "@/lib/asset";
import { parseLocal } from "@/lib/clock";
import { cn } from "@/lib/cn";
import { performanceInRegion } from "@/lib/eventFilters";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import { NotFoundPage } from "./NotFound";

type Tab = "dates" | "info" | "venue";

export function ShowPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const event = getEvent(slug);
  useDocumentTitle(event ? `${event.name} Tickets` : "Event not found");
  const { region } = useRegion();
  const [tab, setTab] = useState<Tab>("dates");
  const [stateFilter, setStateFilter] = useState<RegionId>(region);
  const { open } = useAssistant();
  const fan = useFan();

  const perfs = useMemo(() => {
    if (!event) return [];
    const now = new Date();
    return event.performances
      .filter((p) => parseLocal(p.startsAt).getTime() > now.getTime() - 6 * 3_600_000 || p.status === "cancelled")
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  }, [event]);

  if (!event) return <NotFoundPage />;
  const statesHere = REGIONS.filter((r) => r.id !== "national" && perfs.some((p) => performanceInRegion(p, r.id)));
  const shown = perfs.filter((p) => performanceInRegion(p, statesHere.some((s) => s.id === stateFilter) ? stateFilter : "national"));
  const venues = [...new Set(perfs.map((p) => p.venueId))].map(requireVenue);
  const owned = fan.signedIn && fan.orders.some((o) => o.eventSlug === event.slug);
  const onWaitlist = fan.profile.waitlist.includes(event.slug);
  const allSoldOut = perfs.length > 0 && perfs.every((p) => p.status === "sold-out" || p.status === "cancelled");

  return (
    <>
      <section className="relative bg-midnight">
        <div className="relative mx-auto aspect-[2340/765] max-h-[380px] min-h-[180px] w-full max-w-[1600px] overflow-hidden">
          <img src={asset(event.banner ?? event.image)} alt="" className={cn("size-full object-cover", !event.banner && "scale-110 blur-sm brightness-75")} />
          {!event.banner && (
            <img src={asset(event.image)} alt="" className="absolute left-1/2 top-1/2 h-[85%] -translate-x-1/2 -translate-y-1/2 rounded-tk object-cover shadow-tk-lift" />
          )}
        </div>
      </section>

      <div className="container-tk relative -mt-8 md:-mt-12">
        <div className="main-content-box p-5 md:p-8">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-ink-soft">
            <Link to="/" className="link">
              Home
            </Link>{" "}
            /{" "}
            <Link to={`/category/${event.category}`} className="link">
              {CATEGORY_LABELS[event.category]}
            </Link>{" "}
            / <span>{event.name}</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              {event.badge && <EventBadge badge={event.badge} className="mb-2" />}
              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{event.name}</h1>
              <p className="mt-1 text-lg text-ink-soft">{event.subtitle}</p>
              <p className="mt-3 text-sm text-ink-soft">
                Presented by {event.promoter}
                {event.ageRestriction ? ` · ${event.ageRestriction}` : ""}
                {fromPrice(event) > 0 ? ` · Tickets from ${formatCurrency(fromPrice(event))}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FavouriteButton slug={event.slug} name={event.name} className="border border-line bg-white shadow-none" />
              <button
                type="button"
                onClick={() => void navigator.clipboard?.writeText(window.location.href)}
                aria-label="Copy link to this event"
                className="grid size-9 place-items-center rounded-full border border-line bg-white text-midnight hover:bg-page"
              >
                <Share2 className="size-4" aria-hidden />
              </button>
            </div>
          </div>
          {owned && (
            <p className="mt-4 flex items-center gap-2 rounded-tk bg-tk-blue-tint px-4 py-3 text-sm text-tk-blue">
              <Ticket className="size-4" aria-hidden /> You have tickets to this event.{" "}
              <Link to="/account/orders" className="font-semibold underline">
                View in My Account
              </Link>
            </p>
          )}

          <div role="tablist" aria-label="Event details" className="mt-6 flex gap-1 border-b border-line">
            {(
              [
                ["dates", "Dates & Tickets"],
                ["info", "Event Info"],
                ["venue", venues.length > 1 ? "Venues" : "Venue"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={tab === id}
                aria-controls={`panel-${id}`}
                id={`tab-${id}`}
                onClick={() => setTab(id)}
                className={cn(
                  "relative px-4 py-3 text-sm font-semibold",
                  tab === id ? "text-midnight after:absolute after:inset-x-2 after:-bottom-px after:h-[3px] after:rounded-full after:bg-tk-pink" : "text-ink-soft hover:text-ink",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "dates" && (
            <div role="tabpanel" id="panel-dates" aria-labelledby="tab-dates" className="pt-5">
              {statesHere.length > 1 && (
                <div role="group" aria-label="Filter by state" className="mb-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed={!statesHere.some((s) => s.id === stateFilter)}
                    onClick={() => setStateFilter("national")}
                    className={cn("rounded-full border px-3 py-1 text-sm", !statesHere.some((s) => s.id === stateFilter) ? "border-midnight bg-midnight text-white" : "border-line")}
                  >
                    All states
                  </button>
                  {statesHere.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={stateFilter === s.id}
                      onClick={() => setStateFilter(s.id)}
                      className={cn("rounded-full border px-3 py-1 text-sm", stateFilter === s.id ? "border-midnight bg-midnight text-white" : "border-line")}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
              {shown.length === 0 && <p className="text-ink-soft">No upcoming dates.</p>}
              <ul className="divide-y divide-line-soft rounded-tk border border-line">
                {shown.map((p) => {
                  const venue = requireVenue(p.venueId);
                  const buyable = p.status === "on-sale" || p.status === "selling-fast" || p.status === "rescheduled";
                  return (
                    <li key={p.id} className="grid gap-3 p-4 md:grid-cols-[150px_1fr_auto] md:items-center">
                      <div>
                        <p className="font-bold">{formatDate(p.startsAt)}</p>
                        <p className="flex items-center gap-1 text-sm text-ink-soft">
                          <Clock className="size-3.5" aria-hidden /> {formatTime(p.startsAt)}
                        </p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1 font-medium">
                          <MapPin className="size-4 text-ink-faint" aria-hidden /> {venue.name}, {venue.city} {venue.stateLabel}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <PerformanceStatusPill status={p.status} />
                          {p.originalStartsAt && <span className="text-xs text-ink-soft">Moved from {formatDate(p.originalStartsAt)}</span>}
                        </div>
                        {p.note && (
                          <p className="mt-2 flex items-start gap-1.5 text-sm text-ink-soft">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-caution" aria-hidden /> {p.note}
                          </p>
                        )}
                      </div>
                      <div className="md:text-right">
                        {buyable ? (
                          <Link to={`/shows/${event.slug}/tickets/${p.id}`} className="btn-tickets w-full md:w-auto">
                            Get Tickets
                          </Link>
                        ) : (
                          <span className="inline-block rounded-tk bg-line-soft px-5 py-2.5 text-sm font-semibold text-ink-soft">
                            {p.status === "cancelled" ? "Cancelled" : "Sold out"}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              {allSoldOut && fan.signedIn && (
                <button type="button" onClick={() => fan.toggleWaitlist(event.slug)} className="btn-outline mt-4">
                  {onWaitlist ? "You're on the waitlist" : "Join the waitlist"}
                </button>
              )}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-tk bg-page p-4">
                  <h2 className="mb-2 flex items-center gap-2 text-sm font-bold">
                    <Ticket className="size-4" aria-hidden /> Prices
                  </h2>
                  <table className="w-full text-sm">
                    <tbody>
                      {event.priceCategories.map((c) => (
                        <tr key={c.id} className="border-b border-line-soft last:border-0">
                          <td className="py-1.5 pr-2">{c.name}</td>
                          <td className="py-1.5 text-right font-semibold">{c.status === "exhausted" ? <span className="text-ink-faint">Sold out</span> : formatCurrency(c.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-2 text-xs text-ink-faint">Prices include GST. A service fee applies per ticket and a $6.95 handling fee per order.</p>
                </div>
                <div className="rounded-tk bg-page p-4">
                  <h2 className="mb-2 flex items-center gap-2 text-sm font-bold">
                    <Smartphone className="size-4" aria-hidden /> Ticket delivery
                  </h2>
                  <ul className="space-y-2 text-sm">
                    {event.delivery.map((d) => (
                      <li key={d}>
                        <span className="font-semibold">{DELIVERY[d].label}</span>
                        <span className="block text-ink-soft">{DELIVERY[d].description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === "info" && (
            <div role="tabpanel" id="panel-info" aria-labelledby="tab-info" className="max-w-3xl space-y-4 pt-5 leading-relaxed">
              <p className="text-lg font-medium">{event.summary}</p>
              {event.description.map((para) => (
                <p key={para} className="text-ink-soft">
                  {para}
                </p>
              ))}
              <div className="flex items-start gap-2 rounded-tk bg-tk-blue-tint p-4 text-sm text-tk-blue">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
                <p>
                  Only buy tickets from Ticketek or Ticketek Marketplace. Tickets from unauthorised resellers may be cancelled or refused entry. See our{" "}
                  <Link to="/help/article/purchase-policy" className="font-semibold underline">
                    Purchase Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}

          {tab === "venue" && (
            <div role="tabpanel" id="panel-venue" aria-labelledby="tab-venue" className="grid gap-4 pt-5 md:grid-cols-2">
              {venues.map((v) => (
                <div key={v.id} className="rounded-tk border border-line p-4">
                  <Link to={`/venues/${v.id}`} className="text-lg font-bold text-tk-blue hover:underline">
                    {v.name}
                  </Link>
                  <p className="text-sm text-ink-soft">{v.address}</p>
                  <p className="mt-3 text-sm">
                    <span className="font-semibold">Getting there: </span>
                    {v.transport}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold">Bags: </span>
                    {v.bagPolicy}
                  </p>
                  <ul className="mt-2 list-inside list-disc text-sm text-ink-soft">
                    {v.accessibility.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 rounded-tk bg-midnight p-5 text-white md:flex-row md:items-center">
          <CalendarDays className="size-6 text-tk-pink" aria-hidden />
          <p className="flex-1 text-sm">
            Questions about this event, accessible seating or your tickets? Ticketek Support can help straight away.
          </p>
          <button type="button" onClick={() => open()} className="btn-tickets">
            <Headset className="size-4" aria-hidden /> Ask Ticketek Support
          </button>
        </div>
      </div>
    </>
  );
}
