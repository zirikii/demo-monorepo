import type { PropertyEffect } from "@/features/property/effects";

export type TopicId =
  | "channels"
  | "reservations"
  | "rates"
  | "events"
  | "billing"
  | "arrangements"
  | "account"
  | "property"
  | "urgent"
  | "grow";

export type FormId =
  | "channel-credentials"
  | "bulk-rates"
  | "event-pricing"
  | "add-event"
  | "add-user"
  | "billing-details"
  | "add-property"
  | "switch-pms"
  | "growth-callback";

export type ContactEntry = { label: string; phone: string; note?: string };

/** Rich content under an assistant turn. Voice mode describes the same card out loud. */
export type FlowCard =
  | { kind: "steps"; title: string; steps: string[] }
  | { kind: "channel" }
  | { kind: "sync-test" }
  | { kind: "platform-status" }
  | { kind: "booking" }
  | { kind: "invoice" }
  | { kind: "payment-confirm" }
  | { kind: "bank-transfer" }
  | { kind: "invoice-compare" }
  | { kind: "credit-refund" }
  | { kind: "extension" }
  | { kind: "instalment" }
  | { kind: "plan-compare" }
  | { kind: "parity" }
  | { kind: "event-playbook" }
  | { kind: "event-review" }
  | { kind: "event-insights" }
  | { kind: "urgent"; title: string; steps: string[] }
  | { kind: "contact"; title: string; entries: ContactEntry[] }
  | { kind: "form"; form: FormId; next: string }
  | { kind: "handoff" }
  | { kind: "info"; title: string; body: string; link?: { label: string; to: string } }
  | { kind: "success"; title: string; detail: string };

/** The kinds of account record a picker step can list. Each records its facts under its own prefix. */
export type RecordKind = "channel" | "booking" | "invoice" | "event" | "history";

export type RecordFilter =
  | "channels-all"
  | "channels-issues"
  | "bookings-issues"
  | "bookings-upcoming"
  | "invoices-unpaid"
  | "invoices-all"
  | "events-upcoming"
  | "events-past";

/**
 * A picker step lists the property's matching records as options. Picking one records its facts
 * (`channelName`, `bookingGuest`, …) and routes by the record's status, falling back to `next`.
 */
export type RecordPick = {
  filter: RecordFilter;
  next: string;
  byStatus?: Record<string, string>;
  /** Spoken instead of `say` when nothing matches (or the hotelier is signed out). */
  emptySay: string;
};

/** A routing-only step: resolves straight to another step from a recorded fact. */
export type Decision = { fact: string; cases: Record<string, string>; otherwise: string };

export type StepEffect = PropertyEffect;

export type FlowOption = {
  label: string;
  next: string;
  /** Facts recorded when the option is chosen, available to later `say` templates as {key}. */
  set?: Record<string, string>;
};

export type FlowNode = {
  id: string;
  topic: TopicId | "common";
  /** Short label for the breadcrumb and the voice-agent step list. */
  title: string;
  /** Assistant line, shown in chat and spoken in voice mode. Supports {placeholders}. */
  say: string;
  card?: FlowCard;
  options: FlowOption[];
  pick?: RecordPick;
  decide?: Decision;
  effect?: StepEffect;
  /** Picker to show first when this step is reached without its record; defaults to the topic's picker. */
  picker?: string;
  /** Phrases a hotelier might type or say to jump straight to this step. */
  keywords?: string[];
};

export type TopicIcon = "plug" | "bed" | "tag" | "calendar" | "receipt" | "heart" | "user" | "building" | "alert" | "trending";

export type Topic = {
  id: TopicId;
  label: string;
  description: string;
  icon: TopicIcon;
  entry: string;
};
