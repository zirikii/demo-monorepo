import type { FlowNode } from "./types";

export const solarNodes: FlowNode[] = [
  {
    id: "solar",
    topic: "solar",
    title: "Solar & batteries",
    say: "Let's talk solar. What would you like to know?",
    options: [
      { label: "Solar feed-in tariffs", next: "solar.fit" },
      { label: "My solar isn't working", next: "solar.fault" },
      { label: "Adding a home battery", next: "solar.battery" },
      { label: "Get a solar quote", next: "solar.quote" },
    ],
    keywords: ["solar", "solar panels", "battery", "batteries", "panels"],
  },
  {
    id: "solar.fit",
    topic: "solar",
    title: "Feed-in tariffs",
    say: "On Solar Savers you'd earn 8 cents per kilowatt hour for the first 10 kilowatt hours you export each day. Your current plan pays 2 cents. You'd need rooftop solar first, and I can help with a quote.",
    card: {
      kind: "info",
      title: "Solar Savers feed-in tariff",
      body: "8c/kWh for your first 10kWh exported daily · Base rate thereafter · No lock-in contract",
      link: { label: "See Solar Savers", to: "/energy#solar-savers" },
    },
    options: [
      { label: "Get a solar quote", next: "solar.quote" },
      { label: "Thanks", next: "resolved" },
    ],
    keywords: ["feed-in", "feed in tariff", "fit", "export", "solar credit", "sell solar"],
  },
  {
    id: "solar.fault",
    topic: "solar",
    title: "Solar fault",
    say: "Let's run a quick health check. Look at your inverter's display. Is there a green light, or an error or red light?",
    card: {
      kind: "steps",
      title: "Solar health check",
      steps: ["Find the inverter, usually in the garage or by the switchboard", "Green light = generating · Red/orange = fault", "Note any error code on the display"],
    },
    options: [
      { label: "Red light or error code", next: "solar.fault.error" },
      { label: "Green light, but low exports", next: "solar.fault.low" },
    ],
    keywords: ["solar not working", "inverter", "solar fault", "panels not working", "solar error"],
  },
  {
    id: "solar.fault.error",
    topic: "solar",
    title: "Inverter error",
    say: "An error usually needs a solar technician. Try switching the inverter off and on using the shutdown procedure on its label. If the error stays, I'll book an AGL solar service visit.",
    options: [
      { label: "Book a service visit", next: "handoff" },
      { label: "The restart fixed it", next: "resolved" },
    ],
  },
  {
    id: "solar.fault.low",
    topic: "solar",
    title: "Low exports",
    say: "Low exports on a sunny day can be dirty panels, shading, or your home using more power during the day. Check the AGL app to compare generation with usage.",
    options: [
      { label: "Book a solar service visit", next: "handoff" },
      { label: "Thanks", next: "resolved" },
    ],
  },
  {
    id: "solar.battery",
    topic: "solar",
    title: "Home battery",
    say: "A battery stores your excess solar for the evening. With AGL's Virtual Power Plant, you can also earn credits when your battery helps the grid on peak days.",
    card: {
      kind: "steps",
      title: "Battery benefits",
      steps: ["Use your own solar after dark", "Join the Virtual Power Plant for bill credits", "Backup power options on selected models", "Track charge levels in the AGL app"],
    },
    options: [
      { label: "Get a quote", next: "solar.quote" },
      { label: "Thanks", next: "resolved" },
    ],
    keywords: ["battery", "home battery", "virtual power plant", "vpp", "tesla powerwall"],
  },
  {
    id: "solar.quote",
    topic: "solar",
    title: "Solar quote",
    say: "Great. I'll book a free, no-obligation call with an AGL solar specialist. They'll look at your roof and usage and recommend a system. Morning or afternoon?",
    options: [
      { label: "Morning", next: "solar.quote.done", set: { callbackTime: "tomorrow morning" } },
      { label: "Afternoon", next: "solar.quote.done", set: { callbackTime: "tomorrow afternoon" } },
    ],
    keywords: ["solar quote", "install solar", "get solar", "buy solar"],
  },
  {
    id: "solar.quote.done",
    topic: "solar",
    title: "Callback booked",
    say: "Booked. A solar specialist will call {mobileNumber} {callbackTime}.",
    card: { kind: "success", title: "Solar callback booked", detail: "{mobileNumber} · {callbackTime}" },
    options: [{ label: "Thanks", next: "resolved" }],
  },
];
