import type { IncomingMessage, ServerResponse } from "node:http";
import { join } from "node:path";
import { loadEnv, type Connect, type Plugin } from "vite";
import {
  CHAT_TURNS_PER_MINUTE,
  handleChatRequest,
  MAX_CHAT_BODY_BYTES,
  readChatConfig,
} from "../../agl/server/chatSession";
import {
  createRateLimiter,
  handleVoiceRequest,
  MINTS_PER_MINUTE,
  readVoiceConfig,
  type VoiceResponse,
} from "../../agl/server/voiceSession";

/**
 * The xAI proxy is AGL's (the repo-root `api/` edge functions serve the same handlers when
 * deployed), so the key already in apps/agl/.env.local works here too. SiteMinder's own
 * .env.local wins when both set a value.
 */
export function readAssistantEnv(
  mode: string,
  envDir: string,
  aglDir: string,
): Record<string, string | undefined> {
  return { ...process.env, ...loadEnv(mode, aglDir, ""), ...loadEnv(mode, envDir, "") };
}

function header(req: IncomingMessage, name: string): string | undefined {
  const value = req.headers[name];
  return Array.isArray(value) ? value[0] : value;
}

function send(res: ServerResponse, result: VoiceResponse) {
  res.statusCode = result.status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(result.body));
}

/** Resolves null once the body passes `limit` bytes, so a huge upload can't pin memory. */
function readBody(req: IncomingMessage, limit: number): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > limit) {
        resolve(null);
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function middleware(envDir: string, mode: string): Connect.NextHandleFunction {
  const aglDir = join(envDir, "..", "agl");
  const allowMint = createRateLimiter(MINTS_PER_MINUTE, 60_000);
  const allowTurn = createRateLimiter(CHAT_TURNS_PER_MINUTE, 60_000);
  return (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
    const url = req.url ?? "";
    const isChat = url.startsWith("/api/chat");
    if (!isChat && !url.startsWith("/api/voice")) return next();
    const env = readAssistantEnv(mode, envDir, aglDir);
    const { pathname } = new URL(url, "http://localhost");
    const request = {
      method: req.method ?? "GET",
      pathname,
      origin: header(req, "origin"),
      host: header(req, "host"),
      fetchSite: header(req, "sec-fetch-site"),
      client: req.socket.remoteAddress,
    };
    const handled: Promise<VoiceResponse | null> = isChat
      ? readBody(req, MAX_CHAT_BODY_BYTES).then((body) =>
          body === null
            ? { status: 413, body: { error: "Message too large" } }
            : handleChatRequest({ ...request, body }, readChatConfig(env), { allowTurn }),
        )
      : handleVoiceRequest(request, readVoiceConfig(env), { allowMint });
    handled
      .then((result) => (result ? send(res, result) : next()))
      .catch(() => {
        if (!res.headersSent)
          send(res, { status: 500, body: { error: "Assistant request failed" } });
      });
  };
}

/** Serves `/api/voice/*` and `/api/chat` from the Vite dev and preview servers. */
export function assistantApiPlugin(): Plugin {
  return {
    name: "siteminder-grok-assistant-api",
    configureServer(server) {
      server.middlewares.use(middleware(server.config.envDir || process.cwd(), server.config.mode));
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware(server.config.envDir || process.cwd(), server.config.mode));
    },
  };
}
