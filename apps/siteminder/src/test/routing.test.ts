import { describe, expect, it } from "vitest";
import {
  CONDITION_LABELS,
  defaultConfig,
  defaultCondition,
  hoursLabel,
  isLiveChatOpen,
} from "@/features/studio/config";
import { describeCondition, evaluateRouting, higherPriority } from "@/features/studio/routing";
import { scoreSentiment } from "@/features/studio/sentiment";
import type { RoutingSignals, RuleCondKind } from "@/features/studio/types";

const now = new Date(2026, 8, 30, 12);

function signals(patch: Partial<RoutingSignals> = {}): RoutingSignals {
  return {
    customerTurns: [],
    topics: [],
    fallbackCount: 0,
    channelIssues: [],
    plan: "plus",
    rooms: 86,
    overdueDays: 0,
    priorContacts: [],
    now,
    ...patch,
  };
}

const expedia = { label: "Expedia", status: "mapping-error" as const };
const bledisloe = { label: "Bledisloe Cup", daysUntil: 5 };

describe("routing rules", () => {
  it("keeps helping when nothing matches", () => {
    const out = evaluateRouting(
      defaultConfig(),
      signals({ customerTurns: ["how do I add a channel"] }),
      "live",
    );
    expect(out.decision.action).toBe("none");
    expect(out.trace.length).toBe(defaultConfig().routing.rules.length);
    expect(evaluateRouting(defaultConfig(), signals(), "handoff").decision).toMatchObject({
      queue: "general",
      priority: "P3",
      ruleId: null,
    });
  });

  it("hands off straight away on security words", () => {
    const out = evaluateRouting(
      defaultConfig(),
      signals({ customerTurns: ["I think someone hacked our extranet login"] }),
      "live",
    );
    expect(out.decision).toMatchObject({
      action: "handoff",
      ruleId: "security",
      queue: "security",
      priority: "P1",
    });
  });

  it("treats a total outage as a P1 for Connectivity", () => {
    const out = evaluateRouting(
      defaultConfig(),
      signals({ customerTurns: ["nothing is syncing anywhere"] }),
      "live",
    );
    expect(out.decision).toMatchObject({
      action: "handoff",
      ruleId: "outage",
      queue: "connectivity",
      priority: "P1",
    });
  });

  it("hands off after two negative messages in a row", () => {
    const out = evaluateRouting(
      defaultConfig(),
      signals({ customerTurns: ["this is ridiculous", "worst service ever, useless"] }),
      "live",
    );
    expect(out.decision).toMatchObject({ ruleId: "frustrated", queue: "success" });
  });

  it("hands off when the assistant has misunderstood twice", () => {
    expect(
      evaluateRouting(defaultConfig(), signals({ fallbackCount: 2 }), "live").decision.ruleId,
    ).toBe("misunderstood");
  });

  it("route rules never interrupt, but choose the queue at handoff", () => {
    const s = signals({ booking: { label: "BDC-4821937 (Hannah Okafor)", status: "overbooked" } });
    expect(evaluateRouting(defaultConfig(), s, "live").decision.action).toBe("none");
    expect(evaluateRouting(defaultConfig(), s, "handoff").decision).toMatchObject({
      queue: "reservations",
      priority: "P1",
      ruleId: "overbooked",
    });
  });

  it("takes the first match's queue and the most urgent priority", () => {
    const out = evaluateRouting(
      defaultConfig(),
      signals({ channel: expedia, event: bledisloe }),
      "handoff",
    );
    expect(out.matched.map((m) => m.ruleId)).toEqual(["channel-down", "event-week"]);
    expect(out.decision).toMatchObject({ queue: "connectivity", priority: "P1" });
  });

  it("flags an event at risk when a channel isn't selling", () => {
    const atRisk = evaluateRouting(
      defaultConfig(),
      signals({ nextEvent: bledisloe, channelIssues: ["Expedia", "Airbnb"] }),
      "handoff",
    );
    expect(atRisk.decision).toMatchObject({
      ruleId: "event-at-risk",
      queue: "connectivity",
      priority: "P2",
    });
    expect(atRisk.decision.reason).toBe(
      "Bledisloe Cup is in 5 days and Expedia, Airbnb aren't selling",
    );
    const fine = evaluateRouting(defaultConfig(), signals({ nextEvent: bledisloe }), "handoff");
    expect(fine.trace.find((t) => t.ruleId === "event-at-risk")).toMatchObject({
      matched: false,
      reason: "Bledisloe Cup is in 5 days, all channels selling",
    });
  });

  it("routes by topic, but an overdue account goes to Billing first", () => {
    expect(
      evaluateRouting(defaultConfig(), signals({ topics: ["events"] }), "handoff").decision,
    ).toMatchObject({ queue: "revenue", priority: "P3" });
    expect(
      evaluateRouting(defaultConfig(), signals({ topics: ["billing"] }), "handoff").decision,
    ).toMatchObject({ queue: "billing", priority: "P3" });
    const overdue = evaluateRouting(
      defaultConfig(),
      signals({ topics: ["events"], overdueDays: 20 }),
      "handoff",
    );
    expect(overdue.decision).toMatchObject({ queue: "billing", priority: "P2", ruleId: "overdue" });
  });

  it("sends Groups & Chains and large properties to the enterprise desk", () => {
    expect(
      evaluateRouting(defaultConfig(), signals({ plan: "groups" }), "handoff").decision.queue,
    ).toBe("enterprise");
    expect(
      evaluateRouting(defaultConfig(), signals({ rooms: 220 }), "handoff").decision,
    ).toMatchObject({ queue: "enterprise", ruleId: "large-property" });
  });

  it("respects rule order and switches", () => {
    const config = defaultConfig();
    config.routing.rules = config.routing.rules.map((r) =>
      r.id === "channel-down" ? { ...r, enabled: false } : r,
    );
    const out = evaluateRouting(config, signals({ channel: expedia, event: bledisloe }), "handoff");
    expect(out.decision.queue).toBe("revenue");
    expect(out.trace.find((t) => t.ruleId === "channel-down")).toMatchObject({
      enabled: false,
      matched: false,
    });
  });

  it("sends everything to Customer Support when routing is off", () => {
    const config = defaultConfig();
    config.routing.enabled = false;
    expect(
      evaluateRouting(config, signals({ customerTurns: ["hacked"] }), "live").decision.action,
    ).toBe("none");
  });

  it("counts repeat contacts in the window", () => {
    const config = defaultConfig();
    config.routing.rules = config.routing.rules.map((r) =>
      r.id === "repeat" ? { ...r, enabled: true } : r,
    );
    const recent = [
      { endedAt: new Date(now.getTime() - 86_400_000).toISOString() },
      { endedAt: new Date(now.getTime() - 2 * 86_400_000).toISOString() },
    ];
    expect(
      evaluateRouting(config, signals({ priorContacts: recent }), "live").decision.ruleId,
    ).toBe("repeat");
    const old = [
      { endedAt: new Date(now.getTime() - 9 * 86_400_000).toISOString() },
      ...recent.slice(1),
    ];
    expect(evaluateRouting(config, signals({ priorContacts: old }), "live").decision.action).toBe(
      "none",
    );
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

  it("knows live chat hours in Sydney time", () => {
    const config = defaultConfig();
    expect(hoursLabel(config)).toBe("24/7");
    expect(isLiveChatOpen(config, new Date("2026-09-30T15:00:00Z"))).toBe(true);
    config.hours = { open: 8, close: 20 };
    expect(isLiveChatOpen(config, new Date("2026-09-30T02:00:00Z"))).toBe(true);
    expect(isLiveChatOpen(config, new Date("2026-09-30T13:00:00Z"))).toBe(false);
    expect(hoursLabel(config)).toBe("8am to 8pm AEST, 7 days");
  });
});
