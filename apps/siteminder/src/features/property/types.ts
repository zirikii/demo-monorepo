export type PlanId = "siteminder" | "plus" | "groups";

export type ChannelStatus = "connected" | "mapping-error" | "auth-failed" | "paused";
export type ChannelKind = "ota" | "metasearch" | "direct" | "gds" | "wholesale";

export type Channel = {
  id: string;
  name: string;
  kind: ChannelKind;
  status: ChannelStatus;
  /** ISO local time of the last successful availability/rate push. */
  lastSync: string;
  bookings30d: number;
  revenue30d: number;
  commissionPct: number;
  /** Room type the mapping error is on, when status is mapping-error. */
  issueRoom?: string;
};

export type BookingStatus = "confirmed" | "modified" | "cancelled" | "missing-in-pms" | "card-declined" | "overbooked";

export type Booking = {
  id: string;
  channelId: string;
  guest: string;
  room: string;
  checkIn: string;
  nights: number;
  guests: number;
  total: number;
  status: BookingStatus;
  bookedAt: string;
  /** What changed, for modified bookings. */
  change?: string;
};

export type InvoiceStatus = "paid" | "open" | "overdue" | "extended" | "instalments";

export type InvoiceLine = { label: string; amount: number };

export type Invoice = {
  id: string;
  period: string;
  issued: string;
  due: string;
  lines: InvoiceLine[];
  status: InvoiceStatus;
  /** Why this invoice moved against the previous one; drives the "higher than expected" flow. */
  driver: "bookings" | "addon" | "unchanged";
  paidAt?: string;
};

export type TeamRole = "Owner" | "Admin" | "Revenue" | "Front desk" | "Read only";
export type TeamUser = { id: string; name: string; email: string; role: TeamRole; mfa: boolean; lastActive: string };

export type RoomType = { id: string; name: string; rooms: number; baseRate: number };

export type EventCategory = "concert" | "sport" | "festival" | "conference" | "theatre" | "holiday";

/** What actually happened at the property around a past event. */
export type EventOutcome = {
  occupancyPct: number;
  adr: number;
  /** ADR uplift against the same weekday a month earlier, in percent. */
  adrUpliftPct: number;
  /** Days before the event the property sold out; 0 means it never sold out. */
  soldOutDaysBefore: number;
  minStay: number;
  note: string;
};

export type EventPlan = { upliftPct: number; minStay: number; appliedAt: string };

export type DemandEvent = {
  id: string;
  name: string;
  category: EventCategory;
  venue: string;
  start: string;
  end: string;
  distanceKm: number;
  attendance: number;
  source: "insights" | "manual";
  outcome?: EventOutcome;
  /** Current on-the-books occupancy for upcoming events. */
  onBooksPct?: number;
  plan?: EventPlan;
};

export type Property = {
  id: string;
  name: string;
  city: string;
  rooms: number;
  stars: number;
  pms: string;
  plan: PlanId;
  billingEmail: string;
  abn: string;
  card: { brand: string; last4: string };
  directDebit: boolean;
  credit: number;
  supportCode: string;
  roomTypes: RoomType[];
};

export type Profile = { firstName: string; lastName: string; email: string; mobile: string; role: string };

export type RateChange = { id: string; at: string; summary: string };

export type PropertyState = {
  profile: Profile;
  property: Property;
  channels: Channel[];
  bookings: Booking[];
  invoices: Invoice[];
  team: TeamUser[];
  events: DemandEvent[];
  rateLog: RateChange[];
  /** Room types closed to sale on a date, keyed `roomId@yyyy-mm-dd`. */
  stopSell: string[];
};
