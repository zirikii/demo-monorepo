import { Bot, Cloud, ExternalLink, LoaderCircle, Sparkles } from "lucide-react";
import type { Scenario } from "@/data/scenarios";
import type { StreamLine } from "@/hooks/useCursorAgent";
import type { CursorAgent, CursorHealth, CursorRun } from "@/lib/cursorApi";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Props = {
  scenario: Scenario;
  awaitingAgent: boolean;
  health: CursorHealth | null;
  launching: boolean;
  agent: CursorAgent | null;
  run: CursorRun | null;
  lines: StreamLine[];
  error: string | null;
  onDispatch: () => void;
  onSimulateLocal: () => void;
};

const lineTone: Record<StreamLine["kind"], string> = {
  status: "text-sev-info",
  assistant: "text-noc-fg",
  thinking: "text-noc-muted italic",
  tool: "text-optus",
  result: "text-ok",
  error: "text-sev-critical",
  info: "text-noc-muted",
};

export function AgentCockpit({
  scenario,
  awaitingAgent,
  health,
  launching,
  agent,
  run,
  lines,
  error,
  onDispatch,
  onSimulateLocal,
}: Props) {
  const liveReady = Boolean(health?.ok && health.configured);

  return (
    <section className="rounded-2xl border border-noc-line bg-noc-panel/90 p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-optus">
            Agentic edge
          </p>
          <h2 className="mt-1 text-lg font-semibold">Cursor Cloud Agent cockpit</h2>
          <p className="mt-1 max-w-2xl text-sm text-noc-muted">
            When hardcoded remediation paths end, LLM agents take over troubleshooting, reasoning,
            action selection, and execution — dispatched here as a Cursor Cloud Agent.
          </p>
        </div>
        <div
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-semibold",
            liveReady
              ? "border-ok/40 bg-ok/10 text-ok"
              : "border-sev-warning/40 bg-sev-warning/10 text-sev-warning",
          )}
        >
          {liveReady
            ? `SDK ready · ${health?.me?.apiKeyName ?? "key"}`
            : health?.reason || "Configure CURSOR_API_KEY"}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-noc-line bg-noc-elevated/40 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-optus" />
            Why agents create value here
          </h3>
          <ol className="mt-3 space-y-2">
            {scenario.agentSteps.map((step, index) => (
              <li
                key={step}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm",
                  awaitingAgent || scenario.kind === "deterministic"
                    ? "border-optus/30 bg-optus/5 text-noc-fg"
                    : "border-noc-line text-noc-muted",
                )}
              >
                <span className="mr-2 font-mono text-[10px] text-optus">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>

          {scenario.kind === "agentic" ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={onDispatch}
                disabled={!awaitingAgent || launching || !liveReady}
                aria-label="Dispatch live Cursor Cloud Agent"
              >
                {launching ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Cloud className="h-4 w-4" />
                )}
                Dispatch Cursor Cloud Agent
              </Button>
              <Button
                variant="soft"
                onClick={onSimulateLocal}
                disabled={!awaitingAgent || launching}
                aria-label="Simulate local agent reasoning"
              >
                <Bot className="h-4 w-4" />
                Simulate reasoning locally
              </Button>
            </div>
          ) : (
            <p className="mt-4 rounded-lg border border-ok/30 bg-ok/10 px-3 py-2 text-sm text-ok">
              This scenario stays inside deterministic automation — no agent handoff required.
            </p>
          )}

          {error ? (
            <p className="mt-3 rounded-lg border border-sev-critical/40 bg-sev-critical/10 px-3 py-2 text-sm text-sev-critical">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex min-h-[260px] flex-col rounded-xl border border-noc-line bg-black/30 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">Agent stream</h3>
            {agent ? (
              <a
                href={agent.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-optus hover:text-optus-bright"
              >
                Open in Cursor
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>

          {agent || run ? (
            <div className="mb-3 grid gap-1 rounded-lg border border-noc-line bg-noc-elevated/50 px-3 py-2 font-mono text-[11px] text-noc-muted">
              {agent ? <p>agent · {agent.id}</p> : null}
              {run ? <p>run · {run.id} · {run.status}</p> : null}
            </div>
          ) : null}

          <div className="flex-1 space-y-2 overflow-auto font-mono text-xs">
            {lines.length === 0 ? (
              <p className="text-noc-muted">
                Waiting for handoff. When automation stalls, dispatch a live Cursor agent or simulate
                the reasoning loop.
              </p>
            ) : (
              lines.map((line) => (
                <p key={line.id} className={cn("leading-relaxed", lineTone[line.kind])}>
                  <span className="mr-2 text-noc-muted">
                    {new Date(line.at).toLocaleTimeString()}
                  </span>
                  {line.text}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
