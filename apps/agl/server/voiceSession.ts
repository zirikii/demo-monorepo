export const XAI_CLIENT_SECRETS_URL = "https://api.x.ai/v1/realtime/client_secrets";
export const XAI_REALTIME_URL = "wss://api.x.ai/v1/realtime";

export type VoiceConfig = {
  apiKey: string;
  model: string;
  voice: string;
  ttlSeconds: number;
};

export type VoiceResponse = { status: number; body: Record<string, unknown> };

export function readVoiceConfig(env: Record<string, string | undefined>): VoiceConfig {
  const ttl = Number(env.XAI_VOICE_TOKEN_TTL ?? 300);
  return {
    apiKey: env.XAI_API_KEY?.trim() ?? "",
    model: env.XAI_VOICE_MODEL?.trim() || "grok-voice-latest",
    voice: env.XAI_VOICE?.trim() || "eve",
    ttlSeconds: Number.isFinite(ttl) && ttl > 0 ? Math.min(ttl, 3600) : 300,
  };
}

function realtimeUrl(model: string): string {
  return `${XAI_REALTIME_URL}?model=${encodeURIComponent(model)}`;
}

/** xAI returns `{ value, expires_at }`; tolerate the nested OpenAI-style `client_secret` too. */
function extractSecret(payload: unknown): { token: string; expiresAt: number | null } | null {
  if (!payload || typeof payload !== "object") return null;
  const p = payload as Record<string, unknown>;
  const nested = (p.client_secret ?? null) as Record<string, unknown> | null;
  const token = p.value ?? nested?.value;
  const expires = p.expires_at ?? nested?.expires_at;
  if (typeof token !== "string" || !token) return null;
  return { token, expiresAt: typeof expires === "number" ? expires : null };
}

/**
 * Routes `/api/voice/*`. The API key never leaves the server — the browser only ever sees a
 * short-lived ephemeral token scoped to one realtime session.
 */
export async function handleVoiceRequest(
  method: string,
  pathname: string,
  config: VoiceConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<VoiceResponse | null> {
  if (pathname === "/api/voice/status") {
    if (method !== "GET") return { status: 405, body: { error: "Method not allowed" } };
    return {
      status: 200,
      body: { configured: Boolean(config.apiKey), provider: "grok", model: config.model, voice: config.voice },
    };
  }

  if (pathname === "/api/voice/session") {
    if (method !== "POST") return { status: 405, body: { error: "Method not allowed" } };
    if (!config.apiKey) {
      return {
        status: 503,
        body: { configured: false, error: "Grok voice isn't configured. Set XAI_API_KEY in apps/agl/.env.local." },
      };
    }
    let res: Response;
    try {
      res = await fetchImpl(XAI_CLIENT_SECRETS_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ expires_after: { seconds: config.ttlSeconds } }),
      });
    } catch {
      return { status: 502, body: { error: "Couldn't reach the xAI API" } };
    }
    if (!res.ok) {
      return { status: 502, body: { error: `xAI rejected the session request (${res.status})` } };
    }
    const secret = extractSecret(await res.json().catch(() => null));
    if (!secret) return { status: 502, body: { error: "xAI returned an unexpected session payload" } };
    return {
      status: 200,
      body: {
        token: secret.token,
        expiresAt: secret.expiresAt,
        model: config.model,
        voice: config.voice,
        url: realtimeUrl(config.model),
      },
    };
  }

  return null;
}
