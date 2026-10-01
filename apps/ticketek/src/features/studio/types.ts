import type { OrderStatus } from "@/features/fan/types";
import type { TopicId } from "@/features/assistant/flows/types";

export type QueueId = "event-day" | "refunds" | "accessibility" | "priority" | "high-value" | "relations" | "general";
export type Priority = "P1" | "P2" | "P3" | "P4";
export type Persona = "warm" | "upbeat" | "concise";
export type VoiceName = "eve" | "ara" | "rex" | "sal" | "leo";

export type RuleCondition =
  | { kind: "keywords"; terms: string[] }
  | { kind: "sentiment"; below: number; consecutive: number }
  | { kind: "event_within"; hours: number }
  | { kind: "event_status"; statuses: OrderStatus[] }
  | { kind: "topic"; topics: TopicId[] }
  | { kind: "fan_tier"; minEvents: number }
  | { kind: "order_value"; min: number }
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
    useHistory: boolean;
    recommendations: boolean;
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
  order?: { label: string; hoursUntil: number; status: OrderStatus; total: number };
  lifetimeEvents: number;
  priorContacts: { endedAt: string }[];
  now: Date;
};

export type RuleTrace = { ruleId: string; name: string; enabled: boolean; matched: boolean; reason: string };

export type RoutingDecision = {
  action: RuleAction | "none";
  queue: QueueId;
  priority: Priority;
  ruleId: string | null;
  ruleName: string | null;
  reason: string;
};

export type RoutingOutcome = { decision: RoutingDecision; matched: RoutingDecision[]; trace: RuleTrace[] };

export type TranscriptLine = { role: "fan" | "assistant" | "system"; text: string };

export type ConversationRecord = {
  id: string;
  ref: string;
  startedAt: string;
  endedAt: string;
  fanName: string;
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
