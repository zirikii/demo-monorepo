import { DELIVERY, STATUS_LABELS, type OrderView } from "@/features/fan/orders";
import { fanTier, lifetimeEvents, recommend, type Recommendation } from "@/features/fan/recommendations";
import type { FanProfile, Order } from "@/features/fan/types";
import { formatCurrency, formatDateTime, formatShortDate, formatTime } from "@/lib/format";
import type { OrderFilter, OrderPick, TemplateValues } from "../flows";

/** Safe fallbacks so a step reached without an order still reads naturally. */
const ORDER_DEFAULTS: TemplateValues = {
  orderId: "your order",
  orderEvent: "your event",
  orderVenue: "the venue",
  orderCity: "",
  orderDate: "the event date",
  orderShortDate: "the event date",
  orderOriginalDate: "the original date",
  orderSeats: "your seats",
  orderDelivery: "your delivery method",
  orderTickets: "your",
  orderTotal: "the full amount",
  orderFacePrice: "the original price",
  orderFaceValue: "0",
  barcodeLine: "Barcodes appear in the Ticketek app 48 hours before the event.",
  refundDeadline: "7 days before the new date",
  gatesOpen: "the time on your ticket",
  venueTransport: "Check the venue's website for transport options.",
  bagPolicy: "Most venues don't allow bags larger than A4.",
  transferNote: "Only App/Mobile Tickets for upcoming events can be transferred in the Ticketek app.",
};

export type AssistantFan = {
  profile: FanProfile;
  orders: Order[];
  views: OrderView[];
  signedIn: boolean;
};

export type PersonalisationOptions = { personalGreeting: boolean; recommendations: boolean; now?: Date };

function whenLabel(view: OrderView): string {
  if (view.hoursUntil < 12) return "tonight";
  if (view.hoursUntil < 36) return "tomorrow night";
  return `on ${formatShortDate(view.performance.startsAt)}`;
}

export function welcomeLine(fan: AssistantFan, opts: PersonalisationOptions): string {
  if (!fan.signedIn) return "Sign in and I can look up your orders too.";
  if (!opts.personalGreeting) return "";
  const next = fan.views.find((v) => v.status === "event-soon" || v.status === "upcoming" || v.status === "rescheduled");
  const cancelled = fan.views.find((v) => v.status === "cancelled");
  const parts: string[] = [];
  if (next) {
    parts.push(
      next.status === "event-soon"
        ? `${next.event.name} is ${whenLabel(next)} and your tickets are ready.`
        : `Your next event is ${next.event.name} ${whenLabel(next)}.`,
    );
  }
  if (cancelled) parts.push(`I can see ${cancelled.event.name} was cancelled, so your refund is on its way.`);
  return parts.join(" ");
}

export function recsLine(fan: AssistantFan, recs: Recommendation[]): string {
  const top = recs[0];
  if (!top) return "Here's what's popular on Ticketek right now.";
  if (!fan.signedIn) return `Here's what's popular right now — ${top.event.name} is a great pick.`;
  return `Based on the ${lifetimeEvents(fan.profile)} events you've been to, here are my picks. ${top.event.name} stands out — ${top.reason.charAt(0).toLowerCase()}${top.reason.slice(1)}.`;
}

export function cardLabel(profile: FanProfile): string {
  const card = profile.cards.find((c) => c.isDefault) ?? profile.cards[0];
  return card ? `${card.brand} ending ${card.last4}` : "original payment method";
}

export function buildContext(fan: AssistantFan, opts: PersonalisationOptions): TemplateValues {
  const recs = opts.recommendations ? recommend(fan.profile, fan.orders, { limit: 4, now: opts.now }) : [];
  return {
    ...ORDER_DEFAULTS,
    firstName: fan.signedIn ? fan.profile.firstName : "there",
    email: fan.signedIn ? fan.profile.email : "your email",
    mobile: fan.profile.mobile,
    cardLabel: cardLabel(fan.profile),
    fanTier: fanTier(fan.profile).label,
    lifetimeEvents: String(lifetimeEvents(fan.profile)),
    welcomeLine: welcomeLine(fan, opts),
    recsLine: recsLine(fan, recs),
    handoffTeam: "Fan Support team",
    handoffLine: "A specialist will pick this up shortly, and I've passed on everything we've covered.",
    phoneHours: "Monday to Friday, 9am to 5pm AEST",
  };
}

export function orderFacts(view: OrderView, profile: FanProfile): TemplateValues {
  const start = new Date(view.performance.startsAt);
  const gates = new Date(start.getTime() - view.venue.gatesOpenMins * 60_000);
  const face = Math.max(...view.order.tickets.map((t) => t.price));
  return {
    orderId: view.order.id,
    orderSelected: "yes",
    orderEvent: view.event.name,
    orderVenue: view.venue.name,
    orderCity: view.venue.city,
    orderDate: formatDateTime(view.performance.startsAt),
    orderShortDate: formatShortDate(view.performance.startsAt),
    orderOriginalDate: view.performance.originalStartsAt ? formatDateTime(view.performance.originalStartsAt) : formatDateTime(view.performance.startsAt),
    orderSeats: view.seatsLabel,
    orderDelivery: DELIVERY[view.order.delivery].label,
    orderTickets: String(view.order.tickets.length),
    orderTotal: formatCurrency(view.order.total),
    orderFacePrice: formatCurrency(face),
    orderFaceValue: String(face),
    orderStatus: STATUS_LABELS[view.status],
    orderPolicy: view.policy,
    barcodeLine: view.barcodeLive
      ? "The barcodes are live now in the Ticketek app under My Tickets."
      : `The barcodes unlock in the Ticketek app on ${formatDateTime(view.barcodeUnlocksAt)}, 48 hours before the event.`,
    refundDeadline: view.refundDeadline ? formatShortDate(view.refundDeadline) : ORDER_DEFAULTS.refundDeadline!,
    gatesOpen: view.venue.gatesOpenMins > 0 ? formatTime(gates) : formatTime(start),
    venueTransport: view.venue.transport,
    bagPolicy: view.venue.bagPolicy,
    transferNote: view.transferNote,
    canTransfer: view.canTransfer ? "yes" : "no",
    canResell: view.canResell ? "yes" : "no",
    cardLabel: cardLabel(profile),
  };
}

export function filterOrders(views: OrderView[], filter: OrderFilter): OrderView[] {
  switch (filter) {
    case "active":
      return views.filter((v) => v.status !== "past");
    case "transferable":
      return views.filter((v) => v.canTransfer);
    case "resellable":
      return views.filter((v) => v.canResell);
    case "attending":
      return views.filter((v) => v.status === "upcoming" || v.status === "event-soon" || v.status === "rescheduled");
    default: {
      const exhaustive: never = filter;
      return exhaustive;
    }
  }
}

export function resolvePick(pick: OrderPick, view: OrderView): string {
  return pick.byPolicy?.[view.policy] ?? pick.byDelivery?.[view.order.delivery] ?? pick.next;
}
