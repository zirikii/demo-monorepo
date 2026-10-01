import { DELIVERY_FEES, HANDLING_FEE, serviceFee } from "@/data/pricing";
import type { DeliveryId, EventItem, PriceCategory, PriceType } from "@/data/types";
import type { Order, TicketLine } from "@/features/fan/types";
import { toLocalIso } from "./clock";

export const HOLD_MINUTES = 10;
export const MAX_TICKETS = 8;
/** Ticket Protect is priced as a share of the ticket subtotal. */
export const TICKET_PROTECT_RATE = 0.07;

const TYPE_DISCOUNT: Record<PriceType, number> = {
  Admit: 1,
  "Aisle Admit": 1.05,
  "Companion Card": 0,
  "VIP Admit": 1,
  Child: 0.7,
  Concession: 0.85,
};

export type Selection = { category: PriceCategory; quantities: Partial<Record<PriceType, number>> };

export function ticketCount(sel: Selection): number {
  return Object.values(sel.quantities).reduce((sum, n) => sum + (n ?? 0), 0);
}

export function unitPrice(category: PriceCategory, type: PriceType): number {
  return Math.round(category.price * TYPE_DISCOUNT[type] * 100) / 100;
}

export type PriceBreakdown = {
  tickets: number;
  service: number;
  delivery: number;
  handling: number;
  protect: number;
  total: number;
};

export function priceBreakdown(sel: Selection, delivery: DeliveryId, ticketProtect: boolean): PriceBreakdown {
  let tickets = 0;
  let service = 0;
  for (const [type, qty] of Object.entries(sel.quantities) as [PriceType, number][]) {
    const price = unitPrice(sel.category, type);
    tickets += price * qty;
    if (price > 0) service += serviceFee(price) * qty;
  }
  const count = ticketCount(sel);
  const deliveryFee = count ? DELIVERY_FEES[delivery] : 0;
  const handling = count ? HANDLING_FEE : 0;
  const protect = ticketProtect ? Math.round(tickets * TICKET_PROTECT_RATE * 100) / 100 : 0;
  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    tickets: round(tickets),
    service: round(service),
    delivery: deliveryFee,
    handling,
    protect,
    total: round(tickets + service + deliveryFee + handling + protect),
  };
}

function seededRandom(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/** "Best available" allocation: the same selection always lands on the same seats. */
export function allocateSeats(event: EventItem, perfId: string, sel: Selection, seed = ""): TicketLine[] {
  const rand = seededRandom(`${perfId}|${sel.category.id}|${ticketCount(sel)}|${seed}`);
  const standing = Boolean(sel.category.standing);
  const section = standing ? sel.category.name : `${sel.category.name.replace(/ \(.*\)/, "").replace(/ Seating$/, "")} · Bay ${10 + Math.floor(rand() * 40)}`;
  const row = String.fromCharCode(65 + Math.floor(rand() * 18));
  let seat = 1 + Math.floor(rand() * 20);
  const lines: TicketLine[] = [];
  for (const [type, qty] of Object.entries(sel.quantities) as [PriceType, number][]) {
    for (let i = 0; i < qty; i++) {
      lines.push({
        section,
        row: standing ? "GA" : row,
        seat: standing ? "GA" : String(seat++),
        priceType: type,
        priceCategory: sel.category.name,
        price: unitPrice(sel.category, type),
        barcode: `${event.slug.slice(0, 3).toUpperCase()}${Math.floor(rand() * 1e10)
          .toString()
          .padStart(10, "0")}`,
      });
    }
  }
  return lines;
}

export function newOrderId(): string {
  return `TK${Math.floor(42_000_000 + Math.random() * 7_000_000)}`;
}

export function buildOrder(opts: {
  event: EventItem;
  perfId: string;
  tickets: TicketLine[];
  delivery: DeliveryId;
  breakdown: PriceBreakdown;
  ticketProtect: boolean;
  id?: string;
  now?: Date;
}): Order {
  const { breakdown } = opts;
  return {
    id: opts.id ?? newOrderId(),
    eventSlug: opts.event.slug,
    performanceId: opts.perfId,
    purchasedAt: toLocalIso(opts.now ?? new Date()),
    tickets: opts.tickets,
    delivery: opts.delivery,
    fees: Math.round((breakdown.service + breakdown.delivery + breakdown.handling + breakdown.protect) * 100) / 100,
    total: breakdown.total,
    ticketProtect: opts.ticketProtect,
    transfers: [],
    resale: [],
  };
}
