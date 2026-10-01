import type { TopicId } from "@/features/assistant/flows/types";
import type { Priority, Queue, QueueId, RoutingRule, RuleCondition, RuleCondKind, StudioConfig } from "./types";

export const PRIORITIES: Priority[] = ["P1", "P2", "P3", "P4"];

export const QUEUES: Record<QueueId, Queue> = {
  connectivity: { name: "Connectivity", waitMins: 2, description: "Channel mappings, credentials and sync" },
  reservations: { name: "Reservations", waitMins: 3, description: "Missing, overbooked and failed bookings" },
  revenue: { name: "Revenue & Events", waitMins: 4, description: "Rates, restrictions and event pricing" },
  billing: { name: "Billing", waitMins: 6, description: "Invoices, payments and arrangements" },
  enterprise: { name: "Enterprise desk", waitMins: 2, description: "Groups & Chains and large properties" },
  success: { name: "Customer Success", waitMins: 5, description: "Complaints, cancellations and unhappy hoteliers" },
  security: { name: "Security", waitMins: 1, description: "Account takeover, phishing and card fraud" },
  general: { name: "Customer Support", waitMins: 6, description: "Everything else" },
};

export const QUEUE_IDS = Object.keys(QUEUES) as QueueId[];

export const ALL_TOPICS: TopicId[] = ["channels", "reservations", "rates", "events", "billing", "arrangements", "account", "property", "urgent", "grow"];

export const DEFAULT_RULES: RoutingRule[] = [
  {
    id: "security",
    name: "Security or fraud",
    description: "Suspected account takeover, phishing or card fraud goes straight to Security.",
    enabled: true,
    condition: { kind: "keywords", terms: ["hacked", "phishing", "fraud", "suspicious login", "someone logged in", "stolen card", "data breach", "scam email", "unauthorised"] },
    action: "handoff",
    queue: "security",
    priority: "P1",
  },
  {
    id: "outage",
    name: "Total outage",
    description: "Nothing selling anywhere is a P1 for Connectivity.",
    enabled: true,
    condition: { kind: "keywords", terms: ["everything is down", "all channels down", "nothing is syncing", "outage", "not working at all", "no bookings coming in"] },
    action: "handoff",
    queue: "connectivity",
    priority: "P1",
  },
  {
    id: "complaint",
    name: "Complaint or cancellation",
    description: "Complaints, chargebacks and threats to leave go to Customer Success.",
    enabled: true,
    condition: { kind: "keywords", terms: ["complaint", "cancel my subscription", "leaving siteminder", "switching provider", "chargeback", "lawyer", "ombudsman", "disgrace"] },
    action: "handoff",
    queue: "success",
    priority: "P2",
  },
  {
    id: "frustrated",
    name: "Frustrated hotelier",
    description: "Two negative messages in a row.",
    enabled: true,
    condition: { kind: "sentiment", below: -0.35, consecutive: 2 },
    action: "handoff",
    queue: "success",
    priority: "P2",
  },
  {
    id: "misunderstood",
    name: "Assistant misunderstood",
    description: "The assistant couldn't follow the hotelier twice.",
    enabled: true,
    condition: { kind: "misunderstood", count: 2 },
    action: "handoff",
    queue: "general",
    priority: "P3",
  },
  {
    id: "overbooked",
    name: "Overbooking",
    description: "A guest without a room is the most urgent reservation problem.",
    enabled: true,
    condition: { kind: "booking_status", statuses: ["overbooked"] },
    action: "route",
    queue: "reservations",
    priority: "P1",
  },
  {
    id: "channel-down",
    name: "Channel not selling",
    description: "Mapping errors, expired credentials and paused channels go to Connectivity.",
    enabled: true,
    condition: { kind: "channel_issue", statuses: ["mapping-error", "auth-failed", "paused"] },
    action: "route",
    queue: "connectivity",
    priority: "P2",
  },
  {
    id: "event-week",
    name: "Demand event this week",
    description: "Anything about an event in the next 7 days is urgent: every hour of lost sales counts.",
    enabled: true,
    condition: { kind: "event_within", days: 7 },
    action: "route",
    queue: "revenue",
    priority: "P1",
  },
  {
    id: "enterprise",
    name: "Groups & Chains",
    description: "Multi-property customers get the enterprise desk.",
    enabled: true,
    condition: { kind: "plan", plans: ["groups"] },
    action: "route",
    queue: "enterprise",
    priority: "P2",
  },
  {
    id: "large-property",
    name: "Large property",
    description: "Properties with 150+ rooms get the enterprise desk.",
    enabled: true,
    condition: { kind: "property_size", minRooms: 150 },
    action: "route",
    queue: "enterprise",
    priority: "P2",
  },
  {
    id: "overdue",
    name: "Overdue account",
    description: "Invoices 14+ days overdue go to Billing before anything else.",
    enabled: true,
    condition: { kind: "invoice_overdue", minDays: 14 },
    action: "route",
    queue: "billing",
    priority: "P2",
  },
  {
    id: "billing-topics",
    name: "Billing questions",
    description: "Invoices, payments and arrangements.",
    enabled: true,
    condition: { kind: "topic", topics: ["billing", "arrangements"] },
    action: "route",
    queue: "billing",
    priority: "P3",
  },
  {
    id: "revenue-topics",
    name: "Rates and events",
    description: "Rates, restrictions, event pricing and growth questions.",
    enabled: true,
    condition: { kind: "topic", topics: ["rates", "events", "grow"] },
    action: "route",
    queue: "revenue",
    priority: "P3",
  },
  {
    id: "reservation-topics",
    name: "Reservation questions",
    description: "Bookings, modifications and PMS delivery.",
    enabled: true,
    condition: { kind: "topic", topics: ["reservations"] },
    action: "route",
    queue: "reservations",
    priority: "P3",
  },
  {
    id: "event-at-risk",
    name: "Event at risk",
    description: "An event within 10 days while a channel isn't selling. Raises the priority of any handoff and sends untopiced chats to Connectivity.",
    enabled: true,
    condition: { kind: "event_at_risk", days: 10 },
    action: "route",
    queue: "connectivity",
    priority: "P2",
  },
  {
    id: "repeat",
    name: "Repeat contact",
    description: "Third contact within a week goes to a person.",
    enabled: false,
    condition: { kind: "repeat_contact", count: 2, withinDays: 7 },
    action: "handoff",
    queue: "success",
    priority: "P2",
  },
];

export function defaultConfig(): StudioConfig {
  return {
    assistant: {
      persona: "warm",
      voice: "eve",
      personalGreeting: true,
      eventInsights: true,
      showRoutingNotes: true,
      voiceForms: true,
      customInstructions: "",
    },
    topics: Object.fromEntries(ALL_TOPICS.map((t) => [t, true])) as Record<TopicId, boolean>,
    hours: { open: 0, close: 24 },
    routing: { enabled: true, rules: structuredClone(DEFAULT_RULES) },
    queues: structuredClone(QUEUES),
  };
}

export function queueName(config: StudioConfig, queue: QueueId): string {
  return config.queues[queue]?.name ?? QUEUES[queue].name;
}

const SYDNEY_HOUR = new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Sydney", hour: "numeric", hourCycle: "h23" });

/** Live chat hours are Sydney time wherever the page or build runs. */
export function isLiveChatOpen(config: StudioConfig, now: Date): boolean {
  if (config.hours.open === 0 && config.hours.close === 24) return true;
  const hour = Number(SYDNEY_HOUR.formatToParts(now).find((p) => p.type === "hour")?.value ?? 0);
  return hour >= config.hours.open && hour < config.hours.close;
}

function hourLabel(hour: number): string {
  if (hour === 24) return "midnight";
  const suffix = hour >= 12 ? "pm" : "am";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}${suffix}`;
}

export function hoursLabel(config: StudioConfig): string {
  if (config.hours.open === 0 && config.hours.close === 24) return "24/7";
  return `${hourLabel(config.hours.open)} to ${hourLabel(config.hours.close)} AEST, 7 days`;
}

export const CONDITION_LABELS: Record<RoutingRule["condition"]["kind"], string> = {
  keywords: "Hotelier says any of",
  sentiment: "Sentiment drops",
  event_within: "Event in chat starts within",
  event_at_risk: "Next event within",
  channel_issue: "Channel in chat is",
  booking_status: "Booking in chat is",
  topic: "Conversation reaches topic",
  plan: "Property is on",
  property_size: "Property has",
  invoice_overdue: "Invoice overdue by",
  misunderstood: "Assistant misunderstood",
  repeat_contact: "Hotelier contacted us",
};

export function defaultCondition(kind: RuleCondKind): RuleCondition {
  switch (kind) {
    case "keywords":
      return { kind, terms: [] };
    case "sentiment":
      return { kind, below: -0.35, consecutive: 2 };
    case "event_within":
      return { kind, days: 7 };
    case "event_at_risk":
      return { kind, days: 10 };
    case "channel_issue":
      return { kind, statuses: ["mapping-error"] };
    case "booking_status":
      return { kind, statuses: ["overbooked"] };
    case "topic":
      return { kind, topics: ["billing"] };
    case "plan":
      return { kind, plans: ["groups"] };
    case "property_size":
      return { kind, minRooms: 150 };
    case "invoice_overdue":
      return { kind, minDays: 14 };
    case "misunderstood":
      return { kind, count: 2 };
    case "repeat_contact":
      return { kind, count: 2, withinDays: 7 };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}
