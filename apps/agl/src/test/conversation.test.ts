import { describe, expect, it } from "vitest";
import { buildContext } from "@/features/assistant/engine/context";
import {
  conversationReducer,
  initialConversation,
  liveOptions,
  renderCard,
  type AssistantMessage,
  type ConversationAction,
  type ConversationState,
} from "@/features/assistant/engine/conversation";

const context = buildContext({ firstName: "Alex", email: "alex@example.com" });

function run(...actions: ConversationAction[]): ConversationState {
  return actions.reduce(conversationReducer, initialConversation(context));
}

function lastAssistant(state: ConversationState): AssistantMessage {
  const msg = [...state.messages].reverse().find((m) => m.role === "assistant");
  if (!msg || msg.role !== "assistant") throw new Error("no assistant message");
  return msg;
}

describe("conversationReducer", () => {
  it("greets by name and offers the topics", () => {
    const state = run({ type: "step", stepId: "root" });
    const greeting = lastAssistant(state);
    expect(greeting.text).toBe("Hi Alex, I'm the AGL Assistant. What's your query today? Pick a topic, or just tell me in your own words.");
    expect(greeting.options.map((o) => o.label)).toContain("Internet & mobile");
    expect(state.trail).toEqual([]);
  });

  it("tracks the trail and goes back one step", () => {
    const state = run({ type: "step", stepId: "root" }, { type: "step", stepId: "netmob" }, { type: "step", stepId: "internet.down" });
    expect(state.trail).toEqual(["netmob", "internet.down"]);
    const back = conversationReducer(state, { type: "back" });
    expect(back.currentStepId).toBe("netmob");
    expect(back.trail).toEqual(["netmob"]);
  });

  it("records option facts and renders them into later steps and cards", () => {
    const state = run(
      { type: "step", stepId: "support.instalment" },
      { type: "step", stepId: "support.instalment.done", set: { instalmentFrequency: "fortnightly", instalmentAmount: "$116.69" } },
    );
    const done = lastAssistant(state);
    expect(state.facts.instalmentFrequency).toBe("fortnightly");
    expect(done.card).toMatchObject({ kind: "success", detail: expect.stringContaining("$116.69 fortnightly") });
    expect(JSON.stringify(done.card)).not.toMatch(/\{\w+\}/);
  });

  it("resolves templated facts like {totalDue} at the time they're chosen", () => {
    const state = run({ type: "step", stepId: "billing.pay.done", set: { paidAmount: "{totalDue}" } });
    expect(state.facts.paidAmount).toBe(context.totalDue);
  });

  it("fills a silent voice step with the spoken transcript", () => {
    let state = run({ type: "step", stepId: "root", silent: true });
    expect(lastAssistant(state)).toMatchObject({ text: "", awaitingVoice: true });
    state = conversationReducer(state, { type: "assistant-transcript", text: "G'day Alex", final: false });
    state = conversationReducer(state, { type: "assistant-transcript", text: "G'day Alex, what's your query today?", final: true });
    expect(state.messages).toHaveLength(1);
    expect(lastAssistant(state)).toMatchObject({ text: "G'day Alex, what's your query today?", awaitingVoice: undefined });
  });

  it("only exposes options until the customer replies", () => {
    let state = run({ type: "step", stepId: "root" });
    expect(liveOptions(state).length).toBeGreaterThan(0);
    state = conversationReducer(state, { type: "user", text: "billing", via: "text" });
    expect(liveOptions(state)).toEqual([]);
  });

  it("resets to an empty conversation", () => {
    const state = conversationReducer(run({ type: "step", stepId: "billing" }), { type: "reset" });
    expect(state.messages).toEqual([]);
    expect(state.currentStepId).toBeNull();
  });
});

describe("renderCard", () => {
  it("fills placeholders in nested card fields", () => {
    const card = renderCard({ kind: "steps", title: "For {firstName}", steps: ["Call {distributor}"] }, context);
    expect(card).toEqual({ kind: "steps", title: "For Alex", steps: ["Call Ausgrid"] });
  });
});
