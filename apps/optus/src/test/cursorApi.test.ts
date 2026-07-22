import { describe, expect, it } from "vitest";
import { isTerminalRunStatus } from "@/lib/cursorApi";

describe("isTerminalRunStatus", () => {
  it("recognizes finished and failed states", () => {
    expect(isTerminalRunStatus("FINISHED")).toBe(true);
    expect(isTerminalRunStatus("error")).toBe(true);
    expect(isTerminalRunStatus("RUNNING")).toBe(false);
    expect(isTerminalRunStatus("CREATING")).toBe(false);
  });
});
