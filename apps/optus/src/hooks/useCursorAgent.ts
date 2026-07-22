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

function isAbortError(err: unknown): boolean {
  return err instanceof DOMException
    ? err.name === "AbortError"
    : err instanceof Error && err.name === "AbortError";
}

export function useCursorAgent() {
  const [health, setHealth] = useState<CursorHealth | null>(null);
  const [launching, setLaunching] = useState(false);
  const [agent, setAgent] = useState<CursorAgent | null>(null);
  const [run, setRun] = useState<CursorRun | null>(null);
  const [lines, setLines] = useState<StreamLine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const esRef = useRef<EventSource | null>(null);
  const pollRef = useRef<number | null>(null);
  const simTimersRef = useRef<number[]>([]);
  const launchAbortRef = useRef<AbortController | null>(null);
  const sessionRef = useRef(0);

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

  const clearSimTimers = useCallback(() => {
    for (const id of simTimersRef.current) {
      window.clearTimeout(id);
    }
    simTimersRef.current = [];
  }, []);

  const stopStreams = useCallback(() => {
    esRef.current?.close();
    esRef.current = null;
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const beginSession = useCallback(() => {
    sessionRef.current += 1;
    launchAbortRef.current?.abort();
    launchAbortRef.current = null;
    clearSimTimers();
    stopStreams();
    return sessionRef.current;
  }, [clearSimTimers, stopStreams]);

  useEffect(
    () => () => {
      beginSession();
    },
    [beginSession],
  );

  const attachStream = useCallback(
    (agentId: string, runId: string, session: number) => {
      stopStreams();
      const source = new EventSource(`/api/cursor/agents/${agentId}/runs/${runId}/stream`);
      esRef.current = source;

      const stillActive = () => sessionRef.current === session;

      const onStatus = (event: MessageEvent) => {
        if (!stillActive()) return;
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
        if (!stillActive()) return;
        try {
          const data = JSON.parse(event.data) as { text?: string };
          if (data.text) pushLine({ kind: "assistant", text: data.text });
        } catch {
          /* ignore */
        }
      };
      const onThinking = (event: MessageEvent) => {
        if (!stillActive()) return;
        try {
          const data = JSON.parse(event.data) as { text?: string };
          if (data.text) pushLine({ kind: "thinking", text: data.text });
        } catch {
          /* ignore */
        }
      };
      const onTool = (event: MessageEvent) => {
        if (!stillActive()) return;
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
        if (!stillActive()) return;
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
        if (!stillActive()) return;
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
        if (!stillActive()) {
          stopStreams();
          return;
        }
        void fetchCursorRun(agentId, runId)
          .then((next) => {
            if (!stillActive()) return;
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
      const session = beginSession();
      const controller = new AbortController();
      launchAbortRef.current = controller;
      setLaunching(true);
      setError(null);
      setAgent(null);
      setRun(null);
      setLines([]);
      try {
        pushLine({ kind: "info", text: "Dispatching Cursor Cloud Agent…" });
        const created = await launchCursorAgent(incident, { signal: controller.signal });
        if (sessionRef.current !== session) return null;
        setAgent(created.agent);
        setRun(created.run);
        pushLine({
          kind: "status",
          text: `Agent ${created.agent.id} created · open ${created.agent.url}`,
        });
        attachStream(created.agent.id, created.run.id, session);
        return created;
      } catch (err) {
        if (sessionRef.current !== session || isAbortError(err)) return null;
        const message = err instanceof Error ? err.message : "Launch failed";
        setError(message);
        pushLine({ kind: "error", text: message });
        throw err;
      } finally {
        if (sessionRef.current === session) {
          setLaunching(false);
          launchAbortRef.current = null;
        }
      }
    },
    [attachStream, beginSession, pushLine],
  );

  const resetAgent = useCallback(() => {
    beginSession();
    setLaunching(false);
    setAgent(null);
    setRun(null);
    setLines([]);
    setError(null);
  }, [beginSession]);

  const simulateLocal = useCallback(
    (steps: string[]) => {
      const session = beginSession();
      setLaunching(false);
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
        const timerId = window.setTimeout(() => {
          if (sessionRef.current !== session) return;
          pushLine({ kind: index === steps.length - 1 ? "result" : "thinking", text: step });
          if (index === steps.length - 1) {
            setRun({
              id: "sim-run-local",
              agentId: "sim-agent-local",
              status: "FINISHED",
            });
          }
        }, 450 * (index + 1));
        simTimersRef.current.push(timerId);
      });
    },
    [beginSession, pushLine],
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
