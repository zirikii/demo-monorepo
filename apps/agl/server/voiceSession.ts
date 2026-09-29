export const XAI_CLIENT_SECRETS_URL = "https://api.x.ai/v1/realtime/client_secrets";
export const XAI_REALTIME_URL = "wss://api.x.ai/v1/realtime";
export const MINT_TIMEOUT_MS = 10_000;
export const MINTS_PER_MINUTE = 10;

export type VoiceConfig = {
  apiKey: string;
  model: string;
  voice: string;
  ttlSeconds: number;
};

export type VoiceRequest = {
  method: string;
  pathname: string;
  origin?: string;
  host?: string;
  fetchSite?: string;
  client?: string;
};

export type VoiceDeps = {
  fetchImpl?: typeof fetch;
  allowMint?: (client: string) => boolean;
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

/** Sliding-window limiter keyed by client address. */
export function createRateLimiter(limit: number, windowMs: number, now: () => number = Date.now) {
  const hits = new Map<string, number[]>();
  return (client: string): boolean => {
    const t = now();
    const recent = (hits.get(client) ?? []).filter((at) => t - at < windowMs);
    const allowed = recent.length < limit;
    if (allowed) recent.push(t);
    hits.set(client, recent);
    return allowed;
  };
}

function isSameOrigin(req: VoiceRequest): boolean {
  if (req.fetchSite) return req.fetchSite === "same-origin";
  if (!req.origin || !req.host) return false;
  try {
    return new URL(req.origin).host === req.host;
  } catch {
    return false;
  }
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
 *
 * These routes are deliberately outside any session check: the demo's login is a client-side mock
 * the server can't see. `/status` exposes no secrets. `/session` spends the xAI key, so it only
 * serves same-origin browser requests and is rate limited per client address.
 */
export async function handleVoiceRequest(
  req: VoiceRequest,
  config: VoiceConfig,
  { fetchImpl = fetch, allowMint = () => true }: VoiceDeps = {},
): Promise<VoiceResponse | null> {
  if (req.pathname === "/api/voice/status") {
    if (req.method !== "GET") return { status: 405, body: { error: "Method not allowed" } };
    return {
      status: 200,
      body: { configured: Boolean(config.apiKey), provider: "grok", model: config.model, voice: config.voice },
    };
  }

  if (req.pathname === "/api/voice/session") {
    if (req.method !== "POST") return { status: 405, body: { error: "Method not allowed" } };
    if (!isSameOrigin(req)) return { status: 403, body: { error: "Voice sessions can only be started from this site" } };
    if (!config.apiKey) {
      return {
        status: 503,
        body: { configured: false, error: "Grok voice isn't configured. Set XAI_API_KEY in apps/agl/.env.local." },
      };
    }
    if (!allowMint(req.client ?? "unknown")) {
      return { status: 429, body: { error: "Too many voice sessions. Try again in a minute." } };
    }
    let res: Response;
    let payload: unknown;
    try {
      res = await fetchImpl(XAI_CLIENT_SECRETS_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ expires_after: { seconds: config.ttlSeconds } }),
        signal: AbortSignal.timeout(MINT_TIMEOUT_MS),
      });
      payload = res.ok ? await res.json().catch(() => null) : null;
    } catch (err) {
      if ((err as { name?: string } | null)?.name === "TimeoutError") {
        return { status: 504, body: { error: "The xAI API took too long to respond" } };
      }
      return { status: 502, body: { error: "Couldn't reach the xAI API" } };
    }
    if (!res.ok) {
      return { status: 502, body: { error: `xAI rejected the session request (${res.status})` } };
    }
    const secret = extractSecret(payload);
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
