import type { DeliveryId } from "@/data/types";
import type { RefundPolicy } from "@/features/fan/types";

export type TopicId =
  | "tickets"
  | "refunds"
  | "changes"
  | "transfer"
  | "resale"
  | "accessibility"
  | "groups"
  | "payments"
  | "account"
  | "eventday"
  | "discover";

export type FormId =
  | "resend-tickets"
  | "transfer-tickets"
  | "resale-price"
  | "accessible-booking"
  | "group-enquiry"
  | "voucher-balance"
  | "data-erasure"
  | "unsubscribe";

export type ContactEntry = { label: string; phone: string; note?: string };

/** Rich content under an assistant turn. Voice mode describes the same card out loud. */
export type FlowCard =
  | { kind: "steps"; title: string; steps: string[] }
  | { kind: "order" }
  | { kind: "mobile-ticket" }
  | { kind: "refund"; mode: "auto" | "requested" }
  | { kind: "reschedule" }
  | { kind: "event-day" }
  | { kind: "recommendations" }
  | { kind: "contact"; title: string; entries: ContactEntry[] }
  | { kind: "form"; form: FormId; next: string }
  | { kind: "handoff" }
  | { kind: "info"; title: string; body: string; link?: { label: string; to: string } }
  | { kind: "success"; title: string; detail: string };

/** Which of the fan's orders an order-picker step lists. */
export type OrderFilter = "active" | "transferable" | "resellable" | "attending";

/**
 * An order-picker step lists the fan's matching orders as options. Picking one records the order's
 * facts and routes by Ticketek policy: refund policy first, then delivery method, then `next`.
 */
export type OrderPick = {
  filter: OrderFilter;
  next: string;
  byPolicy?: Partial<Record<RefundPolicy, string>>;
  byDelivery?: Partial<Record<DeliveryId, string>>;
  /** Spoken instead of `say` when no orders match (or the fan is signed out). */
  emptySay: string;
};

/** A routing-only step: resolves straight to another step from a recorded fact. */
export type Decision = { fact: string; cases: Record<string, string>; otherwise: string };

/** Side effects a step applies to the fan's account when it's shown. */
export type StepEffect = "refund" | "transfer" | "resale" | "unsubscribe";

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
  pick?: OrderPick;
  decide?: Decision;
  effect?: StepEffect;
  /** Phrases a customer might type or say to jump straight to this step. */
  keywords?: string[];
};

export type TopicIcon = "ticket" | "refund" | "calendar" | "send" | "tag" | "accessible" | "users" | "card" | "user" | "map" | "sparkles";

export type Topic = {
  id: TopicId;
  label: string;
  description: string;
  icon: TopicIcon;
  entry: string;
};
