import type { TopicId } from "@/features/assistant/flows/types";
import type { BookingStatus, ChannelStatus, PlanId } from "@/features/property/types";

export type QueueId =
  | "connectivity"
  | "reservations"
  | "revenue"
  | "billing"
  | "enterprise"
  | "success"
  | "security"
  | "general";
export type Priority = "P1" | "P2" | "P3" | "P4";
export type Persona = "warm" | "expert" | "concise";
export type VoiceName = "eve" | "ara" | "rex" | "sal" | "leo";

export type RuleCondition =
  | { kind: "keywords"; terms: string[] }
  | { kind: "sentiment"; below: number; consecutive: number }
  | { kind: "event_within"; days: number }
  | { kind: "event_at_risk"; days: number }
  | { kind: "channel_issue"; statuses: ChannelStatus[] }
  | { kind: "booking_status"; statuses: BookingStatus[] }
  | { kind: "topic"; topics: TopicId[] }
  | { kind: "plan"; plans: PlanId[] }
  | { kind: "property_size"; minRooms: number }
  | { kind: "invoice_overdue"; minDays: number }
  | { kind: "misunderstood"; count: number }
  | { kind: "repeat_contact"; count: number; withinDays: number };

export type RuleCondKind = RuleCondition["kind"];

/**
 * `handoff` rules interrupt the conversation the moment they match. `route` rules never interrupt;
 * they only decide which queue and priority a handoff lands in.
 */
export type RuleAction = "handoff" | "route";

export type RoutingRule = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  condition: RuleCondition;
  action: RuleAction;
  queue: QueueId;
  priority: Priority;
};

export type Queue = { name: string; waitMins: number; description: string };

export type StudioConfig = {
  assistant: {
    persona: Persona;
    voice: VoiceName;
    personalGreeting: boolean;
    eventInsights: boolean;
    showRoutingNotes: boolean;
    voiceForms: boolean;
    customInstructions: string;
  };
  topics: Record<TopicId, boolean>;
  hours: { open: number; close: number };
  routing: { enabled: boolean; rules: RoutingRule[] };
  queues: Record<QueueId, Queue>;
};

export type RoutingSignals = {
  customerTurns: string[];
  topics: TopicId[];
  fallbackCount: number;
  /** Records picked in the conversation, so routing reacts to what this chat is actually about. */
  event?: { label: string; daysUntil: number };
  channel?: { label: string; status: ChannelStatus };
  booking?: { label: string; status: BookingStatus };
  /** Account-wide: the property's next demand event and the channels that aren't selling. */
  nextEvent?: { label: string; daysUntil: number };
  channelIssues: string[];
  plan: PlanId;
  rooms: number;
  /** Days the most overdue unpaid invoice is past due; 0 when nothing is overdue. */
  overdueDays: number;
  priorContacts: { endedAt: string }[];
  now: Date;
};

export type RuleTrace = {
  ruleId: string;
  name: string;
  enabled: boolean;
  matched: boolean;
  reason: string;
};

export type RoutingDecision = {
  action: RuleAction | "none";
  queue: QueueId;
  priority: Priority;
  ruleId: string | null;
  ruleName: string | null;
  reason: string;
};

export type RoutingOutcome = {
  decision: RoutingDecision;
  matched: RoutingDecision[];
  trace: RuleTrace[];
};

export type TranscriptLine = { role: "hotelier" | "assistant" | "system"; text: string };

export type ConversationRecord = {
  id: string;
  ref: string;
  startedAt: string;
  endedAt: string;
  contactName: string;
  propertyName: string;
  signedIn: boolean;
  channel: "chat" | "voice";
  engine: "grok" | "scripted";
  outcome: "resolved" | "handoff" | "open";
  queue?: QueueId;
  priority?: Priority;
  ruleName?: string | null;
  topics: TopicId[];
  trail: string[];
  turns: number;
  transcript: TranscriptLine[];
};
