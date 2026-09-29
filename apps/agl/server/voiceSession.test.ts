import { describe, expect, it, vi } from "vitest";
import {
  createRateLimiter,
  handleVoiceRequest,
  readVoiceConfig,
  XAI_CLIENT_SECRETS_URL,
  type VoiceRequest,
} from "./voiceSession";

const withKey = readVoiceConfig({ XAI_API_KEY: "xai-test-key" });
const withoutKey = readVoiceConfig({});

const status: VoiceRequest = { method: "GET", pathname: "/api/voice/status" };
const session: VoiceRequest = {
  method: "POST",
  pathname: "/api/voice/session",
  origin: "http://localhost:5185",
  host: "localhost:5185",
  fetchSite: "same-origin",
  client: "127.0.0.1",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function asFetch(fn: ReturnType<typeof vi.fn>) {
  return { fetchImpl: fn as unknown as typeof fetch };
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
    const res = await handleVoiceRequest(status, withKey);
    expect(res).toEqual({ status: 200, body: { configured: true, provider: "grok", model: "grok-voice-latest", voice: "eve" } });
    expect(JSON.stringify(res)).not.toContain("xai-test-key");
    expect((await handleVoiceRequest(status, withoutKey))?.body.configured).toBe(false);
  });

  it("rejects other methods", async () => {
    expect((await handleVoiceRequest({ ...status, method: "POST" }, withKey))?.status).toBe(405);
  });
});

describe("POST /api/voice/session", () => {
  it("returns 503 when XAI_API_KEY is missing", async () => {
    const fetchImpl = vi.fn();
    const res = await handleVoiceRequest(session, withoutKey, asFetch(fetchImpl));
    expect(res?.status).toBe(503);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("mints an ephemeral token with the server-side key and a timeout", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ value: "ephemeral-abc", expires_at: 1790000000 }));
    const res = await handleVoiceRequest(session, withKey, asFetch(fetchImpl));
    expect(fetchImpl).toHaveBeenCalledWith(XAI_CLIENT_SECRETS_URL, {
      method: "POST",
      headers: { Authorization: "Bearer xai-test-key", "Content-Type": "application/json" },
      body: JSON.stringify({ expires_after: { seconds: 300 } }),
      signal: expect.any(AbortSignal),
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
    const res = await handleVoiceRequest(session, withKey, asFetch(fetchImpl));
    expect(res?.body).toMatchObject({ token: "nested-token", expiresAt: 5 });
  });

  it("returns 502 when xAI fails or returns junk", async () => {
    const rejected = vi.fn(async () => jsonResponse({ error: "bad key" }, 401));
    expect((await handleVoiceRequest(session, withKey, asFetch(rejected)))?.status).toBe(502);
    const offline = vi.fn(async () => {
      throw new Error("ENOTFOUND");
    });
    expect((await handleVoiceRequest(session, withKey, asFetch(offline)))?.status).toBe(502);
    const junk = vi.fn(async () => jsonResponse({ nope: true }));
    expect((await handleVoiceRequest(session, withKey, asFetch(junk)))?.status).toBe(502);
  });

  it("returns 504 when xAI stalls past the timeout", async () => {
    const stalled = vi.fn(async () => {
      throw new DOMException("The operation timed out.", "TimeoutError");
    });
    const res = await handleVoiceRequest(session, withKey, asFetch(stalled));
    expect(res?.status).toBe(504);
  });

  it("refuses cross-site and header-less requests before touching the key", async () => {
    const fetchImpl = vi.fn();
    const crossSite = { ...session, fetchSite: "cross-site", origin: "https://evil.example" };
    expect((await handleVoiceRequest(crossSite, withKey, asFetch(fetchImpl)))?.status).toBe(403);
    const bare = { method: "POST", pathname: "/api/voice/session" };
    expect((await handleVoiceRequest(bare, withKey, asFetch(fetchImpl)))?.status).toBe(403);
    const mismatched = { ...session, fetchSite: undefined, origin: "https://evil.example" };
    expect((await handleVoiceRequest(mismatched, withKey, asFetch(fetchImpl)))?.status).toBe(403);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("falls back to comparing Origin with Host when Sec-Fetch-Site is absent", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ value: "t" }));
    const res = await handleVoiceRequest({ ...session, fetchSite: undefined }, withKey, asFetch(fetchImpl));
    expect(res?.status).toBe(200);
  });

  it("rate limits minting per client", async () => {
    const fetchImpl = vi.fn();
    const res = await handleVoiceRequest(session, withKey, { ...asFetch(fetchImpl), allowMint: () => false });
    expect(res?.status).toBe(429);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("rejects GET", async () => {
    expect((await handleVoiceRequest({ ...session, method: "GET" }, withKey))?.status).toBe(405);
  });
});

describe("createRateLimiter", () => {
  it("allows up to the limit per client within the window", () => {
    let now = 0;
    const allow = createRateLimiter(2, 1000, () => now);
    expect([allow("a"), allow("a"), allow("a"), allow("b")]).toEqual([true, true, false, true]);
    now = 1000;
    expect(allow("a")).toBe(true);
  });
});

it("ignores unrelated paths", async () => {
  expect(await handleVoiceRequest({ method: "GET", pathname: "/api/other" }, withKey)).toBeNull();
});
