import { PIPELINE_STAGES, type PipelineStageId } from "@/data/pipeline";
import { cn } from "@/lib/cn";

type Props = {
  activeStage: PipelineStageId | null;
  stageProgress: number;
  awaitingAgent: boolean;
};

export function PipelineRail({ activeStage, stageProgress, awaitingAgent }: Props) {
  return (
    <section
      aria-label="Automation pipeline"
      className="rounded-2xl border border-noc-line bg-noc-panel/90 p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-optus">
            Current flow
          </p>
          <h2 className="mt-1 text-lg font-semibold text-noc-fg sm:text-xl">
            Network event → SNMP → filter → RabbitMQ → remediation
          </h2>
        </div>
        {awaitingAgent ? (
          <span className="rounded-full border border-sev-warning/40 bg-sev-warning/10 px-3 py-1 text-xs font-semibold text-sev-warning">
            Deterministic limit reached
          </span>
        ) : null}
      </div>

      <ol className="grid gap-3 md:grid-cols-5">
        {PIPELINE_STAGES.map((stage, index) => {
          const reached = stageProgress >= index;
          const current = activeStage === stage.id;
          const isAgentEdge = stage.id === "remediation" && awaitingAgent;

          return (
            <li
              key={stage.id}
              className={cn(
                "relative rounded-xl border px-3 py-3 transition duration-300",
                reached
                  ? "border-optus/50 bg-optus/10"
                  : "border-noc-line bg-noc-elevated/40",
                current && "pipeline-active",
                isAgentEdge && "border-sev-warning/50 bg-sev-warning/10",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-noc-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isAgentEdge ? "bg-sev-warning" : reached ? "bg-optus" : "bg-noc-line",
                  )}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-noc-fg">{stage.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-noc-muted">{stage.description}</p>
              {index < PIPELINE_STAGES.length - 1 ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-optus/70 to-transparent md:block"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
