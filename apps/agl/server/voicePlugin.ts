import type { IncomingMessage, ServerResponse } from "node:http";
import { loadEnv, type Connect, type Plugin } from "vite";
import { createRateLimiter, handleVoiceRequest, MINTS_PER_MINUTE, readVoiceConfig, type VoiceResponse } from "./voiceSession";

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

function middleware(envDir: string, mode: string): Connect.NextHandleFunction {
  const allowMint = createRateLimiter(MINTS_PER_MINUTE, 60_000);
  return (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
    if (!req.url?.startsWith("/api/voice")) return next();
    const env = { ...process.env, ...loadEnv(mode, envDir, "") };
    const { pathname } = new URL(req.url, "http://localhost");
    const request = {
      method: req.method ?? "GET",
      pathname,
      origin: header(req, "origin"),
      host: header(req, "host"),
      fetchSite: header(req, "sec-fetch-site"),
      client: req.socket.remoteAddress,
    };
    handleVoiceRequest(request, readVoiceConfig(env), { allowMint })
      .then((result) => (result ? send(res, result) : next()))
      .catch(() => {
        if (!res.headersSent) send(res, { status: 500, body: { error: "Voice session failed" } });
      });
  };
}

/** Serves `/api/voice/*` from the Vite dev and preview servers. */
export function voiceApiPlugin(): Plugin {
  return {
    name: "agl-grok-voice-session",
    configureServer(server) {
      server.middlewares.use(middleware(server.config.envDir || process.cwd(), server.config.mode));
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware(server.config.envDir || process.cwd(), server.config.mode));
    },
  };
}
