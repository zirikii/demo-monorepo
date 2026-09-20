import type { SiteStat } from "./types";

export const SITE = {
  name: "Gojek",
  techName: "Gojek Tech",
  tagline: "3 countries. 20+ products. One on-demand platform.",
  description:
    "The engineering, design, and product work behind a super-app used by millions of people every day across Southeast Asia.",
  joinUrl: "/join-us",
  disclaimer:
    "Unofficial demo build. Not affiliated with, endorsed by, or connected to Gojek or GoTo Group.",
  copyright: "Gojek Tech (Demo)",
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", to: "/join-us" },
  { label: "X", to: "/blog" },
  { label: "Instagram", to: "/life-at-gojek" },
  { label: "YouTube", to: "/life-at-gojek" },
  { label: "GitHub", to: "/open-source" },
] as const;

export const HERO_STATS: SiteStat[] = [
  {
    value: "3",
    label: "Countries",
    detail: "Indonesia, Singapore, and Vietnam run on the same core platform.",
  },
  {
    value: "20+",
    label: "Products",
    detail: "Rides, deliveries, payments, and merchant tools in one app.",
  },
  {
    value: "2.9M",
    label: "Driver partners",
    detail: "The largest two-wheeler fleet operating on any on-demand network in the region.",
  },
  {
    value: "1.1K",
    label: "Services in production",
    detail: "Mostly Go and Clojure, deployed continuously across four regions.",
  },
];

export const PLATFORM_STATS: SiteStat[] = [
  {
    value: "6.2B",
    label: "API calls a day",
    detail: "Peak traffic lands during the 11am lunch rush in Jakarta.",
  },
  {
    value: "48ms",
    label: "p99 allocation latency",
    detail: "Time to match a booking with the right driver partner.",
  },
  {
    value: "99.98%",
    label: "Payment success rate",
    detail: "Across wallet, QRIS, card, and bank-transfer rails.",
  },
  {
    value: "3,400",
    label: "Deploys a week",
    detail: "Trunk-based, progressively rolled out behind flags.",
  },
];
