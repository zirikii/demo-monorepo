import { describe, expect, it } from "vitest";
import { SCENARIOS, buildPipelineEvents, getScenario } from "@/data/scenarios";
import { PIPELINE_STAGES } from "@/data/pipeline";

describe("scenarios", () => {
  it("includes at least one deterministic and one agentic path", () => {
    expect(SCENARIOS.some((s) => s.kind === "deterministic")).toBe(true);
    expect(SCENARIOS.some((s) => s.kind === "agentic")).toBe(true);
  });

  it("builds a complete pipeline event chain for deterministic scenarios", () => {
    const scenario = getScenario("bgp-flap-sydney");
    expect(scenario).toBeTruthy();
    const events = buildPipelineEvents(scenario!, Date.now());
    expect(events.map((e) => e.stage)).toEqual(
      expect.arrayContaining(PIPELINE_STAGES.map((s) => s.id)),
    );
    expect(events.at(-1)?.level).toBe("ok");
  });

  it("ends agentic scenarios at the deterministic limit", () => {
    const scenario = getScenario("cell-backhaul-degrade");
    expect(scenario).toBeTruthy();
    const events = buildPipelineEvents(scenario!, 1_000);
    expect(events.some((e) => e.message.includes("Deterministic automation limit"))).toBe(true);
    expect(events.at(-1)?.level).toBe("critical");
  });
});
