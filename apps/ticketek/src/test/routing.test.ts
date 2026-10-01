import { describe, expect, it } from "vitest";
import { CONDITION_LABELS, defaultConfig, defaultCondition, isLiveChatOpen } from "@/features/studio/config";
import { describeCondition, evaluateRouting, higherPriority } from "@/features/studio/routing";
import { scoreSentiment } from "@/features/studio/sentiment";
import type { RoutingSignals, RuleCondKind } from "@/features/studio/types";

function signals(patch: Partial<RoutingSignals> = {}): RoutingSignals {
  return { customerTurns: [], topics: [], fallbackCount: 0, lifetimeEvents: 3, priorContacts: [], now: new Date(2026, 8, 30, 12), ...patch };
}

const soonOrder = { label: "Freddie's Queen", hoursUntil: 30, status: "event-soon" as const, total: 216.19 };

describe("routing rules", () => {
  it("keeps helping when nothing matches", () => {
    const out = evaluateRouting(defaultConfig(), signals({ customerTurns: ["where are my tickets"] }), "live");
    expect(out.decision.action).toBe("none");
    expect(out.trace.length).toBe(defaultConfig().routing.rules.length);
  });

  it("hands off straight away on fraud words", () => {
    const out = evaluateRouting(defaultConfig(), signals({ customerTurns: ["my tickets were stolen"] }), "live");
    expect(out.decision).toMatchObject({ action: "handoff", ruleId: "fraud", queue: "relations", priority: "P1" });
  });

  it("sends safety words to Customer Relations whatever their tense", () => {
    for (const turn of ["someone is threatening me", "we were harassed at the gate", "my friend was attacked"]) {
      const out = evaluateRouting(defaultConfig(), signals({ customerTurns: [turn] }), "live");
      expect(out.decision, turn).toMatchObject({ action: "handoff", ruleId: "safety", queue: "relations", priority: "P1" });
    }
  });

  it("hands off after two negative messages in a row", () => {
    const out = evaluateRouting(defaultConfig(), signals({ customerTurns: ["this is ridiculous", "worst service ever, useless"] }), "live");
    expect(out.decision.ruleId).toBe("frustrated");
  });

  it("route rules never interrupt, but choose the queue at handoff", () => {
    const s = signals({ order: soonOrder, customerTurns: ["the barcode isn't showing"] });
    expect(evaluateRouting(defaultConfig(), s, "live").decision.action).toBe("none");
    expect(evaluateRouting(defaultConfig(), s, "handoff").decision).toMatchObject({ queue: "event-day", priority: "P1" });
  });

  it("takes the first match's queue and the most urgent priority", () => {
    const s = signals({ order: { ...soonOrder, total: 900 }, lifetimeEvents: 31 });
    const out = evaluateRouting(defaultConfig(), s, "handoff");
    expect(out.decision.queue).toBe("event-day");
    expect(out.matched.map((m) => m.ruleId)).toEqual(["event-day", "priority-fan", "high-value"]);
    expect(out.decision.priority).toBe("P1");
  });

  it("respects rule order and switches", () => {
    const config = defaultConfig();
    config.routing.rules = config.routing.rules.map((r) => (r.id === "event-day" ? { ...r, enabled: false } : r));
    const out = evaluateRouting(config, signals({ order: soonOrder, lifetimeEvents: 31 }), "handoff");
    expect(out.decision.queue).toBe("priority");
    expect(out.trace.find((t) => t.ruleId === "event-day")).toMatchObject({ enabled: false, matched: false });
  });

  it("sends everything to Fan Support when routing is off", () => {
    const config = defaultConfig();
    config.routing.enabled = false;
    expect(evaluateRouting(config, signals({ customerTurns: ["stolen"] }), "live").decision.action).toBe("none");
  });

  it("counts repeat contacts in the window", () => {
    const config = defaultConfig();
    config.routing.rules = config.routing.rules.map((r) => (r.id === "repeat" ? { ...r, enabled: true } : r));
    const now = new Date(2026, 8, 30, 12);
    const recent = [{ endedAt: new Date(now.getTime() - 86_400_000).toISOString() }, { endedAt: new Date(now.getTime() - 2 * 86_400_000).toISOString() }];
    expect(evaluateRouting(config, signals({ priorContacts: recent, now }), "live").decision.ruleId).toBe("repeat");
  });

  it("builds a valid default for every condition kind", () => {
    for (const kind of Object.keys(CONDITION_LABELS) as RuleCondKind[]) {
      const condition = defaultCondition(kind);
      expect(condition.kind).toBe(kind);
      expect(describeCondition(condition).length).toBeGreaterThan(0);
    }
  });

  it("orders priorities P1 first", () => {
    expect(higherPriority("P3", "P1")).toBe("P1");
    expect(higherPriority("P2", "P4")).toBe("P2");
  });

  it("scores sentiment", () => {
    expect(scoreSentiment("this is ridiculous, worst service ever")).toBeLessThan(-0.35);
    expect(scoreSentiment("thanks, that's great")).toBeGreaterThan(0);
  });

  it("knows live chat hours", () => {
    const config = defaultConfig();
    expect(isLiveChatOpen(config, new Date("2026-09-30T02:00:00Z"))).toBe(true);
    expect(isLiveChatOpen(config, new Date("2026-09-30T13:00:00Z"))).toBe(false);
  });
});
