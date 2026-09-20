import type { Product, ProductCategory, ProductCategoryId } from "./types";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "transport-logistics",
    name: "Transport & Logistics",
    blurb: "Getting people and parcels across the city, whatever the traffic is doing.",
    accent: "var(--color-go-green)",
  },
  {
    id: "food-shopping",
    name: "Food & Shopping",
    blurb: "Warungs, restaurants, and groceries, matched to the nearest available rider.",
    accent: "var(--color-go-food)",
  },
  {
    id: "payments",
    name: "Payments",
    blurb: "A wallet, a QR network, and the ledger underneath both of them.",
    accent: "var(--color-go-pay)",
  },
  {
    id: "daily-needs",
    name: "Daily Needs",
    blurb: "The small errands that quietly eat a weekday.",
    accent: "var(--color-go-green-dark)",
  },
  {
    id: "business",
    name: "Business",
    blurb: "Tools that let a single-stall merchant operate like a chain.",
    accent: "var(--color-go-biz)",
  },
  {
    id: "news-entertainment",
    name: "News & Entertainment",
    blurb: "Screens, tickets, and stories for the hours between trips.",
    accent: "var(--color-go-play)",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "goride",
    name: "GoRide",
    category: "transport-logistics",
    tagline: "The two-wheeler taxi that started all of this.",
    summary:
      "Motorbike ride-hailing built for cities where a car simply cannot get there in time. Matching, routing, and pricing all run on the same allocation service that powers every other trip on the platform.",
    markets: ["Indonesia", "Singapore", "Vietnam"],
    since: 2015,
    highlights: [
      "Pickup points curated street by street for dense kampung addresses",
      "Helmet and mask compliance checks built into the driver app",
      "Live trip sharing with a trusted-contact list",
    ],
    engineering: [
      "Allocation runs a rolling batch auction every few hundred milliseconds",
      "Map matching corrects GPS drift caused by tall buildings along Sudirman",
      "Surge is modelled per S2 cell rather than per district",
    ],
    stats: [
      { label: "Cities", value: "170+" },
      { label: "Median pickup", value: "4.2 min" },
      { label: "Driver partners", value: "2.1M" },
    ],
  },
  {
    slug: "gocar",
    name: "GoCar",
    category: "transport-logistics",
    tagline: "Four wheels, air conditioning, and room for the shopping.",
    summary:
      "Car ride-hailing across standard, comfort, and airport tiers. Shares the same pricing engine as GoRide, with a separate supply pool and its own fatigue-management rules for drivers.",
    markets: ["Indonesia", "Singapore", "Vietnam"],
    since: 2016,
    highlights: [
      "Airport queues managed by virtual lane rather than physical rank",
      "Child-seat and accessibility requests carried through to allocation",
      "Fare estimates that hold for the length of the booking funnel",
    ],
    engineering: [
      "Trip pricing is deterministic and replayable for dispute resolution",
      "Idle-fleet rebalancing nudges supply toward predicted demand",
      "Driver fatigue windows enforced in the allocation filter, not the client",
    ],
    stats: [
      { label: "Vehicle tiers", value: "5" },
      { label: "Airport lanes", value: "23" },
      { label: "Avg rating", value: "4.9" },
    ],
  },
  {
    slug: "gosend",
    name: "GoSend",
    category: "transport-logistics",
    tagline: "Documents and parcels across town in hours, not days.",
    summary:
      "Instant and same-day courier built on the rider network. Businesses plug into the same service through an API that handles batching, proof of delivery, and reattempts.",
    markets: ["Indonesia", "Singapore"],
    since: 2015,
    highlights: [
      "Instant, same-day, and scheduled windows on one booking flow",
      "Photo and signature proof of delivery attached to every job",
      "Bulk drop-off flow for sellers shipping dozens of orders a day",
    ],
    engineering: [
      "Batching solver groups parcels by corridor without breaking promises",
      "Chain-of-custody events are append-only and independently auditable",
      "Merchant API is idempotent on client-supplied reference keys",
    ],
    stats: [
      { label: "Parcels a day", value: "1.4M" },
      { label: "On-time rate", value: "97.6%" },
      { label: "API partners", value: "8,900" },
    ],
  },
  {
    slug: "gobox",
    name: "GoBox",
    category: "transport-logistics",
    tagline: "For the loads a motorbike was never going to carry.",
    summary:
      "Pickups, vans, and small trucks for moving house, restocking a shop, or shifting a fridge. Quoting accounts for volume, access restrictions, and helper headcount.",
    markets: ["Indonesia"],
    since: 2016,
    highlights: [
      "Four vehicle classes from pickup to single-axle box truck",
      "Optional helpers booked alongside the vehicle",
      "Multi-stop routes with per-stop waiting allowances",
    ],
    engineering: [
      "Truck routing honours weight and time-of-day road restrictions",
      "Volume estimator trained on photographed loads, reviewed by operations",
      "Waiting time metered server-side to keep disputes evidence-backed",
    ],
    stats: [
      { label: "Vehicle classes", value: "4" },
      { label: "Cities", value: "42" },
      { label: "Avg load", value: "620 kg" },
    ],
  },
  {
    slug: "gotransit",
    name: "GoTransit",
    category: "transport-logistics",
    tagline: "Your commute, stitched together end to end.",
    summary:
      "Multimodal journey planning that pairs commuter rail and bus legs with a first- and last-mile ride, so the whole trip is priced and booked in one place.",
    markets: ["Indonesia"],
    since: 2022,
    highlights: [
      "Rail and bus timetables blended with live ride availability",
      "Single fare covering the transit leg and both ride legs",
      "Platform-level pickup points at major interchanges",
    ],
    engineering: [
      "GTFS feeds normalised nightly and diffed against operator notices",
      "Journey planner ranks options by reliability, not just duration",
      "Ride legs are held briefly so a late train does not strand a rider",
    ],
    stats: [
      { label: "Stations", value: "310" },
      { label: "Daily journeys", value: "180K" },
      { label: "Modes", value: "3" },
    ],
  },
  {
    slug: "gofood",
    name: "GoFood",
    category: "food-shopping",
    tagline: "From the warung on the corner to the chain across town.",
    summary:
      "Food delivery connecting hundreds of thousands of merchants with riders and hungry customers. The hard part is not the menu; it is predicting how long the kitchen will actually take.",
    markets: ["Indonesia", "Singapore", "Vietnam"],
    since: 2015,
    highlights: [
      "Menus that follow real opening hours, including stall-by-stall pauses",
      "Group ordering with per-person payment splits",
      "Bundle pricing negotiated directly by merchants",
    ],
    engineering: [
      "Prep-time model is per merchant per hour, not a single global constant",
      "Rider assignment waits for the predicted ready moment to cut idle time",
      "Search reranks on delivery feasibility before relevance",
    ],
    stats: [
      { label: "Merchants", value: "1M+" },
      { label: "Orders a day", value: "3.2M" },
      { label: "Avg delivery", value: "24 min" },
    ],
  },
  {
    slug: "gomart",
    name: "GoMart",
    category: "food-shopping",
    tagline: "Groceries picked in-store while you carry on with your day.",
    summary:
      "On-demand grocery from partner supermarkets and dark stores, with substitutions handled in-app so a missing brand does not cancel the whole basket.",
    markets: ["Indonesia", "Singapore"],
    since: 2018,
    highlights: [
      "Live substitution approvals while the picker is still in the aisle",
      "Weight-based items repriced at checkout, not guessed upfront",
      "Chilled and ambient baskets split across the right bags",
    ],
    engineering: [
      "Inventory sync polls partner systems and decays confidence over time",
      "Picker app works offline in basements with poor reception",
      "Refunds for unavailable lines issue automatically within the hour",
    ],
    stats: [
      { label: "Partner stores", value: "6,700" },
      { label: "SKUs", value: "240K" },
      { label: "Fill rate", value: "96.1%" },
    ],
  },
  {
    slug: "goshop",
    name: "GoShop",
    category: "food-shopping",
    tagline: "If a shop will sell it, a rider can fetch it.",
    summary:
      "Concierge buying for anything not covered by a catalogue. The customer describes the item, the rider confirms the price in store, and the platform settles the difference.",
    markets: ["Indonesia"],
    since: 2016,
    highlights: [
      "Free-text requests with a photo and a spending cap",
      "In-store price confirmation before the rider pays",
      "Receipt capture attached to the order record",
    ],
    engineering: [
      "Spending caps enforced on the payment authorisation, not in the UI",
      "Fraud scoring runs on the request text and the rider's purchase history",
      "Receipt OCR reconciles line items against the cap automatically",
    ],
    stats: [
      { label: "Cities", value: "88" },
      { label: "Avg basket", value: "Rp 180K" },
      { label: "Completion", value: "92.4%" },
    ],
  },
  {
    slug: "gopay",
    name: "GoPay",
    category: "payments",
    tagline: "The wallet the rest of the platform is settled in.",
    summary:
      "Stored-value wallet, QR acceptance, transfers, and bill payments. Every other product in the portfolio eventually resolves to a GoPay ledger entry.",
    markets: ["Indonesia", "Singapore"],
    since: 2016,
    highlights: [
      "QRIS acceptance at merchants of every size",
      "Instant transfers between wallets and partner banks",
      "Spending history grouped by service and merchant",
    ],
    engineering: [
      "Double-entry ledger with idempotent postings and daily reconciliation",
      "Risk engine scores a transaction before the balance is reserved",
      "Regional isolation keeps a payment-rail outage from spreading",
    ],
    stats: [
      { label: "Txns a day", value: "38M" },
      { label: "Success rate", value: "99.98%" },
      { label: "Merchants", value: "2.6M" },
    ],
  },
  {
    slug: "gotagihan",
    name: "GoTagihan",
    category: "payments",
    tagline: "Bills paid before the reminder arrives.",
    summary:
      "Electricity, water, internet, insurance, and government levies in one place, with saved billers and scheduled payments so nothing lapses.",
    markets: ["Indonesia"],
    since: 2017,
    highlights: [
      "Saved billers with due-date reminders",
      "Scheduled payments that retry on a failed biller connection",
      "Receipts stored for two years of history",
    ],
    engineering: [
      "Biller connectors are circuit-broken and retried with jittered backoff",
      "Settlement files are reconciled nightly against biller statements",
      "A failed biller call never double-charges: reservations expire cleanly",
    ],
    stats: [
      { label: "Billers", value: "480" },
      { label: "Scheduled payments", value: "5.1M" },
      { label: "Retry success", value: "88%" },
    ],
  },
  {
    slug: "gopulsa",
    name: "GoPulsa",
    category: "payments",
    tagline: "Top-ups that land before the call drops.",
    summary:
      "Mobile credit and data packages for every major operator, purchased from the wallet and delivered in seconds.",
    markets: ["Indonesia"],
    since: 2016,
    highlights: [
      "All major operators and data bundle sizes",
      "Repeat top-ups for saved numbers",
      "Automatic refund when an operator rejects the top-up",
    ],
    engineering: [
      "Operator adapters normalise wildly different response semantics",
      "Delivery confirmation is polled, not assumed from a 200 response",
      "Refunds fire from the reconciliation job, not the request thread",
    ],
    stats: [
      { label: "Operators", value: "11" },
      { label: "Median delivery", value: "3.1 s" },
      { label: "Auto refunds", value: "< 1%" },
    ],
  },
  {
    slug: "gopaylater",
    name: "GoPayLater",
    category: "payments",
    tagline: "A small line of credit for the weeks that need one.",
    summary:
      "Deferred payment for platform transactions, underwritten on platform behaviour rather than a traditional credit file, with limits that move slowly in both directions.",
    markets: ["Indonesia"],
    since: 2019,
    highlights: [
      "One monthly statement across every service used",
      "Limits that adjust gradually as repayment history builds",
      "Clear in-app breakdown of fees before confirmation",
    ],
    engineering: [
      "Underwriting features are versioned and every decision is replayable",
      "Statement generation is idempotent and safe to re-run",
      "Collections messaging is rate-limited and auditable",
    ],
    stats: [
      { label: "Approval time", value: "< 60 s" },
      { label: "Repayment rate", value: "97.2%" },
      { label: "Avg limit", value: "Rp 1.8M" },
    ],
  },
  {
    slug: "goclub",
    name: "GoClub",
    category: "daily-needs",
    tagline: "Loyalty that rewards the weekly habit, not the one big splurge.",
    summary:
      "Tiered rewards earned across every service, redeemable for vouchers and delivery perks. Tiers are earned on frequency rather than spend.",
    markets: ["Indonesia", "Singapore"],
    since: 2019,
    highlights: [
      "Four tiers with progressive perks",
      "Tokens redeemable across rides, food, and payments",
      "Seasonal challenges that unlock bonus tokens",
    ],
    engineering: [
      "Token grants are event-sourced from completed transactions",
      "Tier recalculation runs nightly with a documented grace period",
      "Redemption is a two-phase reservation to prevent double spends",
    ],
    stats: [
      { label: "Tiers", value: "4" },
      { label: "Members", value: "19M" },
      { label: "Tokens redeemed", value: "310M" },
    ],
  },
  {
    slug: "gocorp",
    name: "GoCorp",
    category: "daily-needs",
    tagline: "Company travel without the receipt shoebox.",
    summary:
      "Business travel accounts with policy controls, cost centres, and monthly invoicing, so employees book rides without paying out of pocket.",
    markets: ["Indonesia", "Singapore"],
    since: 2019,
    highlights: [
      "Policies per team, cost centre, and time of day",
      "Consolidated monthly invoicing with tax documentation",
      "Trip approvals for anything outside policy",
    ],
    engineering: [
      "Policy evaluation happens at booking time and is explained in-app",
      "Invoice generation is deterministic and reproducible on demand",
      "Admin actions land in an immutable audit log",
    ],
    stats: [
      { label: "Companies", value: "12K" },
      { label: "Policy rules", value: "26 types" },
      { label: "Invoice accuracy", value: "99.99%" },
    ],
  },
  {
    slug: "gogreener",
    name: "GoGreener",
    category: "daily-needs",
    tagline: "Measuring the footprint, then doing something about it.",
    summary:
      "Carbon accounting for trips and deliveries, paired with offset contributions and a growing electric two-wheeler fleet.",
    markets: ["Indonesia"],
    since: 2021,
    highlights: [
      "Per-trip emissions estimates shown at completion",
      "Optional offset contribution at checkout",
      "Electric fleet availability flagged in the booking flow",
    ],
    engineering: [
      "Emission factors are versioned per vehicle class and refreshed annually",
      "Offset purchases are reconciled against registry retirements",
      "Fleet electrification data feeds the same allocation service",
    ],
    stats: [
      { label: "EV fleet", value: "8,400" },
      { label: "Trips measured", value: "100%" },
      { label: "Offsets retired", value: "62K t" },
    ],
  },
  {
    slug: "gobiz",
    name: "GoBiz",
    category: "business",
    tagline: "One app to run the stall, the kitchen, and the promos.",
    summary:
      "The merchant side of the platform: orders, menus, payouts, promotions, and ads, designed to work on the cheapest Android device in the shop.",
    markets: ["Indonesia", "Singapore", "Vietnam"],
    since: 2019,
    highlights: [
      "Live order queue with a kitchen-friendly layout",
      "Menu edits that publish in under a minute",
      "Daily payout visibility with settlement breakdowns",
    ],
    engineering: [
      "Offline-first order queue that reconciles when the shop's Wi-Fi returns",
      "Menu publishing is a versioned document with instant rollback",
      "Push delivery falls back to polling on unreliable networks",
    ],
    stats: [
      { label: "Merchants", value: "1.1M" },
      { label: "Menu edits a day", value: "420K" },
      { label: "Payout SLA", value: "T+1" },
    ],
  },
  {
    slug: "gostore",
    name: "GoStore",
    category: "business",
    tagline: "A storefront for merchants who never wanted to build a website.",
    summary:
      "Hosted online storefronts with catalogue, checkout, and delivery integration, spun up from an existing GoBiz menu in a few taps.",
    markets: ["Indonesia"],
    since: 2020,
    highlights: [
      "Storefront generated from the merchant's existing catalogue",
      "Delivery quotes from GoSend at checkout",
      "Custom domains for merchants who want one",
    ],
    engineering: [
      "Storefronts render from a shared edge cache with per-merchant purge",
      "Checkout is the same payment service used by the consumer app",
      "Catalogue changes propagate through a single event stream",
    ],
    stats: [
      { label: "Storefronts", value: "146K" },
      { label: "Setup time", value: "< 10 min" },
      { label: "Conversion lift", value: "+18%" },
    ],
  },
  {
    slug: "gokasir",
    name: "GoKasir",
    category: "business",
    tagline: "A point of sale that runs on the tablet already behind the counter.",
    summary:
      "Cloud point of sale covering orders, inventory, shifts, and reporting, with the same catalogue as the delivery channel so stock never diverges.",
    markets: ["Indonesia"],
    since: 2021,
    highlights: [
      "Dine-in, takeaway, and delivery on one order list",
      "Shift handover with cash reconciliation",
      "Stock deductions shared with the delivery catalogue",
    ],
    engineering: [
      "Local-first data model with conflict resolution on reconnect",
      "Receipt printing abstracted across a dozen thermal printer dialects",
      "Reporting reads from a separate store to keep the till responsive",
    ],
    stats: [
      { label: "Outlets", value: "58K" },
      { label: "Offline tolerance", value: "72 h" },
      { label: "Printers supported", value: "31" },
    ],
  },
  {
    slug: "gospiker",
    name: "GoSpiker",
    category: "business",
    tagline: "The payment confirmation the whole shop can hear.",
    summary:
      "A small speaker that announces successful QR payments out loud, so busy merchants do not need to squint at a phone during a rush.",
    markets: ["Indonesia"],
    since: 2022,
    highlights: [
      "Audible confirmation within two seconds of payment",
      "Works over cellular where shop Wi-Fi is unreliable",
      "Daily summary announced at closing time",
    ],
    engineering: [
      "Device fleet managed with signed over-the-air firmware updates",
      "Announcements are deduplicated against replayed payment events",
      "Battery and connectivity telemetry drives proactive replacement",
    ],
    stats: [
      { label: "Devices", value: "310K" },
      { label: "Announce latency", value: "1.8 s" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    slug: "goads",
    name: "GoAds",
    category: "business",
    tagline: "Promotion budgets that a single-stall merchant can actually afford.",
    summary:
      "Self-serve advertising across search and discovery surfaces, with budgets starting small enough for a neighbourhood warung.",
    markets: ["Indonesia"],
    since: 2020,
    highlights: [
      "Daily budgets from a few dollars upward",
      "Placement previews before a campaign goes live",
      "Attribution reporting tied to completed orders",
    ],
    engineering: [
      "Auction runs inline with search ranking under a strict latency budget",
      "Budget pacing is enforced centrally to avoid overspend on replays",
      "Attribution joins impressions to orders in a streaming pipeline",
    ],
    stats: [
      { label: "Advertisers", value: "210K" },
      { label: "Min daily budget", value: "Rp 20K" },
      { label: "Auction p99", value: "11 ms" },
    ],
  },
  {
    slug: "goplay",
    name: "GoPlay",
    category: "news-entertainment",
    tagline: "Local stories, streamed to the commute.",
    summary:
      "Streaming for locally produced series and films, with downloads sized for a data plan rather than a fibre connection.",
    markets: ["Indonesia"],
    since: 2019,
    highlights: [
      "Originals commissioned with regional studios",
      "Download quality tuned for mobile data plans",
      "Continue-watching that survives switching devices",
    ],
    engineering: [
      "Per-title encoding ladders rather than one global profile",
      "Playback telemetry drives CDN selection per region",
      "DRM licence issuance is rate-limited per account",
    ],
    stats: [
      { label: "Titles", value: "1,200" },
      { label: "Originals", value: "60" },
      { label: "Avg bitrate", value: "1.4 Mbps" },
    ],
  },
  {
    slug: "gotix",
    name: "GoTix",
    category: "news-entertainment",
    tagline: "Tickets bought in the queue, not for the queue.",
    summary:
      "Event and cinema ticketing with wallet checkout and QR entry, built to survive the thundering herd when a popular show goes on sale.",
    markets: ["Indonesia"],
    since: 2016,
    highlights: [
      "Seat selection with a live hold timer",
      "QR entry that works with no signal at the gate",
      "Waiting room for high-demand on-sales",
    ],
    engineering: [
      "Seat holds use a distributed lock with a hard expiry",
      "Waiting room admits users at a measured rate to protect inventory",
      "Offline-verifiable tickets signed at issue time",
    ],
    stats: [
      { label: "Venues", value: "2,300" },
      { label: "Peak on-sale", value: "90K/min" },
      { label: "Gate scan", value: "0.4 s" },
    ],
  },
  {
    slug: "gonews",
    name: "GoNews",
    category: "news-entertainment",
    tagline: "The headlines that matter to the trip you are on.",
    summary:
      "A lightweight news surface inside the app, mixing partner publishers with service updates relevant to the city you are currently in.",
    markets: ["Indonesia"],
    since: 2018,
    highlights: [
      "City-aware feed with transport and weather alerts",
      "Publisher partnerships with clear attribution",
      "Low-data mode that strips heavy media",
    ],
    engineering: [
      "Feed assembly is cached per city and refreshed on publisher webhooks",
      "Ranking excludes anything a reader has dismissed twice",
      "Images are transcoded to the narrowest viable format per device",
    ],
    stats: [
      { label: "Publishers", value: "70" },
      { label: "Cities", value: "34" },
      { label: "Feed refresh", value: "2 min" },
    ],
  },
];

export function productsByCategory(category: ProductCategoryId): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function categoryById(id: ProductCategoryId): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((category) => category.id === id);
}
