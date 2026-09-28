export type StateCode = "NSW" | "VIC" | "QLD" | "SA" | "ACT";

export const STATES: { code: StateCode; name: string; distributor: string }[] = [
  { code: "NSW", name: "New South Wales", distributor: "Ausgrid" },
  { code: "VIC", name: "Victoria", distributor: "CitiPower" },
  { code: "QLD", name: "Queensland", distributor: "Energex" },
  { code: "SA", name: "South Australia", distributor: "SA Power Networks" },
  { code: "ACT", name: "Australian Capital Territory", distributor: "Evoenergy" },
];

export type EnergyPlan = {
  slug: string;
  name: string;
  tagline: string;
  highlight?: string;
  badge?: string;
  usageCents: number;
  supplyCentsPerDay: number;
  feedInCents: number;
  features: string[];
  bestFor: string;
  states: StateCode[];
};

export const energyPlans: EnergyPlan[] = [
  {
    slug: "value-saver",
    name: "Value Saver",
    tagline: "Our lowest-priced online plan for everyday households.",
    badge: "Popular",
    highlight: "Up to $300 in online bill credits",
    usageCents: 24.15,
    supplyCentsPerDay: 98.21,
    feedInCents: 2.0,
    features: [
      "No lock-in contract, no exit fees",
      "Variable rates",
      "Bill credits when you join online and stay 90 days",
      "Pay on time, your way — app, direct debit or BPAY",
    ],
    bestFor: "Most homes that want a simple, low price",
    states: ["NSW", "VIC", "QLD", "SA", "ACT"],
  },
  {
    slug: "smart-saver",
    name: "Smart Saver",
    tagline: "Electricity and gas with bill credits and Green Energy options.",
    usageCents: 24.15,
    supplyCentsPerDay: 165.83,
    feedInCents: 3.0,
    features: [
      "$150 electricity + $150 gas credit online",
      "3c/kWh solar feed-in tariff",
      "Add 100% GreenPower",
      "Australian made and owned energy",
    ],
    bestFor: "Dual fuel homes switching to AGL",
    states: ["NSW", "VIC", "QLD", "SA"],
  },
  {
    slug: "netflix-plan",
    name: "Netflix Plan",
    tagline: "Your energy, with Netflix Standard with ads included.",
    badge: "Includes Netflix",
    usageCents: 24.15,
    supplyCentsPerDay: 170.59,
    feedInCents: 2.0,
    features: [
      "Netflix Standard with ads, on us",
      "Upgrade and get $7.99 off your Netflix bill",
      "No lock-in contract",
      "Variable rates",
    ],
    bestFor: "Streamers who want a little extra",
    states: ["NSW", "VIC", "QLD", "SA"],
  },
  {
    slug: "solar-savers",
    name: "Solar Savers",
    tagline: "Earn more for the solar you send back to the grid.",
    badge: "Solar",
    highlight: "8c/kWh for your first 10kWh exported each day",
    usageCents: 26.4,
    supplyCentsPerDay: 104.54,
    feedInCents: 8.0,
    features: [
      "8c/kWh for the first 10kWh you export daily",
      "Track exports in the AGL app",
      "No lock-in contract",
      "Solar health checks in the app",
    ],
    bestFor: "Homes with rooftop solar",
    states: ["NSW", "VIC", "QLD", "SA"],
  },
  {
    slug: "night-saver-ev",
    name: "Night Saver EV",
    tagline: "Charge your EV for 8c/kWh between midnight and 6am.",
    badge: "EV",
    highlight: "$200 electricity credit online",
    usageCents: 8.0,
    supplyCentsPerDay: 132.78,
    feedInCents: 4.0,
    features: [
      "8c/kWh super off-peak 12am–6am",
      "Smart meter required",
      "4c/kWh solar feed-in tariff",
      "No lock-in contract",
    ],
    bestFor: "Electric vehicle owners with a smart meter",
    states: ["NSW", "VIC"],
  },
];

/** Rough annual cost for a household using `annualKwh`. Illustrative — the demo has no real tariffs. */
export function estimateAnnualCost(plan: EnergyPlan, annualKwh: number, state: StateCode): number {
  const stateFactor: Record<StateCode, number> = { NSW: 1, VIC: 0.93, QLD: 1.04, SA: 1.12, ACT: 0.97 };
  // Night Saver EV assumes 40% of use lands in the 8c overnight window and the rest at peak rates.
  const blendedCents =
    plan.slug === "night-saver-ev" ? 0.4 * plan.usageCents + 0.6 * 32.5 : plan.usageCents;
  const usage = (annualKwh * blendedCents) / 100;
  const supply = (plan.supplyCentsPerDay * 365) / 100;
  return Math.round((usage + supply) * stateFactor[state]);
}

export type InternetPlan = {
  slug: string;
  name: string;
  speedTier: string;
  typicalEveningDown: number;
  upload: number;
  price: number;
  bundlePrice: number;
  badge?: string;
  fibreOnly?: boolean;
  bestFor: string;
};

export const internetPlans: InternetPlan[] = [
  { slug: "home-basic", name: "Home Basic", speedTier: "nbn® 25", typicalEveningDown: 25, upload: 5, price: 85, bundlePrice: 70, bestFor: "1–2 people browsing and emailing" },
  { slug: "home-standard", name: "Home Standard", speedTier: "nbn® 50", typicalEveningDown: 47, upload: 18, price: 103, bundlePrice: 88, bestFor: "Streaming HD on a couple of screens" },
  { slug: "home-fast", name: "Home Fast", speedTier: "nbn® 100", typicalEveningDown: 94, upload: 18, price: 110, bundlePrice: 95, badge: "Most popular", bestFor: "Busy households working from home" },
  { slug: "home-fast-fibre", name: "Home Fast Fibre", speedTier: "nbn® 500", typicalEveningDown: 500, upload: 44, price: 110, bundlePrice: 95, badge: "Great value", fibreOnly: true, bestFor: "4K streaming and big downloads" },
  { slug: "home-ultrafast", name: "Home Ultrafast", speedTier: "nbn® 1000", typicalEveningDown: 875, upload: 92, price: 134, bundlePrice: 119, fibreOnly: true, bestFor: "Gamers and creators" },
  { slug: "home-hyperfast", name: "Home Hyperfast", speedTier: "nbn® 2000", typicalEveningDown: 1780, upload: 92, price: 194, bundlePrice: 179, fibreOnly: true, bestFor: "The fastest speeds on the nbn" },
];

export type MobilePlan = {
  slug: string;
  name: string;
  dataGb: number;
  price: number;
  bundlePrice: number;
  promo?: string;
  badge?: string;
};

export const mobilePlans: MobilePlan[] = [
  { slug: "small", name: "Small", dataGb: 40, price: 35, bundlePrice: 25, promo: "$12/mth for 6 months with AGL energy", badge: "50% off" },
  { slug: "medium", name: "Medium", dataGb: 80, price: 40, bundlePrice: 30, badge: "Popular" },
  { slug: "large", name: "Large", dataGb: 160, price: 50, bundlePrice: 40, promo: "$35/mth for 6 months with AGL energy" },
];

export const mobileInclusions = [
  "Unlimited standard national talk and text",
  "5G on the Optus Mobile Network (compatible devices)",
  "Data rollover up to 200GB",
  "$5/day international roaming pass — 5GB in 100+ countries",
  "No lock-in contract",
];
