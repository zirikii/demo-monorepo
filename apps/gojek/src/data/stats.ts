import type { ImpactStat, TechFact } from "./types";

export const IMPACT_STATS: ImpactStat[] = [
  { value: "900,000", label: "food merchants on GoFood" },
  { value: "190M", label: "app downloads as of 2020" },
  { value: "1100%", label: "transaction growth from 2016 to 2019" },
  { value: "$7B+", label: "contributed to the Indonesian economy in 2019" },
];

export const TECH_FACTS: TechFact[] = [
  {
    title: "We run one of the largest JRuby, Java, Clojure, and Go clusters in Asia.",
    body: "The Super App is not a monolith with a favourite language. It is the cluster you get when every product ships the runtime that fits.",
  },
  {
    title:
      "By the time you finish reading this sentence, we would have completed around a thousand orders across our 20+ products.",
    body: "About 35 orders a second, every second the city is awake. The sentence is not a metaphor.",
  },
  {
    title: "We process more than 350 million internal API calls per second.",
    body: "Most of those calls never leave the VPC. Heimdall, Weaver, and the service mesh exist so a timeout in GoCorp does not become a timeout in GoRide.",
  },
  {
    title: "We allocate 2 million drivers at a peak load of 180,000 live orders.",
    body: "Allocation is a product, a research paper, and a pager rotation. Singapore data science and Jakarta Transport share the same graph.",
  },
];

export const HUBS = [
  {
    city: "Jakarta",
    country: "Indonesia",
    focus: "Product, Transport, GoFood, GoPay, and the original call-centre building's successors.",
  },
  {
    city: "Singapore",
    country: "Singapore",
    focus: "Data science, pricing, allocation, and the corporate functions that stitch markets together.",
  },
  {
    city: "Bangalore",
    country: "India",
    focus: "Engineering and design — the C42 / CodeIgnition DNA still shows up in the Git history.",
  },
] as const;
