import type { Topic, TopicId } from "./types";

export const topics: Topic[] = [
  { id: "channels", label: "Channels & connectivity", description: "Mapping errors, credentials, sync and new channels", icon: "plug", entry: "channels" },
  { id: "reservations", label: "Reservations", description: "Missing, modified, cancelled or declined bookings", icon: "bed", entry: "reservations" },
  { id: "rates", label: "Rates & availability", description: "Bulk updates, restrictions and rate parity", icon: "tag", entry: "rates" },
  { id: "events", label: "Events & demand", description: "Event playbooks from the events you've traded", icon: "calendar", entry: "events" },
  { id: "billing", label: "Billing & subscription", description: "Invoices, payments, direct debit and credits", icon: "receipt", entry: "billing" },
  { id: "arrangements", label: "Payment support", description: "More time, instalments or a seasonal pause", icon: "heart", entry: "arrangements" },
  { id: "account", label: "Account & users", description: "Users, logins, plan and billing details", icon: "user", entry: "account" },
  { id: "property", label: "Property changes", description: "Add a property, switch PMS or close a property", icon: "building", entry: "property" },
  { id: "urgent", label: "Urgent issues", description: "Overbookings, outages and account security", icon: "alert", entry: "urgent" },
  { id: "grow", label: "Grow revenue", description: "Demand Plus, Dynamic Revenue Plus and upsells", icon: "trending", entry: "grow" },
];

export function findTopic(id: TopicId): Topic | undefined {
  return topics.find((t) => t.id === id);
}

export const popularQuestions: { label: string; step: string }[] = [
  { label: "A booking isn't showing in my PMS", step: "reservations" },
  { label: "Expedia says there's a mapping error", step: "channels" },
  { label: "Help me price an upcoming event", step: "events" },
  { label: "Why is my invoice higher this month?", step: "billing.high" },
];
