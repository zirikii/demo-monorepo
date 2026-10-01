export type CategoryId = "concerts" | "sports" | "theatre" | "family" | "comedy";

export type StateId = "nsw" | "qld" | "sa" | "vic" | "wa";
export type RegionId = "national" | StateId;

export type DeliveryId = "mobile" | "ezyticket" | "collection" | "souvenir";

export type Venue = {
  id: string;
  name: string;
  city: string;
  state: StateId;
  stateLabel: string;
  address: string;
  capacity: number;
  transport: string;
  accessibility: string[];
  gatesOpenMins: number;
  bagPolicy: string;
};

export type PerformanceStatus = "on-sale" | "selling-fast" | "sold-out" | "cancelled" | "rescheduled";

export type Performance = {
  id: string;
  /** Local start time as an ISO string without offset (venue-local). */
  startsAt: string;
  venueId: string;
  status: PerformanceStatus;
  /** Rescheduled shows keep their original date here so notices can show old → new. */
  originalStartsAt?: string;
  note?: string;
};

export type PriceCategoryStatus = "available" | "limited" | "exhausted";

export type PriceCategory = {
  id: string;
  name: string;
  price: number;
  status: PriceCategoryStatus;
  description?: string;
  standing?: boolean;
};

export type PriceType = "Admit" | "Aisle Admit" | "Companion Card" | "VIP Admit" | "Child" | "Concession";

export type EventItem = {
  slug: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  /** Groups repeat artists across years so "you saw X" matches regardless of tour name. */
  artistKey: string;
  genres: string[];
  image: string;
  banner?: string;
  summary: string;
  description: string[];
  promoter: string;
  performances: Performance[];
  priceCategories: PriceCategory[];
  priceTypes: PriceType[];
  delivery: DeliveryId[];
  ageRestriction?: string;
  badge?: "New" | "Selling fast" | "Presale" | "Last tickets" | "Just announced";
  featured?: boolean;
  premium?: boolean;
  lastMinute?: boolean;
  presaleCode?: string;
  hero?: boolean;
  discover?: string;
};
