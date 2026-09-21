import {
  DUKCAPIL_THRESHOLD,
  FACE_MAX_ATTEMPTS,
  checkDetection,
  checkDocumentExpiry,
  checkDukcapil,
  checkNik,
  checkOcr,
  checkPhotoClear,
  checkReadable,
  checkSessionWindow,
  checkUpload,
  evaluateCapture,
  evaluateFace,
  screenName,
  type CaptureInput,
} from "../domain/decision";

const happy: CaptureInput = {
  sessionAgeMs: 0,
  uploadSuccessful: true,
  photoClear: true,
  aligned: true,
  detectedWithin15s: true,
  readable: true,
  nikMatches: true,
  ocrConfidence: 0.96,
  nameScreenHit: false,
  freshRiskTier: "low",
  eddComplete: false,
  dukcapilConfidence: 0.93,
  dukcapilVerified: false,
  documentExpiring: false,
};

describe("decision diamonds", () => {
  it("classifies session age, upload, photo, alignment, detection, and readability", () => {
    expect(checkSessionWindow(0)).toBe("ok");
    expect(checkSessionWindow(5 * 60 * 1000)).toBe("slow");
    expect(checkSessionWindow(24 * 60 * 60 * 1000)).toBe("expired");
    expect(checkUpload(false)).toBe("failed");
    expect(checkPhotoClear(false)).toBe("unclear");
    expect(checkDetection(false)).toBe("timeout");
    expect(checkReadable(false)).toBe("unreadable");
    expect(checkDocumentExpiry(true)).toBe("expiring");
  });

  it("rejects a NIK mismatch before Dukcapil runs", () => {
    const decision = evaluateCapture({
      ...happy,
      nikMatches: false,
      dukcapilVerified: false,
      dukcapilConfidence: 0.1,
    });
    expect(checkNik(false)).toBe("mismatch");
    expect(decision).toEqual({ outcome: "reject", reason: "rekyc_id_mismatch" });
  });

  it("sends low OCR confidence to manual review", () => {
    expect(checkOcr(DUKCAPIL_THRESHOLD - 0.1)).toBe("low");
    expect(evaluateCapture({ ...happy, ocrConfidence: 0.42 })).toEqual({
      outcome: "pending_manual_review",
      reason: "ocr_low_confidence",
    });
  });

  it("screens the name from this session and gates EDD on high risk", () => {
    expect(screenName(true, "low")).toBe("high");
    expect(screenName(false, "low")).toBe("low");
    expect(evaluateCapture({ ...happy, nameScreenHit: true })).toEqual({ outcome: "needs_edd" });
    expect(evaluateCapture({ ...happy, nameScreenHit: true, eddComplete: true }).outcome).toBe("approve");
  });

  it("reuses a confident Dukcapil cache and re-runs when confidence is low", () => {
    expect(checkDukcapil(DUKCAPIL_THRESHOLD, false)).toBe("use_cache");
    expect(checkDukcapil(0.4, true)).toBe("rerun_verified");
    expect(checkDukcapil(0.4, false)).toBe("rerun_rejected");
    expect(evaluateCapture(happy)).toMatchObject({ outcome: "approve", reusedDukcapilCache: true });
    expect(evaluateCapture({ ...happy, dukcapilConfidence: 0.4, dukcapilVerified: true })).toMatchObject({
      outcome: "approve",
      reusedDukcapilCache: false,
    });
    expect(evaluateCapture({ ...happy, dukcapilConfidence: 0.4, dukcapilVerified: false })).toEqual({
      outcome: "reject",
      reason: "dukcapil_not_verified",
    });
  });

  it("stops on expiry, a slow session, and capture retries", () => {
    expect(evaluateCapture({ ...happy, sessionAgeMs: 24 * 60 * 60 * 1000 }).outcome).toBe("reject");
    expect(evaluateCapture({ ...happy, sessionAgeMs: 5 * 60 * 1000 })).toEqual({ outcome: "pending_timeout" });
    expect(evaluateCapture({ ...happy, uploadSuccessful: false })).toEqual({ outcome: "retry", reason: "upload_failed" });
    expect(evaluateCapture({ ...happy, aligned: false })).toEqual({ outcome: "retry", reason: "not_aligned" });
    expect(evaluateCapture({ ...happy, documentExpiring: true })).toMatchObject({ documentExpiring: true });
  });

  it("locks face verification after the attempt budget", () => {
    expect(evaluateFace(0, "pass")).toEqual({ outcome: "passed" });
    expect(evaluateFace(0, "fail")).toEqual({ outcome: "retry", attemptsLeft: FACE_MAX_ATTEMPTS - 1 });
    expect(evaluateFace(FACE_MAX_ATTEMPTS - 1, "fail").outcome).toBe("lockout");
    expect(evaluateFace(0, "lockout").outcome).toBe("lockout");
  });
});
