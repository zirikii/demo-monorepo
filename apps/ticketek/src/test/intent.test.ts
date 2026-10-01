import { describe, expect, it } from "vitest";
import type { RenderedOption } from "@/features/assistant/engine/conversation";
import { isSafetyConcern, normalise, resolveIntent } from "@/features/assistant/engine/intent";

describe("intent matching", () => {
  it("normalises apostrophes and punctuation", () => {
    expect(normalise("Where's my TICKET?!")).toBe("wheres my ticket");
  });

  it("flags safety concerns", () => {
    expect(isSafetyConcern("someone got hurt near the stage")).toBe(true);
    expect(isSafetyConcern("I feel unsafe in the queue")).toBe(true);
    expect(isSafetyConcern("Someone is threatening me and I'm scared")).toBe(true);
    expect(isSafetyConcern("a guy has been harassing us at gate 3")).toBe(true);
    expect(isSafetyConcern("I think my drink was spiked")).toBe(true);
    expect(isSafetyConcern("I'm scared my tickets won't arrive in time")).toBe(false);
    expect(isSafetyConcern("where is my ticket")).toBe(false);
  });

  it("routes a safety message to the safety step before anything else", () => {
    const options: RenderedOption[] = [{ label: "Yes", next: "resolved" }];
    expect(resolveIntent("my friend is injured", "tickets.mobile", options)).toMatchObject({ kind: "step", stepId: "safety", reason: "safety" });
  });

  it("matches keywords to the right topic", () => {
    expect(resolveIntent("my event was cancelled, can I get a refund", null, [])).toMatchObject({ kind: "step" });
    expect(resolveIntent("barcode isn't showing in the app", null, [])).toMatchObject({ kind: "step", stepId: "tickets.mobile" });
    expect(resolveIntent("I think these are fake tickets from viagogo", null, [])).toMatchObject({ kind: "step", stepId: "tickets.scam" });
  });

  it("matches an order option by the event name alone", () => {
    const options: RenderedOption[] = [
      { label: "Freddie's Queen · Thu 1 Oct", next: "tickets.mobile", orderId: "TK1" },
      { label: "Laneway Festival 2027 · Sat 6 Feb", next: "tickets.mobile", orderId: "TK2" },
    ];
    const match = resolveIntent("the laneway one", "tickets", options);
    expect(match).toMatchObject({ kind: "option", option: { orderId: "TK2" } });
  });

  it("treats yes and no as the matching chips", () => {
    const options: RenderedOption[] = [
      { label: "Yes, request a refund", next: "refunds.confirm" },
      { label: "No, keep my tickets", next: "resolved" },
    ];
    expect(resolveIntent("yes please", "refunds.standard", options)).toMatchObject({ kind: "option", option: { next: "refunds.confirm" } });
    expect(resolveIntent("nah", "refunds.standard", options)).toMatchObject({ kind: "option", option: { next: "resolved" } });
  });
});
