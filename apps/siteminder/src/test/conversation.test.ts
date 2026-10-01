import { describe, expect, it } from "vitest";
import { seedProperty } from "@/data/property";
import { buildContext, filterRecords } from "@/features/assistant/engine/context";
import {
  conversationReducer,
  initialConversation,
  liveOptions,
  renderStep,
  templateValues,
  type ConversationCustomer,
} from "@/features/assistant/engine/conversation";

const property = seedProperty();
const customer: ConversationCustomer = { property, signedIn: true };
const context = buildContext(
  { state: property, signedIn: true },
  { personalGreeting: true, insights: true },
);

function nextFor(stepId: string): Record<string, string> {
  return Object.fromEntries(
    renderStep(stepId, context, customer)
      .options.filter((o) => o.recordId)
      .map((o) => [o.recordId!, o.next]),
  );
}

describe("conversation engine", () => {
  it("greets a signed-in hotelier with their next event and the channels putting it at risk", () => {
    const { text } = renderStep("root", context, customer);
    expect(text).toContain("Hi Sophie");
    expect(text).toContain("Bledisloe Cup is in 5 days");
    expect(text).toContain("Expedia, Airbnb and Trip.com aren't receiving rates");
    expect(text).toContain("overbooking flagged for tonight");
  });

  it("lists channels with problems first and routes each by its live status", () => {
    const next = nextFor("channels");
    expect(Object.keys(next).slice(0, 3)).toEqual(["exp", "abnb", "trip"]);
    expect(next).toMatchObject({
      exp: "channels.mapping",
      abnb: "channels.auth",
      trip: "channels.paused",
      bdc: "channels.healthy",
    });
  });

  it("routes bookings that need action by status, most urgent first", () => {
    const next = nextFor("reservations");
    expect(Object.keys(next)[0]).toBe("BDC-4821937");
    expect(next).toMatchObject({
      "BDC-4821937": "urgent.overbooking",
      "EXP-7730241": "reservations.missing",
      "DIR-100482": "reservations.card",
      "BDC-4819022": "reservations.modified",
      "AGD-55120873": "reservations.cancelled",
    });
  });

  it("only offers upcoming, non-cancelled arrivals in the booking lookup", () => {
    const ids = filterRecords(property, "bookings-upcoming").map((r) => r.id);
    expect(ids).toHaveLength(6);
    expect(ids).not.toContain("AGD-55120873");
  });

  it("builds the event playbook from comparable past events in the store", () => {
    const bledisloe = filterRecords(property, "events-upcoming").find(
      (r) => r.id === "evt-bledisloe",
    )!;
    expect(bledisloe.facts).toMatchObject({
      eventComparable: "NRL Grand Final",
      eventUplift: "55%",
      eventMinStay: "2-night",
      eventOnBooks: "71%",
    });
    expect(bledisloe.facts.eventReadyLine).toContain("Expedia (mapping error on Deluxe King)");
  });

  it("sends a record step reached without a record to its picker", () => {
    expect(renderStep("channels.mapping", context, customer).node.id).toBe("channels");
    expect(renderStep("events.playbook", context, customer).node.id).toBe("events");
    expect(renderStep("events.review", context, customer).node.id).toBe("events.history");
    expect(renderStep("reservations.missing", context, customer).node.id).toBe("reservations");
  });

  it("asks signed-out hoteliers to log in on picker steps", () => {
    const step = renderStep("channels", context, { ...customer, signedIn: false });
    expect(step.options.some((o) => o.next === "signin")).toBe(true);
    expect(step.options.some((o) => o.recordId)).toBe(false);
    expect(step.text).toContain("Log in");
  });

  it("records the picked channel's facts for later steps", () => {
    let state = initialConversation({ context, customer });
    state = conversationReducer(state, { type: "step", stepId: "channels" });
    const option = liveOptions(state).find((o) => o.recordId === "exp")!;
    state = conversationReducer(state, { type: "user", text: option.label, via: "chip" });
    state = conversationReducer(state, { type: "step", stepId: option.next, set: option.set });
    expect(state.currentStepId).toBe("channels.mapping");
    expect(templateValues(state)).toMatchObject({
      channelName: "Expedia",
      channelIssueRoom: "Deluxe King",
      channelSelected: "yes",
    });
    const last = state.messages.at(-1)!;
    expect(last.role === "assistant" && last.text).toContain(
      "Expedia has a mapping error on Deluxe King",
    );
  });

  it("keeps each card's own values so history stays accurate", () => {
    let state = initialConversation({ context, customer });
    for (const id of ["exp", "abnb"]) {
      state = conversationReducer(state, { type: "step", stepId: "channels" });
      const option = liveOptions(state).find((o) => o.recordId === id)!;
      state = conversationReducer(state, { type: "step", stepId: option.next, set: option.set });
    }
    const cards = state.messages.filter(
      (m) => m.role === "assistant" && m.card?.kind === "channel",
    );
    expect(cards.map((m) => m.role === "assistant" && m.values?.channelName)).toEqual([
      "Expedia",
      "Airbnb",
    ]);
  });

  it("goes back one step", () => {
    let state = initialConversation({ context, customer });
    state = conversationReducer(state, { type: "step", stepId: "menu" });
    state = conversationReducer(state, { type: "step", stepId: "grow" });
    state = conversationReducer(state, { type: "back" });
    expect(state.currentStepId).toBe("menu");
  });
});
