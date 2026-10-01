import { AlertTriangle, ArrowRight, CalendarDays, Receipt, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { forecast, nextEvent, PACE_LABELS } from "@/features/property/insights";
import { useProperty } from "@/features/property/PropertyProvider";
import {
  BOOKING_STATUS_LABELS,
  bookingNeedsAction,
  CHANNEL_STATUS_LABELS,
  channelById,
  channelIssue,
  daysUntil,
  invoiceTotal,
  invoiceUnpaid,
  relativeDays,
} from "@/features/property/views";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatCurrency, formatDateTime, formatShortDate } from "@/lib/format";
import { AskSupport, ChannelBadge, PageTitle, Panel, Stat } from "./ui";

type Alert = { id: string; icon: typeof AlertTriangle; title: string; detail: string; action: ReactNode };

export function DashboardPage() {
  useDocumentTitle("Dashboard");
  const store = useProperty();
  const now = new Date();
  const { channels, bookings, invoices, events, profile } = store;

  const revenue = channels.reduce((n, c) => n + c.revenue30d, 0);
  const count = channels.reduce((n, c) => n + c.bookings30d, 0);
  const directShare = Math.round(((channels.find((c) => c.id === "direct")?.revenue30d ?? 0) / Math.max(1, revenue)) * 100);
  const live = bookings.filter((b) => b.status !== "cancelled");
  const adr = Math.round(live.reduce((n, b) => n + b.total, 0) / Math.max(1, live.reduce((n, b) => n + b.nights, 0)));
  const event = nextEvent(events, now);
  const plan = event ? forecast(event, events, now) : null;
  const pricing = event?.plan ?? plan;

  const alerts: Alert[] = [
    ...bookings.filter(bookingNeedsAction).map((b) => ({
      id: b.id,
      icon: AlertTriangle,
      title: `${BOOKING_STATUS_LABELS[b.status]}: ${b.guest}`,
      detail: `${b.id} · ${b.room} · arriving ${relativeDays(daysUntil(b.checkIn, now))} via ${channelById(store, b.channelId)?.name ?? b.channelId}`,
      action: <AskSupport step="reservations" recordId={b.id} label={`Help with booking ${b.id}`} />,
    })),
    ...channels.filter(channelIssue).map((c) => ({
      id: c.id,
      icon: AlertTriangle,
      title: `${c.name}: ${CHANNEL_STATUS_LABELS[c.status]}`,
      detail: c.issueRoom ? `${c.issueRoom} isn't mapped, so it isn't selling on ${c.name}` : `Last synced ${formatDateTime(c.lastSync)}`,
      action: <AskSupport step="channels" recordId={c.id} label={`Fix ${c.name}`} />,
    })),
    ...(event && !event.plan
      ? [
          {
            id: event.id,
            icon: CalendarDays,
            title: `${event.name} ${relativeDays(daysUntil(event.start, now))}`,
            detail: `${event.onBooksPct ?? 0}% on the books · ${plan ? PACE_LABELS[plan.pace] : ""} · no event pricing yet`,
            action: <AskSupport step="events" recordId={event.id} label={`Plan for ${event.name}`} />,
          },
        ]
      : []),
    ...invoices.filter(invoiceUnpaid).map((i) => ({
      id: i.id,
      icon: Receipt,
      title: `Invoice ${i.id} due ${relativeDays(daysUntil(i.due, now))}`,
      detail: `${formatCurrency(invoiceTotal(i))} for ${i.period}`,
      action: <AskSupport step="billing.pay" recordId={i.id} label={`Pay invoice ${i.id}`} />,
    })),
  ];

  const arrivals = bookings
    .filter((b) => b.status !== "cancelled" && daysUntil(b.checkIn, now) >= 0 && daysUntil(b.checkIn, now) <= 2)
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn));

  return (
    <div className="mx-auto max-w-6xl">
      <PageTitle title={`Good ${now.getHours() < 12 ? "morning" : now.getHours() < 18 ? "afternoon" : "evening"}, ${profile.firstName}`} body={`Here's how ${store.property.name} is tracking.`} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Revenue · last 30 days" value={formatCurrency(revenue)} hint="+12.4% vs previous 30 days" tone="positive" />
        <Stat label="Bookings · last 30 days" value={count.toLocaleString("en-AU")} hint="Across 9 channels" />
        <Stat label="Average daily rate" value={formatCurrency(adr)} hint="On the books" />
        <Stat label="Direct revenue share" value={`${directShare}%`} hint="Commission-free via Booking Engine" tone="positive" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Needs your attention" action={<span className="text-sm text-ink-faint">{alerts.length} items</span>}>
          {alerts.length === 0 ? (
            <p className="text-sm text-ink-soft">Everything&apos;s running smoothly.</p>
          ) : (
            <ul className="divide-y divide-line-soft">
              {alerts.map((a) => (
                <li key={a.id} className="flex flex-wrap items-center gap-3 py-3">
                  <a.icon className="size-5 shrink-0 text-caution" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-heading">{a.title}</p>
                    <p className="text-sm text-ink-soft">{a.detail}</p>
                  </div>
                  {a.action}
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {event && plan && pricing ? (
          <section className="sm-night relative overflow-hidden rounded-card p-6 text-white">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-lime">
              <Sparkles className="size-4" aria-hidden /> Next demand event
            </p>
            <h2 className="mt-3 text-xl font-bold text-white">{event.name}</h2>
            <p className="text-sm text-white/70">
              {formatShortDate(event.start)} · {event.venue}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                ["On the books", `${event.onBooksPct ?? 0}%`],
                [event.plan ? "Live" : "Suggested", `+${pricing.upliftPct}%`],
                ["Min stay", `${pricing.minStay} night${pricing.minStay > 1 ? "s" : ""}`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-white/10 px-2 py-3">
                  <p className="text-lg font-bold">{v}</p>
                  <p className="text-[11px] text-white/60">{k}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-white/80">{plan.advice}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <AskSupport step="events" recordId={event.id} label={`Plan for ${event.name}`} className="rounded-full bg-lime px-4 py-2 text-stratos hover:no-underline">
                Plan with Support
              </AskSupport>
              <Link to="/app/events" className="inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white">
                All events <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </section>
        ) : (
          <Panel title="Demand events">
            <p className="text-sm text-ink-soft">No upcoming events. Add one from Demand events.</p>
          </Panel>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Channel performance" action={<Link to="/app/channels" className="link text-sm">View all</Link>}>
          <ul className="space-y-3">
            {[...channels]
              .sort((a, b) => b.revenue30d - a.revenue30d)
              .slice(0, 6)
              .map((c) => (
                <li key={c.id} className="flex items-center gap-3">
                  <span className="w-40 truncate text-sm font-medium text-heading">{c.name}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-canvas">
                    <span className="block h-full rounded-full bg-royal" style={{ width: `${(c.revenue30d / revenue) * 100}%` }} />
                  </span>
                  <span className="w-24 text-right text-sm tabular-nums text-ink-soft">{formatCurrency(c.revenue30d)}</span>
                  <span className="hidden w-32 sm:block">
                    <ChannelBadge status={c.status} />
                  </span>
                </li>
              ))}
          </ul>
        </Panel>
        <Panel title="Arrivals · next 48 hours" action={<Link to="/app/reservations" className="link text-sm">Reservations</Link>}>
          <ul className="divide-y divide-line-soft text-sm">
            {arrivals.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3 py-2.5">
                <span>
                  <span className="block font-medium text-heading">{b.guest}</span>
                  <span className="text-ink-faint">
                    {b.room} · {b.nights} night{b.nights > 1 ? "s" : ""} · {channelById(store, b.channelId)?.name}
                  </span>
                </span>
                <span className="text-right text-ink-soft">{relativeDays(daysUntil(b.checkIn, now))}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
