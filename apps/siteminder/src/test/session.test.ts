import { describe, expect, it } from "vitest";
import { seedProperty } from "@/data/property";
import { buildContext } from "@/features/assistant/engine/context";
import { conversationReducer, initialConversation, liveOptions, type ConversationCustomer } from "@/features/assistant/engine/conversation";
import { buildRecord, conversationTopics, describeRules, handoffFacts, newSessionRef, promptOptions, routingSignals, stepTopicEnabled } from "@/features/assistant/engine/session";
import { defaultConfig } from "@/features/studio/config";
import { evaluateRouting } from "@/features/studio/routing";
import { toLocalIso } from "@/lib/clock";

const property = seedProperty();
const customer: ConversationCustomer = { property, signedIn: true };
const context = buildContext({ state: property, signedIn: true }, { personalGreeting: true, insights: true });
const start = () => initialConversation({ context, customer });

describe("support session", () => {
  it("turns off a topic's steps when the studio switches it off", () => {
    const config = defaultConfig();
    config.topics.grow = false;
    expect(stepTopicEnabled(config, "grow")).toBe(false);
    expect(stepTopicEnabled(config, "channels")).toBe(true);
    expect(stepTopicEnabled(config, "handoff")).toBe(true);
  });

  it("builds routing signals from the conversation and the property", () => {
    let state = start();
    state = conversationReducer(state, { type: "step", stepId: "channels" });
    const option = liveOptions(state).find((o) => o.recordId === "exp")!;
    state = conversationReducer(state, { type: "user", text: "expedia isn't selling", via: "text" });
    state = conversationReducer(state, { type: "step", stepId: option.next, set: option.set });
    const s = routingSignals(state, [], "sess");
    expect(s).toMatchObject({
      customerTurns: ["expedia isn't selling"],
      topics: ["channels"],
      channel: { label: "Expedia", status: "mapping-error" },
      nextEvent: { daysUntil: 5 },
      channelIssues: ["Expedia", "Airbnb", "Trip.com"],
      plan: "plus",
      rooms: 86,
      overdueDays: 0,
    });
    expect(evaluateRouting(defaultConfig(), s, "handoff").decision).toMatchObject({ queue: "connectivity", priority: "P2", ruleId: "channel-down" });
  });

  it("sees an event picked in the chat, so event-week routing applies", () => {
    let state = start();
    state = conversationReducer(state, { type: "step", stepId: "events" });
    const option = liveOptions(state).find((o) => o.recordId === "evt-bledisloe")!;
    state = conversationReducer(state, { type: "step", stepId: option.next, set: option.set });
    expect(conversationTopics(state)).toEqual(["events"]);
    const decision = evaluateRouting(defaultConfig(), routingSignals(state, [], "s"), "handoff").decision;
    expect(decision).toMatchObject({ queue: "revenue", priority: "P1", ruleId: "event-week" });
  });

  it("uses only conversation signals for a signed-out visitor", () => {
    const guest = initialConversation({ context, customer: { ...customer, signedIn: false } });
    const s = routingSignals(guest, [], "s");
    expect(s.channelIssues).toEqual([]);
    expect(s.nextEvent).toBeUndefined();
    expect(s.overdueDays).toBe(0);
  });

  it("counts overdue invoices", () => {
    const overdue = { ...property, invoices: property.invoices.map((i, n) => (n === 0 ? { ...i, status: "overdue" as const, due: toLocalIso(new Date(Date.now() - 18 * 86_400_000)) } : i)) };
    const s = routingSignals(initialConversation({ context, customer: { property: overdue, signedIn: true } }), [], "s");
    expect(s.overdueDays).toBe(18);
  });

  it("describes the handoff while live chat is open and after hours", () => {
    const config = defaultConfig();
    const outcome = evaluateRouting(config, routingSignals(start(), [], "s"), "handoff");
    const open = handoffFacts(config, outcome, "SMS-ABC123", customer, new Date("2026-09-30T02:00:00Z"));
    expect(open).toMatchObject({ handoffOpen: "yes", handoffTeam: "Connectivity team", handoffWait: "2 mins", handoffRule: "Event at risk", handoffRef: "SMS-ABC123" });
    expect(open.handoffLine).toContain("SMS-ABC123");
    config.hours = { open: 8, close: 20 };
    const late = handoffFacts(config, outcome, "SMS-ABC123", customer, new Date("2026-09-30T13:00:00Z"));
    expect(late).toMatchObject({ handoffOpen: "no", handoffWait: "Callback" });
    expect(late.handoffLine).toContain(property.profile.mobile);
  });

  it("writes plain-English rules for the prompt, skipping switched-off ones", () => {
    const lines = describeRules(defaultConfig());
    const security = lines.find((l) => l.startsWith("Security or fraud:"));
    expect(security).toContain("hacked");
    expect(security).toMatch(/→ hand off to Security \(P1\)$/);
    expect(lines.find((l) => l.startsWith("Overbooking:"))).toMatch(/→ handoffs go to Reservations \(P1\)$/);
    expect(lines.some((l) => l.startsWith("Repeat contact"))).toBe(false);
  });

  it("only shares the events store when the studio allows it", () => {
    const config = defaultConfig();
    const opts = promptOptions(config, customer);
    expect(opts.events.some((l) => l.includes("evt-bledisloe"))).toBe(true);
    expect(opts.events.some((l) => l.includes("Past evt-eras-2024"))).toBe(true);
    expect(opts.records.some((l) => l.startsWith("- Channel exp: Expedia, Mapping error on Deluxe King"))).toBe(true);
    config.assistant.eventInsights = false;
    expect(promptOptions(config, customer).events).toEqual([]);
    expect(promptOptions(config, { ...customer, signedIn: false }).records).toEqual([]);
  });

  it("logs a conversation with its outcome and route", () => {
    let state = start();
    state = conversationReducer(state, { type: "step", stepId: "root" });
    state = conversationReducer(state, { type: "user", text: "I want to talk to a person", via: "text" });
    state = conversationReducer(state, { type: "step", stepId: "handoff" });
    const ref = newSessionRef();
    const outcome = evaluateRouting(defaultConfig(), routingSignals(state, [], ref.id), "handoff");
    const record = buildRecord({ ...ref, state, channel: "chat", engine: "scripted", handoff: outcome });
    expect(record).toMatchObject({ outcome: "handoff", queue: "connectivity", contactName: "Sophie Tran", propertyName: "The Harbour Lane Hotel", turns: 1 });
    expect(record.ref).toMatch(/^SMS-[A-Z0-9]{6}$/);
    expect(record.transcript[1]).toEqual({ role: "hotelier", text: "I want to talk to a person" });
  });
});
