import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { maskIdentity } from "../src/lib/mask";
import { sanitizeScenario } from "../src/domain/scenario";
import {
  StoreError,
  accountRiskTier,
  activeSubmission,
  agentSetStatus,
  callbackPayload,
  completeEdd,
  confirmOdd,
  createSession,
  decide,
  partnerIdentityView,
  previewCapture,
  recordFace,
  resetState,
  setScenario,
} from "../src/domain/store";
import type { FaceMode, SubmissionStatus } from "../src/domain/types";
import { loadState, saveState } from "./persist";

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

function accountView() {
  const state = loadState();
  const active = activeSubmission(state);
  return {
    account: state.account,
    identity: active?.identity ?? null,
    masked: active ? maskIdentity(active.identity) : null,
    riskTier: accountRiskTier(state),
    submissions: state.submissions,
  };
}

async function handle(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const url = new URL(req.url ?? "/", "http://localhost");
  if (!url.pathname.startsWith("/api/")) return false;
  const method = req.method ?? "GET";
  const now = new Date().toISOString();

  try {
    if (method === "GET" && url.pathname === "/api/account") {
      sendJson(res, 200, accountView());
      return true;
    }
    if (method === "GET" && url.pathname === "/api/submissions") {
      sendJson(res, 200, { submissions: loadState().submissions });
      return true;
    }
    if (method === "GET" && url.pathname === "/api/scenario") {
      sendJson(res, 200, { scenario: loadState().scenario });
      return true;
    }
    if (method === "PUT" && url.pathname === "/api/scenario") {
      const body = JSON.parse((await readBody(req)) || "{}") as unknown;
      const scenario = sanitizeScenario(body);
      saveState(setScenario(loadState(), scenario));
      sendJson(res, 200, { scenario });
      return true;
    }
    if (method === "POST" && url.pathname === "/api/dev/reset") {
      saveState(resetState());
      sendJson(res, 200, accountView());
      return true;
    }
    if (method === "POST" && url.pathname === "/api/rekyc/session") {
      const created = createSession(loadState(), now);
      saveState(created.state);
      sendJson(res, 201, { session: created.session });
      return true;
    }
    if (method === "POST" && url.pathname === "/api/rekyc/face") {
      const body = JSON.parse((await readBody(req)) || "{}") as { sessionId?: string; mode?: FaceMode };
      const mode = body.mode ?? loadState().scenario.face;
      if (!body.sessionId) throw new StoreError("sessionId is required");
      const result = recordFace(loadState(), body.sessionId, mode);
      saveState(result.state);
      sendJson(res, 200, { decision: result.decision });
      return true;
    }
    if (method === "POST" && url.pathname === "/api/rekyc/ktp") {
      const body = JSON.parse((await readBody(req)) || "{}") as { sessionId?: string };
      if (!body.sessionId) throw new StoreError("sessionId is required");
      sendJson(res, 200, { decision: previewCapture(loadState(), body.sessionId) });
      return true;
    }
    if (method === "POST" && url.pathname === "/api/rekyc/edd") {
      const body = JSON.parse((await readBody(req)) || "{}") as {
        sessionId?: string;
        sourceOfIncome?: string;
        upgradePurpose?: string;
      };
      if (!body.sessionId || !body.sourceOfIncome || !body.upgradePurpose) {
        throw new StoreError("sessionId, sourceOfIncome, and upgradePurpose are required");
      }
      saveState(
        completeEdd(loadState(), body.sessionId, {
          sourceOfIncome: body.sourceOfIncome,
          upgradePurpose: body.upgradePurpose,
        }),
      );
      sendJson(res, 200, { ok: true });
      return true;
    }
    if (method === "POST" && url.pathname === "/api/rekyc/decide") {
      const body = JSON.parse((await readBody(req)) || "{}") as { sessionId?: string };
      if (!body.sessionId) throw new StoreError("sessionId is required");
      const result = decide(loadState(), body.sessionId, now);
      saveState(result.state);
      sendJson(res, 200, { decision: result.decision, account: accountView() });
      return true;
    }
    if (method === "POST" && url.pathname === "/api/odd/confirm") {
      saveState(confirmOdd(loadState(), now));
      sendJson(res, 200, accountView());
      return true;
    }
    if (method === "GET" && url.pathname === "/api/partner/callbacks") {
      const callbacks = loadState().callbacks.map((callback) => ({
        ...callback,
        payload: callbackPayload(callback),
      }));
      sendJson(res, 200, { callbacks });
      return true;
    }
    if (method === "GET" && url.pathname === "/api/partner/identity") {
      sendJson(res, 200, partnerIdentityView(loadState()));
      return true;
    }
    if (method === "POST" && url.pathname === "/api/agent/status") {
      const body = JSON.parse((await readBody(req)) || "{}") as {
        submissionId?: string;
        status?: SubmissionStatus;
      };
      if (!body.submissionId || !body.status) throw new StoreError("submissionId and status are required");
      saveState(agentSetStatus(loadState(), body.submissionId, body.status, now));
      sendJson(res, 200, { submissions: loadState().submissions });
      return true;
    }
    sendJson(res, 404, { error: "Not found" });
    return true;
  } catch (error) {
    if (error instanceof StoreError) {
      sendJson(res, 409, { error: error.message });
      return true;
    }
    const message = error instanceof Error ? error.message : "Request failed";
    sendJson(res, 400, { error: message });
    return true;
  }
}

function attach(middlewares: { use: (fn: (req: IncomingMessage, res: ServerResponse, next: () => void) => void) => void }) {
  middlewares.use((req, res, next) => {
    void handle(req, res).then((handled) => {
      if (!handled) next();
    });
  });
}

export function rekycApiPlugin(): Plugin {
  return {
    name: "rekyc-api",
    configureServer(server) {
      attach(server.middlewares);
    },
    configurePreviewServer(server) {
      attach(server.middlewares);
    },
  };
}
