import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SCENARIOS,
  buildPipelineEvents,
  type FeedEvent,
  type Scenario,
} from "@/data/scenarios";
import { STAGE_INDEX, type PipelineStageId } from "@/data/pipeline";

export type SimulationStatus = "idle" | "running" | "awaiting-agent" | "resolved";

export function usePipelineSimulation(initialScenarioId = SCENARIOS[1]?.id ?? SCENARIOS[0].id) {
  const [scenarioId, setScenarioId] = useState(initialScenarioId);
  const [status, setStatus] = useState<SimulationStatus>("idle");
  const [activeStage, setActiveStage] = useState<PipelineStageId | null>(null);
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const timers = useRef<number[]>([]);

  const scenario = useMemo(
    () => SCENARIOS.find((item) => item.id === scenarioId) ?? SCENARIOS[0],
    [scenarioId],
  );

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setStatus("idle");
    setActiveStage(null);
    setEvents([]);
    setVisibleCount(0);
  }, [clearTimers]);

  const run = useCallback(
    (next?: Scenario) => {
      clearTimers();
      const target = next ?? scenario;
      const startedAt = Date.now();
      const planned = buildPipelineEvents(target, startedAt);

      setScenarioId(target.id);
      setEvents(planned);
      setVisibleCount(0);
      setStatus("running");
      setActiveStage("network-event");

      planned.forEach((event, index) => {
        const delay = Math.max(0, event.at - startedAt);
        const timer = window.setTimeout(() => {
          setVisibleCount(index + 1);
          setActiveStage(event.stage);

          if (index === planned.length - 1) {
            if (target.kind === "agentic") {
              setStatus("awaiting-agent");
            } else {
              setStatus("resolved");
            }
          }
        }, delay);
        timers.current.push(timer);
      });
    },
    [clearTimers, scenario],
  );

  useEffect(() => () => clearTimers(), [clearTimers]);

  const visibleEvents = events.slice(0, visibleCount);
  const stageProgress = activeStage ? STAGE_INDEX[activeStage] : -1;

  return {
    scenario,
    scenarios: SCENARIOS,
    scenarioId,
    setScenarioId,
    status,
    activeStage,
    stageProgress,
    events: visibleEvents,
    run,
    reset,
    markResolved: () => setStatus("resolved"),
  };
}
