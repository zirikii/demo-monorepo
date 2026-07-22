import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchCursorHealth,
  fetchCursorRun,
  isTerminalRunStatus,
  launchCursorAgent,
  type CursorAgent,
  type CursorHealth,
  type CursorRun,
  type LaunchIncident,
} from "@/lib/cursorApi";

export type StreamLine = {
  id: string;
  kind: "status" | "assistant" | "thinking" | "tool" | "result" | "error" | "info";
  text: string;
  at: number;
};

export function useCursorAgent() {
  const [health, setHealth] = useState<CursorHealth | null>(null);
  const [launching, setLaunching] = useState(false);
  const [agent, setAgent] = useState<CursorAgent | null>(null);
  const [run, setRun] = useState<CursorRun | null>(null);
  const [lines, setLines] = useState<StreamLine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const esRef = useRef<EventSource | null>(null);
  const pollRef = useRef<number | null>(null);

  const pushLine = useCallback((line: Omit<StreamLine, "id" | "at">) => {
    setLines((prev) => [
      ...prev,
      { ...line, id: `${Date.now()}-${prev.length}`, at: Date.now() },
    ]);
  }, []);

  const refreshHealth = useCallback(async () => {
    try {
      const next = await fetchCursorHealth();
      setHealth(next);
      return next;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Health check failed";
      setHealth({ ok: false, configured: false, reason: message });
      return null;
    }
  }, []);

  useEffect(() => {
    void refreshHealth();
  }, [refreshHealth]);

  const stopStreams = useCallback(() => {
    esRef.current?.close();
    esRef.current = null;
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => () => stopStreams(), [stopStreams]);

  const attachStream = useCallback(
    (agentId: string, runId: string) => {
      stopStreams();
      const source = new EventSource(`/api/cursor/agents/${agentId}/runs/${runId}/stream`);
      esRef.current = source;

      const onStatus = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as { status?: string };
          if (data.status) {
            setRun((prev) => (prev ? { ...prev, status: data.status! } : prev));
            pushLine({ kind: "status", text: `Run status → ${data.status}` });
          }
        } catch {
          /* ignore malformed */
        }
      };
      const onAssistant = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as { text?: string };
          if (data.text) pushLine({ kind: "assistant", text: data.text });
        } catch {
          /* ignore */
        }
      };
      const onThinking = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as { text?: string };
          if (data.text) pushLine({ kind: "thinking", text: data.text });
        } catch {
          /* ignore */
        }
      };
      const onTool = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as { name?: string; status?: string };
          pushLine({
            kind: "tool",
            text: `${data.name ?? "tool"} · ${data.status ?? "update"}`,
          });
        } catch {
          /* ignore */
        }
      };
      const onResult = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as {
            status?: string;
            text?: string;
            durationMs?: number;
          };
          if (data.status) setRun((prev) => (prev ? { ...prev, status: data.status! } : prev));
          pushLine({
            kind: "result",
            text: data.text || `Run finished · ${data.status ?? "done"}`,
          });
        } catch {
          /* ignore */
        }
      };
      const onError = () => {
        pushLine({
          kind: "info",
          text: "SSE stream closed — falling back to status polling",
        });
        source.close();
      };

      source.addEventListener("status", onStatus as EventListener);
      source.addEventListener("assistant", onAssistant as EventListener);
      source.addEventListener("thinking", onThinking as EventListener);
      source.addEventListener("tool_call", onTool as EventListener);
      source.addEventListener("result", onResult as EventListener);
      source.onerror = onError;

      pollRef.current = window.setInterval(() => {
        void fetchCursorRun(agentId, runId)
          .then((next) => {
            setRun(next);
            if (isTerminalRunStatus(next.status)) {
              stopStreams();
              if (next.result) {
                pushLine({ kind: "result", text: next.result });
              }
            }
          })
          .catch(() => undefined);
      }, 4000);
    },
    [pushLine, stopStreams],
  );

  const launch = useCallback(
    async (incident: LaunchIncident) => {
      setLaunching(true);
      setError(null);
      setLines([]);
      try {
        pushLine({ kind: "info", text: "Dispatching Cursor Cloud Agent…" });
        const created = await launchCursorAgent(incident);
        setAgent(created.agent);
        setRun(created.run);
        pushLine({
          kind: "status",
          text: `Agent ${created.agent.id} created · open ${created.agent.url}`,
        });
        attachStream(created.agent.id, created.run.id);
        return created;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Launch failed";
        setError(message);
        pushLine({ kind: "error", text: message });
        throw err;
      } finally {
        setLaunching(false);
      }
    },
    [attachStream, pushLine],
  );

  const resetAgent = useCallback(() => {
    stopStreams();
    setAgent(null);
    setRun(null);
    setLines([]);
    setError(null);
  }, [stopStreams]);

  const simulateLocal = useCallback(
    (steps: string[]) => {
      stopStreams();
      setAgent(null);
      setRun({
        id: "sim-run-local",
        agentId: "sim-agent-local",
        status: "RUNNING",
      });
      setError(null);
      setLines([]);
      pushLine({ kind: "info", text: "Local simulation — no Cloud Agent API call" });

      steps.forEach((step, index) => {
        window.setTimeout(() => {
          pushLine({ kind: index === steps.length - 1 ? "result" : "thinking", text: step });
          if (index === steps.length - 1) {
            setRun({
              id: "sim-run-local",
              agentId: "sim-agent-local",
              status: "FINISHED",
            });
          }
        }, 450 * (index + 1));
      });
    },
    [pushLine, stopStreams],
  );

  return {
    health,
    refreshHealth,
    launching,
    agent,
    run,
    lines,
    error,
    launch,
    resetAgent,
    simulateLocal,
  };
}
