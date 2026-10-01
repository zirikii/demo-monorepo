// @vitest-environment node
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readAssistantEnv } from "./assistantPlugin";

function dirWith(env: string): string {
  const dir = mkdtempSync(join(tmpdir(), "tk-env-"));
  writeFileSync(join(dir, ".env.local"), env);
  return dir;
}

describe("assistant env", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("reuses AGL's xAI key when Ticketek has none", () => {
    const env = readAssistantEnv("development", dirWith(""), dirWith("XAI_API_KEY=agl-key\n"));
    expect(env.XAI_API_KEY).toBe("agl-key");
  });

  it("lets Ticketek's own .env.local win", () => {
    const env = readAssistantEnv("development", dirWith("XAI_API_KEY=tk-key\n"), dirWith("XAI_API_KEY=agl-key\n"));
    expect(env.XAI_API_KEY).toBe("tk-key");
  });

  it("falls back to the process environment", () => {
    vi.stubEnv("XAI_API_KEY", "process-key");
    expect(readAssistantEnv("development", dirWith(""), dirWith("")).XAI_API_KEY).toBe("process-key");
  });
});
