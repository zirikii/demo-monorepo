export type TopicId =
  | "billing"
  | "internet-mobile"
  | "moving"
  | "meters"
  | "account"
  | "support"
  | "emergency"
  | "solar";

export type FormId = "meter-read" | "mailing-address" | "concession" | "move-request";

export type ContactEntry = { label: string; phone: string; note?: string };

/** Rich content rendered under an assistant turn. Voice mode describes the same card out loud. */
export type FlowCard =
  | { kind: "steps"; title: string; steps: string[] }
  | { kind: "bill"; billKind: "electricity" | "gas" }
  | { kind: "payment-confirm" }
  | { kind: "bpay" }
  | { kind: "usage-compare" }
  | { kind: "outage-status"; service: "nbn" | "power" | "mobile" }
  | { kind: "speed-test" }
  | { kind: "contact"; title: string; entries: ContactEntry[] }
  | { kind: "emergency" }
  | { kind: "form"; form: FormId; next: string }
  | { kind: "plan-compare" }
  | { kind: "extension" }
  | { kind: "instalment" }
  | { kind: "refund" }
  | { kind: "handoff" }
  | { kind: "info"; title: string; body: string; link?: { label: string; to: string } }
  | { kind: "success"; title: string; detail: string };

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
  /** Phrases a customer might type or say to jump straight to this step. */
  keywords?: string[];
};

export type Topic = {
  id: TopicId;
  label: string;
  description: string;
  icon: "receipt" | "wifi" | "truck" | "gauge" | "user" | "heart" | "alert" | "sun";
  entry: string;
};
