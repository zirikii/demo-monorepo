import type { Topic, TopicId } from "./types";

export const topics: Topic[] = [
  { id: "tickets", label: "Where's my ticket?", description: "Mobile tickets, EzyTickets, collection and posted tickets", icon: "ticket", entry: "tickets" },
  { id: "refunds", label: "Refunds & exchanges", description: "Cancelled, rescheduled or can't make it", icon: "refund", entry: "refunds" },
  { id: "changes", label: "Event changes", description: "Cancellations, new dates and line-ups", icon: "calendar", entry: "changes" },
  { id: "transfer", label: "Transfer tickets", description: "Send tickets to a friend", icon: "send", entry: "transfer" },
  { id: "resale", label: "Sell on Marketplace", description: "Resell Fan to Fan at a fair price", icon: "tag", entry: "resale" },
  { id: "eventday", label: "Event-day info", description: "Gates, getting there and bag rules", icon: "map", entry: "eventday" },
  { id: "accessibility", label: "Accessible bookings", description: "Wheelchair seating and Companion Card", icon: "accessible", entry: "accessible" },
  { id: "groups", label: "Group bookings", description: "10+ tickets, schools and corporate", icon: "users", entry: "groups" },
  { id: "payments", label: "Payments & vouchers", description: "Charges, fees, Afterpay and gift vouchers", icon: "card", entry: "payments" },
  { id: "account", label: "Account & privacy", description: "Sign-in, details, data and marketing", icon: "user", entry: "account" },
  { id: "discover", label: "Find something to see", description: "Picks based on events you've been to", icon: "sparkles", entry: "discover.recs" },
];

export function findTopic(id: TopicId): Topic | undefined {
  return topics.find((t) => t.id === id);
}

export const popularQuestions: { label: string; step: string }[] = [
  { label: "My barcode isn't showing in the app", step: "tickets" },
  { label: "My event was cancelled — how do I get a refund?", step: "refunds" },
  { label: "Can I send a ticket to a friend?", step: "transfer" },
  { label: "What time do gates open?", step: "eventday" },
];
