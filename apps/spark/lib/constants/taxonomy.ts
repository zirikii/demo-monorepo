/** Telco reference data for the Spark demo (roaming zones, categories). */

export interface RoamingZone {
  id: string;
  name: string;
  /** Sample destinations in the zone. */
  countries: string[];
  /** Indicative daily roaming price in NZD. */
  dailyRate: number;
}

/** Spark-style roaming zones used across the travel pages. */
export const ROAMING_ZONES: RoamingZone[] = [
  {
    id: "zone-1",
    name: "Australia & the Pacific",
    countries: ["Australia", "Fiji", "Cook Islands", "Samoa", "Tonga"],
    dailyRate: 7,
  },
  {
    id: "zone-2",
    name: "Asia",
    countries: ["Japan", "Singapore", "Thailand", "China", "Indonesia", "India"],
    dailyRate: 9,
  },
  {
    id: "zone-3",
    name: "North America",
    countries: ["United States", "Canada", "Mexico"],
    dailyRate: 9,
  },
  {
    id: "zone-4",
    name: "Europe & UK",
    countries: ["United Kingdom", "France", "Germany", "Italy", "Spain", "Ireland"],
    dailyRate: 12,
  },
  {
    id: "zone-5",
    name: "Rest of world",
    countries: ["South Africa", "Brazil", "United Arab Emirates", "Turkey"],
    dailyRate: 15,
  },
];

/** Quick-link chips shown on the travel & move promotions hero. */
export const TRAVEL_QUICK_LINKS: string[] = [
  "Daily roaming",
  "Travel packs",
  "eSIM",
  "Move your broadband",
  "Switch to Spark",
  "Prepaid for visitors",
];

export const PLAN_CATEGORIES: { label: string; href: string; description: string }[] = [
  {
    label: "Pay Monthly mobile",
    href: "/mobile",
    description: "Endless data plans with mins & texts included.",
  },
  {
    label: "Broadband",
    href: "/broadband",
    description: "Fibre, wireless and rural plans for your home.",
  },
  {
    label: "Travel & roaming",
    href: "/roaming",
    description: "Stay connected overseas from a few dollars a day.",
  },
];
