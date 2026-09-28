import type { IncomingMessage, ServerResponse } from "node:http";
import { loadEnv, type Connect, type Plugin } from "vite";
import { handleVoiceRequest, readVoiceConfig } from "./voiceSession";

function middleware(envDir: string, mode: string): Connect.NextHandleFunction {
  return (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
    if (!req.url?.startsWith("/api/voice")) return next();
    const env = { ...process.env, ...loadEnv(mode, envDir, "") };
    const { pathname } = new URL(req.url, "http://localhost");
    void handleVoiceRequest(req.method ?? "GET", pathname, readVoiceConfig(env)).then((result) => {
      if (!result) return next();
      res.statusCode = result.status;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "no-store");
      res.end(JSON.stringify(result.body));
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
