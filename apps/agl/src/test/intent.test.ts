import { describe, expect, it } from "vitest";
import { normalise, resolveIntent } from "@/features/assistant/engine/intent";

function stepFor(text: string, current: string | null = "root") {
  const match = resolveIntent(text, current);
  if (!match) return null;
  return match.kind === "option" ? match.option.next : match.stepId;
}

describe("normalise", () => {
  it("drops apostrophes and punctuation", () => {
    expect(normalise("My internet ISN'T working!!")).toBe("my internet isnt working");
    expect(normalise("I’m moving")).toBe("im moving");
  });
});

describe("resolveIntent", () => {
  it("routes gas and danger to emergencies before anything else", () => {
    expect(resolveIntent("I can smell gas in the kitchen", "billing")).toMatchObject({ kind: "step", stepId: "emergency.gas", reason: "safety" });
    expect(stepFor("there are sparks coming from the meter box", "internet.down")).toBe("emergency");
  });

  it("maps everyday questions to the matching flow", () => {
    expect(stepFor("I want to pay my bill")).toBe("billing.pay");
    expect(stepFor("my internet isn't working")).toBe("internet.down");
    expect(stepFor("why is my bill so high")).toBe("billing.high");
    expect(stepFor("I'm moving house next month")).toBe("moving");
    expect(stepFor("can I talk to a real person")).toBe("handoff");
  });

  it("matches the current step's options first", () => {
    expect(stepFor("slow speeds", "netmob")).toBe("internet.slow");
    expect(stepFor("my phone has no signal", "netmob")).toBe("mobile.signal");
    expect(stepFor("Billing and payments", "root")).toBe("billing");
    expect(stepFor("yes", "resolved")).toBe("menu");
    expect(stepFor("no that's all", "resolved")).toBe("end");
  });

  it("returns null when nothing matches", () => {
    expect(resolveIntent("purple elephants", "root")).toBeNull();
    expect(resolveIntent("   ", "root")).toBeNull();
  });
});
