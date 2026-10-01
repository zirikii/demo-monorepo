import { findPerformance } from "@/data/events";
import type { DeliveryId, EventItem, Performance, Venue } from "@/data/types";
import { requireVenue } from "@/data/venues";
import { hoursUntil } from "@/lib/clock";
import { formatDateTime, formatShortDate, pluralise } from "@/lib/format";
import type { Order, OrderStatus, RefundPolicy } from "./types";

export const BARCODE_UNLOCK_HOURS = 48;
export const RESALE_CLOSES_HOURS = 2;
/** Rescheduled shows: refunds close this many days before the new date. */
export const RESCHEDULE_REFUND_DAYS = 7;

export const DELIVERY: Record<DeliveryId, { label: string; short: string; description: string }> = {
  mobile: {
    label: "App/Mobile Ticket",
    short: "Mobile ticket",
    description: "Your barcode appears in the Ticketek app 48 hours before the event. Screenshots won't scan.",
  },
  ezyticket: {
    label: "EzyTicket",
    short: "EzyTicket",
    description: "Emailed as a PDF to print at home, usually within 24 hours of purchase.",
  },
  collection: {
    label: "Venue or Prepaid Collection",
    short: "Venue collection",
    description: "Collect from the venue box office from 90 minutes before the show. Bring photo ID and your card.",
  },
  souvenir: {
    label: "Souvenir Ticket (posted)",
    short: "Souvenir ticket",
    description: "A collectible printed ticket posted by Australia Post, dispatched 14 days before the event.",
  },
};

export type OrderView = {
  order: Order;
  event: EventItem;
  performance: Performance;
  venue: Venue;
  status: OrderStatus;
  policy: RefundPolicy;
  hoursUntil: number;
  barcodeUnlocksAt: Date;
  barcodeLive: boolean;
  canTransfer: boolean;
  canResell: boolean;
  transferNote: string;
  label: string;
  seatsLabel: string;
  refundDeadline?: Date;
};

export function orderStatus(order: Order, performance: Performance, now: Date): OrderStatus {
  if (order.refund) return "refunded";
  if (performance.status === "cancelled") return "cancelled";
  const hours = hoursUntil(performance.startsAt, now);
  if (hours < -6) return "past";
  if (performance.status === "rescheduled") return "rescheduled";
  if (hours <= BARCODE_UNLOCK_HOURS) return "event-soon";
  return "upcoming";
}

export function refundPolicy(order: Order, status: OrderStatus): RefundPolicy {
  switch (status) {
    case "refunded":
      return "refunded";
    case "past":
      return "past";
    case "cancelled":
      return "cancelled";
    case "rescheduled":
      return "rescheduled";
    case "upcoming":
    case "event-soon":
      return order.ticketProtect ? "protected" : "standard";
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export function seatsLabel(order: Order): string {
  const first = order.tickets[0];
  if (!first) return "";
  if (first.seat === "GA") return `${pluralise(order.tickets.length, "General Admission ticket")}`;
  const seats = order.tickets.map((t) => t.seat);
  const range = seats.length > 1 ? `Seats ${seats[0]}–${seats[seats.length - 1]}` : `Seat ${seats[0]}`;
  return `${first.section}, Row ${first.row}, ${range}`;
}

function transferNote(order: Order, status: OrderStatus): string {
  if (status === "cancelled" || status === "refunded") return "This event was cancelled, so these tickets can't be transferred.";
  if (status === "past") return "This event has finished.";
  if (order.resale.some((r) => r.status === "listed")) return "Tickets listed on Marketplace can't be transferred until the listing is removed.";
  switch (order.delivery) {
    case "mobile":
      return "Send tickets to a friend's Ticketek account. They'll get an email to accept.";
    case "ezyticket":
      return "EzyTickets can't be transferred in the app — you can forward the PDF, but each barcode scans once.";
    case "collection":
      return "Collection tickets are held in the buyer's name; a friend can collect with a signed authority and your photo ID copy.";
    case "souvenir":
      return "Souvenir tickets are posted — hand the printed ticket to your friend.";
    default: {
      const exhaustive: never = order.delivery;
      return exhaustive;
    }
  }
}

export function viewOrder(order: Order, now: Date = new Date()): OrderView | null {
  const found = findPerformance(order.performanceId);
  if (!found) return null;
  const { event, performance } = found;
  const status = orderStatus(order, performance, now);
  const hours = hoursUntil(performance.startsAt, now);
  const start = new Date(performance.startsAt);
  const barcodeUnlocksAt = new Date(start.getTime() - BARCODE_UNLOCK_HOURS * 3_600_000);
  const live = status === "upcoming" || status === "event-soon" || status === "rescheduled";
  const listed = order.resale.some((r) => r.status === "listed");
  return {
    order,
    event,
    performance,
    venue: requireVenue(performance.venueId),
    status,
    policy: refundPolicy(order, status),
    hoursUntil: hours,
    barcodeUnlocksAt,
    barcodeLive: order.delivery === "mobile" && live && now >= barcodeUnlocksAt,
    canTransfer: order.delivery === "mobile" && live && !listed,
    canResell: order.delivery === "mobile" && live && hours > RESALE_CLOSES_HOURS && order.transfers.length === 0,
    transferNote: transferNote(order, status),
    label: `${event.name} · ${formatShortDate(performance.startsAt)}`,
    seatsLabel: seatsLabel(order),
    refundDeadline:
      status === "rescheduled" ? new Date(start.getTime() - RESCHEDULE_REFUND_DAYS * 86_400_000) : undefined,
  };
}

export function viewOrders(orders: Order[], now: Date = new Date()): OrderView[] {
  return orders
    .map((o) => viewOrder(o, now))
    .filter((v): v is OrderView => v !== null)
    .sort((a, b) => a.performance.startsAt.localeCompare(b.performance.startsAt));
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  upcoming: "Upcoming",
  "event-soon": "Event soon",
  cancelled: "Event cancelled",
  rescheduled: "Rescheduled",
  refunded: "Refunded",
  past: "Past event",
};

export function describeOrder(view: OrderView): string {
  return `${view.event.name} at ${view.venue.name}, ${formatDateTime(view.performance.startsAt)} — ${view.seatsLabel}, ${DELIVERY[view.order.delivery].short}`;
}