import type { ManagedPortfolio } from "./types";

export const PORTFOLIOS: ManagedPortfolio[] = [
  { id: "mp-01", name: "Southridge Diversified 70", manager: "Southridge Asset Management", menu: "Choice", risk: "Growth", ytd: 8.4, fum: 1840000000, feeBps: 33 },
  { id: "mp-02", name: "Southridge Diversified 50", manager: "Southridge Asset Management", menu: "Core", risk: "Balanced", ytd: 6.1, fum: 920000000, feeBps: 28 },
  { id: "mp-03", name: "Harbourline Income", manager: "Harbourline Wealth", menu: "Choice", risk: "Conservative", ytd: 3.8, fum: 410000000, feeBps: 25 },
  { id: "mp-04", name: "Discover Balanced Index", manager: "Index Partners Australia", menu: "Discover", risk: "Balanced", ytd: 7.2, fum: 1560000000, feeBps: 12 },
  { id: "mp-05", name: "Discover Growth Index", manager: "Index Partners Australia", menu: "Discover", risk: "Growth", ytd: 9.1, fum: 1320000000, feeBps: 12 },
  { id: "mp-06", name: "Pacific Rim International", manager: "Pacific Rim Capital", menu: "Choice", risk: "High growth", ytd: 11.6, fum: 640000000, feeBps: 48 },
  { id: "mp-07", name: "Murray Cash Plus", manager: "Murray Fixed Income", menu: "Core", risk: "Conservative", ytd: 4.2, fum: 280000000, feeBps: 18 },
  { id: "mp-08", name: "Licensee Core Model", manager: "Northshore Licensee Services", menu: "Core", risk: "Balanced", ytd: 6.8, fum: 2100000000, feeBps: 15 },
  { id: "mp-09", name: "Licensee Growth Model", manager: "Northshore Licensee Services", menu: "Choice", risk: "Growth", ytd: 8.9, fum: 1750000000, feeBps: 15 },
  { id: "mp-10", name: "Barwon Australian Equities", manager: "Barwon Equities", menu: "Choice", risk: "High growth", ytd: 10.4, fum: 505000000, feeBps: 55 },
  { id: "mp-11", name: "Discover Conservative", manager: "Index Partners Australia", menu: "Discover", risk: "Conservative", ytd: 4.6, fum: 740000000, feeBps: 10 },
  { id: "mp-12", name: "Private Markets Sleeve", manager: "Southridge Asset Management", menu: "Choice", risk: "Growth", ytd: 5.5, fum: 190000000, feeBps: 85 },
];
