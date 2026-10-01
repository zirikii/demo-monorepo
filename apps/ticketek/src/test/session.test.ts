import { describe, expect, it } from "vitest";
import { SEED_FAN, seedOrders } from "@/data/fan";
import { buildContext } from "@/features/assistant/engine/context";
import { conversationReducer, initialConversation, type ConversationCustomer } from "@/features/assistant/engine/conversation";
import { buildRecord, describeRules, handoffFacts, newSessionRef, promptOptions, routingSignals, stepTopicEnabled } from "@/features/assistant/engine/session";
import { viewOrders } from "@/features/fan/orders";
import { defaultConfig } from "@/features/studio/config";
import { evaluateRouting } from "@/features/studio/routing";

const views = viewOrders(seedOrders());
const customer: ConversationCustomer = { profile: SEED_FAN, views, signedIn: true };
const context = buildContext({ profile: SEED_FAN, orders: seedOrders(), views, signedIn: true }, { personalGreeting: true, recommendations: true });

describe("support session", () => {
  it("turns off a topic's steps when the studio switches it off", () => {
    const config = defaultConfig();
    config.topics.resale = false;
    expect(stepTopicEnabled(config, "resale")).toBe(false);
    expect(stepTopicEnabled(config, "tickets")).toBe(true);
    expect(stepTopicEnabled(config, "handoff")).toBe(true);
  });

  it("builds routing signals from the conversation", () => {
    let state = initialConversation({ context, customer });
    const soon = views.find((v) => v.status === "event-soon")!;
    state = conversationReducer(state, { type: "step", stepId: "tickets" });
    state = conversationReducer(state, { type: "user", text: "my barcode is missing", via: "text" });
    state = conversationReducer(state, { type: "step", stepId: "tickets.mobile", set: { orderId: soon.order.id, orderSelected: "yes" } });
    const s = routingSignals(state, [], "sess");
    expect(s.customerTurns).toEqual(["my barcode is missing"]);
    expect(s.topics).toEqual(["tickets"]);
    expect(s.order?.status).toBe("event-soon");
    expect(s.lifetimeEvents).toBe(SEED_FAN.attended.length + SEED_FAN.archivedEvents);
    expect(evaluateRouting(defaultConfig(), s, "handoff").decision.queue).toBe("event-day");
  });

  it("describes the handoff while live chat is open and after hours", () => {
    const config = defaultConfig();
    const outcome = evaluateRouting(config, routingSignals(initialConversation({ context, customer }), [], "s"), "handoff");
    const open = handoffFacts(config, outcome, "TKS-123456", customer, new Date("2026-09-30T02:00:00Z"));
    expect(open).toMatchObject({ handoffOpen: "yes", handoffTeam: "Priority Fan care team", handoffRef: "TKS-123456" });
    expect(open.handoffLine).toContain("TKS-123456");
    const late = handoffFacts(config, outcome, "TKS-123456", customer, new Date("2026-09-30T13:00:00Z"));
    expect(late).toMatchObject({ handoffOpen: "no", handoffWait: "Callback" });
    expect(late.handoffLine).toContain(SEED_FAN.mobile);
  });

  it("writes plain-English rules for the prompt, skipping switched-off ones", () => {
    const lines = describeRules(defaultConfig());
    expect(lines.some((l) => l.startsWith("Scam or account fraud"))).toBe(true);
    expect(lines.some((l) => l.startsWith("Repeat contact"))).toBe(false);
  });

  it("only shares history when the studio allows it", () => {
    const config = defaultConfig();
    expect(promptOptions(config, customer).history.length).toBeGreaterThan(0);
    config.assistant.useHistory = false;
    expect(promptOptions(config, customer).history).toEqual([]);
    expect(promptOptions(config, { ...customer, signedIn: false }).orders).toEqual([]);
  });

  it("logs a conversation with its outcome and route", () => {
    let state = initialConversation({ context, customer });
    state = conversationReducer(state, { type: "step", stepId: "root" });
    state = conversationReducer(state, { type: "user", text: "I want to talk to a person", via: "text" });
    state = conversationReducer(state, { type: "step", stepId: "handoff" });
    const ref = newSessionRef();
    const outcome = evaluateRouting(defaultConfig(), routingSignals(state, [], ref.id), "handoff");
    const record = buildRecord({ ...ref, state, channel: "chat", engine: "scripted", handoff: outcome });
    expect(record).toMatchObject({ outcome: "handoff", queue: "priority", fanName: "Jordan Mitchell", turns: 1 });
    expect(record.ref).toMatch(/^TKS-[A-Z0-9]{6}$/);
    expect(record.transcript[1]).toEqual({ role: "fan", text: "I want to talk to a person" });
  });
});
