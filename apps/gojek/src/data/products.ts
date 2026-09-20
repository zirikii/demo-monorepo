import type { VerticalId } from "./categories";

export type ProductIconKey =
  | "bike"
  | "car"
  | "package"
  | "boxes"
  | "bus"
  | "utensils"
  | "cart"
  | "bag"
  | "pill"
  | "wallet"
  | "card"
  | "receipt"
  | "phone"
  | "chart"
  | "massage"
  | "clean"
  | "wrench"
  | "store"
  | "building"
  | "movie"
  | "ticket"
  | "game"
  | "news";

export type Product = {
  name: string;
  vertical: VerticalId;
  icon: ProductIconKey;
  tagline: string;
  description: string;
  countries: string[];
};

export const products: Product[] = [
  // Transport & Logistics
  {
    name: "GoRide",
    vertical: "transport",
    icon: "bike",
    tagline: "Your two-wheeler taxi, the indigenous Ojek.",
    description:
      "Beat the traffic with a motorbike ride that gets you there fast. Helmets, tracked trips and cashless fares as standard.",
    countries: ["Indonesia", "Singapore"],
  },
  {
    name: "GoCar",
    vertical: "transport",
    icon: "car",
    tagline: "Comfortable four-wheeler rides, anytime.",
    description:
      "Air-conditioned cars for solo trips, family outings or airport runs, with upfront pricing you can trust.",
    countries: ["Indonesia", "Singapore"],
  },
  {
    name: "GoSend",
    vertical: "transport",
    icon: "package",
    tagline: "Send or get packages delivered within hours.",
    description:
      "Instant and same-day courier powered by our driver network. Track every parcel from pickup to drop-off.",
    countries: ["Indonesia"],
  },
  {
    name: "GoBox",
    vertical: "transport",
    icon: "boxes",
    tagline: "Moving out? We'll do the heavy lifting.",
    description:
      "On-demand pickups, vans and trucks for bulky items and house moves, with helpers available on request.",
    countries: ["Indonesia"],
  },
  {
    name: "GoBluebird",
    vertical: "transport",
    icon: "car",
    tagline: "Ride exclusive with the Bluebird fleet.",
    description: "Book Indonesia's iconic Bluebird taxis directly inside the Gojek app.",
    countries: ["Indonesia"],
  },
  {
    name: "GoTransit",
    vertical: "transport",
    icon: "bus",
    tagline: "Your commute assistant, with or without Gojek.",
    description:
      "Plan multi-modal journeys across trains and buses and buy integrated tickets in a few taps.",
    countries: ["Indonesia"],
  },
  // Food & Shopping
  {
    name: "GoFood",
    vertical: "food",
    icon: "utensils",
    tagline: "Your favourite meals, delivered fast.",
    description:
      "Order from hundreds of thousands of restaurants and warungs. Live tracking and no-contact delivery included.",
    countries: ["Indonesia", "Singapore"],
  },
  {
    name: "GoMart",
    vertical: "food",
    icon: "cart",
    tagline: "Groceries and daily essentials in minutes.",
    description: "Fresh produce, pantry staples and household items shopped and delivered for you.",
    countries: ["Indonesia"],
  },
  {
    name: "GoShop",
    vertical: "food",
    icon: "bag",
    tagline: "Shop anything, we'll pick it up for you.",
    description: "Tell us what you need from any store and a driver-partner buys and delivers it.",
    countries: ["Indonesia"],
  },
  {
    name: "GoMed",
    vertical: "food",
    icon: "pill",
    tagline: "Medicine and health products to your door.",
    description: "Order prescriptions and over-the-counter health items from trusted pharmacies.",
    countries: ["Indonesia"],
  },
  // Payments
  {
    name: "GoPay",
    vertical: "payments",
    icon: "wallet",
    tagline: "One wallet for everything cashless.",
    description:
      "Pay merchants, split bills, transfer to friends and withdraw to your bank — all from one balance.",
    countries: ["Indonesia", "Singapore"],
  },
  {
    name: "GoPayLater",
    vertical: "payments",
    icon: "card",
    tagline: "Buy now, pay later — your safety net.",
    description: "A flexible line of credit for everyday spending, settled on a schedule that suits you.",
    countries: ["Indonesia"],
  },
  {
    name: "GoTagihan",
    vertical: "payments",
    icon: "receipt",
    tagline: "Pay bills without the queues.",
    description: "Electricity, water, internet and more — settle recurring bills in a couple of taps.",
    countries: ["Indonesia"],
  },
  {
    name: "GoPulsa",
    vertical: "payments",
    icon: "phone",
    tagline: "Top up phone credit and data instantly.",
    description: "Reload prepaid credit and data packages for every major operator, anytime.",
    countries: ["Indonesia"],
  },
  {
    name: "GoInvestasi",
    vertical: "payments",
    icon: "chart",
    tagline: "Start investing from your wallet.",
    description: "Grow your money with gold and mutual-fund options starting from small amounts.",
    countries: ["Indonesia"],
  },
  // Daily Needs
  {
    name: "GoMassage",
    vertical: "daily",
    icon: "massage",
    tagline: "Professional massage at home.",
    description: "Vetted therapists bring the spa to your living room, booked around your schedule.",
    countries: ["Indonesia"],
  },
  {
    name: "GoClean",
    vertical: "daily",
    icon: "clean",
    tagline: "On-demand home cleaning.",
    description: "Trusted cleaners for homes and offices, with the supplies and checklist sorted.",
    countries: ["Indonesia"],
  },
  {
    name: "GoFix",
    vertical: "daily",
    icon: "wrench",
    tagline: "Handy repairs, booked in a tap.",
    description: "AC servicing, plumbing and small fixes handled by verified technicians.",
    countries: ["Indonesia"],
  },
  {
    name: "GoAuto",
    vertical: "daily",
    icon: "car",
    tagline: "Vehicle care and roadside help.",
    description: "Car and motorbike servicing, plus emergency assistance when you need it most.",
    countries: ["Indonesia"],
  },
  // Business
  {
    name: "GoBiz",
    vertical: "business",
    icon: "store",
    tagline: "The all-in-one app for merchant-partners.",
    description:
      "Manage orders, promotions, payments and insights across GoFood and GoPay from a single dashboard.",
    countries: ["Indonesia", "Singapore"],
  },
  {
    name: "GoStore",
    vertical: "business",
    icon: "building",
    tagline: "Launch your online storefront in minutes.",
    description: "A no-code shopfront that helps small businesses sell online and accept GoPay.",
    countries: ["Indonesia"],
  },
  {
    name: "Midtrans",
    vertical: "business",
    icon: "card",
    tagline: "Payment gateway trusted by businesses.",
    description: "Accept dozens of payment methods online with one integration and clear reporting.",
    countries: ["Indonesia"],
  },
  {
    name: "Moka",
    vertical: "business",
    icon: "receipt",
    tagline: "Cloud point-of-sale for growing stores.",
    description: "Ring up sales, track inventory and understand your customers across every outlet.",
    countries: ["Indonesia"],
  },
  // News & Entertainment
  {
    name: "GoPlay",
    vertical: "entertainment",
    icon: "movie",
    tagline: "Stream exclusive movies and series.",
    description: "Original shows and curated films you can watch anywhere, ad-free.",
    countries: ["Indonesia"],
  },
  {
    name: "GoTix",
    vertical: "entertainment",
    icon: "ticket",
    tagline: "Book event and cinema tickets.",
    description: "Discover concerts, shows and movies, then check out in seconds with GoPay.",
    countries: ["Indonesia"],
  },
  {
    name: "GoGames",
    vertical: "entertainment",
    icon: "game",
    tagline: "Recharge and play your favourite games.",
    description: "Buy vouchers and in-game credit for popular titles, delivered instantly.",
    countries: ["Indonesia"],
  },
  {
    name: "GoNews",
    vertical: "entertainment",
    icon: "news",
    tagline: "Curated news, personalised for you.",
    description: "Stay across headlines, sport and lifestyle picked for what you care about.",
    countries: ["Indonesia"],
  },
];

export function productsByVertical(vertical: VerticalId): Product[] {
  return products.filter((p) => p.vertical === vertical);
}

export function filterProducts(query: string, vertical: VerticalId | "all"): Product[] {
  const q = query.trim().toLowerCase();
  return products.filter((p) => {
    const matchesVertical = vertical === "all" || p.vertical === vertical;
    const matchesQuery =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchesVertical && matchesQuery;
  });
}
