import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin, ViteDevServer } from "vite";
import { loadEnv } from "vite";
import { Agent, Cursor, type Run, type SDKMessage } from "@cursor/sdk";
import {
  agentUrl,
  formatSse,
  normalizeRunStatus,
  sdkMessageToSse,
  type SseEvent,
} from "./cursorSdkHelpers";

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
    modelId: env.CURSOR_MODEL || process.env.CURSOR_MODEL || "composer-2.5",
  };
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

function serializeRun(run: Run) {
  return {
    id: run.id,
    agentId: run.agentId,
    status: normalizeRunStatus(run.status),
    createdAt: run.createdAt ? new Date(run.createdAt).toISOString() : undefined,
    durationMs: run.durationMs,
    result: run.result,
    git: run.git,
  };
}

function writeSse(res: ServerResponse, event: SseEvent) {
  res.write(formatSse(event));
}

async function streamRunToSse(
  run: Run,
  res: ServerResponse,
  req: IncomingMessage,
): Promise<void> {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let closed = false;
  const onClose = () => {
    closed = true;
  };
  req.on("close", onClose);

  try {
    for await (const message of run.stream() as AsyncGenerator<SDKMessage, void>) {
      if (closed) break;
      for (const event of sdkMessageToSse(message)) {
        writeSse(res, event);
      }
    }

    if (!closed) {
      const result = await run.wait();
      writeSse(res, {
        event: "result",
        data: {
          status: normalizeRunStatus(result.status),
          text: result.result,
          durationMs: result.durationMs,
        },
      });
    }
  } finally {
    req.off("close", onClose);
    if (!res.writableEnded) res.end();
  }
}

export function cursorApiPlugin(): Plugin {
  return {
    name: "optus-cursor-sdk-proxy",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/cursor")) return next();

        const { apiKey, repoUrl, startingRef, modelId } = getConfig(server);
        const url = new URL(req.url, "http://localhost");
        const path = url.pathname;

        try {
          if (path === "/api/cursor/health" && req.method === "GET") {
            if (!apiKey) {
              return sendJson(res, 200, {
                ok: false,
                configured: false,
                reason: "CURSOR_API_KEY missing",
              });
            }
            try {
              const me = await Cursor.me({ apiKey });
              return sendJson(res, 200, {
                ok: true,
                configured: true,
                me,
                repoUrl,
                startingRef,
                modelId,
                sdk: "@cursor/sdk",
              });
            } catch (error) {
              const message = error instanceof Error ? error.message : "Health check failed";
              return sendJson(res, 200, {
                ok: false,
                configured: true,
                reason: message,
                error: message,
                repoUrl,
                startingRef,
                modelId,
                sdk: "@cursor/sdk",
              });
            }
          }

          if (!apiKey) {
            return sendJson(res, 503, {
              error: "CURSOR_API_KEY is not configured on the Vite server",
            });
          }

          if (path === "/api/cursor/agents" && req.method === "GET") {
            const limit = Number(url.searchParams.get("limit") ?? "10");
            const listed = await Agent.list({
              runtime: "cloud",
              apiKey,
              limit: Number.isFinite(limit) ? limit : 10,
            });
            return sendJson(res, 200, {
              agents: listed.items.map((item) => ({
                id: item.agentId,
                name: item.name,
                status: item.status ? normalizeRunStatus(item.status) : "UNKNOWN",
                url: agentUrl(item.agentId),
                summary: item.summary,
                createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : undefined,
                updatedAt: new Date(item.lastModified).toISOString(),
              })),
              nextCursor: listed.nextCursor,
            });
          }

          if (path === "/api/cursor/agents" && req.method === "POST") {
            const raw = await readBody(req);
            const incident = raw ? (JSON.parse(raw) as JsonBody) : {};
            const promptText =
              typeof incident.prompt === "string" && incident.prompt.trim()
                ? incident.prompt
                : buildRemediationPrompt(incident);
            const name = String(incident.name ?? `Optus NOC · ${incident.title ?? "incident"}`).slice(
              0,
              100,
            );

            const agent = await Agent.create({
              apiKey,
              name,
              model: { id: modelId },
              cloud: {
                repos: [{ url: repoUrl, startingRef }],
                autoCreatePR: false,
              },
            });

            let aborted = false;
            const onAbort = () => {
              aborted = true;
            };
            req.on("close", onAbort);

            try {
              const run = await agent.send(promptText);
              if (aborted) {
                await run.cancel().catch(() => undefined);
                return;
              }

              return sendJson(res, 200, {
                agent: {
                  id: agent.agentId,
                  name,
                  status: normalizeRunStatus(run.status),
                  url: agentUrl(agent.agentId),
                  latestRunId: run.id,
                },
                run: serializeRun(run),
                sdk: "@cursor/sdk",
              });
            } finally {
              req.off("close", onAbort);
            }
          }

          const agentMatch = path.match(/^\/api\/cursor\/agents\/([^/]+)$/);
          if (agentMatch && req.method === "GET") {
            const agentId = decodeURIComponent(agentMatch[1]);
            const info = await Agent.get(agentId, { apiKey });
            return sendJson(res, 200, {
              id: info.agentId,
              name: info.name,
              status: info.status ? normalizeRunStatus(info.status) : "UNKNOWN",
              url: agentUrl(info.agentId),
              summary: info.summary,
              createdAt: info.createdAt ? new Date(info.createdAt).toISOString() : undefined,
              updatedAt: new Date(info.lastModified).toISOString(),
            });
          }

          const runMatch = path.match(/^\/api\/cursor\/agents\/([^/]+)\/runs\/([^/]+)$/);
          if (runMatch && req.method === "GET") {
            const agentId = decodeURIComponent(runMatch[1]);
            const runId = decodeURIComponent(runMatch[2]);
            const run = await Agent.getRun(runId, {
              runtime: "cloud",
              agentId,
              apiKey,
            });
            return sendJson(res, 200, serializeRun(run));
          }

          const streamMatch = path.match(
            /^\/api\/cursor\/agents\/([^/]+)\/runs\/([^/]+)\/stream$/,
          );
          if (streamMatch && req.method === "GET") {
            const agentId = decodeURIComponent(streamMatch[1]);
            const runId = decodeURIComponent(streamMatch[2]);
            const run = await Agent.getRun(runId, {
              runtime: "cloud",
              agentId,
              apiKey,
            });
            await streamRunToSse(run, res, req);
            return;
          }

          return sendJson(res, 404, { error: `No handler for ${req.method} ${path}` });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Cursor SDK proxy failure";
          if (!res.headersSent) {
            return sendJson(res, 500, { error: message });
          }
          res.end();
        }
      });
    },
  };
}
