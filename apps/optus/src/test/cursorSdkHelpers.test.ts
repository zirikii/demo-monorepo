import { describe, expect, it } from "vitest";
import {
  agentUrl,
  formatSse,
  normalizeRunStatus,
  sdkMessageToSse,
} from "../../server/cursorSdkHelpers";

describe("cursorSdkHelpers", () => {
  it("normalizes run statuses for the cockpit", () => {
    expect(normalizeRunStatus("running")).toBe("RUNNING");
    expect(normalizeRunStatus("FINISHED")).toBe("FINISHED");
  });

  it("builds Cursor agent URLs", () => {
    expect(agentUrl("bc-123")).toBe("https://cursor.com/agents/bc-123");
  });

  it("maps SDK stream messages to SSE events", () => {
    expect(
      sdkMessageToSse({
        type: "status",
        agent_id: "bc-1",
        run_id: "run-1",
        status: "RUNNING",
      }),
    ).toEqual([{ event: "status", data: { status: "RUNNING", message: undefined } }]);

    expect(
      sdkMessageToSse({
        type: "assistant",
        agent_id: "bc-1",
        run_id: "run-1",
        message: {
          role: "assistant",
          content: [{ type: "text", text: "Checking BGP peers" }],
        },
      }),
    ).toEqual([{ event: "assistant", data: { text: "Checking BGP peers" } }]);

    expect(
      sdkMessageToSse({
        type: "tool_call",
        agent_id: "bc-1",
        run_id: "run-1",
        call_id: "c1",
        name: "readFile",
        status: "running",
      }),
    ).toEqual([
      {
        event: "tool_call",
        data: { name: "readFile", status: "running", call_id: "c1" },
      },
    ]);
  });

  it("formats SSE frames", () => {
    expect(formatSse({ event: "status", data: { status: "RUNNING" } })).toBe(
      'event: status\ndata: {"status":"RUNNING"}\n\n',
    );
  });
});
