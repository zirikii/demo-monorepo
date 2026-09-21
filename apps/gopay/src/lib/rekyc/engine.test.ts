import { describe, expect, it } from "vitest";
import { initialRekycState, ON_FILE_KTP, OTHER_PERSON_KTP, UPDATED_KTP } from "@/data/account";
import {
  accountRiskTier,
  addDays,
  approvedSubmission,
  canStartRekyc,
  dataInUse,
  LINKED_PARTNERS,
  ODD_INTERVAL_DAYS,
  overrideDecision,
  pendingSubmission,
  pullApiResponse,
  riskTierFor,
  runVerification,
  type VerificationInput,
} from "@/lib/rekyc/engine";
import type { RekycState } from "@/lib/rekyc/types";

const NOW = "2026-01-15T00:00:00.000Z";

function input(overrides: Partial<VerificationInput> = {}): VerificationInput {
  return {
    state: initialRekycState(),
    capturedData: UPDATED_KTP,
    faceMatchPassed: true,
    ocrConfidence: 0.93,
    dukcapilConfidence: 0.95,
    dukcapilVerified: true,
    nameScreeningCleared: true,
    riskScore: 24,
    eddAnswers: null,
    now: NOW,
    submissionId: "sub_test",
    ...overrides,
  };
}

describe("riskTierFor", () => {
  it.each([
    [0, "low"],
    [39, "low"],
    [40, "medium"],
    [69, "medium"],
    [70, "high"],
    [100, "high"],
  ])("scores %i as %s", (score, tier) => {
    expect(riskTierFor(score)).toBe(tier);
  });
});

describe("runVerification", () => {
  it("approves a matching card and supersedes the previous submission", () => {
    const outcome = runVerification(input());

    expect(outcome.kind).toBe("approved");
    if (outcome.kind !== "approved") return;

    const approved = approvedSubmission(outcome.state);
    expect(approved?.id).toBe("sub_test");
    expect(approved?.type).toBe("reverification");
    expect(dataInUse(outcome.state)).toEqual(UPDATED_KTP);

    const superseded = outcome.state.submissions.find((s) => s.id === "sub_2023_0417");
    expect(superseded?.status).toBe("rejected");
    expect(superseded?.rejectionReason).toBe("superseded_by_newer_approval");
    expect(outcome.state.submissions).toHaveLength(2);
  });

  it("resets the review date from the newly assessed tier and notifies partners", () => {
    const outcome = runVerification(input({ riskScore: 55 }));
    expect(outcome.kind).toBe("approved");
    if (outcome.kind !== "approved") return;

    expect(accountRiskTier(outcome.state)).toBe("medium");
    expect(outcome.state.account.oddIntervalDays).toBe(ODD_INTERVAL_DAYS.medium);
    expect(outcome.state.account.oddDueAt).toBe(addDays(NOW, ODD_INTERVAL_DAYS.medium));
    expect(outcome.state.notifications).toHaveLength(LINKED_PARTNERS.length);
    expect(outcome.state.notifications.every((n) => n.event === "reverification.approved")).toBe(
      true,
    );
  });

  it("rejects a mismatched NIK and leaves the account untouched", () => {
    const before = initialRekycState();
    const outcome = runVerification(input({ state: before, capturedData: OTHER_PERSON_KTP }));

    expect(outcome.kind).toBe("rejected");
    if (outcome.kind !== "rejected") return;

    expect(outcome.reason).toBe("rekyc_id_mismatch");
    expect(outcome.state.account).toEqual(before.account);
    expect(dataInUse(outcome.state)).toEqual(ON_FILE_KTP);
    expect(outcome.state.notifications).toHaveLength(0);
  });

  it("rejects a failed face check before any data is compared", () => {
    const outcome = runVerification(
      input({ faceMatchPassed: false, capturedData: OTHER_PERSON_KTP }),
    );

    expect(outcome.kind).toBe("rejected");
    if (outcome.kind !== "rejected") return;
    expect(outcome.reason).toBe("rekyc_face_verification_failed");
  });

  it("queues low-confidence OCR for manual review without deciding", () => {
    const outcome = runVerification(input({ ocrConfidence: 0.58 }));

    expect(outcome.kind).toBe("pending_review");
    if (outcome.kind !== "pending_review") return;

    expect(outcome.submission.decidedAt).toBeNull();
    expect(pendingSubmission(outcome.state)?.id).toBe("sub_test");
    // The previously approved record is still the one in use.
    expect(dataInUse(outcome.state)).toEqual(ON_FILE_KTP);
  });

  it("asks for EDD before deciding a high-risk profile, then approves with answers", () => {
    const gate = runVerification(input({ riskScore: 82 }));
    expect(gate).toEqual({ kind: "edd_required", riskTier: "high" });

    const answered = runVerification(
      input({
        riskScore: 82,
        eddAnswers: { sourceOfIncome: "Salary", upgradePurpose: "Bill payment" },
      }),
    );
    expect(answered.kind).toBe("approved");
    if (answered.kind !== "approved") return;
    expect(answered.submission.eddAnswers?.sourceOfIncome).toBe("Salary");
    expect(answered.state.account.oddIntervalDays).toBe(ODD_INTERVAL_DAYS.high);
  });

  it("reuses a high-confidence Dukcapil cache instead of re-running verification", () => {
    const outcome = runVerification(input({ dukcapilConfidence: 0.95, dukcapilVerified: false }));
    expect(outcome.kind).toBe("approved");
  });

  it("rejects when the cache is stale and the re-run does not verify", () => {
    const outcome = runVerification(input({ dukcapilConfidence: 0.62, dukcapilVerified: false }));

    expect(outcome.kind).toBe("rejected");
    if (outcome.kind !== "rejected") return;
    expect(outcome.reason).toBe("rekyc_dukcapil_unverified");
  });
});

describe("overrideDecision", () => {
  function withPending(): RekycState {
    const outcome = runVerification(input({ ocrConfidence: 0.4 }));
    if (outcome.kind !== "pending_review") throw new Error("expected pending_review");
    return outcome.state;
  }

  it("promotes a queued submission and supersedes the live one", () => {
    const next = overrideDecision(withPending(), "sub_test", "approved", NOW);

    expect(approvedSubmission(next)?.id).toBe("sub_test");
    expect(dataInUse(next)).toEqual(UPDATED_KTP);
    expect(next.submissions).toHaveLength(2);
    expect(next.notifications).toHaveLength(LINKED_PARTNERS.length);
  });

  it("downgrades the account when the approved submission is rejected", () => {
    const next = overrideDecision(initialRekycState(), "sub_2023_0417", "rejected", NOW);

    expect(next.account.kycStatus).toBe("downgraded");
    expect(approvedSubmission(next)).toBeNull();
    expect(canStartRekyc(next)).toBe(false);
    expect(next.notifications.every((n) => n.event === "reverification.revoked")).toBe(true);
  });

  it("is a no-op when the submission already has the target status", () => {
    const before = initialRekycState();
    expect(overrideDecision(before, "sub_2023_0417", "approved", NOW)).toBe(before);
  });
});

describe("pullApiResponse", () => {
  it("returns the approved submission's data", () => {
    expect(pullApiResponse(initialRekycState())).toEqual({ status: "ok", data: ON_FILE_KTP });
  });

  it("reports no data once the account is downgraded", () => {
    const downgraded = overrideDecision(initialRekycState(), "sub_2023_0417", "rejected", NOW);
    expect(pullApiResponse(downgraded)).toEqual({ status: "no_data" });
  });
});
