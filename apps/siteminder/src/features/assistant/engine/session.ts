import { nextEvent, pastEvents, upcomingEvents } from "@/features/property/insights";
import {
  BOOKING_STATUS_LABELS,
  CHANNEL_STATUS_LABELS,
  channelById,
  channelIssue,
  daysUntil,
  invoiceTotal,
  overdueDays,
  PLANS,
} from "@/features/property/views";
import { CONDITION_LABELS, hoursLabel, isLiveChatOpen, queueName } from "@/features/studio/config";
import { describeCondition, evaluateRouting } from "@/features/studio/routing";
import type {
  ConversationRecord,
  RoutingOutcome,
  RoutingSignals,
  StudioConfig,
  TranscriptLine,
} from "@/features/studio/types";
import { formatCurrency, formatMonthYear, formatShortDate, pluralise } from "@/lib/format";
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

export function contactName(customer: ConversationCustomer): string {
  return customer.signedIn
    ? `${customer.property.profile.firstName} ${customer.property.profile.lastName}`
    : "Guest";
}

export function routingSignals(
  state: ConversationState,
  log: ConversationRecord[],
  sessionId: string,
  now: Date = new Date(),
): RoutingSignals {
  const { property } = state.customer;
  const { facts } = state;
  const event = facts.eventId ? property.events.find((e) => e.id === facts.eventId) : undefined;
  const channel = facts.channelId ? channelById(property, facts.channelId) : undefined;
  const booking = facts.bookingId
    ? property.bookings.find((b) => b.id === facts.bookingId)
    : undefined;
  const signedIn = state.customer.signedIn;
  const upcoming = signedIn ? nextEvent(property.events, now) : undefined;
  const name = contactName(state.customer);
  return {
    customerTurns: state.messages.filter((m) => m.role === "user").map((m) => m.text),
    topics: conversationTopics(state),
    fallbackCount: state.messages.filter((m) => m.role === "assistant" && m.stepId === "fallback")
      .length,
    event: event && { label: event.name, daysUntil: daysUntil(event.start, now) },
    channel: channel && { label: channel.name, status: channel.status },
    booking: booking && { label: `${booking.id} (${booking.guest})`, status: booking.status },
    nextEvent: upcoming && { label: upcoming.name, daysUntil: daysUntil(upcoming.start, now) },
    channelIssues: signedIn ? property.channels.filter(channelIssue).map((c) => c.name) : [],
    plan: property.property.plan,
    rooms: property.property.rooms,
    overdueDays: signedIn ? Math.max(0, ...property.invoices.map((i) => overdueDays(i, now))) : 0,
    priorContacts: signedIn
      ? log.filter((r) => r.id !== sessionId && r.signedIn && r.contactName === name)
      : [],
    now,
  };
}

/** Facts the handoff step and card read: the team, wait, reference and why the hotelier landed there. */
export function handoffFacts(
  config: StudioConfig,
  outcome: RoutingOutcome,
  ref: string,
  customer: ConversationCustomer,
  now: Date = new Date(),
): TemplateValues {
  const { decision } = outcome;
  const team = queueName(config, decision.queue);
  const wait = config.queues[decision.queue]?.waitMins ?? 5;
  const open = isLiveChatOpen(config, now);
  const handoffLine = open
    ? `You're next in line, about ${pluralise(wait, "minute")}, and I've passed on everything we've covered. Your reference is ${ref}.`
    : `Live chat is open ${hoursLabel(config)}, so the team will call you on ${customer.property.profile.mobile} when they're back. Your reference is ${ref}.`;
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

export function promptOptions(
  config: StudioConfig,
  customer: ConversationCustomer,
  now: Date = new Date(),
): SupportPromptOptions {
  const { property: state, signedIn } = customer;
  const channel = (id: string) => channelById(state, id)?.name ?? id;
  return {
    persona: config.assistant.persona,
    voiceForms: config.assistant.voiceForms,
    escalations: describeRules(config),
    disabledTopics: topics
      .filter((t) => config.topics[t.id] === false)
      .map((t) => ({ label: t.label, entry: t.entry })),
    customInstructions: config.assistant.customInstructions,
    property: signedIn
      ? [
          `- ${state.property.name}, ${state.property.city}. ${state.property.rooms} rooms, ${state.property.stars}-star. PMS: ${state.property.pms}. Plan: ${PLANS[state.property.plan].name}. Support code ${state.property.supportCode}.`,
          `- Room types: ${state.property.roomTypes.map((r) => `${r.name} (${r.rooms}, from ${formatCurrency(r.baseRate)})`).join(", ")}.`,
        ]
      : [],
    records: signedIn
      ? [
          ...state.channels.map(
            (c) =>
              `- Channel ${c.id}: ${c.name}, ${CHANNEL_STATUS_LABELS[c.status]}${c.issueRoom ? ` on ${c.issueRoom}` : ""}. ${c.bookings30d} bookings in 30 days.`,
          ),
          ...state.bookings
            .filter((b) => b.status !== "confirmed")
            .map(
              (b) =>
                `- Booking ${b.id}: ${b.guest}, ${b.room}, ${formatShortDate(b.checkIn)} for ${pluralise(b.nights, "night")} via ${channel(b.channelId)}. ${formatCurrency(b.total)}. ${BOOKING_STATUS_LABELS[b.status]}.`,
            ),
          ...state.invoices.map(
            (i) =>
              `- Invoice ${i.id}: ${i.period}, ${formatCurrency(invoiceTotal(i))}, due ${formatShortDate(i.due)}, ${i.status}.`,
          ),
        ]
      : [],
    events:
      signedIn && config.assistant.eventInsights
        ? [
            ...upcomingEvents(state.events, now)
              .slice(0, 5)
              .map(
                (e) =>
                  `- Upcoming ${e.id}: ${e.name} at ${e.venue}, ${formatShortDate(e.start)} (${pluralise(daysUntil(e.start, now), "day")} away). ${e.onBooksPct ?? 0}% on the books${e.plan ? `. Event pricing applied: +${e.plan.upliftPct}%, ${e.plan.minStay}-night minimum` : ""}.`,
              ),
            ...pastEvents(state.events)
              .slice(0, 8)
              .map((e) =>
                e.outcome
                  ? `- Past ${e.id}: ${e.name}, ${formatMonthYear(e.start)}. ${e.outcome.occupancyPct}% occupancy, ADR ${formatCurrency(e.outcome.adr)} (+${e.outcome.adrUpliftPct}%), ${e.outcome.soldOutDaysBefore ? `sold out ${pluralise(e.outcome.soldOutDaysBefore, "day")} before` : "didn't sell out"}. ${e.outcome.note}`
                  : `- Past ${e.id}: ${e.name}, ${formatMonthYear(e.start)}.`,
              ),
          ]
        : [],
  };
}

export function transcriptOf(state: Pick<ConversationState, "messages">): TranscriptLine[] {
  return state.messages
    .filter((m) => m.text.trim())
    .map((m) => ({ role: m.role === "user" ? "hotelier" : m.role, text: m.text }));
}

export function outcomeOf(
  state: Pick<ConversationState, "messages">,
): ConversationRecord["outcome"] {
  const steps = state.messages.flatMap((m) =>
    m.role === "assistant" && m.stepId ? [m.stepId] : [],
  );
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
  const trail = state.messages.flatMap((m) =>
    m.role === "assistant" && m.stepId ? [m.stepId] : [],
  );
  return {
    id: opts.id,
    ref: opts.ref,
    startedAt: opts.startedAt,
    endedAt: (opts.now ?? new Date()).toISOString(),
    contactName: contactName(state.customer),
    propertyName: state.customer.signedIn ? state.customer.property.property.name : "Not logged in",
    signedIn: state.customer.signedIn,
    channel: opts.channel,
    engine: opts.engine,
    outcome,
    ...(outcome === "handoff" && handoff
      ? {
          queue: handoff.decision.queue,
          priority: handoff.decision.priority,
          ruleName: handoff.decision.ruleName,
        }
      : {}),
    topics: conversationTopics(state),
    trail,
    turns: state.messages.filter((m) => m.role === "user").length,
    transcript: transcriptOf(state),
  };
}

export function newSessionRef(now: Date = new Date()): {
  id: string;
  ref: string;
  startedAt: string;
} {
  const stamp = now.getTime().toString(36).toUpperCase();
  return {
    id: `chat-${now.getTime()}-${Math.floor(Math.random() * 1e6)}`,
    ref: `SMS-${stamp.slice(-6)}`,
    startedAt: now.toISOString(),
  };
}
