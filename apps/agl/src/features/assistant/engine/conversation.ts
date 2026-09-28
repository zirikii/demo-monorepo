import { renderTemplate, requireNode, type FlowCard, type TemplateValues } from "../flows";

export type Via = "text" | "voice" | "chip";

export type RenderedOption = { label: string; next: string; set?: TemplateValues };

export type AssistantMessage = {
  id: number;
  role: "assistant";
  /** Null for free-form voice replies that aren't tied to a flow step. */
  stepId: string | null;
  text: string;
  card?: FlowCard;
  options: RenderedOption[];
  /** Voice-agent steps start empty and are filled by the spoken transcript. */
  awaitingVoice?: boolean;
};

export type UserMessage = { id: number; role: "user"; text: string; via: Via };
export type SystemMessage = { id: number; role: "system"; text: string };
export type ChatMessage = AssistantMessage | UserMessage | SystemMessage;

export type ConversationState = {
  messages: ChatMessage[];
  currentStepId: string | null;
  trail: string[];
  facts: TemplateValues;
  context: TemplateValues;
  nextId: number;
};

export type ConversationAction =
  | { type: "user"; text: string; via: Via }
  | { type: "step"; stepId: string; set?: TemplateValues; silent?: boolean }
  | { type: "back" }
  | { type: "system"; text: string }
  | { type: "assistant-transcript"; text: string; final: boolean }
  | { type: "set-context"; context: TemplateValues }
  | { type: "reset" };

export function initialConversation(context: TemplateValues): ConversationState {
  return { messages: [], currentStepId: null, trail: [], facts: {}, context, nextId: 1 };
}

export function templateValues(state: Pick<ConversationState, "context" | "facts">): TemplateValues {
  return { ...state.context, ...state.facts };
}

function resolveFacts(set: TemplateValues | undefined, values: TemplateValues): TemplateValues {
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

export function renderStep(stepId: string, values: TemplateValues) {
  const node = requireNode(stepId);
  return {
    node,
    card: renderCard(node.card, values),
    text: renderTemplate(node.say, values),
    options: node.options.map((o) => ({
      label: renderTemplate(o.label, values),
      next: o.next,
      set: o.set,
    })),
  };
}

export function conversationReducer(
  state: ConversationState,
  action: ConversationAction,
): ConversationState {
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
      const { node, card, text, options } = renderStep(action.stepId, values);
      const message: AssistantMessage = {
        id: state.nextId,
        role: "assistant",
        stepId: node.id,
        text: action.silent ? "" : text,
        card,
        options,
        awaitingVoice: action.silent || undefined,
      };
      const trail = node.id === "root" ? [] : [...state.trail, node.id];
      return {
        ...state,
        facts,
        messages: [...state.messages, message],
        currentStepId: node.id,
        trail,
        nextId: state.nextId + 1,
      };
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
      return { ...state, context: action.context };
    case "reset":
      return initialConversation(state.context);
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
