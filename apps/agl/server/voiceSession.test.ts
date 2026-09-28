import { describe, expect, it, vi } from "vitest";
import { handleVoiceRequest, readVoiceConfig, XAI_CLIENT_SECRETS_URL } from "./voiceSession";

const withKey = readVoiceConfig({ XAI_API_KEY: "xai-test-key" });
const withoutKey = readVoiceConfig({});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

describe("readVoiceConfig", () => {
  it("applies defaults and clamps the token TTL", () => {
    expect(withoutKey).toEqual({ apiKey: "", model: "grok-voice-latest", voice: "eve", ttlSeconds: 300 });
    expect(readVoiceConfig({ XAI_VOICE: "ara", XAI_VOICE_TOKEN_TTL: "99999" })).toMatchObject({ voice: "ara", ttlSeconds: 3600 });
    expect(readVoiceConfig({ XAI_VOICE_TOKEN_TTL: "nope" }).ttlSeconds).toBe(300);
  });
});

describe("GET /api/voice/status", () => {
  it("reports whether Grok voice is configured without leaking the key", async () => {
    const res = await handleVoiceRequest("GET", "/api/voice/status", withKey);
    expect(res).toEqual({ status: 200, body: { configured: true, provider: "grok", model: "grok-voice-latest", voice: "eve" } });
    expect(JSON.stringify(res)).not.toContain("xai-test-key");
    expect((await handleVoiceRequest("GET", "/api/voice/status", withoutKey))?.body.configured).toBe(false);
  });

  it("rejects other methods", async () => {
    expect((await handleVoiceRequest("POST", "/api/voice/status", withKey))?.status).toBe(405);
  });
});

describe("POST /api/voice/session", () => {
  it("returns 503 when XAI_API_KEY is missing", async () => {
    const fetchImpl = vi.fn();
    const res = await handleVoiceRequest("POST", "/api/voice/session", withoutKey, fetchImpl);
    expect(res?.status).toBe(503);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("mints an ephemeral token with the server-side key", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ value: "ephemeral-abc", expires_at: 1790000000 }));
    const res = await handleVoiceRequest("POST", "/api/voice/session", withKey, fetchImpl as unknown as typeof fetch);
    expect(fetchImpl).toHaveBeenCalledWith(XAI_CLIENT_SECRETS_URL, {
      method: "POST",
      headers: { Authorization: "Bearer xai-test-key", "Content-Type": "application/json" },
      body: JSON.stringify({ expires_after: { seconds: 300 } }),
    });
    expect(res).toEqual({
      status: 200,
      body: {
        token: "ephemeral-abc",
        expiresAt: 1790000000,
        model: "grok-voice-latest",
        voice: "eve",
        url: "wss://api.x.ai/v1/realtime?model=grok-voice-latest",
      },
    });
    expect(JSON.stringify(res)).not.toContain("xai-test-key");
  });

  it("accepts the nested client_secret payload shape", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ client_secret: { value: "nested-token", expires_at: 5 } }));
    const res = await handleVoiceRequest("POST", "/api/voice/session", withKey, fetchImpl as unknown as typeof fetch);
    expect(res?.body).toMatchObject({ token: "nested-token", expiresAt: 5 });
  });

  it("returns 502 when xAI fails or returns junk", async () => {
    const rejected = vi.fn(async () => jsonResponse({ error: "bad key" }, 401));
    expect((await handleVoiceRequest("POST", "/api/voice/session", withKey, rejected as unknown as typeof fetch))?.status).toBe(502);
    const offline = vi.fn(async () => {
      throw new Error("ENOTFOUND");
    });
    expect((await handleVoiceRequest("POST", "/api/voice/session", withKey, offline as unknown as typeof fetch))?.status).toBe(502);
    const junk = vi.fn(async () => jsonResponse({ nope: true }));
    expect((await handleVoiceRequest("POST", "/api/voice/session", withKey, junk as unknown as typeof fetch))?.status).toBe(502);
  });

  it("rejects GET", async () => {
    expect((await handleVoiceRequest("GET", "/api/voice/session", withKey))?.status).toBe(405);
  });
});

it("ignores unrelated paths", async () => {
  expect(await handleVoiceRequest("GET", "/api/other", withKey)).toBeNull();
});
