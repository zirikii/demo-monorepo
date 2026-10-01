import { CalendarHeart, Headset, Plus, Sparkles, Trash2 } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { EventCard, EventGrid } from "@/components/events/EventCard";
import { StatusPill } from "@/components/tickets/StatusPill";
import { events, getEvent } from "@/data/events";
import { CATEGORY_LABELS } from "@/data/nav";
import type { CategoryId } from "@/data/types";
import { venues } from "@/data/venues";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useFan } from "@/features/fan/FanProvider";
import { FAN_TIERS, fanTier, GENRE_LABELS, lifetimeEvents, recommend, topGenres } from "@/features/fan/recommendations";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { asset } from "@/lib/asset";
import { toLocalIso } from "@/lib/clock";
import { formatDateTime, formatLongDate, formatMonthYear, pluralise } from "@/lib/format";
import { Panel } from "./AccountLayout";

function genreLabel(genre: string): string {
  return GENRE_LABELS[genre] ?? genre;
}

export function AccountOverviewPage() {
  useDocumentTitle("My Account");
  const { profile, views, orders } = useFan();
  const { open } = useAssistant();
  const upcoming = views.filter((v) => v.status !== "past" && v.status !== "refunded");
  const needsAttention = views.filter((v) => v.status === "cancelled" || v.status === "rescheduled");
  const tier = fanTier(profile);
  const next = FAN_TIERS.slice().reverse().find((t) => t.min > lifetimeEvents(profile));
  const picks = recommend(profile, orders, { limit: 3 });

  return (
    <div className="space-y-6">
      {needsAttention.map((v) => (
        <div key={v.order.id} className="flex flex-wrap items-center gap-3 rounded-tk border border-caution bg-caution-bg px-4 py-3 text-sm">
          <StatusPill status={v.status} />
          <p className="min-w-0 flex-1">
            <strong>{v.event.name}</strong> {v.status === "cancelled" ? "was cancelled." : `moved to ${formatDateTime(v.performance.startsAt)}.`}
          </p>
          <button
            type="button"
            onClick={() => open({ step: "refunds", orderId: v.order.id, label: `What are my options for ${v.event.name}?` })}
            className="btn-outline py-1.5"
          >
            <Headset className="size-4" aria-hidden /> What are my options?
          </button>
        </div>
      ))}

      <Panel title="Upcoming events" action={<Link to="/account/orders" className="link text-sm">All orders</Link>}>
        {upcoming.length === 0 ? (
          <p className="text-ink-soft">No upcoming events. <Link to="/whats-on" className="link">Find something on</Link>.</p>
        ) : (
          <ul className="divide-y divide-line-soft">
            {upcoming.slice(0, 4).map((v) => (
              <li key={v.order.id}>
                <Link to={`/account/orders/${v.order.id}`} className="flex items-center gap-4 py-3 hover:bg-page">
                  <img src={asset(v.event.image)} alt="" className="h-12 w-24 rounded-tk object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{v.event.name}</p>
                    <p className="text-sm text-ink-soft">
                      {formatDateTime(v.performance.startsAt)} · {v.venue.name}
                    </p>
                  </div>
                  <StatusPill status={v.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <div className="grid gap-6 md:grid-cols-2">
        <Panel title="Your fan profile">
          <p className="text-3xl font-extrabold">
            <span className="tk-gradient-text">{tier.label}</span>
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {pluralise(lifetimeEvents(profile), "event")} with Ticketek since {formatMonthYear(profile.memberSince)}
            {next ? ` · ${next.min - lifetimeEvents(profile)} more to ${next.label}` : ""}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {topGenres(profile.attended).map((g) => (
              <span key={g} className="rounded-full bg-tk-blue-tint px-3 py-1 text-xs font-semibold capitalize text-tk-blue">
                {genreLabel(g)}
              </span>
            ))}
          </div>
          <Link to="/account/history" className="link mt-4 inline-block text-sm">
            Events I&apos;ve been to
          </Link>
        </Panel>
        <Panel title="Need a hand?">
          <p className="text-sm text-ink-soft">Ticketek Support knows your orders, so you can skip the order numbers. Chat or talk — it&apos;s the same assistant.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => open()} className="btn-primary">
              Chat with support
            </button>
            <button type="button" onClick={() => open({ mode: "voice" })} className="btn-outline">
              Talk to support
            </button>
          </div>
        </Panel>
      </div>

      {picks.length > 0 && (
        <Panel title="Picked for you">
          <div className="grid gap-4 sm:grid-cols-3">
            {picks.map((r) => (
              <EventCard key={r.event.slug} event={r.event} reason={r.reason} />
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}

const OTHER = "__other";

export function AttendedPage() {
  useDocumentTitle("Events I've Been To");
  const { profile, orders, addAttended, removeAttended } = useFan();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ slug: events[0]?.slug ?? OTHER, name: "", category: "concerts" as CategoryId, venueId: venues[0]?.id ?? "", date: "" });
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<string | null>(null);
  const picks = useMemo(() => recommend(profile, orders, { limit: 4 }), [profile, orders]);
  const today = toLocalIso(new Date()).slice(0, 10);

  const byYear = useMemo(() => {
    const groups = new Map<string, typeof profile.attended>();
    for (const a of profile.attended) groups.set(a.date.slice(0, 4), [...(groups.get(a.date.slice(0, 4)) ?? []), a]);
    return [...groups.entries()];
  }, [profile]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const event = form.slug === OTHER ? undefined : getEvent(form.slug);
    const venue = venues.find((v) => v.id === form.venueId);
    const name = event?.name ?? form.name.trim();
    if (!name) return setError("Tell us what you saw.");
    if (!form.date) return setError("Add the date you went.");
    if (form.date > today) return setError("That date hasn't happened yet — add it after the show.");
    if (!venue) return setError("Choose a venue.");
    addAttended({
      name,
      artistKey: event?.artistKey ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: event?.category ?? form.category,
      genres: event?.genres ?? [],
      venue: venue.name,
      city: venue.city,
      date: form.date,
      image: event?.image,
    });
    setError(null);
    setAdding(false);
    setAdded(name);
  };

  return (
    <div className="space-y-6">
      <Panel
        title="Events I've Been To"
        action={
          <button type="button" onClick={() => setAdding((a) => !a)} className="btn-outline py-1.5" aria-expanded={adding}>
            <Plus className="size-4" aria-hidden /> Add an event
          </button>
        }
      >
        <p className="-mt-2 mb-4 text-sm text-ink-soft">
          Your history shapes recommendations and helps Ticketek Support personalise its answers. {pluralise(profile.archivedEvents, "earlier event")} from before{" "}
          {byYear.at(-1)?.[0] ?? "then"} also count toward your fan tier.
        </p>
        {added && (
          <p role="status" className="mb-4 rounded-tk bg-positive-bg px-4 py-3 text-sm text-positive">
            Added {added}. Your recommendations have been updated.
          </p>
        )}
        {adding && (
          <form onSubmit={submit} className="mb-6 grid gap-3 rounded-tk bg-page p-4 sm:grid-cols-2" aria-label="Add an event you've been to">
            <div className="sm:col-span-2">
              <label htmlFor="att-event" className="mb-1 block text-xs font-semibold">
                Event or artist
              </label>
              <select id="att-event" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="field">
                {events.map((ev) => (
                  <option key={ev.slug} value={ev.slug}>
                    {ev.name}
                  </option>
                ))}
                <option value={OTHER}>Something else…</option>
              </select>
            </div>
            {form.slug === OTHER && (
              <>
                <div>
                  <label htmlFor="att-name" className="mb-1 block text-xs font-semibold">
                    What did you see?
                  </label>
                  <input id="att-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="field" />
                </div>
                <div>
                  <label htmlFor="att-category" className="mb-1 block text-xs font-semibold">
                    Category
                  </label>
                  <select id="att-category" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as CategoryId }))} className="field">
                    {(Object.keys(CATEGORY_LABELS) as CategoryId[]).map((c) => (
                      <option key={c} value={c}>
                        {CATEGORY_LABELS[c]}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div>
              <label htmlFor="att-venue" className="mb-1 block text-xs font-semibold">
                Venue
              </label>
              <select id="att-venue" value={form.venueId} onChange={(e) => setForm((f) => ({ ...f, venueId: e.target.value }))} className="field">
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}, {v.city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="att-date" className="mb-1 block text-xs font-semibold">
                Date
              </label>
              <input id="att-date" type="date" max={today} value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="field" />
            </div>
            {error && <p className="text-sm text-critical sm:col-span-2">{error}</p>}
            <button type="submit" className="btn-primary sm:col-span-2 sm:w-fit">
              Save to my history
            </button>
          </form>
        )}
        {byYear.length === 0 ? (
          <p className="py-6 text-center text-ink-soft">No events yet. Add the shows you&apos;ve been to.</p>
        ) : (
          <div className="space-y-6">
            {byYear.map(([year, list]) => (
              <section key={year} aria-labelledby={`year-${year}`}>
                <h3 id={`year-${year}`} className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-faint">
                  {year}
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {list.map((a) => (
                    <li key={a.id} className="flex items-center gap-3 rounded-tk border border-line-soft p-2.5">
                      {a.image ? (
                        <img src={asset(a.image)} alt="" className="h-12 w-20 rounded-tk object-cover" />
                      ) : (
                        <div className="tk-gradient grid h-12 w-20 place-items-center rounded-tk text-midnight">
                          <CalendarHeart className="size-5" aria-hidden />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{a.name}</p>
                        <p className="truncate text-xs text-ink-soft">
                          {a.venue} · {formatLongDate(a.date)}
                        </p>
                      </div>
                      <button type="button" onClick={() => removeAttended(a.id)} className="grid size-8 place-items-center rounded-full text-ink-faint hover:bg-page hover:text-critical" aria-label={`Remove ${a.name}`}>
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </Panel>
      <Panel title="Because of your history">
        <p className="-mt-2 mb-4 flex items-center gap-2 text-sm text-ink-soft">
          <Sparkles className="size-4 text-tk-jacaranda" aria-hidden /> Top genres: {topGenres(profile.attended).map(genreLabel).join(", ") || "none yet"}
        </p>
        <EventGrid events={picks.map((r) => r.event)} reasons={Object.fromEntries(picks.map((r) => [r.event.slug, r.reason]))} emptyText="Add a few events to get recommendations." />
      </Panel>
    </div>
  );
}

export function FavouritesPage() {
  useDocumentTitle("Favourites");
  const { profile } = useFan();
  const list = profile.favourites.map(getEvent).filter((e) => e !== undefined);
  return (
    <Panel title="Favourites">
      <p className="-mt-2 mb-4 text-sm text-ink-soft">We&apos;ll let you know when new dates are announced for your favourites.</p>
      <EventGrid events={list} emptyText="Tap the heart on any event to save it here." />
    </Panel>
  );
}

export function WaitlistPage() {
  useDocumentTitle("Waitlist");
  const { profile, toggleWaitlist } = useFan();
  const list = profile.waitlist.map(getEvent).filter((e) => e !== undefined);
  return (
    <Panel title="Waitlist">
      <p className="-mt-2 mb-4 text-sm text-ink-soft">If tickets are released for a sold-out event, we&apos;ll email you a link to buy. Joining doesn&apos;t guarantee tickets.</p>
      {list.length === 0 ? (
        <p className="py-6 text-center text-ink-soft">You&apos;re not on any waitlists.</p>
      ) : (
        <ul className="divide-y divide-line-soft">
          {list.map((e) => (
            <li key={e.slug} className="flex items-center gap-4 py-3">
              <img src={asset(e.image)} alt="" className="h-12 w-24 rounded-tk object-cover" />
              <Link to={`/shows/${e.slug}`} className="min-w-0 flex-1 font-semibold hover:underline">
                {e.name}
              </Link>
              <button type="button" onClick={() => toggleWaitlist(e.slug)} className="btn-outline py-1.5">
                Leave waitlist
              </button>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
