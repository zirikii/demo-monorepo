import type {
  Booking,
  BookingStatus,
  Channel,
  ChannelKind,
  ChannelStatus,
  EventCategory,
  Invoice,
  InvoiceStatus,
  PlanId,
  PropertyState,
} from "./types";

export const CHANNEL_STATUS_LABELS: Record<ChannelStatus, string> = {
  connected: "Connected",
  "mapping-error": "Mapping error",
  "auth-failed": "Credentials expired",
  paused: "Paused",
};

export const CHANNEL_KIND_LABELS: Record<ChannelKind, string> = {
  ota: "Online travel agent",
  metasearch: "Metasearch",
  direct: "Direct",
  gds: "GDS",
  wholesale: "Wholesale",
};

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  modified: "Modified",
  cancelled: "Cancelled",
  "missing-in-pms": "Not in PMS",
  "card-declined": "Card declined",
  overbooked: "Overbooked",
};

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  paid: "Paid",
  open: "Due",
  overdue: "Overdue",
  extended: "Extension agreed",
  instalments: "Instalment plan",
};

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  concert: "Concert",
  sport: "Sport",
  festival: "Festival",
  conference: "Conference",
  theatre: "Theatre",
  holiday: "Holiday",
};

export const PLANS: Record<PlanId, { name: string; price: number | null; blurb: string }> = {
  siteminder: {
    name: "SiteMinder",
    price: 99,
    blurb: "Channel manager, PMS integration, payments and insights",
  },
  plus: {
    name: "SiteMinder Plus",
    price: 129,
    blurb: "Adds booking engine, website builder, competitor rates and Demand Plus",
  },
  groups: {
    name: "Groups & Chains",
    price: null,
    blurb: "Multi-property management, enterprise reporting and a dedicated team",
  },
};

export function channelIssue(channel: Channel): boolean {
  return channel.status !== "connected";
}

export function channelById(
  state: Pick<PropertyState, "channels">,
  id: string,
): Channel | undefined {
  return state.channels.find((c) => c.id === id);
}

export function bookingNeedsAction(booking: Booking): boolean {
  return booking.status !== "confirmed" && booking.status !== "cancelled";
}

export function invoiceTotal(invoice: Pick<Invoice, "lines">): number {
  return Math.round(invoice.lines.reduce((sum, l) => sum + l.amount, 0) * 100) / 100;
}

export function invoiceUnpaid(invoice: Invoice): boolean {
  return invoice.status !== "paid";
}

/** Whole days an unpaid invoice is past due (0 when it isn't). */
export function overdueDays(invoice: Invoice, now: Date): number {
  if (!invoiceUnpaid(invoice)) return 0;
  return Math.max(0, Math.floor((now.getTime() - new Date(invoice.due).getTime()) / 86_400_000));
}

export function daysUntil(iso: string, now: Date): number {
  const start = new Date(iso);
  const a = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const b = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((a - b) / 86_400_000);
}

export function relativeDays(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days === -1) return "yesterday";
  return days > 0 ? `in ${days} days` : `${-days} days ago`;
}

/** Tonight's sell rate by channel. Channel-funded promotions explain the usual gaps. */
const PARITY_OFFSETS: Record<string, { pct: number; note?: string }> = {
  direct: { pct: 0, note: "Your rate" },
  bdc: { pct: 0 },
  exp: { pct: -8, note: "Expedia member price you opted into" },
  agoda: { pct: -5, note: "Agoda VIP discount" },
  ghotel: { pct: 0 },
};

export type ParityRow = {
  channelId: string;
  name: string;
  rate: number;
  diffPct: number;
  note?: string;
};

export function parityRows(
  state: Pick<PropertyState, "channels" | "property">,
  roomId = "DK",
): { room: string; rows: ParityRow[] } {
  const room = state.property.roomTypes.find((r) => r.id === roomId) ?? state.property.roomTypes[0];
  const base = room?.baseRate ?? 0;
  const rows = state.channels
    .filter((c) => PARITY_OFFSETS[c.id])
    .map((c) => {
      const { pct, note } = PARITY_OFFSETS[c.id]!;
      return {
        channelId: c.id,
        name: c.name,
        rate: Math.round(base * (1 + pct / 100)),
        diffPct: pct,
        note,
      };
    });
  return { room: room?.name ?? "Room", rows };
}
