import type { RiskTier } from "./types";

export const OCR_THRESHOLD = 0.8;
export const DUKCAPIL_THRESHOLD = 0.85;
export const FACE_MAX_ATTEMPTS = 5;
export const SLOW_SESSION_MS = 5 * 60 * 1000;
export const SESSION_EXPIRE_MS = 24 * 60 * 60 * 1000;
export const ODD_INTERVAL_DAYS: Record<RiskTier, number> = {
  low: 365,
  medium: 180,
  high: 90,
};

export type RetryReason =
  | "upload_failed"
  | "photo_unclear"
  | "not_aligned"
  | "detect_timeout"
  | "unreadable";

export type CaptureDecision =
  | { outcome: "reject"; reason: "session_expired" | "rekyc_id_mismatch" | "dukcapil_not_verified" }
  | { outcome: "pending_timeout" }
  | { outcome: "retry"; reason: RetryReason }
  | { outcome: "pending_manual_review"; reason: "ocr_low_confidence" }
  | { outcome: "needs_edd" }
  | { outcome: "approve"; reusedDukcapilCache: boolean; documentExpiring: boolean };

export type CaptureInput = {
  sessionAgeMs: number;
  uploadSuccessful: boolean;
  photoClear: boolean;
  aligned: boolean;
  detectedWithin15s: boolean;
  readable: boolean;
  nikMatches: boolean;
  ocrConfidence: number;
  /** Produced in this session. Prior-session scores are not an input. */
  nameScreenHit: boolean;
  freshRiskTier: RiskTier;
  eddComplete: boolean;
  dukcapilConfidence: number;
  dukcapilVerified: boolean;
  documentExpiring: boolean;
};

export type FaceDecision =
  | { outcome: "passed" }
  | { outcome: "retry"; attemptsLeft: number }
  | { outcome: "lockout"; retryAfterHours: number };

export function checkSessionWindow(ageMs: number): "ok" | "slow" | "expired" {
  if (ageMs >= SESSION_EXPIRE_MS) return "expired";
  if (ageMs >= SLOW_SESSION_MS) return "slow";
  return "ok";
}

export function checkUpload(ok: boolean): "ok" | "failed" {
  return ok ? "ok" : "failed";
}

export function checkPhotoClear(ok: boolean): "ok" | "unclear" {
  return ok ? "ok" : "unclear";
}

export function checkAlignment(ok: boolean): "ok" | "misaligned" {
  return ok ? "ok" : "misaligned";
}

export function checkDetection(within15s: boolean): "ok" | "timeout" {
  return within15s ? "ok" : "timeout";
}

export function checkReadable(ok: boolean): "ok" | "unreadable" {
  return ok ? "ok" : "unreadable";
}

export function checkNik(matches: boolean): "match" | "mismatch" {
  return matches ? "match" : "mismatch";
}

export function checkOcr(confidence: number): "sufficient" | "low" {
  return confidence >= OCR_THRESHOLD ? "sufficient" : "low";
}

export function screenName(hit: boolean, freshRiskTier: RiskTier): RiskTier {
  return hit ? "high" : freshRiskTier;
}

export function checkRisk(tier: RiskTier): "standard" | "high" {
  return tier === "high" ? "high" : "standard";
}

export function checkDukcapil(
  confidence: number,
  verified: boolean,
): "use_cache" | "rerun_verified" | "rerun_rejected" {
  if (confidence >= DUKCAPIL_THRESHOLD) return "use_cache";
  return verified ? "rerun_verified" : "rerun_rejected";
}

export function checkDocumentExpiry(expiring: boolean): "current" | "expiring" {
  return expiring ? "expiring" : "current";
}

export function evaluateFace(priorFailures: number, mode: "pass" | "fail" | "lockout"): FaceDecision {
  if (mode === "lockout") return { outcome: "lockout", retryAfterHours: 24 };
  if (mode === "pass") return { outcome: "passed" };
  const failures = priorFailures + 1;
  if (failures >= FACE_MAX_ATTEMPTS) return { outcome: "lockout", retryAfterHours: 24 };
  return { outcome: "retry", attemptsLeft: FACE_MAX_ATTEMPTS - failures };
}

/**
 * Walks the Figma condition diamonds in order. A NIK mismatch returns before
 * Dukcapil is considered, and name screening only sees this session's score.
 */
export function evaluateCapture(input: CaptureInput): CaptureDecision {
  const session = checkSessionWindow(input.sessionAgeMs);
  if (session === "expired") return { outcome: "reject", reason: "session_expired" };
  if (session === "slow") return { outcome: "pending_timeout" };

  if (checkUpload(input.uploadSuccessful) === "failed") {
    return { outcome: "retry", reason: "upload_failed" };
  }
  if (checkPhotoClear(input.photoClear) === "unclear") {
    return { outcome: "retry", reason: "photo_unclear" };
  }
  if (checkAlignment(input.aligned) === "misaligned") {
    return { outcome: "retry", reason: "not_aligned" };
  }
  if (checkDetection(input.detectedWithin15s) === "timeout") {
    return { outcome: "retry", reason: "detect_timeout" };
  }
  if (checkReadable(input.readable) === "unreadable") {
    return { outcome: "retry", reason: "unreadable" };
  }
  if (checkNik(input.nikMatches) === "mismatch") {
    return { outcome: "reject", reason: "rekyc_id_mismatch" };
  }
  if (checkOcr(input.ocrConfidence) === "low") {
    return { outcome: "pending_manual_review", reason: "ocr_low_confidence" };
  }

  const tier = screenName(input.nameScreenHit, input.freshRiskTier);
  if (checkRisk(tier) === "high" && !input.eddComplete) {
    return { outcome: "needs_edd" };
  }

  const dukcapil = checkDukcapil(input.dukcapilConfidence, input.dukcapilVerified);
  if (dukcapil === "rerun_rejected") {
    return { outcome: "reject", reason: "dukcapil_not_verified" };
  }

  const document = checkDocumentExpiry(input.documentExpiring);
  return {
    outcome: "approve",
    reusedDukcapilCache: dukcapil === "use_cache",
    documentExpiring: document === "expiring",
  };
}
