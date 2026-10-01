import type { PropertyState } from "@/features/property/types";
import { allNodes, renderTemplate, requireNode, type FlowCard, type FlowNode, type RecordKind, type TemplateValues } from "../flows";
import { filterRecords, RECORD_KIND, resolvePick } from "./context";

export type Via = "text" | "voice" | "chip";

export type RenderedOption = { label: string; next: string; set?: TemplateValues; recordId?: string; recordKind?: RecordKind };

export type AssistantMessage = {
  id: number;
  role: "assistant";
  /** Null for free-form Grok replies that aren't tied to a flow step. */
  stepId: string | null;
  text: string;
  card?: FlowCard;
  /** Placeholder values when the step was shown, so older cards keep describing their own record. */
  values?: TemplateValues;
  options: RenderedOption[];
  /** Voice-agent steps start empty and are filled by the spoken transcript. */
  awaitingVoice?: boolean;
};

export type UserMessage = { id: number; role: "user"; text: string; via: Via };
export type SystemMessage = { id: number; role: "system"; text: string };
export type ChatMessage = AssistantMessage | UserMessage | SystemMessage;

export type ConversationCustomer = { property: PropertyState; signedIn: boolean };

export type ConversationState = {
  messages: ChatMessage[];
  currentStepId: string | null;
  trail: string[];
  facts: TemplateValues;
  context: TemplateValues;
  customer: ConversationCustomer;
  nextId: number;
};

export type ConversationAction =
  | { type: "user"; text: string; via: Via }
  /** `say` replaces the step's scripted line. */
  | { type: "step"; stepId: string; set?: TemplateValues; silent?: boolean; say?: string }
  | { type: "back" }
  | { type: "system"; text: string }
  | { type: "assistant-transcript"; text: string; final: boolean }
  | { type: "set-context"; context: TemplateValues; customer: ConversationCustomer }
  | { type: "reset" };

export function initialConversation(init: { context: TemplateValues; customer: ConversationCustomer }): ConversationState {
  return { messages: [], currentStepId: null, trail: [], facts: {}, context: init.context, customer: init.customer, nextId: 1 };
}

export function templateValues(state: Pick<ConversationState, "context" | "facts">): TemplateValues {
  return { ...state.context, ...state.facts };
}

export function resolveFacts(set: TemplateValues | undefined, values: TemplateValues): TemplateValues {
  if (!set) return {};
  return Object.fromEntries(Object.entries(set).map(([k, v]) => [k, renderTemplate(v, values)]));
}

function renderStrings<T>(value: T, values: TemplateValues): T {
  if (typeof value === "string") return renderTemplate(value, values) as T;
  if (Array.isArray(value)) return value.map((v: unknown) => renderStrings(v, values)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, renderStrings(v, values)])) as T;
  }
  return value;
}

export function renderCard(card: FlowCard | undefined, values: TemplateValues): FlowCard | undefined {
  return card && renderStrings(card, values);
}

const RECORD_CARDS: Partial<Record<FlowCard["kind"], RecordKind>> = {
  channel: "channel",
  "sync-test": "channel",
  booking: "booking",
  invoice: "invoice",
  "payment-confirm": "invoice",
  "invoice-compare": "invoice",
  extension: "invoice",
  instalment: "invoice",
  "event-playbook": "event",
  "event-review": "history",
};

const PLACEHOLDER_KINDS: [RegExp, RecordKind][] = [
  [/\{channel(?!IssueLine)[A-Z]/, "channel"],
  [/\{booking[A-Z]/, "booking"],
  [/\{(invoice|instalment)[A-Z]/, "invoice"],
  [/\{event[A-Z]/, "event"],
  [/\{history[A-Z]/, "history"],
];

/** The kind of record a step talks about, if it reads wrong without one. */
export function neededRecord(node: FlowNode): RecordKind | undefined {
  if (node.pick || node.decide) return undefined;
  const fromCard = node.card && RECORD_CARDS[node.card.kind];
  if (fromCard) return fromCard;
  return PLACEHOLDER_KINDS.find(([pattern]) => pattern.test(node.say))?.[1];
}

function pickerFor(node: FlowNode, kind: RecordKind): string | undefined {
  if (node.picker) return node.picker;
  const pickers = allNodes.filter((n) => n.pick && RECORD_KIND[n.pick.filter] === kind);
  return (pickers.find((n) => n.topic === node.topic) ?? pickers[0])?.id;
}

/**
 * Follows decision steps (which never show) to the step the hotelier should actually see. A jump
 * straight into a record step (a keyword, a deep link, Grok) lands on that record's picker until
 * one has been chosen.
 */
export function resolveStepId(stepId: string, values: TemplateValues): string {
  let id = stepId;
  for (let hops = 0; hops < 5; hops++) {
    const node = requireNode(id);
    if (!node.decide) {
      const kind = neededRecord(node);
      if (kind && values[`${kind}Selected`] !== "yes") return pickerFor(node, kind) ?? id;
      return id;
    }
    const value = values[node.decide.fact];
    id = (value !== undefined ? node.decide.cases[value] : undefined) ?? node.decide.otherwise;
  }
  return id;
}

export function recordOptions(node: FlowNode, customer: ConversationCustomer, now: Date = new Date()): RenderedOption[] {
  if (!node.pick || !customer.signedIn) return [];
  const pick = node.pick;
  return filterRecords(customer.property, pick.filter, now).map((record) => ({
    label: record.label,
    next: resolvePick(pick, record),
    set: record.facts,
    recordId: record.id,
    recordKind: record.kind,
  }));
}

export type RenderedStep = { node: FlowNode; card: FlowCard | undefined; text: string; options: RenderedOption[] };

export function renderStep(requested: string, values: TemplateValues, customer: ConversationCustomer): RenderedStep {
  const node = requireNode(resolveStepId(requested, values));
  const picks = recordOptions(node, customer);
  const empty = Boolean(node.pick) && picks.length === 0;
  const statics: RenderedOption[] = node.options.map((o) => ({ label: renderTemplate(o.label, values), next: o.next, set: o.set }));
  const signIn: RenderedOption[] = empty && !customer.signedIn ? [{ label: "Log in", next: "signin" }] : [];
  return {
    node,
    card: renderCard(node.card, values),
    text: renderTemplate(empty && node.pick ? node.pick.emptySay : node.say, values).replace(/ {2,}/g, " ").trim(),
    options: [...picks, ...signIn, ...statics],
  };
}

export function conversationReducer(state: ConversationState, action: ConversationAction): ConversationState {
  switch (action.type) {
    case "user": {
      const text = action.text.trim();
      if (!text) return state;
      const message: UserMessage = { id: state.nextId, role: "user", text, via: action.via };
      return { ...state, messages: [...state.messages, message], nextId: state.nextId + 1 };
    }
    case "step": {
      const facts = { ...state.facts, ...resolveFacts(action.set, templateValues(state)) };
      const values = { ...state.context, ...facts };
      const { node, card, text, options } = renderStep(action.stepId, values, state.customer);
      const message: AssistantMessage = {
        id: state.nextId,
        role: "assistant",
        stepId: node.id,
        text: action.silent ? "" : (action.say ?? text),
        card,
        values,
        options,
        awaitingVoice: action.silent || undefined,
      };
      const trail = node.id === "root" ? [] : [...state.trail, node.id];
      return { ...state, facts, messages: [...state.messages, message], currentStepId: node.id, trail, nextId: state.nextId + 1 };
    }
    case "back": {
      if (state.trail.length < 2) return state;
      const trail = state.trail.slice(0, -2);
      const previous = state.trail[state.trail.length - 2]!;
      return conversationReducer({ ...state, trail }, { type: "step", stepId: previous });
    }
    case "system": {
      const message: SystemMessage = { id: state.nextId, role: "system", text: action.text };
      return { ...state, messages: [...state.messages, message], nextId: state.nextId + 1 };
    }
    case "assistant-transcript": {
      const last = state.messages[state.messages.length - 1];
      if (last?.role === "assistant" && last.awaitingVoice) {
        const updated: AssistantMessage = { ...last, text: action.text, awaitingVoice: !action.final || undefined };
        return { ...state, messages: [...state.messages.slice(0, -1), updated] };
      }
      const message: AssistantMessage = {
        id: state.nextId,
        role: "assistant",
        stepId: null,
        text: action.text,
        options: [],
        awaitingVoice: !action.final || undefined,
      };
      return { ...state, messages: [...state.messages, message], nextId: state.nextId + 1 };
    }
    case "set-context":
      return { ...state, context: action.context, customer: action.customer };
    case "reset":
      return initialConversation({ context: state.context, customer: state.customer });
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}

/** The options the customer can act on right now — only the latest assistant turn is live. */
export function liveOptions(state: ConversationState): RenderedOption[] {
  for (let i = state.messages.length - 1; i >= 0; i--) {
    const m = state.messages[i]!;
    if (m.role === "assistant") return m.options;
    if (m.role === "user") return [];
  }
  return [];
}
