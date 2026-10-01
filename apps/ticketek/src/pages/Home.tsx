import { ArrowRight, Gift, Headset, Sparkles, Ticket } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { EventGrid, SectionHeading } from "@/components/events/EventCard";
import { HeroCarousel } from "@/components/events/HeroCarousel";
import { events, getEvent } from "@/data/events";
import { CATEGORY_LABELS, regionLabel } from "@/data/nav";
import type { CategoryId } from "@/data/types";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useFan } from "@/features/fan/FanProvider";
import { DELIVERY } from "@/features/fan/orders";
import { fanTier, lifetimeEvents, recommend } from "@/features/fan/recommendations";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useRegion } from "@/hooks/useRegion";
import { asset } from "@/lib/asset";
import { filterEvents } from "@/lib/eventFilters";
import { formatDateTime } from "@/lib/format";

const DISCOVER: { id: CategoryId; image: string }[] = [
  { id: "concerts", image: "brand/events/laneway-festival-tile.webp" },
  { id: "sports", image: "brand/events/nbl-ignite-cup-tile.webp" },
  { id: "theatre", image: "brand/events/mrs-doubtfire-tile.webp" },
  { id: "family", image: "brand/events/monster-truck-mania-tile.webp" },
  { id: "comedy", image: "brand/events/kevin-bloody-wilson-tile.webp" },
];

function WelcomeStrip() {
  const fan = useFan();
  const { open } = useAssistant();
  const next = fan.views.find((v) => v.status === "event-soon" || v.status === "upcoming" || v.status === "rescheduled");
  const cancelled = fan.views.find((v) => v.status === "cancelled");
  const tier = fanTier(fan.profile);
  return (
    <section aria-label="Your Ticketek" className="container-tk -mt-6 relative z-10 md:-mt-10">
      <div className="main-content-box grid gap-4 overflow-hidden p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
        <div className="flex items-start gap-4">
          <div className="tk-gradient grid size-12 shrink-0 place-items-center rounded-full text-lg font-extrabold text-midnight">
            {fan.profile.firstName.charAt(0)}
          </div>
          <div>
            <p className="text-lg font-bold">Welcome back, {fan.profile.firstName}</p>
            <p className="text-sm text-ink-soft">
              {tier.label} · {lifetimeEvents(fan.profile)} events with Ticketek since {fan.profile.memberSince.slice(0, 4)}
            </p>
            {next && (
              <p className="mt-2 text-sm">
                <Ticket className="mr-1 inline size-4 text-tk-jacaranda" aria-hidden />
                Next up: <span className="font-semibold">{next.event.name}</span>, {formatDateTime(next.performance.startsAt)} at {next.venue.name} ·{" "}
                {DELIVERY[next.order.delivery].short}
              </p>
            )}
            {cancelled && (
              <p className="mt-1 text-sm text-critical">
                {cancelled.event.name} was cancelled — your refund is being processed automatically.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/account/orders" className="btn-outline">
            My tickets
          </Link>
          <button type="button" onClick={() => open()} className="btn-primary">
            <Headset className="size-4" aria-hidden />
            Get help
          </button>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  useDocumentTitle("Tickets for Concerts, Sport, Theatre & More");
  const { region } = useRegion();
  const fan = useFan();
  const heroes = useMemo(() => events.filter((e) => e.hero), []);
  const featured = useMemo(() => filterEvents({ flag: "featured", region }).slice(0, 8), [region]);
  const lastMinute = useMemo(() => filterEvents({ flag: "last-minute", region }).slice(0, 4), [region]);
  const recs = useMemo(
    () => (fan.signedIn ? recommend(fan.profile, fan.orders, { limit: 4, region: region === "national" ? fan.profile.homeRegion : region }) : []),
    [fan.signedIn, fan.profile, fan.orders, region],
  );
  const waitlist = fan.signedIn ? fan.profile.waitlist.map(getEvent).filter((e) => e !== undefined) : [];
  const { open } = useAssistant();

  return (
    <>
      <HeroCarousel slides={heroes} />
      {fan.signedIn && <WelcomeStrip />}

      <div className="container-tk mt-10 space-y-12">
        {recs.length > 0 && (
          <section aria-labelledby="for-you">
            <div id="for-you">
              <SectionHeading eyebrow="Picked for you" title={`New for you, ${fan.profile.firstName}`} action={{ label: "See all events", to: "/whats-on" }} />
            </div>
            <EventGrid events={recs.map((r) => r.event)} reasons={Object.fromEntries(recs.map((r) => [r.event.slug, r.reason]))} />
          </section>
        )}

        <section aria-label="Featured events">
          <SectionHeading title={region === "national" ? "Featured Events" : `Featured in ${regionLabel(region)}`} action={{ label: "View all", to: "/whats-on" }} />
          <EventGrid events={featured} emptyText="No featured events in this region right now." />
        </section>

        <section aria-label="Discover">
          <SectionHeading title="Discover" />
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {DISCOVER.map((d) => (
              <li key={d.id}>
                <Link to={`/category/${d.id}`} className="group relative block aspect-[4/3] overflow-hidden rounded-tk bg-midnight shadow-tk">
                  <img src={asset(d.image)} alt="" loading="lazy" className="size-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-midnight/85 to-transparent" />
                  <span className="absolute bottom-3 left-3 flex items-center gap-1 text-base font-bold text-white">
                    {CATEGORY_LABELS[d.id]}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {waitlist.length > 0 && (
          <section aria-label="Your waitlist">
            <SectionHeading eyebrow="Waitlist" title="We'll tell you if tickets come up" action={{ label: "Manage", to: "/account/waitlist" }} />
            <EventGrid events={waitlist} />
          </section>
        )}

        <section aria-label="Last minute">
          <SectionHeading eyebrow="Don't miss out" title="Last Minute" action={{ label: "View all", to: "/whats-on?filter=last-minute" }} />
          <EventGrid events={lastMinute} emptyText="Nothing last-minute in this region." />
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Link to="/gift-vouchers" className="group relative flex min-h-44 items-end overflow-hidden rounded-tk bg-midnight p-6 text-white shadow-tk">
            <img src={asset("brand/events/gift-voucher-banner.webp")} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-r from-midnight/85 to-transparent" />
            <span className="relative">
              <Gift className="mb-2 size-6 text-tk-pink" aria-hidden />
              <span className="block text-xl font-bold">Give the gift of live</span>
              <span className="block text-sm text-white/80">Ticketek Gift Vouchers for any event, valid for three years.</span>
            </span>
          </Link>
          <div className="relative flex min-h-44 flex-col justify-end overflow-hidden rounded-tk bg-midnight p-6 text-white shadow-tk">
            <div className="tk-gradient absolute -right-16 -top-16 size-56 rounded-full opacity-40 blur-2xl" aria-hidden />
            <Sparkles className="relative mb-2 size-6 text-tk-pink" aria-hidden />
            <p className="relative text-xl font-bold">Questions about your tickets?</p>
            <p className="relative text-sm text-white/80">Ticketek Support can find your order, sort refunds and transfers, and talk you through it by voice.</p>
            <div className="relative mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => open()} className="btn-tickets">
                Chat with us
              </button>
              <button type="button" onClick={() => open({ mode: "voice" })} className="inline-flex items-center gap-2 rounded-tk border border-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                Talk to us
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
