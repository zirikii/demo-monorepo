import type { SDKMessage } from "@cursor/sdk";

/** Normalize SDK / REST run statuses for the cockpit UI. */
export function normalizeRunStatus(status: string): string {
  return status.trim().toUpperCase();
}

export function agentUrl(agentId: string): string {
  return `https://cursor.com/agents/${agentId}`;
}

export type SseEvent = {
  event: string;
  data: Record<string, unknown>;
};

/** Map an SDK stream message into cockpit SSE event(s). */
export function sdkMessageToSse(message: SDKMessage): SseEvent[] {
  switch (message.type) {
    case "status":
      return [
        {
          event: "status",
          data: {
            status: normalizeRunStatus(message.status),
            message: message.message,
          },
        },
      ];
    case "assistant": {
      const text = message.message.content
        .filter((block): block is { type: "text"; text: string } => block.type === "text")
        .map((block) => block.text)
        .join("");
      return text ? [{ event: "assistant", data: { text } }] : [];
    }
    case "thinking":
      return message.text ? [{ event: "thinking", data: { text: message.text } }] : [];
    case "tool_call":
      return [
        {
          event: "tool_call",
          data: {
            name: message.name,
            status: message.status,
            call_id: message.call_id,
          },
        },
      ];
    case "task":
      return message.text
        ? [{ event: "status", data: { status: "RUNNING", message: message.text } }]
        : [];
    default:
      return [];
  }
}

export function formatSse({ event, data }: SseEvent): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}
