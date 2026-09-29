import { describe, expect, it, vi } from "vitest";
import { handleChatRequest, parseResponseOutput, readChatConfig, XAI_RESPONSES_URL, type ChatRequest } from "./chatSession";

const withKey = readChatConfig({ XAI_API_KEY: "xai-test-key" });
const withoutKey = readChatConfig({});

const tool = { type: "function", name: "go_to_step", description: "Show a step", parameters: { type: "object" } };
const chat: ChatRequest = {
  method: "POST",
  pathname: "/api/chat",
  fetchSite: "same-origin",
  client: "127.0.0.1",
  body: JSON.stringify({ input: [{ role: "user", content: "pay my bill" }], tools: [tool, { type: "web_search" }], previousResponseId: "resp_1" }),
};

const xaiOutput = {
  id: "resp_2",
  output: [
    { type: "reasoning", encrypted_content: "..." },
    { type: "function_call", call_id: "call_1", name: "go_to_step", arguments: '{"step_id":"billing"}' },
    { type: "message", role: "assistant", content: [{ type: "output_text", text: "Let's sort your bill." }] },
  ],
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function asFetch(fn: ReturnType<typeof vi.fn>) {
  return { fetchImpl: fn as unknown as typeof fetch };
}

describe("readChatConfig", () => {
  it("defaults to grok-4.7 at low reasoning effort and allows overrides", () => {
    expect(withoutKey).toEqual({ apiKey: "", model: "grok-4.7", reasoningEffort: "low" });
    expect(readChatConfig({ XAI_CHAT_MODEL: "grok-4.20-0309-non-reasoning", XAI_CHAT_REASONING: "" })).toMatchObject({
      model: "grok-4.20-0309-non-reasoning",
      reasoningEffort: "",
    });
  });
});

describe("parseResponseOutput", () => {
  it("collects reply text and function calls, skipping reasoning", () => {
    expect(parseResponseOutput(xaiOutput)).toEqual({
      responseId: "resp_2",
      text: "Let's sort your bill.",
      calls: [{ callId: "call_1", name: "go_to_step", arguments: '{"step_id":"billing"}' }],
    });
    expect(parseResponseOutput({ output: [] })).toBeNull();
  });
});

describe("POST /api/chat", () => {
  it("proxies to the Responses API with the server key, fixed model and function tools only", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(xaiOutput));
    const res = await handleChatRequest(chat, withKey, asFetch(fetchImpl));
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(XAI_RESPONSES_URL);
    expect(init.headers).toEqual({ Authorization: "Bearer xai-test-key", "Content-Type": "application/json" });
    expect(JSON.parse(String(init.body))).toMatchObject({
      model: "grok-4.7",
      input: [{ role: "user", content: "pay my bill" }],
      tools: [tool],
      previous_response_id: "resp_1",
      reasoning: { effort: "low" },
    });
    const noReasoning = vi.fn(async () => jsonResponse(xaiOutput));
    await handleChatRequest(chat, { ...withKey, reasoningEffort: "" }, asFetch(noReasoning));
    const [, plain] = noReasoning.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(String(plain.body))).not.toHaveProperty("reasoning");
    expect(res?.status).toBe(200);
    expect(res?.body).toMatchObject({ responseId: "resp_2", text: "Let's sort your bill." });
    expect(JSON.stringify(res)).not.toContain("xai-test-key");
  });

  it("guards the key: method, origin, config, body and rate limit", async () => {
    const fetchImpl = vi.fn();
    const deps = asFetch(fetchImpl);
    expect((await handleChatRequest({ ...chat, method: "GET" }, withKey, deps))?.status).toBe(405);
    expect((await handleChatRequest({ ...chat, fetchSite: "cross-site" }, withKey, deps))?.status).toBe(403);
    expect((await handleChatRequest(chat, withoutKey, deps))?.status).toBe(503);
    expect((await handleChatRequest({ ...chat, body: "{}" }, withKey, deps))?.status).toBe(400);
    expect((await handleChatRequest({ ...chat, body: "not json" }, withKey, deps))?.status).toBe(400);
    expect((await handleChatRequest(chat, withKey, { ...deps, allowTurn: () => false }))?.status).toBe(429);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("maps xAI failures to 502 and stalls to 504", async () => {
    expect((await handleChatRequest(chat, withKey, asFetch(vi.fn(async () => jsonResponse({}, 401)))))?.status).toBe(502);
    expect((await handleChatRequest(chat, withKey, asFetch(vi.fn(async () => jsonResponse({ nope: true })))))?.status).toBe(502);
    const stalled = vi.fn(async () => {
      throw new DOMException("The operation timed out.", "TimeoutError");
    });
    expect((await handleChatRequest(chat, withKey, asFetch(stalled)))?.status).toBe(504);
  });

  it("ignores other paths", async () => {
    expect(await handleChatRequest({ ...chat, pathname: "/api/voice/status" }, withKey)).toBeNull();
  });
});
