import { forecast, insightLines, eventsLine, nextEvent, PACE_LABELS, pastEvents, upcomingEvents } from "@/features/property/insights";
import type { Booking, Channel, DemandEvent, Invoice, PropertyState } from "@/features/property/types";
import {
  BOOKING_STATUS_LABELS,
  bookingNeedsAction,
  CHANNEL_STATUS_LABELS,
  channelById,
  channelIssue,
  daysUntil,
  invoiceTotal,
  invoiceUnpaid,
  parityRows,
  PLANS,
  relativeDays,
} from "@/features/property/views";
import { toLocalIso } from "@/lib/clock";
import { formatCurrency, formatDateTime, formatMonthYear, formatShortDate, pluralise } from "@/lib/format";
import type { RecordFilter, RecordKind, RecordPick, TemplateValues } from "../flows";

/** Safe fallbacks so a step reached without its record still reads naturally. */
const RECORD_DEFAULTS: TemplateValues = {
  channelName: "the channel",
  channelStatusLabel: "unknown",
  channelLastSync: "recently",
  channelIssueRoom: "a room type",
  bookingId: "the booking",
  bookingGuest: "the guest",
  bookingRoom: "the room",
  bookingChannel: "the channel",
  bookingCheckIn: "the arrival date",
  bookingNights: "the stay",
  bookingTotal: "the booking total",
  bookingChange: "the stay changed",
  invoiceId: "your invoice",
  invoicePeriod: "This month",
  invoiceTotal: "the invoice amount",
  invoiceDue: "the due date",
  invoiceDelta: "about the same as",
  invoiceExtendedDue: "14 days later",
  instalmentAmount: "a third of the total",
  receipt: "on its way",
  eventName: "the event",
  eventVenue: "the venue",
  eventDaysOut: "coming up",
  eventOnBooks: "partly",
  eventUplift: "20%",
  eventUpliftValue: "20",
  eventMinStay: "1-night",
  eventMinStayValue: "1",
  eventAdvice: "",
  eventReadyLine: "Your channels look ready for the event.",
  historyName: "that event",
  historyDate: "",
  historyOccupancy: "high",
  historyAdr: "a strong rate",
  historyUplift: "on a normal night",
  historySoldOut: "",
  historyNote: "",
};

export type AssistantProperty = { state: PropertyState; signedIn: boolean };

export type PersonalisationOptions = { personalGreeting: boolean; insights: boolean; now?: Date };

export const RECORD_KIND: Record<RecordFilter, RecordKind> = {
  "channels-all": "channel",
  "channels-issues": "channel",
  "bookings-issues": "booking",
  "bookings-upcoming": "booking",
  "invoices-unpaid": "invoice",
  "invoices-all": "invoice",
  "events-upcoming": "event",
  "events-past": "history",
};

function syncLabel(iso: string, now: Date): string {
  const hours = (now.getTime() - new Date(iso).getTime()) / 3_600_000;
  if (hours < 1) return "a few minutes ago";
  if (hours < 24) return `${Math.round(hours)} hours ago`;
  return formatDateTime(iso);
}

function stableNumber(text: string, digits: number): string {
  let hash = 7;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return String(hash % 10 ** digits).padStart(digits, "0");
}

export function cardLabel(state: PropertyState): string {
  return `${state.property.card.brand} ending ${state.property.card.last4}`;
}

function issueChannels(state: PropertyState): Channel[] {
  return state.channels.filter(channelIssue);
}

function nameList(names: string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export function channelIssueLine(state: PropertyState): string {
  const issues = issueChannels(state);
  if (!issues.length) return "All of them are connected and syncing.";
  return `${nameList(issues.map((c) => c.name))} ${issues.length === 1 ? "needs" : "need"} attention.`;
}

export function welcomeLine(property: AssistantProperty, opts: PersonalisationOptions): string {
  if (!property.signedIn) return "Log in and I can look at your channels and bookings too.";
  if (!opts.personalGreeting) return "";
  const now = opts.now ?? new Date();
  const { state } = property;
  const parts: string[] = [];
  const event = nextEvent(state.events, now);
  const issues = issueChannels(state);
  if (event && daysUntil(event.start, now) <= 14) {
    const when = relativeDays(daysUntil(event.start, now));
    parts.push(
      issues.length
        ? `${event.name} is ${when} and you're ${event.onBooksPct ?? 0}% booked, but ${nameList(issues.map((c) => c.name))} ${issues.length === 1 ? "isn't" : "aren't"} receiving rates.`
        : `${event.name} is ${when} and you're ${event.onBooksPct ?? 0}% booked.`,
    );
  } else if (issues.length) {
    parts.push(`${channelIssueLine(state)}`);
  }
  if (state.bookings.some((b) => b.status === "overbooked")) parts.push("I can also see an overbooking flagged for tonight.");
  return parts.join(" ");
}

function directShare(state: PropertyState): string {
  const total = state.channels.reduce((n, c) => n + c.bookings30d, 0);
  const direct = state.channels.filter((c) => c.kind === "direct").reduce((n, c) => n + c.bookings30d, 0);
  return total ? `${Math.round((direct / total) * 100)}%` : "0%";
}

function parityLine(state: PropertyState): string {
  const { room, rows } = parityRows(state);
  const cheaper = rows.filter((r) => r.diffPct < 0);
  const direct = rows.find((r) => r.channelId === "direct");
  const base = `${room} is ${formatCurrency(direct?.rate ?? 0)} on your Booking Engine`;
  if (!cheaper.length) return `${base}, and every channel matches it.`;
  return `${base}. ${nameList(cheaper.map((r) => `${r.name} shows ${formatCurrency(r.rate)} (${r.note ?? `${r.diffPct}%`})`))}.`;
}

export function buildContext(property: AssistantProperty, opts: PersonalisationOptions): TemplateValues {
  const { state, signedIn } = property;
  const plan = PLANS[state.property.plan];
  return {
    ...RECORD_DEFAULTS,
    firstName: signedIn ? state.profile.firstName : "there",
    email: signedIn ? state.profile.email : "your email",
    mobile: state.profile.mobile,
    phone: signedIn ? state.profile.mobile : "",
    today: toLocalIso(opts.now ?? new Date()).slice(0, 10),
    growthInterest: "Not sure yet",
    propertyName: signedIn ? state.property.name : "your property",
    propertyCity: state.property.city,
    rooms: String(state.property.rooms),
    planName: plan.name,
    cardLabel: cardLabel(state),
    supportCode: signedIn ? state.property.supportCode : "from Help in the platform",
    billingEmail: state.property.billingEmail,
    billingAbn: state.property.abn,
    pms: state.property.pms,
    creditAmount: formatCurrency(state.property.credit),
    directShare: directShare(state),
    parityLine: parityLine(state),
    welcomeLine: welcomeLine(property, opts),
    insightsLine: opts.insights ? insightLines(state.events).join(" ") : "Here's how your past events performed.",
    eventsLine: eventsLine(state.events),
    channelIssueLine: signedIn ? channelIssueLine(state) : "",
    statusLine: "All SiteMinder systems are operational right now — the channel manager, booking engine and payments are running normally.",
    handoffTeam: "Customer Support team",
    handoffLine: "A specialist will pick this up shortly, and I've passed on everything we've covered.",
    phoneHours: "24 hours a day, 7 days a week",
  };
}

export function channelFacts(c: Channel, now: Date): TemplateValues {
  return {
    channelId: c.id,
    channelSelected: "yes",
    channelName: c.name,
    channelStatus: c.status,
    channelStatusLabel: CHANNEL_STATUS_LABELS[c.status],
    channelLastSync: syncLabel(c.lastSync, now),
    channelIssueRoom: c.issueRoom ?? "a room type",
  };
}

export function bookingFacts(b: Booking, state: PropertyState): TemplateValues {
  return {
    bookingId: b.id,
    bookingSelected: "yes",
    bookingGuest: b.guest,
    bookingRoom: b.room,
    bookingChannel: channelById(state, b.channelId)?.name ?? "a channel",
    bookingCheckIn: formatShortDate(b.checkIn),
    bookingNights: pluralise(b.nights, "night"),
    bookingTotal: formatCurrency(b.total),
    bookingStatus: b.status,
    bookingStatusLabel: BOOKING_STATUS_LABELS[b.status],
    bookingChange: b.change ?? "the stay was updated",
  };
}

export function invoiceFacts(inv: Invoice, state: PropertyState): TemplateValues {
  const total = invoiceTotal(inv);
  const index = state.invoices.findIndex((i) => i.id === inv.id);
  const previous = state.invoices[index + 1];
  const prevTotal = previous ? invoiceTotal(previous) : total;
  const diff = total - prevTotal;
  const pct = prevTotal ? Math.round((diff / prevTotal) * 100) : 0;
  const extended = new Date(inv.due);
  extended.setDate(extended.getDate() + 14);
  return {
    invoiceId: inv.id,
    invoiceSelected: "yes",
    invoicePeriod: inv.period,
    invoiceTotal: formatCurrency(total),
    invoiceDue: formatShortDate(inv.due),
    invoiceStatus: inv.status,
    invoiceDriver: inv.driver,
    invoicePrevTotal: formatCurrency(prevTotal),
    invoiceDelta: Math.abs(diff) < 1 ? "about the same as" : `${diff > 0 ? "up" : "down"} ${formatCurrency(Math.abs(diff))} (${diff > 0 ? "+" : ""}${pct}%) on`,
    invoiceExtendedDue: formatShortDate(extended),
    instalmentAmount: formatCurrency(Math.round((total / 3) * 100) / 100),
    receipt: `SMR-${stableNumber(inv.id, 6)}`,
  };
}

function readyLine(event: DemandEvent, state: PropertyState): string {
  const issues = issueChannels(state);
  if (!issues.length) return `All your channels are connected and syncing, so you're ready for ${event.name}.`;
  const detail = issues.map((c) => `${c.name} (${CHANNEL_STATUS_LABELS[c.status].toLowerCase()}${c.issueRoom ? ` on ${c.issueRoom}` : ""})`);
  return `Not quite. ${nameList(detail)} ${issues.length === 1 ? "isn't" : "aren't"} getting your rates, so ${issues.length === 1 ? "it" : "they"} won't sell rooms for ${event.name}. Fix ${issues.length === 1 ? "it" : "them"} before you raise prices.`;
}

export function eventFacts(e: DemandEvent, state: PropertyState, now: Date): TemplateValues {
  const f = forecast(e, state.events, now);
  return {
    eventId: e.id,
    eventSelected: "yes",
    eventName: e.name,
    eventVenue: e.venue,
    eventDate: formatShortDate(e.start),
    eventDaysOut: relativeDays(f.daysOut),
    eventOnBooks: `${e.onBooksPct ?? 0}%`,
    eventUplift: `${f.upliftPct}%`,
    eventUpliftValue: String(f.upliftPct),
    eventMinStay: `${f.minStay}-night`,
    eventMinStayValue: String(f.minStay),
    eventComparable: f.comparables[0]?.name ?? "none yet",
    eventPace: PACE_LABELS[f.pace],
    eventAdvice: f.advice,
    eventReadyLine: readyLine(e, state),
  };
}

export function historyFacts(e: DemandEvent): TemplateValues {
  const o = e.outcome;
  return {
    historyId: e.id,
    historySelected: "yes",
    historyName: e.name,
    historyDate: formatMonthYear(e.start),
    historyOccupancy: o ? `${o.occupancyPct}%` : "—",
    historyAdr: o ? formatCurrency(o.adr) : "—",
    historyUplift: o ? `${o.adrUpliftPct}%` : "—",
    historySoldOut: o && o.soldOutDaysBefore > 0 ? `You sold out ${pluralise(o.soldOutDaysBefore, "day")} before.` : "It didn't fully sell out.",
    historyNote: o?.note ?? "",
  };
}

export type PickRecord = { id: string; kind: RecordKind; label: string; status: string; facts: TemplateValues };

const BOOKING_URGENCY = ["overbooked", "missing-in-pms", "card-declined", "modified", "cancelled", "confirmed"];

export function filterRecords(state: PropertyState, filter: RecordFilter, now: Date = new Date()): PickRecord[] {
  switch (filter) {
    case "channels-all":
    case "channels-issues": {
      const list = filter === "channels-issues" ? issueChannels(state) : [...issueChannels(state), ...state.channels.filter((c) => !channelIssue(c))];
      return list.map((c) => ({ id: c.id, kind: "channel", label: `${c.name} · ${CHANNEL_STATUS_LABELS[c.status]}`, status: c.status, facts: channelFacts(c, now) }));
    }
    case "bookings-issues":
    case "bookings-upcoming": {
      const today = toLocalIso(now).slice(0, 10);
      const list =
        filter === "bookings-issues"
          ? state.bookings.filter((b) => bookingNeedsAction(b) || b.status === "cancelled").sort((a, b) => BOOKING_URGENCY.indexOf(a.status) - BOOKING_URGENCY.indexOf(b.status))
          : state.bookings.filter((b) => b.checkIn.slice(0, 10) >= today && b.status !== "cancelled").sort((a, b) => a.checkIn.localeCompare(b.checkIn)).slice(0, 6);
      return list.slice(0, 6).map((b) => ({
        id: b.id,
        kind: "booking",
        label: `${b.guest} · ${channelById(state, b.channelId)?.name ?? ""} · ${formatShortDate(b.checkIn)}`,
        status: b.status,
        facts: bookingFacts(b, state),
      }));
    }
    case "invoices-unpaid":
    case "invoices-all": {
      const list = filter === "invoices-unpaid" ? state.invoices.filter(invoiceUnpaid) : state.invoices;
      return list.map((i) => ({ id: i.id, kind: "invoice", label: `${i.period} · ${formatCurrency(invoiceTotal(i))}`, status: i.status, facts: invoiceFacts(i, state) }));
    }
    case "events-upcoming":
      return upcomingEvents(state.events, now)
        .slice(0, 4)
        .map((e) => ({ id: e.id, kind: "event", label: `${e.name} · ${formatShortDate(e.start)}`, status: e.category, facts: eventFacts(e, state, now) }));
    case "events-past":
      return pastEvents(state.events)
        .slice(0, 6)
        .map((e) => ({ id: e.id, kind: "history", label: `${e.name} · ${formatMonthYear(e.start)}`, status: e.category, facts: historyFacts(e) }));
    default: {
      const exhaustive: never = filter;
      return exhaustive;
    }
  }
}

export function resolvePick(pick: RecordPick, record: PickRecord): string {
  return pick.byStatus?.[record.status] ?? pick.next;
}
