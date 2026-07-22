import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCursorAgent } from "@/hooks/useCursorAgent";

const incident = {
  title: "Backhaul degrade",
  site: "SYD-NW-14",
  symptom: "packet loss",
  oid: "1.3.6.1.4.1.9.9.599.1.3.1",
};

function mockHealthOk() {
  return new Response(
    JSON.stringify({
      ok: true,
      configured: true,
      me: { apiKeyName: "test-key" },
      repoUrl: "https://github.com/zirikii/demo-monorepo",
      startingRef: "main",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

describe("useCursorAgent session races", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "EventSource",
      vi.fn(() => ({
        addEventListener: vi.fn(),
        close: vi.fn(),
        onerror: null,
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("ignores an in-flight launch after resetAgent", async () => {
    let resolveLaunch: ((value: Response) => void) | undefined;
    const launchPromise = new Promise<Response>((resolve) => {
      resolveLaunch = resolve;
    });

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/cursor/health")) return mockHealthOk();
        if (url.includes("/api/cursor/agents") && !url.includes("/runs/")) {
          return launchPromise;
        }
        return new Response(JSON.stringify({ error: "not mocked" }), { status: 404 });
      }),
    );

    const { result } = renderHook(() => useCursorAgent());
    await waitFor(() => expect(result.current.health?.ok).toBe(true));

    let launchResult: Awaited<ReturnType<typeof result.current.launch>> | undefined;
    await act(async () => {
      const pending = result.current.launch(incident);
      result.current.resetAgent();
      resolveLaunch?.(
        new Response(
          JSON.stringify({
            agent: {
              id: "agent-late",
              name: "late",
              status: "RUNNING",
              url: "https://cursor.com/agents/agent-late",
            },
            run: { id: "run-late", agentId: "agent-late", status: "RUNNING" },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );
      launchResult = await pending;
    });

    expect(launchResult).toBeNull();
    expect(result.current.agent).toBeNull();
    expect(result.current.run).toBeNull();
    expect(result.current.lines).toEqual([]);
    expect(result.current.launching).toBe(false);
  });

  it("clears pending local simulation timers on reset", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        if (String(input).includes("/api/cursor/health")) return mockHealthOk();
        return new Response(JSON.stringify({ error: "not mocked" }), { status: 404 });
      }),
    );

    const { result } = renderHook(() => useCursorAgent());
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    act(() => {
      result.current.simulateLocal(["step one", "step two", "step three"]);
    });

    act(() => {
      vi.advanceTimersByTime(450);
    });
    expect(result.current.lines.some((line) => line.text === "step one")).toBe(true);

    act(() => {
      result.current.resetAgent();
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.lines).toEqual([]);
    expect(result.current.run).toBeNull();
  });

  it("aborts an in-flight launch when simulateLocal starts", async () => {
    let resolveLaunch: ((value: Response) => void) | undefined;
    const launchPromise = new Promise<Response>((resolve) => {
      resolveLaunch = resolve;
    });
    let launchSignal: AbortSignal | undefined;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (url.includes("/api/cursor/health")) return mockHealthOk();
        if (url.includes("/api/cursor/agents") && !url.includes("/runs/")) {
          launchSignal = init?.signal ?? undefined;
          return launchPromise;
        }
        return new Response(JSON.stringify({ error: "not mocked" }), { status: 404 });
      }),
    );

    const { result } = renderHook(() => useCursorAgent());
    await waitFor(() => expect(result.current.health?.ok).toBe(true));

    await act(async () => {
      const pending = result.current.launch(incident);
      result.current.simulateLocal(["local step"]);
      expect(launchSignal?.aborted).toBe(true);
      resolveLaunch?.(
        new Response(
          JSON.stringify({
            agent: {
              id: "agent-race",
              name: "race",
              status: "RUNNING",
              url: "https://cursor.com/agents/agent-race",
            },
            run: { id: "run-race", agentId: "agent-race", status: "RUNNING" },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );
      await pending;
    });

    expect(result.current.agent).toBeNull();
    expect(result.current.run?.id).toBe("sim-run-local");
    expect(result.current.lines.some((line) => line.text.includes("Local simulation"))).toBe(true);
    expect(result.current.launching).toBe(false);
  });
});
