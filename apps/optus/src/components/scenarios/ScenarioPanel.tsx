import { Bot, Play, RotateCcw, Workflow } from "lucide-react";
import type { Scenario } from "@/data/scenarios";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Props = {
  scenarios: Scenario[];
  scenarioId: string;
  onSelect: (id: string) => void;
  onRun: () => void;
  onReset: () => void;
  running: boolean;
};

const severityClass = {
  critical: "text-sev-critical border-sev-critical/30 bg-sev-critical/10",
  warning: "text-sev-warning border-sev-warning/30 bg-sev-warning/10",
  info: "text-sev-info border-sev-info/30 bg-sev-info/10",
} as const;

export function ScenarioPanel({
  scenarios,
  scenarioId,
  onSelect,
  onRun,
  onReset,
  running,
}: Props) {
  return (
    <section className="rounded-2xl border border-noc-line bg-noc-panel/90 p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-optus">
            Inject event
          </p>
          <h2 className="mt-1 text-lg font-semibold">Showcase scenarios</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onReset} aria-label="Reset simulation">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button onClick={onRun} disabled={running} aria-label="Run selected scenario">
            <Play className="h-4 w-4" />
            Run pipeline
          </Button>
        </div>
      </div>

      <div className="grid gap-3">
        {scenarios.map((scenario) => {
          const selected = scenario.id === scenarioId;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelect(scenario.id)}
              className={cn(
                "rounded-xl border px-3 py-3 text-left transition animate-rise",
                selected
                  ? "border-optus bg-optus/10"
                  : "border-noc-line bg-noc-elevated/50 hover:border-optus/40",
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    severityClass[scenario.severity],
                  )}
                >
                  {scenario.severity}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    scenario.kind === "agentic"
                      ? "border-optus/40 bg-optus/10 text-optus"
                      : "border-ok/30 bg-ok/10 text-ok",
                  )}
                >
                  {scenario.kind === "agentic" ? (
                    <Bot className="h-3 w-3" />
                  ) : (
                    <Workflow className="h-3 w-3" />
                  )}
                  {scenario.kind === "agentic" ? "Needs agent" : "Deterministic"}
                </span>
                <span className="font-mono text-[10px] text-noc-muted">{scenario.region}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-noc-fg">{scenario.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-noc-muted">{scenario.summary}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
