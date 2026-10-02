export type Product = {
  slug: string;
  name: string;
  group: "Distribution" | "Revenue" | "Guest experience";
  tagline: string;
  summary: string;
  image: string;
  features: { title: string; body: string }[];
  stat: { value: string; label: string };
};

export const PRODUCTS: Product[] = [
  {
    slug: "channel-manager",
    name: "Channel Manager",
    group: "Distribution",
    tagline: "Sell every room on 450+ channels, in real time.",
    summary:
      "Connect to the world's biggest booking sites and update rates and availability everywhere at once. Bookings flow straight into your PMS so you never double-sell.",
    image: "media/ultrasync.webp",
    features: [
      {
        title: "UltraSync",
        body: "Two-way updates in under a second across every connected channel.",
      },
      {
        title: "Smart mapping",
        body: "Map room types and rate plans once, and get warned the moment a mapping breaks.",
      },
      {
        title: "Automatic close-outs",
        body: "Sell your last room on one channel and it's closed everywhere else instantly.",
      },
      {
        title: "Restrictions everywhere",
        body: "Minimum stays, closed to arrival and stop sells pushed to every channel in one click.",
      },
    ],
    stat: { value: "450+", label: "connected channels" },
  },
  {
    slug: "booking-engine",
    name: "Booking Engine",
    group: "Distribution",
    tagline: "Commission-free bookings from your own website.",
    summary:
      "A fast, mobile-first booking engine that turns website visitors into guests, with upsells, promo codes and secure payments built in.",
    image: "media/booking-engine.webp",
    features: [
      { title: "Mobile-first checkout", body: "Three steps from search to booked, on any device." },
      {
        title: "Upsells and packages",
        body: "Offer breakfast, parking and late check-out while guests book.",
      },
      {
        title: "Member rates",
        body: "Reward guests who book direct with rates the OTAs don't see.",
      },
      {
        title: "40+ languages and currencies",
        body: "Show prices the way your guests expect to see them.",
      },
    ],
    stat: { value: "0%", label: "commission on direct bookings" },
  },
  {
    slug: "website-builder",
    name: "Website Builder",
    group: "Distribution",
    tagline: "A beautiful hotel website, live in days.",
    summary:
      "Hotel-specific templates with your booking engine built in, SEO best practice baked in and no developer required.",
    image: "media/guests-finding.webp",
    features: [
      { title: "Hotel templates", body: "Designed for conversion, tuned for speed." },
      { title: "Integrated booking", body: "Your rates and availability on every page." },
      { title: "SEO ready", body: "Structured data, fast pages and clean URLs out of the box." },
      { title: "Edit anything", body: "Change photos, offers and copy without code." },
    ],
    stat: { value: "2x", label: "faster than the average hotel site" },
  },
  {
    slug: "demand-plus",
    name: "Demand Plus",
    group: "Distribution",
    tagline: "Get found on Google, Trivago and Tripadvisor.",
    summary:
      "Metasearch campaigns managed for you, sending guests to your booking engine with spend capped and results in one place.",
    image: "media/bangkok.webp",
    features: [
      {
        title: "Google Hotel Ads",
        body: "Appear with live prices when travellers search for your hotel.",
      },
      { title: "Managed bidding", body: "We optimise bids daily so you don't have to." },
      { title: "Capped spend", body: "Set a monthly budget and never exceed it." },
      {
        title: "Clear reporting",
        body: "See bookings, revenue and return on ad spend in Insights.",
      },
    ],
    stat: { value: "+50%", label: "direct bookings for Demand Plus properties" },
  },
  {
    slug: "metasearch",
    name: "Metasearch",
    group: "Distribution",
    tagline: "Your live rates on every comparison site.",
    summary:
      "Connect your booking engine to Google, Trivago, Tripadvisor and more so travellers comparing prices can book you direct.",
    image: "media/guests-finding.webp",
    features: [
      { title: "Free booking links", body: "List on Google free booking links in minutes." },
      { title: "Price accuracy", body: "Rates pulled straight from your channel manager." },
      { title: "Pay per stay", body: "Choose commission or cost-per-click models." },
      { title: "One dashboard", body: "Every metasearch channel side by side." },
    ],
    stat: { value: "6", label: "metasearch partners" },
  },
  {
    slug: "gds",
    name: "Global Distribution System",
    group: "Distribution",
    tagline: "Reach corporate and agency travellers worldwide.",
    summary:
      "Appear in Amadeus, Sabre and Travelport so travel agents and corporate bookers can find and book your property.",
    image: "media/event-stage-wide.webp",
    features: [
      { title: "600,000+ agents", body: "Be bookable by travel agents in over 200 countries." },
      { title: "Corporate rates", body: "Load negotiated rates for your corporate accounts." },
      { title: "Commission handled", body: "Agent commissions settled for you." },
      {
        title: "Same inventory",
        body: "GDS sells from the same availability as every other channel.",
      },
    ],
    stat: { value: "600k+", label: "travel agents" },
  },
  {
    slug: "payments",
    name: "SiteMinder Pay",
    group: "Revenue",
    tagline: "Get paid faster, with fewer no-shows.",
    summary:
      "Built with Stripe. Take deposits, charge virtual cards and send payment links from the same place you manage bookings.",
    image: "media/payments-stripe.webp",
    features: [
      {
        title: "Virtual card automation",
        body: "OTA virtual cards charged on the right day, automatically.",
      },
      { title: "Payment links", body: "Send a secure link when a guest's card is declined." },
      { title: "Fraud protection", body: "3D Secure and Stripe Radar on every transaction." },
      { title: "Fast payouts", body: "Funds in your account in as little as two business days." },
    ],
    stat: { value: "Stripe", label: "powered payments" },
  },
  {
    slug: "dynamic-revenue-plus",
    name: "Dynamic Revenue Plus",
    group: "Revenue",
    tagline: "Revenue management that thinks ahead, built with IDeaS.",
    summary:
      "Explainable rate recommendations from your pickup, your competitors and the events happening near you. Accept them in one click or put pricing on autopilot.",
    image: "media/revenue-plus.webp",
    features: [
      {
        title: "Event-aware pricing",
        body: "Concerts, conferences and festivals near you priced in automatically.",
      },
      { title: "Explainable", body: "See exactly why each rate was recommended." },
      { title: "One-click apply", body: "Push recommendations to every channel instantly." },
      {
        title: "IDeaS science",
        body: "The revenue science trusted by the world's biggest hotel groups.",
      },
    ],
    stat: { value: "+20%", label: "average RevPAR uplift on events" },
  },
  {
    slug: "insights",
    name: "Insights",
    group: "Revenue",
    tagline: "Know your market before it moves.",
    summary:
      "Pace, pickup, competitor rates and a local demand calendar in one place, so every pricing decision is backed by data.",
    image: "media/dynamic-pricing.webp",
    features: [
      { title: "Demand calendar", body: "Events near your property with their expected impact." },
      { title: "Competitor rates", body: "Track up to 10 competitors daily." },
      { title: "Channel performance", body: "Revenue, commission and lead time by channel." },
      { title: "Hotel Booking Trends", body: "Benchmarks from 125,000+ properties worldwide." },
    ],
    stat: { value: "125k+", label: "properties in our data" },
  },
  {
    slug: "guest-engagement",
    name: "Guest Engagement",
    group: "Guest experience",
    tagline: "Delight guests before they arrive.",
    summary:
      "Pre-arrival messages with upgrades, add-ons and online check-in, paid with one tap through SiteMinder Pay.",
    image: "media/ancillary-revenue.webp",
    features: [
      {
        title: "Pre-arrival upsells",
        body: "Room upgrades, parking, breakfast and late check-out.",
      },
      { title: "Online check-in", body: "Collect details and ID before guests arrive." },
      { title: "Two-way messaging", body: "SMS and WhatsApp from one inbox." },
      { title: "Reviews", body: "Ask happy guests for a review at the right moment." },
    ],
    stat: { value: "$18", label: "average upsell per booking" },
  },
];

export function productBySlug(slug: string | undefined): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export type Solution = {
  slug: string;
  name: string;
  headline: string;
  body: string;
  image: string;
  points: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "independent-hotels",
    name: "Independent hotels",
    headline: "Compete with the big brands, and win.",
    body: "Everything an independent hotel needs to fill rooms at the right price: distribution, direct bookings, payments and revenue management in one platform.",
    image: "media/hotelier-interview.webp",
    points: [
      "Channel manager with 450+ channels",
      "Commission-free booking engine",
      "Event-aware revenue management",
      "24/7 support in your language",
    ],
  },
  {
    slug: "groups-and-chains",
    name: "Groups & chains",
    headline: "One platform for every property you run.",
    body: "Manage rates, availability and reporting across your portfolio, with enterprise controls, single sign-on and a dedicated account team.",
    image: "media/event-stage.webp",
    points: [
      "Multi-property rate management",
      "Portfolio-wide reporting",
      "Single sign-on and user roles",
      "Dedicated enterprise desk",
    ],
  },
  {
    slug: "small-properties",
    name: "B&Bs and small properties",
    headline: "Little Hotelier: the all-in-one for small properties.",
    body: "Front desk, channel manager, booking engine and payments designed for B&Bs, guesthouses and small hotels.",
    image: "media/little-hotelier.webp",
    points: [
      "Simple front desk",
      "Built-in channel manager",
      "Website and booking engine",
      "Mobile app",
    ],
  },
  {
    slug: "apartments",
    name: "Serviced apartments",
    headline: "Long stays and short stays, sold together.",
    body: "Sell nightly, weekly and monthly rates across hotel and holiday rental channels including Airbnb and Vrbo.",
    image: "media/guests-finding.webp",
    points: [
      "Airbnb and Vrbo connectivity",
      "Length-of-stay pricing",
      "Unit-level mapping",
      "Automated payments",
    ],
  },
  {
    slug: "resorts",
    name: "Resorts",
    headline: "Package the whole stay.",
    body: "Sell rooms with experiences, dining and spa, and price peak seasons and events with confidence.",
    image: "media/bangkok.webp",
    points: [
      "Packages and add-ons",
      "Seasonal and event pricing",
      "Wholesale and GDS distribution",
      "Guest engagement before arrival",
    ],
  },
];

export function solutionBySlug(slug: string | undefined): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  property: string;
  location: string;
  stat: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Before SiteMinder we were updating six extranets by hand. Now I change one rate and it's everywhere in seconds, and we haven't had an overbooking since.",
    name: "Kerry Lawson",
    role: "Owner",
    property: "Southern Cross Motel",
    location: "Queensland, Australia",
    stat: "+31% online revenue",
  },
  {
    quote:
      "Dynamic Revenue Plus saw the Grand Prix demand weeks before we did. We sold out at rates we'd never have dared to set ourselves.",
    name: "Hélène Martin",
    role: "Director of Revenue",
    property: "La Vie Hotels & Resorts",
    location: "Melbourne, Australia",
    stat: "+24% RevPAR on event weekends",
  },
  {
    quote:
      "Across 160 properties, SiteMinder gives every franchisee the same tools and gives us one view of the whole network.",
    name: "Tim Gordon",
    role: "Head of Distribution",
    property: "Quest Apartment Hotels",
    location: "Australia & New Zealand",
    stat: "160+ properties",
  },
  {
    quote:
      "Our direct bookings doubled in a year once the website, booking engine and metasearch were all working together.",
    name: "Nattaya Srisuk",
    role: "General Manager",
    property: "Signature Pattaya Hotel",
    location: "Pattaya, Thailand",
    stat: "2x direct bookings",
  },
];

export type Resource = {
  slug: string;
  title: string;
  kind: "Report" | "Guide" | "Article" | "Podcast" | "News";
  image: string;
  summary: string;
  minutes: number;
  body: string[];
};

export const RESOURCES: Resource[] = [
  {
    slug: "risk-resilience-revenue-australia",
    title: "Risk, Resilience & Revenue in Australia: navigating hotel demand in 2025",
    kind: "Report",
    image: "media/report-australia.webp",
    summary: "How Australian hoteliers are reading demand, pricing events and protecting margin.",
    minutes: 12,
    body: [
      "Australian hoteliers told us demand has never been harder to read. Booking windows have shortened, and major events now drive a growing share of annual revenue.",
      "Properties that priced events early, using comparable past events as a guide, achieved an average 18% higher ADR than those that waited for pickup.",
      "The report covers channel mix, the cost of distribution, and how independent hotels are using automation to compete with the chains.",
    ],
  },
  {
    slug: "dynamic-pricing-reasons",
    title: "The top 5 reasons to use dynamic pricing",
    kind: "Guide",
    image: "media/dynamic-pricing.webp",
    summary:
      "Why static rate cards leave money on the table, and how to start pricing dynamically.",
    minutes: 7,
    body: [
      "Dynamic pricing means setting rates from demand, not from last year's rate card.",
      "The biggest gains come on the nights you'd never think to change: concerts, conferences and sporting events within a few kilometres of your property.",
      "Start with your demand calendar, set guardrails, and let automation do the daily work.",
    ],
  },
  {
    slug: "booking-engine-features",
    title: "10 must-have features of a hotel booking engine",
    kind: "Guide",
    image: "media/booking-engine.webp",
    summary: "What to look for when choosing a booking engine that converts.",
    minutes: 8,
    body: [
      "A booking engine is your most profitable channel. Mobile speed, transparent pricing and upsells matter most.",
      "Look for member rates, packages, multi-currency and secure payments built in.",
    ],
  },
  {
    slug: "ancillary-revenue-ideas",
    title: "The 8 most successful ancillary revenue ideas for hotels",
    kind: "Article",
    image: "media/ancillary-revenue.webp",
    summary: "Upgrades, add-ons and experiences guests are happy to pay for.",
    minutes: 6,
    body: [
      "Room upgrades remain the top ancillary earner, followed by parking, breakfast and late check-out.",
      "Timing matters: offers sent 3 to 7 days before arrival convert best.",
    ],
  },
  {
    slug: "standard-room-with-breakfast",
    title: "Standard Room with Breakfast: the hotel podcast",
    kind: "Podcast",
    image: "media/standard-room-podcast.webp",
    summary: "Conversations with hoteliers about what's working right now.",
    minutes: 34,
    body: [
      "Each episode, we sit down with a hotelier to talk about distribution, revenue and the guest experience.",
    ],
  },
  {
    slug: "partner-awards-2025",
    title: "SiteMinder Partner Awards 2025: the winners",
    kind: "News",
    image: "media/partner-awards.webp",
    summary: "Celebrating the partners helping hotels grow.",
    minutes: 4,
    body: [
      "This year's awards recognise partners across PMS, payments, revenue and guest experience categories.",
    ],
  },
  {
    slug: "risk-resilience-revenue-uk",
    title: "Risk, Resilience & Revenue in the UK",
    kind: "Report",
    image: "media/report-uk.webp",
    summary: "What UK hoteliers expect from demand in the year ahead.",
    minutes: 11,
    body: [
      "UK hoteliers are leaning into direct bookings and event-led pricing to protect margin.",
    ],
  },
  {
    slug: "risk-resilience-revenue-usa",
    title: "Risk, Resilience & Revenue in the USA",
    kind: "Report",
    image: "media/report-usa.webp",
    summary: "How US independents are navigating a softer leisure market.",
    minutes: 11,
    body: ["US independents are diversifying channel mix and investing in revenue automation."],
  },
];

export function resourceBySlug(slug: string | undefined): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

export type Integration = {
  name: string;
  category: "PMS" | "OTA" | "Payments" | "Revenue" | "Guest experience" | "Metasearch";
  description: string;
};

export const INTEGRATIONS: Integration[] = [
  {
    name: "Mews",
    category: "PMS",
    description: "Cloud PMS with two-way rates, availability and reservations.",
  },
  { name: "Cloudbeds", category: "PMS", description: "All-in-one PMS for independent properties." },
  {
    name: "Oracle OPERA Cloud",
    category: "PMS",
    description: "Enterprise PMS for full-service hotels.",
  },
  { name: "RMS Cloud", category: "PMS", description: "PMS for hotels, parks and apartments." },
  { name: "Apaleo", category: "PMS", description: "Open, API-first property management." },
  { name: "Protel", category: "PMS", description: "Flexible PMS used across Europe." },
  { name: "Booking.com", category: "OTA", description: "The world's largest online travel agent." },
  { name: "Expedia Group", category: "OTA", description: "Expedia, Hotels.com, Vrbo and more." },
  { name: "Airbnb", category: "OTA", description: "Hotels and apartments on Airbnb." },
  { name: "Agoda", category: "OTA", description: "Leading OTA across Asia Pacific." },
  {
    name: "Trip.com",
    category: "OTA",
    description: "Reach travellers from Greater China and beyond.",
  },
  { name: "Hotelbeds", category: "OTA", description: "Global bedbank and wholesaler." },
  {
    name: "Stripe",
    category: "Payments",
    description: "Payments infrastructure behind SiteMinder Pay.",
  },
  { name: "Adyen", category: "Payments", description: "Enterprise payments for hotel groups." },
  {
    name: "IDeaS",
    category: "Revenue",
    description: "Revenue science behind Dynamic Revenue Plus.",
  },
  { name: "Duetto", category: "Revenue", description: "Open pricing and revenue strategy." },
  {
    name: "Google Hotel Ads",
    category: "Metasearch",
    description: "Live prices in Google search and Maps.",
  },
  { name: "Trivago", category: "Metasearch", description: "Hotel price comparison." },
  { name: "Tripadvisor", category: "Metasearch", description: "Reviews and price comparison." },
  { name: "Duve", category: "Guest experience", description: "Guest app and online check-in." },
  { name: "TrustYou", category: "Guest experience", description: "Reviews and guest feedback." },
  {
    name: "Canary",
    category: "Guest experience",
    description: "Contactless check-in and upsells.",
  },
];

export const STATS = [
  { value: "53,000+", label: "hotels in 150 countries" },
  { value: "300M+", label: "room nights booked each year" },
  { value: "450+", label: "channels and integrations" },
  { value: "#1", label: "most awarded hotel platform" },
];

export const HERO_WORDS = ["demand", "control", "sync", "action", "the lead"];

export const OFFICES = [
  {
    city: "Sydney",
    region: "Global headquarters",
    address: "Level 7, 88 Cumberland Street, The Rocks NSW 2000",
  },
  { city: "London", region: "EMEA", address: "3rd Floor, 1 Fore Street Avenue, London EC2Y 9DT" },
  { city: "Dallas", region: "Americas", address: "2100 Ross Avenue, Dallas TX 75201" },
  {
    city: "Bangkok",
    region: "Asia",
    address: "Park Ventures Ecoplex, Wireless Road, Bangkok 10330",
  },
  { city: "Manila", region: "Asia", address: "Arthaland Century Pacific Tower, Taguig City" },
  { city: "Galway", region: "EMEA", address: "Galway Technology Centre, Mervue Business Park" },
];

export const PLAN_FEATURES: {
  feature: string;
  siteminder: boolean | string;
  plus: boolean | string;
  groups: boolean | string;
}[] = [
  { feature: "Channel Manager (450+ channels)", siteminder: true, plus: true, groups: true },
  { feature: "PMS integration", siteminder: true, plus: true, groups: true },
  { feature: "SiteMinder Pay", siteminder: true, plus: true, groups: true },
  { feature: "Insights and demand calendar", siteminder: true, plus: true, groups: true },
  { feature: "Booking Engine", siteminder: false, plus: true, groups: true },
  { feature: "Website Builder", siteminder: false, plus: true, groups: true },
  { feature: "Competitor rates", siteminder: false, plus: "10 competitors", groups: "Unlimited" },
  { feature: "Demand Plus metasearch", siteminder: false, plus: true, groups: true },
  { feature: "Multi-property management", siteminder: false, plus: false, groups: true },
  { feature: "Dedicated account team", siteminder: false, plus: false, groups: true },
  { feature: "24/7 support", siteminder: true, plus: true, groups: "Priority" },
];

export const FAQS = [
  {
    q: "Is there a free trial?",
    a: "Yes. Try SiteMinder free for 14 days, with no credit card required.",
  },
  {
    q: "Are there setup fees?",
    a: "No setup fees on SiteMinder or SiteMinder Plus. Our onboarding team connects your channels for you.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, upgrade or downgrade at any time from Billing. Changes apply from your next invoice.",
  },
  {
    q: "Do you charge commission?",
    a: "Never. You pay a flat monthly subscription, whatever you sell.",
  },
  {
    q: "Which PMS do you integrate with?",
    a: "Hundreds, including Mews, Cloudbeds, Oracle OPERA, RMS and Apaleo.",
  },
];
