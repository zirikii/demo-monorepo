import { describe, expect, it } from "vitest";
import { SEED_FAN, seedOrders } from "@/data/fan";
import { buildContext } from "@/features/assistant/engine/context";
import { conversationReducer, initialConversation, liveOptions, renderStep, templateValues, type ConversationCustomer } from "@/features/assistant/engine/conversation";
import { viewOrders } from "@/features/fan/orders";

const views = viewOrders(seedOrders());
const customer: ConversationCustomer = { profile: SEED_FAN, views, signedIn: true };
const context = buildContext({ profile: SEED_FAN, orders: seedOrders(), views, signedIn: true }, { personalGreeting: true, recommendations: true });

function orderOf(slug: string) {
  const view = views.find((v) => v.event.slug === slug);
  if (!view) throw new Error(`No seeded order for ${slug}`);
  return view;
}

describe("conversation engine", () => {
  it("greets a signed-in fan with their next event", () => {
    const { text } = renderStep("root", context, customer);
    expect(text).toContain("Jordan");
    expect(text).toContain("Freddie");
  });

  it("lists the fan's orders on picker steps and routes each by policy", () => {
    const { options } = renderStep("refunds", context, customer);
    const byOrder = Object.fromEntries(options.filter((o) => o.orderId).map((o) => [o.orderId!, o.next]));
    expect(byOrder[orderOf("outback-truckers").order.id]).toBe("refunds.cancelled");
    expect(byOrder[orderOf("joe-avati").order.id]).toBe("refunds.rescheduled");
    expect(byOrder[orderOf("icehouse").order.id]).toBe("refunds.protect");
    expect(byOrder[orderOf("laneway-festival").order.id]).toBe("refunds.standard");
  });

  it("routes Where's my ticket by delivery method", () => {
    const { options } = renderStep("tickets", context, customer);
    const next = (slug: string) => options.find((o) => o.orderId === orderOf(slug).order.id)?.next;
    expect(next("freddies-queen")).toBe("tickets.mobile");
    expect(next("mrs-doubtfire")).toBe("tickets.collect");
    expect(next("bathurst-1000")).toBe("tickets.souvenir");
    expect(next("icehouse")).toBe("tickets.ezy");
  });

  it("only offers transferable orders for transfers", () => {
    const ids = renderStep("transfer", context, customer).options.filter((o) => o.orderId).map((o) => o.orderId);
    expect(ids).toEqual(views.filter((v) => v.canTransfer).map((v) => v.order.id));
  });

  it("sends an order step reached without an order to the topic's picker", () => {
    expect(renderStep("tickets.mobile", context, customer).node.id).toBe("tickets");
    expect(renderStep("refunds.cancelled", context, customer).node.id).toBe("refunds");
  });

  it("asks signed-out fans to sign in on picker steps", () => {
    const guest = { ...customer, signedIn: false };
    const step = renderStep("tickets", context, guest);
    expect(step.options.some((o) => o.next === "signin")).toBe(true);
    expect(step.options.some((o) => o.orderId)).toBe(false);
  });

  it("records the picked order's facts for later steps", () => {
    let state = initialConversation({ context, customer });
    state = conversationReducer(state, { type: "step", stepId: "tickets" });
    const option = liveOptions(state).find((o) => o.orderId === orderOf("freddies-queen").order.id)!;
    state = conversationReducer(state, { type: "user", text: option.label, via: "chip" });
    state = conversationReducer(state, { type: "step", stepId: option.next, set: option.set });
    expect(state.currentStepId).toBe("tickets.mobile");
    expect(templateValues(state).orderEvent).toContain("Freddie");
    const last = state.messages.at(-1)!;
    expect(last.role === "assistant" && last.text).toContain("Freddie");
  });

  it("goes back one step", () => {
    let state = initialConversation({ context, customer });
    state = conversationReducer(state, { type: "step", stepId: "menu" });
    state = conversationReducer(state, { type: "step", stepId: "groups" });
    state = conversationReducer(state, { type: "back" });
    expect(state.currentStepId).toBe("menu");
  });
});
