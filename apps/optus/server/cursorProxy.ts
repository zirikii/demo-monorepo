import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin, ViteDevServer } from "vite";
import { loadEnv } from "vite";

const API_BASE = "https://api.cursor.com";

type JsonBody = Record<string, unknown>;

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function getConfig(server: ViteDevServer) {
  const mode = server.config.mode || "development";
  const env = loadEnv(mode, server.config.envDir || process.cwd(), "");
  return {
    apiKey: env.CURSOR_API_KEY || process.env.CURSOR_API_KEY || "",
    repoUrl:
      env.CURSOR_REPO_URL ||
      process.env.CURSOR_REPO_URL ||
      "https://github.com/zirikii/demo-monorepo",
    startingRef: env.CURSOR_STARTING_REF || process.env.CURSOR_STARTING_REF || "main",
  };
}

async function cursorFetch(apiKey: string, path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers);
  if (!headers.has("Authorization")) headers.set("Authorization", `Bearer ${apiKey}`);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(`${API_BASE}${path}`, { ...init, headers });
}

function buildRemediationPrompt(incident: JsonBody): string {
  const title = String(incident.title ?? "Unknown Optus network incident");
  const site = String(incident.site ?? "unknown site");
  const symptom = String(incident.symptom ?? "unspecified symptom");
  const oid = String(incident.oid ?? "n/a");

  return [
    "You are assisting an Optus Network Operations demo for agentic remediation.",
    "Do NOT change customer-facing apps. Work only under apps/optus/.",
    "",
    "Incident context:",
    `- Title: ${title}`,
    `- Site: ${site}`,
    `- Symptom: ${symptom}`,
    `- SNMP OID: ${oid}`,
    "",
    "Tasks:",
    "1. Read apps/optus/README.md and apps/optus/src/data/scenarios.ts to understand the demo.",
    "2. Append a short remediation note to apps/optus/data/remediation-log.md describing:",
    "   - likely root cause hypothesis",
    "   - recommended operator actions",
    "   - whether this exceeds deterministic runbooks",
    "3. Keep the change minimal and demo-safe. Open no unrelated PRs.",
    "",
    "If remediation-log.md does not exist, create it with a markdown heading and one incident entry.",
  ].join("\n");
}

export function cursorApiPlugin(): Plugin {
  return {
    name: "optus-cursor-api-proxy",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/cursor")) return next();

        const { apiKey, repoUrl, startingRef } = getConfig(server);
        const url = new URL(req.url, "http://localhost");
        const path = url.pathname;

        try {
          if (path === "/api/cursor/health" && req.method === "GET") {
            if (!apiKey) {
              return sendJson(res, 200, { ok: false, configured: false, reason: "CURSOR_API_KEY missing" });
            }
            const me = await cursorFetch(apiKey, "/v1/me");
            const body = await me.json().catch(() => ({}));
            return sendJson(res, me.ok ? 200 : me.status, {
              ok: me.ok,
              configured: true,
              me: me.ok ? body : undefined,
              error: me.ok ? undefined : body,
              repoUrl,
              startingRef,
            });
          }

          if (!apiKey) {
            return sendJson(res, 503, {
              error: "CURSOR_API_KEY is not configured on the Vite server",
            });
          }

          if (path === "/api/cursor/agents" && req.method === "GET") {
            const limit = url.searchParams.get("limit") ?? "10";
            const upstream = await cursorFetch(apiKey, `/v1/agents?limit=${encodeURIComponent(limit)}`);
            const body = await upstream.json().catch(() => ({}));
            return sendJson(res, upstream.status, body);
          }

          if (path === "/api/cursor/agents" && req.method === "POST") {
            const raw = await readBody(req);
            const incident = raw ? (JSON.parse(raw) as JsonBody) : {};
            const promptText =
              typeof incident.prompt === "string" && incident.prompt.trim()
                ? incident.prompt
                : buildRemediationPrompt(incident);

            const payload = {
              prompt: { text: promptText },
              name: String(incident.name ?? `Optus NOC · ${incident.title ?? "incident"}`).slice(0, 100),
              repos: [{ url: repoUrl, startingRef }],
              autoCreatePR: false,
            };

            const upstream = await cursorFetch(apiKey, "/v1/agents", {
              method: "POST",
              body: JSON.stringify(payload),
            });
            const body = await upstream.json().catch(() => ({}));
            return sendJson(res, upstream.status, body);
          }

          const agentMatch = path.match(/^\/api\/cursor\/agents\/([^/]+)$/);
          if (agentMatch && req.method === "GET") {
            const upstream = await cursorFetch(apiKey, `/v1/agents/${agentMatch[1]}`);
            const body = await upstream.json().catch(() => ({}));
            return sendJson(res, upstream.status, body);
          }

          const runMatch = path.match(/^\/api\/cursor\/agents\/([^/]+)\/runs\/([^/]+)$/);
          if (runMatch && req.method === "GET") {
            const upstream = await cursorFetch(
              apiKey,
              `/v1/agents/${runMatch[1]}/runs/${runMatch[2]}`,
            );
            const body = await upstream.json().catch(() => ({}));
            return sendJson(res, upstream.status, body);
          }

          const streamMatch = path.match(/^\/api\/cursor\/agents\/([^/]+)\/runs\/([^/]+)\/stream$/);
          if (streamMatch && req.method === "GET") {
            const upstream = await cursorFetch(
              apiKey,
              `/v1/agents/${streamMatch[1]}/runs/${streamMatch[2]}/stream`,
              { headers: { Accept: "text/event-stream" } },
            );

            res.statusCode = upstream.status;
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            if (!upstream.ok || !upstream.body) {
              const text = await upstream.text();
              res.end(text);
              return;
            }

            const reader = upstream.body.getReader();
            const decoder = new TextDecoder();
            const pump = async () => {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                res.write(decoder.decode(value, { stream: true }));
              }
              res.end();
            };
            req.on("close", () => reader.cancel().catch(() => undefined));
            await pump();
            return;
          }

          return sendJson(res, 404, { error: `No handler for ${req.method} ${path}` });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Proxy failure";
          return sendJson(res, 500, { error: message });
        }
      });
    },
  };
}
