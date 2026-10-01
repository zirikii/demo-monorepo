import type { CategoryId, DeliveryId, PriceType, RegionId } from "@/data/types";

export type TicketLine = {
  section: string;
  row: string;
  seat: string;
  priceType: PriceType;
  priceCategory: string;
  price: number;
  barcode: string;
};

export type TransferRecord = { seat: string; toName: string; toEmail: string; at: string; status: "pending" | "accepted" };

export type ResaleListing = { seat: string; price: number; at: string; status: "listed" | "sold" };

export type RefundRecord = {
  amount: number;
  requestedAt: string;
  status: "processing" | "refunded";
  reason: "cancelled" | "rescheduled" | "ticket-protect";
};

export type Order = {
  id: string;
  eventSlug: string;
  performanceId: string;
  purchasedAt: string;
  tickets: TicketLine[];
  delivery: DeliveryId;
  fees: number;
  total: number;
  ticketProtect: boolean;
  transfers: TransferRecord[];
  resale: ResaleListing[];
  refund?: RefundRecord;
};

export type AttendedEvent = {
  id: string;
  name: string;
  artistKey: string;
  category: CategoryId;
  genres: string[];
  venue: string;
  city: string;
  date: string;
  image?: string;
};

export type PaymentCard = { id: string; brand: "Visa" | "Mastercard" | "Amex"; last4: string; expiry: string; isDefault: boolean };

export type FanProfile = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  postcode: string;
  homeRegion: RegionId;
  memberSince: string;
  accessibility: { companionCard: boolean; wheelchair: boolean; notes: string };
  marketing: { email: boolean; sms: boolean; push: boolean; partners: boolean };
  favourites: string[];
  waitlist: string[];
  cards: PaymentCard[];
  attended: AttendedEvent[];
  /** Events attended before the detailed history starts; counts toward fan tier. */
  archivedEvents: number;
  giftVouchers: { code: string; balance: number }[];
};

export type OrderStatus = "upcoming" | "event-soon" | "cancelled" | "rescheduled" | "refunded" | "past";

/** Which refund path Ticketek's purchase policy allows for an order. */
export type RefundPolicy = "cancelled" | "rescheduled" | "protected" | "standard" | "refunded" | "past";
