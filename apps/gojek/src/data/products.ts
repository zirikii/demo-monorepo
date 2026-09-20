import type { Product, ProductCategory } from "./types";

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  transport: "Transport & Logistics",
  food: "Food & Shopping",
  payments: "Payments",
  daily: "Daily needs",
  business: "Business",
  entertainment: "News & Entertainment",
};

export const CATEGORY_COLOR: Record<ProductCategory, string> = {
  transport: "go-ride",
  food: "go-food",
  payments: "go-pay",
  daily: "go-daily",
  business: "go-biz",
  entertainment: "go-play",
};

export const CATEGORIES: ProductCategory[] = [
  "transport",
  "food",
  "payments",
  "daily",
  "business",
  "entertainment",
];

export const PRODUCTS: Product[] = [
  {
    slug: "goride",
    name: "GoRide",
    category: "transport",
    tagline: "Your two-wheeler taxi, the indigenous Ojek.",
    summary:
      "The motorcycle taxi that painted Jakarta green. Skip traffic with Economy or Comfort, every trip covered by PerjalananAman+.",
    color: "#00AA13",
  },
  {
    slug: "gocar",
    name: "GoCar",
    category: "transport",
    tagline: "Comfort on wheels. Sit back. Sleep. Snore.",
    summary:
      "Private cars for you, your family, and the laptop bag that needs its own seat. Standard, XL, and Premium.",
    color: "#00AA13",
  },
  {
    slug: "gosend",
    name: "GoSend",
    category: "transport",
    tagline: "Send or get packages delivered within hours.",
    summary:
      "Instant and same-day C2C delivery with on-time guarantee and shipment insurance — documents before lunch, parcels before dusk.",
    color: "#00AA13",
  },
  {
    slug: "gobox",
    name: "GoBox",
    category: "transport",
    tagline: "Moving out? We'll do the weights.",
    summary:
      "On-demand trucks for bulky moves. From kos-kosan mattresses to a warung's weekend restock.",
    color: "#00AA13",
  },
  {
    slug: "gobluebird",
    name: "GoBluebird",
    category: "transport",
    tagline: "Ride exclusive with the Bluebird.",
    summary:
      "One tap to book a Bluebird taxi through the Super App — metered, familiar, and sitting in the same wallet as GoRide.",
    color: "#0033A0",
  },
  {
    slug: "gotransit",
    name: "GoTransit",
    category: "transport",
    tagline: "Your commute assistant, with or without Gojek.",
    summary:
      "Multi-modal journey planner that stitches TransJakarta, MRT, KRL, and last-mile GoRide into one trip.",
    color: "#00AA13",
  },
  {
    slug: "gofood",
    name: "GoFood",
    category: "food",
    tagline: "From warung nasi to late-night martabak.",
    summary:
      "Food delivery from hundreds of thousands of merchants. Daily promos, free-delivery vouchers, and drivers who know the gang.",
    color: "#EE2737",
  },
  {
    slug: "gomart",
    name: "GoMart",
    category: "food",
    tagline: "Groceries at the door in about 30 minutes.",
    summary:
      "Indomie, formula, and the one ingredient the recipe forgot — picked from convenience stores and wet-market partners.",
    color: "#EE2737",
  },
  {
    slug: "goshop",
    name: "GoShop",
    category: "food",
    tagline: "A personal concierge for anything in the neighbourhood.",
    summary:
      "Driver-partners shop the list you type. Pharmacy, bookstore, or that specific sambal from the stall two blocks over.",
    color: "#EE2737",
  },
  {
    slug: "gomed",
    name: "GoMed",
    category: "food",
    tagline: "Pharmacy-grade delivery when the fever hits.",
    summary:
      "Prescriptions and OTC from partner pharmacies, with the same tracking you already trust for GoFood.",
    color: "#EE2737",
  },
  {
    slug: "gopay",
    name: "GoPay",
    category: "payments",
    tagline: "Top-ups, QRIS, transfers — the wallet the Super App runs on.",
    summary:
      "Balances, bills, and merchant QR in one secure stack. The rails under almost every Gojek checkout.",
    color: "#00AED6",
  },
  {
    slug: "gobills",
    name: "GoBills",
    category: "payments",
    tagline: "PLN, PDAM, BPJS, and the rest of the monthly stack.",
    summary: "Pay household bills without leaving the app or queuing at the counter.",
    color: "#00AED6",
  },
  {
    slug: "gopulsa",
    name: "GoPulsa",
    category: "payments",
    tagline: "Airtime and data before the bar drops to one.",
    summary: "Operator top-ups that settle in seconds, paid from GoPay or a linked card.",
    color: "#00AED6",
  },
  {
    slug: "paylater",
    name: "PayLater",
    category: "payments",
    tagline: "Split today's ride across the month.",
    summary:
      "A credit line inside the Super App for riders who need the trip now and the settlement later.",
    color: "#00AED6",
  },
  {
    slug: "gomassage",
    name: "GoMassage",
    category: "daily",
    tagline: "A therapist to your living room.",
    summary: "On-demand massage after the 90-minute commute down Sudirman.",
    color: "#F37021",
  },
  {
    slug: "goclean",
    name: "GoClean",
    category: "daily",
    tagline: "A cleaner who already knows the building lobby.",
    summary: "Home cleaning slots booked like a GoRide — tracked, rated, cashless.",
    color: "#F37021",
  },
  {
    slug: "goglam",
    name: "GoGlam",
    category: "daily",
    tagline: "Makeup and nails without the salon wait.",
    summary: "Beauty professionals who travel to kos, condo, or the hotel before the event.",
    color: "#F37021",
  },
  {
    slug: "goauto",
    name: "GoAuto",
    category: "daily",
    tagline: "A mechanic for the scooter that earns the day's orders.",
    summary: "On-demand vehicle care for driver-partners and customers who cannot lose a Saturday.",
    color: "#F37021",
  },
  {
    slug: "gobiz",
    name: "GoBiz",
    category: "business",
    tagline: "The merchant OS for warungs and chains.",
    summary:
      "Orders, promotions, and settlements for the 900,000+ food merchants that keep GoFood loud at lunch.",
    color: "#7B2D8E",
  },
  {
    slug: "gocorp",
    name: "GoCorp",
    category: "business",
    tagline: "Corporate trips your finance team can actually close.",
    summary:
      "A platform for companies to book, monitor, and reconcile employee rides and deliveries.",
    color: "#7B2D8E",
  },
  {
    slug: "gosend-api",
    name: "GoSend API",
    category: "business",
    tagline: "B2B2C delivery for partners who already have the order.",
    summary: "Drop a package into Gojek logistics from a checkout you already own.",
    color: "#7B2D8E",
  },
  {
    slug: "goplay",
    name: "GoPlay",
    category: "entertainment",
    tagline: "Originals and live when the ride is stuck at Harmoni.",
    summary: "Video for the Super App generation — short enough for a GoRide, long enough for GoCar.",
    color: "#DF1995",
  },
  {
    slug: "gotix",
    name: "GoTix",
    category: "entertainment",
    tagline: "Tickets without the WhatsApp broker.",
    summary: "Cinema, concerts, and events sitting next to the ride that gets you there.",
    color: "#DF1995",
  },
  {
    slug: "gonews",
    name: "GoNews",
    category: "entertainment",
    tagline: "Headlines between pick-up and drop-off.",
    summary: "A news surface inside the Super App, not a separate destination you forget to open.",
    color: "#DF1995",
  },
];

export function productsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
