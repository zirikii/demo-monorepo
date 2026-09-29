import type { Topic } from "./types";

/** Mirrors the AGL Help & Support taxonomy and the AGL Assistant's popular topics. */
export const topics: Topic[] = [
  { id: "billing", label: "Billing & payments", description: "Pay, understand or query a bill", icon: "receipt", entry: "billing" },
  { id: "internet-mobile", label: "Internet & mobile", description: "Troubleshoot nbn® or your SIM", icon: "wifi", entry: "netmob" },
  { id: "moving", label: "Moving house", description: "Move or disconnect services", icon: "truck", entry: "moving" },
  { id: "meters", label: "Meters & readings", description: "Submit a read, smart meters", icon: "gauge", entry: "meters" },
  { id: "account", label: "My account & plan", description: "Details, concessions, plans", icon: "user", entry: "account" },
  { id: "support", label: "Payment support", description: "Extensions and instalments", icon: "heart", entry: "support" },
  { id: "emergency", label: "Outages & emergencies", description: "Power, gas, life support", icon: "alert", entry: "emergency" },
  { id: "solar", label: "Solar & batteries", description: "Feed-in tariffs and faults", icon: "sun", entry: "solar" },
];

export const popularQuestions: { label: string; step: string }[] = [
  { label: "Pay my bill", step: "billing.pay" },
  { label: "My internet isn't working", step: "internet.down" },
  { label: "I'm moving house", step: "moving" },
  { label: "Why is my bill so high?", step: "billing.high" },
  { label: "Submit a meter read", step: "meters.submit" },
  { label: "I need more time to pay", step: "support.extension" },
];

export function findTopic(id: string | undefined): Topic | undefined {
  return topics.find((t) => t.id === id);
}
