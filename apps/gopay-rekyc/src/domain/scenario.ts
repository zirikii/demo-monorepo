import type { CaptureInput } from "./decision";
import { defaultScenario } from "./seed";
import type { Scenario } from "./types";

const FIVE_MIN_MS = 5 * 60 * 1000 + 1;
const DAY_MS = 24 * 60 * 60 * 1000 + 1;

export function scenarioToCapture(scenario: Scenario, eddComplete: boolean): CaptureInput {
  const sessionAgeMs =
    scenario.sessionExpiry === "twenty_four_h"
      ? DAY_MS
      : scenario.sessionExpiry === "five_min"
        ? FIVE_MIN_MS
        : 0;

  return {
    sessionAgeMs,
    uploadSuccessful: scenario.uploadSuccessful,
    photoClear: scenario.photoClear,
    aligned: scenario.ktpAligned,
    detectedWithin15s: scenario.detectedWithin15s,
    readable: scenario.ktpReadable,
    nikMatches: scenario.nikMatches,
    ocrConfidence: scenario.ocrConfidence === "high" ? 0.96 : 0.42,
    nameScreenHit: scenario.highRisk,
    freshRiskTier: "low",
    eddComplete,
    dukcapilConfidence: scenario.dukcapil === "cache_hit" ? 0.93 : 0.4,
    dukcapilVerified: scenario.dukcapil === "verified",
    documentExpiring: scenario.ektpExpiring,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function sanitizeScenario(value: unknown): Scenario {
  const source = isRecord(value) ? value : {};
  const base: Scenario = { ...defaultScenario };
  if (source.face === "pass" || source.face === "fail" || source.face === "lockout") {
    base.face = source.face;
  }
  if (source.ocrConfidence === "high" || source.ocrConfidence === "low") {
    base.ocrConfidence = source.ocrConfidence;
  }
  if (source.dukcapil === "cache_hit" || source.dukcapil === "verified" || source.dukcapil === "not_verified") {
    base.dukcapil = source.dukcapil;
  }
  if (source.sessionExpiry === "none" || source.sessionExpiry === "five_min" || source.sessionExpiry === "twenty_four_h") {
    base.sessionExpiry = source.sessionExpiry;
  }
  const flags = [
    "photoClear",
    "ktpAligned",
    "ktpReadable",
    "detectedWithin15s",
    "nikMatches",
    "highRisk",
    "uploadSuccessful",
    "ektpExpiring",
  ] as const;
  for (const flag of flags) {
    if (typeof source[flag] === "boolean") base[flag] = source[flag];
  }
  return base;
}
