import type { TopicId } from "@/features/assistant/flows/types";
import type { Priority, Queue, QueueId, RoutingRule, RuleCondition, RuleCondKind, StudioConfig } from "./types";

export const PRIORITIES: Priority[] = ["P1", "P2", "P3", "P4"];

export const QUEUES: Record<QueueId, Queue> = {
  "event-day": { name: "Event Day desk", waitMins: 1, description: "Fans with an event in the next two days" },
  refunds: { name: "Refunds & Cancellations", waitMins: 6, description: "Cancelled and rescheduled events" },
  accessibility: { name: "Accessibility team", waitMins: 4, description: "Wheelchair, Companion Card and access needs" },
  priority: { name: "Priority Fan care", waitMins: 2, description: "Long-standing fans" },
  "high-value": { name: "Premium Service", waitMins: 3, description: "High-value and hospitality orders" },
  relations: { name: "Customer Relations", waitMins: 5, description: "Complaints, fraud and distressed fans" },
  general: { name: "Fan Support", waitMins: 8, description: "Everything else" },
};

export const QUEUE_IDS = Object.keys(QUEUES) as QueueId[];

const ALL_TOPICS: TopicId[] = ["tickets", "refunds", "changes", "transfer", "resale", "accessibility", "groups", "payments", "account", "eventday", "discover"];

export const DEFAULT_RULES: RoutingRule[] = [
  {
    id: "safety",
    name: "Safety or distress",
    description: "Anyone hurt, unsafe or harassed goes straight to a person.",
    enabled: true,
    condition: { kind: "keywords", terms: ["hurt", "injured", "unsafe", "not safe", "in danger", "emergency", "harassed", "harassing", "assaulted", "attacked", "crush", "threatened", "threatening", "spiked", "unconscious"] },
    action: "handoff",
    queue: "relations",
    priority: "P1",
  },
  {
    id: "fraud",
    name: "Scam or account fraud",
    description: "Fans who've been scammed or had tickets moved without permission.",
    enabled: true,
    condition: { kind: "keywords", terms: ["scammed", "stolen", "fraud", "hacked", "didn't transfer", "didnt transfer", "without my permission"] },
    action: "handoff",
    queue: "relations",
    priority: "P1",
  },
  {
    id: "complaint",
    name: "Formal complaint",
    description: "Complaints, chargebacks and regulator mentions.",
    enabled: true,
    condition: { kind: "keywords", terms: ["complaint", "ombudsman", "accc", "fair trading", "lawyer", "chargeback", "disgrace"] },
    action: "handoff",
    queue: "relations",
    priority: "P2",
  },
  {
    id: "frustrated",
    name: "Frustrated fan",
    description: "Two negative messages in a row.",
    enabled: true,
    condition: { kind: "sentiment", below: -0.35, consecutive: 2 },
    action: "handoff",
    queue: "relations",
    priority: "P2",
  },
  {
    id: "misunderstood",
    name: "Assistant misunderstood",
    description: "The assistant couldn't follow the fan twice.",
    enabled: true,
    condition: { kind: "misunderstood", count: 2 },
    action: "handoff",
    queue: "general",
    priority: "P3",
  },
  {
    id: "event-day",
    name: "Event in the next 48 hours",
    description: "Anything about a show that's about to happen is urgent.",
    enabled: true,
    condition: { kind: "event_within", hours: 48 },
    action: "route",
    queue: "event-day",
    priority: "P1",
  },
  {
    id: "cancelled",
    name: "Cancelled or rescheduled event",
    description: "Refund specialists handle cancellations and new dates.",
    enabled: true,
    condition: { kind: "event_status", statuses: ["cancelled", "rescheduled"] },
    action: "route",
    queue: "refunds",
    priority: "P3",
  },
  {
    id: "accessibility",
    name: "Accessibility needs",
    description: "Access requests go to trained staff.",
    enabled: true,
    condition: { kind: "topic", topics: ["accessibility"] },
    action: "route",
    queue: "accessibility",
    priority: "P2",
  },
  {
    id: "priority-fan",
    name: "Priority fan",
    description: "Fans with 25+ events get the priority queue.",
    enabled: true,
    condition: { kind: "fan_tier", minEvents: 25 },
    action: "route",
    queue: "priority",
    priority: "P2",
  },
  {
    id: "high-value",
    name: "High-value order",
    description: "Orders worth $500 or more.",
    enabled: true,
    condition: { kind: "order_value", min: 500 },
    action: "route",
    queue: "high-value",
    priority: "P2",
  },
  {
    id: "repeat",
    name: "Repeat contact",
    description: "Third contact within a week goes to a person.",
    enabled: false,
    condition: { kind: "repeat_contact", count: 2, withinDays: 7 },
    action: "handoff",
    queue: "relations",
    priority: "P2",
  },
];

export function defaultConfig(): StudioConfig {
  return {
    assistant: {
      persona: "warm",
      voice: "eve",
      personalGreeting: true,
      useHistory: true,
      recommendations: true,
      showRoutingNotes: true,
      voiceForms: true,
      customInstructions: "",
    },
    topics: Object.fromEntries(ALL_TOPICS.map((t) => [t, true])) as Record<TopicId, boolean>,
    hours: { open: 8, close: 22 },
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
  const hour = Number(SYDNEY_HOUR.formatToParts(now).find((p) => p.type === "hour")?.value ?? 0);
  return hour >= config.hours.open && hour < config.hours.close;
}

function hourLabel(hour: number): string {
  const suffix = hour >= 12 ? "pm" : "am";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}${suffix}`;
}

export function hoursLabel(config: StudioConfig): string {
  return `${hourLabel(config.hours.open)} to ${hourLabel(config.hours.close)} AEST, 7 days`;
}

export const CONDITION_LABELS: Record<RoutingRule["condition"]["kind"], string> = {
  keywords: "Fan says any of",
  sentiment: "Sentiment drops",
  event_within: "Event starts within",
  event_status: "Event status is",
  topic: "Conversation reaches topic",
  fan_tier: "Fan has attended",
  order_value: "Order value at least",
  misunderstood: "Assistant misunderstood",
  repeat_contact: "Fan contacted us",
};

export function defaultCondition(kind: RuleCondKind): RuleCondition {
  switch (kind) {
    case "keywords":
      return { kind, terms: [] };
    case "sentiment":
      return { kind, below: -0.35, consecutive: 2 };
    case "event_within":
      return { kind, hours: 48 };
    case "event_status":
      return { kind, statuses: ["cancelled"] };
    case "topic":
      return { kind, topics: ["refunds"] };
    case "fan_tier":
      return { kind, minEvents: 25 };
    case "order_value":
      return { kind, min: 500 };
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
