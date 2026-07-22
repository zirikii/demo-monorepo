import { useCallback, useState } from "react";
import { Header } from "@/components/layout/Header";
import { PipelineRail } from "@/components/pipeline/PipelineRail";
import { ScenarioPanel } from "@/components/scenarios/ScenarioPanel";
import { EventFeed } from "@/components/events/EventFeed";
import { TopologyMap } from "@/components/network/TopologyMap";
import { AgentCockpit } from "@/components/agent/AgentCockpit";
import { usePipelineSimulation } from "@/hooks/usePipelineSimulation";
import { useCursorAgent } from "@/hooks/useCursorAgent";
import { SCENARIOS } from "@/data/scenarios";

export default function App() {
  const simulation = usePipelineSimulation(SCENARIOS[1].id);
  const cursor = useCursorAgent();
  const [handoffConsumed, setHandoffConsumed] = useState(false);

  const awaitingAgent = simulation.status === "awaiting-agent" && !handoffConsumed;

  const handleDispatch = useCallback(async () => {
    const { scenario } = simulation;
    await cursor.launch({
      title: scenario.title,
      site: scenario.site,
      symptom: scenario.symptom,
      oid: scenario.oid,
      name: `Optus NOC · ${scenario.site}`,
    });
    setHandoffConsumed(true);
    simulation.markResolved();
  }, [cursor, simulation]);

  const handleSimulateLocal = useCallback(() => {
    cursor.simulateLocal(simulation.scenario.agentSteps);
    setHandoffConsumed(true);
    simulation.markResolved();
  }, [cursor, simulation]);

  const resetAll = useCallback(() => {
    setHandoffConsumed(false);
    cursor.resetAgent();
    simulation.reset();
  }, [cursor, simulation]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-6">
        <PipelineRail
          activeStage={simulation.activeStage}
          stageProgress={simulation.stageProgress}
          awaitingAgent={awaitingAgent}
        />

        <div className="grid gap-4 xl:grid-cols-[360px_1fr_320px]">
          <ScenarioPanel
            scenarios={simulation.scenarios}
            scenarioId={simulation.scenarioId}
            onSelect={(id) => {
              setHandoffConsumed(false);
              cursor.resetAgent();
              simulation.setScenarioId(id);
              simulation.reset();
            }}
            onRun={() => {
              setHandoffConsumed(false);
              cursor.resetAgent();
              simulation.run();
            }}
            onReset={resetAll}
            running={simulation.status === "running"}
          />

          <EventFeed events={simulation.events} />
          <TopologyMap hotSite={simulation.status === "idle" ? undefined : simulation.scenario.site} />
        </div>

        <AgentCockpit
          scenario={simulation.scenario}
          awaitingAgent={awaitingAgent}
          health={cursor.health}
          launching={cursor.launching}
          agent={cursor.agent}
          run={cursor.run}
          lines={cursor.lines}
          error={cursor.error}
          onDispatch={() => {
            void handleDispatch();
          }}
          onSimulateLocal={handleSimulateLocal}
        />
      </main>
    </div>
  );
}
