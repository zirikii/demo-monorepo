import type { FlowNode } from "./types";

export const growNodes: FlowNode[] = [
  {
    id: "grow",
    topic: "grow",
    title: "Grow revenue",
    say: "Love it. Where would you like to grow?",
    options: [
      { label: "Get found on Google and metasearch", next: "grow.demandplus" },
      { label: "Price automatically with Dynamic Revenue Plus", next: "grow.revenue" },
      { label: "More direct bookings", next: "grow.website" },
      { label: "Upsell guests before they arrive", next: "grow.upsell" },
      { label: "Talk to a growth specialist", next: "grow.callback" },
    ],
    keywords: ["grow revenue", "more bookings", "increase revenue", "upsell", "marketing", "grow"],
  },
  {
    id: "grow.demandplus",
    topic: "grow",
    title: "Demand Plus",
    say: "Demand Plus puts {propertyName} on Google Hotel Ads, Trivago, Tripadvisor and other metasearch sites, and sends those guests to your Booking Engine with no commission.",
    card: {
      kind: "info",
      title: "Demand Plus",
      body: "Metasearch campaigns run for you, with spend capped and results in Insights. Properties on Demand Plus have grown direct bookings by over 50%.",
      link: { label: "See Demand Plus", to: "/platform/demand-plus" },
    },
    options: [
      { label: "Book a callback", next: "grow.callback", set: { growthInterest: "Demand Plus" } },
      { label: "Something else", next: "grow" },
    ],
    keywords: ["demand plus", "google hotel ads", "metasearch", "trivago", "tripadvisor"],
  },
  {
    id: "grow.revenue",
    topic: "grow",
    title: "Dynamic Revenue Plus",
    say: "Dynamic Revenue Plus, built with IDeaS, prices every room every day from your pickup, competitors and local events — including the ones in your demand calendar.",
    card: {
      kind: "info",
      title: "Dynamic Revenue Plus",
      body: "Automated, explainable rate recommendations you can accept in one click or let run on autopilot. Uses IDeaS revenue science and your event history.",
      link: { label: "See Dynamic Revenue Plus", to: "/platform/dynamic-revenue-plus" },
    },
    options: [
      {
        label: "Book a callback",
        next: "grow.callback",
        set: { growthInterest: "Dynamic Revenue Plus" },
      },
      { label: "Something else", next: "grow" },
    ],
    keywords: [
      "dynamic revenue plus",
      "revenue management",
      "rms",
      "ideas",
      "dynamic pricing",
      "automated pricing",
    ],
  },
  {
    id: "grow.website",
    topic: "grow",
    title: "Direct bookings",
    say: "Your Booking Engine took {directShare} of bookings in the last 30 days. A faster website, a member rate and Demand Plus are the quickest ways to grow that.",
    card: {
      kind: "steps",
      title: "Grow direct bookings",
      steps: [
        "Rebuild your site with Website Builder for mobile speed",
        "Offer a member-only rate a little under the OTAs",
        "Turn on Demand Plus to win metasearch clicks",
        "Add breakfast or late check-out as direct-only perks",
      ],
    },
    options: [
      {
        label: "Book a callback",
        next: "grow.callback",
        set: { growthInterest: "Website Builder" },
      },
      { label: "Something else", next: "grow" },
    ],
    keywords: [
      "website builder",
      "direct bookings",
      "booking engine",
      "website",
      "commission free",
    ],
  },
  {
    id: "grow.upsell",
    topic: "grow",
    title: "Guest upsells",
    say: "Guest Engagement emails guests before arrival with upgrades, parking, breakfast and late check-out, paid through SiteMinder Pay.",
    card: {
      kind: "info",
      title: "Guest Engagement",
      body: "Pre-arrival offers with one-tap payment. Upgrades and add-ons are the most successful ancillary revenue ideas for hotels.",
      link: { label: "See Guest Engagement", to: "/platform/guest-engagement" },
    },
    options: [
      {
        label: "Book a callback",
        next: "grow.callback",
        set: { growthInterest: "Guest Engagement" },
      },
      { label: "Something else", next: "grow" },
    ],
    keywords: ["upsell", "upgrades", "ancillary", "guest engagement", "pre arrival"],
  },
  {
    id: "grow.callback",
    topic: "grow",
    title: "Growth callback",
    say: "A growth specialist can show you what this would earn at {propertyName}. When suits?",
    card: { kind: "form", form: "growth-callback", next: "grow.callback.done" },
    options: [{ label: "Back", next: "grow" }],
    keywords: ["callback", "call me back", "speak to sales", "demo", "book a demo"],
  },
  {
    id: "grow.callback.done",
    topic: "grow",
    title: "Callback booked",
    say: "Booked. A growth specialist will call you on {callbackPhone} {callbackTime} about {growthProduct}. Your reference is {requestRef}.",
    card: {
      kind: "success",
      title: "Callback booked",
      detail: "{growthProduct} · {callbackTime} · {callbackPhone}",
    },
    options: [{ label: "That's all, thanks", next: "resolved" }],
  },
];
