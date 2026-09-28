import type { FlowNode } from "./types";

export const meterNodes: FlowNode[] = [
  {
    id: "meters",
    topic: "meters",
    title: "Meters & readings",
    say: "Sure. What would you like to do with your meter?",
    options: [
      { label: "Submit a meter read", next: "meters.submit" },
      { label: "My bill was estimated", next: "meters.estimated" },
      { label: "Get a smart meter", next: "meters.smart" },
      { label: "Meter access for the reader", next: "meters.access" },
    ],
    keywords: ["meter", "meters", "meter reading", "meter reader"],
  },
  {
    id: "meters.submit",
    topic: "meters",
    title: "Submit a meter read",
    say: "Your electricity has a smart meter, so it reads itself. Your gas meter, {gasMeterNumber}, needs a read. What numbers do you see on the dial? Read left to right and ignore any red digits.",
    card: { kind: "form", form: "meter-read", next: "meters.submit.done" },
    options: [{ label: "Where do I find my meter?", next: "meters.access" }],
    keywords: ["submit a meter read", "submit meter read", "meter read", "read my meter", "enter a reading", "self read"],
  },
  {
    id: "meters.submit.done",
    topic: "meters",
    title: "Read submitted",
    say: "Thanks. I've recorded a gas read of {meterRead}. That's lower than the estimate, so I've re-issued your gas bill. The new amount is {revisedGas}.",
    card: { kind: "success", title: "Meter read received", detail: "Gas meter {gasMeterNumber} · Read {meterRead} · Revised bill {revisedGas}" },
    options: [
      { label: "Pay the revised bill", next: "billing.pay" },
      { label: "Great, thanks", next: "resolved" },
    ],
  },
  {
    id: "meters.estimated",
    topic: "meters",
    title: "Estimated bill",
    say: "Your latest gas bill was estimated because the meter reader couldn't access the meter. Estimates are based on your past usage. If you send me a read now, I'll re-issue the bill using your actual use.",
    card: {
      kind: "info",
      title: "Why estimates happen",
      body: "No safe access to the meter (locked gate, dog), bad weather or the meter being obscured. Smart meters remove estimates altogether.",
    },
    options: [
      { label: "Submit a gas read now", next: "meters.submit" },
      { label: "Get a smart meter", next: "meters.smart" },
    ],
    keywords: ["estimated", "estimate", "estimated bill", "estimated read", "not an actual read"],
  },
  {
    id: "meters.smart",
    topic: "meters",
    title: "Smart meters",
    say: "You already have a smart electricity meter. Smart gas meters aren't available on the Jemena network yet, but I can register your interest and we'll let you know when they are.",
    options: [
      { label: "Register my interest", next: "meters.smart.done" },
      { label: "No thanks", next: "resolved" },
    ],
    keywords: ["smart meter", "digital meter", "get a smart meter"],
  },
  {
    id: "meters.smart.done",
    topic: "meters",
    title: "Interest registered",
    say: "Done. We'll email {email} as soon as smart gas meters are available in Newtown.",
    card: { kind: "success", title: "You're on the list", detail: "Smart gas meter · We'll email {email}" },
    options: [{ label: "Thanks", next: "resolved" }],
  },
  {
    id: "meters.access",
    topic: "meters",
    title: "Meter access",
    say: "Your gas meter is usually near the front of the house or beside the driveway. On reading days, please make sure gates are unlocked and pets are secured.",
    card: {
      kind: "steps",
      title: "Help the meter reader",
      steps: ["Next scheduled read: 14 December", "Unlock side gates on the day", "Secure dogs and clear plants from the meter box", "Add access notes in My Account"],
    },
    options: [
      { label: "Submit a read myself", next: "meters.submit" },
      { label: "Thanks", next: "resolved" },
    ],
    keywords: ["meter access", "locked gate", "dog", "find my meter", "where is my meter"],
  },
];
