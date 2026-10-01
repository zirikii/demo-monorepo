import { DELIVERY, STATUS_LABELS } from "@/features/fan/orders";
import { lifetimeEvents } from "@/features/fan/recommendations";
import { CONDITION_LABELS, hoursLabel, isLiveChatOpen, queueName } from "@/features/studio/config";
import { describeCondition, evaluateRouting } from "@/features/studio/routing";
import type { ConversationRecord, RoutingOutcome, RoutingSignals, StudioConfig, TranscriptLine } from "@/features/studio/types";
import { formatCurrency, formatDateTime, formatMonthYear, pluralise } from "@/lib/format";
import { getNode, topics, type TemplateValues, type TopicId } from "../flows";
import type { ConversationCustomer, ConversationState } from "./conversation";
import type { SupportPromptOptions } from "./voicePrompt";

export function stepTopicEnabled(config: StudioConfig, stepId: string): boolean {
  const node = getNode(stepId);
  if (!node || node.topic === "common") return true;
  return config.topics[node.topic] !== false;
}

export function conversationTopics(state: Pick<ConversationState, "messages">): TopicId[] {
  const seen = new Set<TopicId>();
  for (const m of state.messages) {
    if (m.role !== "assistant" || !m.stepId) continue;
    const topic = getNode(m.stepId)?.topic;
    if (topic && topic !== "common") seen.add(topic);
  }
  return [...seen];
}

export function routingSignals(
  state: ConversationState,
  log: ConversationRecord[],
  sessionId: string,
  now: Date = new Date(),
): RoutingSignals {
  const { customer } = state;
  const view = state.facts.orderId ? customer.views.find((v) => v.order.id === state.facts.orderId) : undefined;
  return {
    customerTurns: state.messages.filter((m) => m.role === "user").map((m) => m.text),
    topics: conversationTopics(state),
    fallbackCount: state.messages.filter((m) => m.role === "assistant" && m.stepId === "fallback").length,
    order: view && { label: view.event.name, hoursUntil: view.hoursUntil, status: view.status, total: view.order.total },
    lifetimeEvents: lifetimeEvents(customer.profile),
    priorContacts: customer.signedIn
      ? log.filter((r) => r.id !== sessionId && r.signedIn && r.fanName === `${customer.profile.firstName} ${customer.profile.lastName}`)
      : [],
    now,
  };
}

/** Facts the handoff step and card read: the team, wait, reference and why the fan landed there. */
export function handoffFacts(config: StudioConfig, outcome: RoutingOutcome, ref: string, customer: ConversationCustomer, now: Date = new Date()): TemplateValues {
  const { decision } = outcome;
  const team = queueName(config, decision.queue);
  const wait = config.queues[decision.queue]?.waitMins ?? 5;
  const open = isLiveChatOpen(config, now);
  const handoffLine = open
    ? `You're next in line, about ${pluralise(wait, "minute")}, and I've passed on everything we've covered. Your reference is ${ref}.`
    : `Live chat is open ${hoursLabel(config)}, so the team will call you on ${customer.profile.mobile} when they're back. Your reference is ${ref}.`;
  return {
    handoffTeam: `${team} team`,
    handoffQueue: decision.queue,
    handoffWait: open ? pluralise(wait, "min") : "Callback",
    handoffOpen: open ? "yes" : "no",
    handoffRef: ref,
    handoffPriority: decision.priority,
    handoffRule: decision.ruleName ?? "Standard routing",
    handoffReason: decision.reason,
    handoffLine,
  };
}

export function evaluateHandoff(config: StudioConfig, signals: RoutingSignals): RoutingOutcome {
  return evaluateRouting(config, signals, "handoff");
}

export function describeRules(config: StudioConfig): string[] {
  if (!config.routing.enabled) return [];
  return config.routing.rules
    .filter((r) => r.enabled)
    .map(
      (r) =>
        `${r.name}: ${CONDITION_LABELS[r.condition.kind].toLowerCase()} ${describeCondition(r.condition)} → ${r.action === "handoff" ? "hand off to" : "handoffs go to"} ${queueName(config, r.queue)} (${r.priority})`,
    );
}

export function promptOptions(config: StudioConfig, customer: ConversationCustomer): SupportPromptOptions {
  const { profile, views, signedIn } = customer;
  return {
    persona: config.assistant.persona,
    voiceForms: config.assistant.voiceForms,
    escalations: describeRules(config),
    disabledTopics: topics.filter((t) => config.topics[t.id] === false).map((t) => ({ label: t.label, entry: t.entry })),
    customInstructions: config.assistant.customInstructions,
    orders: signedIn
      ? views
          .filter((v) => v.status !== "past")
          .map(
            (v) =>
              `- ${v.order.id}: ${v.event.name} at ${v.venue.name}, ${formatDateTime(v.performance.startsAt)}. ${v.seatsLabel}. ${DELIVERY[v.order.delivery].label}. ${formatCurrency(v.order.total)}. Status: ${STATUS_LABELS[v.status]}${v.order.ticketProtect ? ". Ticket Protect" : ""}.`,
          )
      : [],
    history: signedIn && config.assistant.useHistory ? profile.attended.slice(0, 8).map((a) => `- ${a.name}, ${a.venue} ${a.city}, ${formatMonthYear(a.date)}`) : [],
  };
}

export function transcriptOf(state: Pick<ConversationState, "messages">): TranscriptLine[] {
  return state.messages
    .filter((m) => m.text.trim())
    .map((m) => ({ role: m.role === "user" ? "fan" : m.role, text: m.text }));
}

export function outcomeOf(state: Pick<ConversationState, "messages">): ConversationRecord["outcome"] {
  const steps = state.messages.flatMap((m) => (m.role === "assistant" && m.stepId ? [m.stepId] : []));
  if (steps.includes("handoff")) return "handoff";
  if (steps.includes("resolved") || steps.includes("end")) return "resolved";
  return "open";
}

export function buildRecord(opts: {
  id: string;
  ref: string;
  startedAt: string;
  state: ConversationState;
  channel: ConversationRecord["channel"];
  engine: ConversationRecord["engine"];
  handoff: RoutingOutcome | null;
  now?: Date;
}): ConversationRecord {
  const { state, handoff } = opts;
  const outcome = outcomeOf(state);
  const trail = state.messages.flatMap((m) => (m.role === "assistant" && m.stepId ? [m.stepId] : []));
  return {
    id: opts.id,
    ref: opts.ref,
    startedAt: opts.startedAt,
    endedAt: (opts.now ?? new Date()).toISOString(),
    fanName: state.customer.signedIn ? `${state.customer.profile.firstName} ${state.customer.profile.lastName}` : "Guest",
    signedIn: state.customer.signedIn,
    channel: opts.channel,
    engine: opts.engine,
    outcome,
    ...(outcome === "handoff" && handoff
      ? { queue: handoff.decision.queue, priority: handoff.decision.priority, ruleName: handoff.decision.ruleName }
      : {}),
    topics: conversationTopics(state),
    trail,
    turns: state.messages.filter((m) => m.role === "user").length,
    transcript: transcriptOf(state),
  };
}

export function newSessionRef(now: Date = new Date()): { id: string; ref: string; startedAt: string } {
  const stamp = now.getTime().toString(36).toUpperCase();
  return { id: `chat-${now.getTime()}-${Math.floor(Math.random() * 1e6)}`, ref: `TKS-${stamp.slice(-6)}`, startedAt: now.toISOString() };
}
