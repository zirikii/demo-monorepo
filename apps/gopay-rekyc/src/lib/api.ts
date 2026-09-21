import type { CaptureDecision, FaceDecision } from "../domain/decision";
import type {
  Account,
  EktpData,
  PartnerCallback,
  PartnerCallbackPayload,
  RiskTier,
  Scenario,
  Session,
  Submission,
} from "../domain/types";
import type { MaskedEktp } from "./mask";

export type AccountResponse = {
  account: Account;
  identity: EktpData | null;
  masked: MaskedEktp | null;
  riskTier: RiskTier | null;
  submissions: Submission[];
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(body.error ?? response.statusText);
  }
  return body;
}

export function getAccount() {
  return request<AccountResponse>("/api/account");
}

export function getScenario() {
  return request<{ scenario: Scenario }>("/api/scenario");
}

export function saveScenario(scenario: Scenario) {
  return request<{ scenario: Scenario }>("/api/scenario", {
    method: "PUT",
    body: JSON.stringify(scenario),
  });
}

export function resetDemo() {
  return request<AccountResponse>("/api/dev/reset", { method: "POST" });
}

export function startSession() {
  return request<{ session: Session }>("/api/rekyc/session", { method: "POST" });
}

export function submitFace(sessionId: string) {
  return request<{ decision: FaceDecision }>("/api/rekyc/face", {
    method: "POST",
    body: JSON.stringify({ sessionId }),
  });
}

export function submitKtp(sessionId: string) {
  return request<{ decision: CaptureDecision }>("/api/rekyc/ktp", {
    method: "POST",
    body: JSON.stringify({ sessionId }),
  });
}

export function submitEdd(sessionId: string, sourceOfIncome: string, upgradePurpose: string) {
  return request<{ ok: boolean }>("/api/rekyc/edd", {
    method: "POST",
    body: JSON.stringify({ sessionId, sourceOfIncome, upgradePurpose }),
  });
}

export function decideSession(sessionId: string) {
  return request<{ decision: CaptureDecision; account: AccountResponse }>("/api/rekyc/decide", {
    method: "POST",
    body: JSON.stringify({ sessionId }),
  });
}

export function confirmOdd() {
  return request<AccountResponse>("/api/odd/confirm", { method: "POST" });
}

export function getCallbacks() {
  return request<{ callbacks: Array<PartnerCallback & { payload: PartnerCallbackPayload }> }>(
    "/api/partner/callbacks",
  );
}
