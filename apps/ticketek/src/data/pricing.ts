import type { PriceCategory } from "./types";

export const ARENA_PRICES: PriceCategory[] = [
  { id: "best", name: "Best available (Any price)", price: 159.9, status: "available", description: "We'll find the best seats left in any price category." },
  { id: "ga", name: "General Admission Standing", price: 139.9, status: "exhausted", standing: true },
  { id: "a", name: "A Reserve Seating", price: 249.9, status: "limited" },
  { id: "b", name: "B Reserve Seating", price: 199.9, status: "available" },
  { id: "c", name: "C Reserve Seating", price: 159.9, status: "available" },
  { id: "vip", name: "VIP Early Entry Package", price: 433.55, status: "limited", description: "Premium reserved seat, early entry, merch pack and commemorative laminate." },
];

export const THEATRE_PRICES: PriceCategory[] = [
  { id: "best", name: "Best available (Any price)", price: 89.9, status: "available" },
  { id: "premium", name: "Premium Reserve", price: 189.9, status: "limited" },
  { id: "a", name: "A Reserve", price: 139.9, status: "available" },
  { id: "b", name: "B Reserve", price: 109.9, status: "available" },
  { id: "c", name: "C Reserve", price: 89.9, status: "available" },
];

export const TRIBUTE_PRICES: PriceCategory[] = [
  { id: "best", name: "Best available (Any price)", price: 79.9, status: "available" },
  { id: "a", name: "A Reserve", price: 99.9, status: "available" },
  { id: "b", name: "B Reserve", price: 79.9, status: "available" },
];

export const GA_PRICES: PriceCategory[] = [
  { id: "ga", name: "General Admission", price: 199.9, status: "available", standing: true },
  { id: "ga-plus", name: "GA+ (fast lane entry, private bars)", price: 289.9, status: "limited", standing: true },
  { id: "vip", name: "VIP (viewing platform + lounge)", price: 399.9, status: "limited", standing: true },
];

export const CLUB_PRICES: PriceCategory[] = [
  { id: "ga", name: "General Admission", price: 89.9, status: "available", standing: true },
  { id: "balcony", name: "Balcony Reserved", price: 109.9, status: "limited" },
];

export const COURT_PRICES: PriceCategory[] = [
  { id: "best", name: "Best available (Any price)", price: 39.9, status: "available" },
  { id: "courtside", name: "Courtside", price: 189, status: "limited" },
  { id: "lower", name: "Lower Bowl", price: 69, status: "available" },
  { id: "upper", name: "Upper Bowl", price: 39.9, status: "available" },
];

export const MOTORSPORT_PRICES: PriceCategory[] = [
  { id: "ga4", name: "4-Day General Admission", price: 275, status: "available", standing: true },
  { id: "ga1", name: "Sunday General Admission", price: 129, status: "available", standing: true },
  { id: "grandstand", name: "Grandstand Reserved (4 days)", price: 495, status: "limited" },
];

export const STADIUM_PRICES: PriceCategory[] = [
  { id: "best", name: "Best available (Any price)", price: 45, status: "available" },
  { id: "premium", name: "Premium Reserved", price: 95, status: "limited" },
  { id: "reserved", name: "Reserved", price: 65, status: "available" },
  { id: "ga", name: "General Admission", price: 45, status: "available", standing: true },
];

export const FAMILY_PRICES: PriceCategory[] = [
  { id: "best", name: "Best available (Any price)", price: 45, status: "available" },
  { id: "gold", name: "Gold", price: 79, status: "limited" },
  { id: "silver", name: "Silver", price: 59, status: "available" },
  { id: "family", name: "Family Pass (2A + 2C)", price: 189, status: "available" },
];

export const COMEDY_PRICES: PriceCategory[] = [
  { id: "best", name: "Best available (Any price)", price: 69.9, status: "available" },
  { id: "a", name: "A Reserve", price: 79.9, status: "available" },
  { id: "b", name: "B Reserve", price: 69.9, status: "available" },
];

export const PREMIUM_PRICES: PriceCategory[] = [
  { id: "hospitality", name: "Hospitality Package", price: 649, status: "limited", description: "Reserved seat, three-course lunch, beverages and a memento." },
  { id: "reserved", name: "Premium Reserved", price: 329, status: "available" },
];

/** Service fee per ticket, from the price category's list price. */
export function serviceFee(price: number): number {
  return Math.round(price * 0.06 * 100) / 100 + 1.5;
}

export const DELIVERY_FEES = { mobile: 0, ezyticket: 0, collection: 0, souvenir: 8.5 } as const;

export const HANDLING_FEE = 6.95;
