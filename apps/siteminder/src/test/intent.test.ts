import { describe, expect, it } from "vitest";
import type { RenderedOption } from "@/features/assistant/engine/conversation";
import { isSafetyConcern, normalise, resolveIntent } from "@/features/assistant/engine/intent";

describe("intent matching", () => {
  it("normalises apostrophes and punctuation", () => {
    expect(normalise("Why's my INVOICE higher?!")).toBe("whys my invoice higher");
  });

  it("flags safety concerns at the property", () => {
    expect(isSafetyConcern("a guest collapsed in the lobby")).toBe(true);
    expect(isSafetyConcern("there's a fire in the kitchen")).toBe(true);
    expect(isSafetyConcern("a guest is threatening our night manager")).toBe(true);
    expect(isSafetyConcern("expedia is hurting our revenue")).toBe(false);
    expect(isSafetyConcern("the booking engine is down")).toBe(false);
  });

  it("routes a safety message to the safety step before anything else", () => {
    const options: RenderedOption[] = [{ label: "Yes, fix the mapping", next: "channels.mapping.done" }];
    expect(resolveIntent("someone is injured at reception", "channels.mapping", options)).toMatchObject({ kind: "step", stepId: "safety", reason: "safety" });
  });

  it("matches keywords to the most specific step", () => {
    expect(resolveIntent("Expedia says there's a mapping error", null, [])).toMatchObject({ kind: "step", stepId: "channels.mapping" });
    expect(resolveIntent("we're overbooked tonight", null, [])).toMatchObject({ kind: "step", stepId: "urgent.overbooking" });
    expect(resolveIntent("I got a phishing email from booking.com", null, [])).toMatchObject({ kind: "step", stepId: "urgent.security" });
    expect(resolveIntent("why is my invoice higher than expected", null, [])).toMatchObject({ kind: "step", stepId: "billing.high" });
    expect(resolveIntent("help me price the big game", null, [])).toMatchObject({ kind: "step", stepId: "events" });
  });

  it("picks a record by its name alone", () => {
    const options: RenderedOption[] = [
      { label: "Expedia · Mapping error", next: "channels.mapping", recordId: "exp", recordKind: "channel" },
      { label: "Airbnb · Credentials expired", next: "channels.auth", recordId: "abnb", recordKind: "channel" },
    ];
    expect(resolveIntent("the airbnb one", "channels", options)).toMatchObject({ kind: "option", option: { recordId: "abnb" } });
  });

  it("treats yes and no as the matching chips", () => {
    const options: RenderedOption[] = [
      { label: "Yes, resume Trip.com", next: "channels.paused.done" },
      { label: "Keep it paused", next: "resolved" },
    ];
    expect(resolveIntent("yes please", "channels.paused", options)).toMatchObject({ kind: "option", option: { next: "channels.paused.done" } });
    expect(resolveIntent("nah", "channels.paused", options)).toMatchObject({ kind: "option", option: { next: "resolved" } });
  });

  it("returns nothing for gibberish", () => {
    expect(resolveIntent("blah", null, [])).toBeNull();
  });
});
