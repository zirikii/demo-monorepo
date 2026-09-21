import { DEMO_IDENTITY } from "../domain/seed";
import { createSeedState } from "../domain/seed";
import {
  StoreError,
  accountRiskTier,
  agentSetStatus,
  assertNoExistingApproval,
  callbackPayload,
  completeEdd,
  confirmOdd,
  createSession,
  decide,
  partnerIdentityView,
  recordFace,
  setScenario,
  updateSubmissionData,
} from "../domain/store";
import type { State } from "../domain/types";

const NOW = "2026-09-21T12:00:00.000Z";

function ready(state: State = createSeedState()) {
  const created = createSession(state, NOW);
  const faced = recordFace(created.state, created.session.id, "pass");
  return { state: faced.state, sessionId: created.session.id };
}

describe("submission store", () => {
  it("keeps one immutable submission per attempt and one approval", () => {
    const seed = createSeedState();
    expect(seed.submissions).toHaveLength(1);
    expect(accountRiskTier(seed)).toBe("low");
    expect(() => updateSubmissionData()).toThrow(StoreError);
    expect(() => assertNoExistingApproval(seed.submissions)).toThrow(/another submission is approved/);

    const opened = createSession(seed, NOW);
    expect(opened.state.submissions).toHaveLength(1);
  });

  it("supersedes the previous approval in the same write", () => {
    const { state, sessionId } = ready();
    const previous = state.submissions.find((submission) => submission.status === "approved");
    const result = decide(state, sessionId, NOW);
    expect(result.decision.outcome).toBe("approve");
    const approved = result.state.submissions.filter((submission) => submission.status === "approved");
    expect(approved).toHaveLength(1);
    expect(approved[0]?.identity.address).toBe("Jl. Margasatawa Baru No. 88");
    expect(approved[0]?.type).toBe("reverification");
    const superseded = result.state.submissions.find((submission) => submission.id === previous?.id);
    expect(superseded?.status).toBe("rejected");
    expect(superseded?.rejectionReason).toBe("superseded_by_newer_approval");
    expect(result.state.account.kycStatus).toBe("approved");
    expect(accountRiskTier(result.state)).toBe("low");
  });

  it("leaves the account untouched when reKYC is rejected", () => {
    const opened = ready();
    const state = setScenario(opened.state, { ...opened.state.scenario, nikMatches: false });
    const before = {
      kyc: state.account.kycStatus,
      odd: state.account.oddDueAt,
      nik: state.submissions.find((submission) => submission.status === "approved")?.identity.nik,
    };
    const result = decide(state, opened.sessionId, NOW);
    expect(result.decision).toEqual({ outcome: "reject", reason: "rekyc_id_mismatch" });
    expect(result.state.account.kycStatus).toBe(before.kyc);
    expect(result.state.account.oddDueAt).toBe(before.odd);
    expect(result.state.submissions.find((submission) => submission.status === "approved")?.identity.nik).toBe(before.nik);
    expect(result.state.callbacks).toHaveLength(0);
    expect(partnerIdentityView(result.state).data).toEqual(DEMO_IDENTITY);
  });

  it("stores the fresh risk tier on the submission and requires EDD when it is high", () => {
    const opened = ready();
    const high = setScenario(opened.state, { ...opened.state.scenario, highRisk: true });
    expect(decide(high, opened.sessionId, NOW).decision).toEqual({ outcome: "needs_edd" });
    const answered = completeEdd(high, opened.sessionId, {
      sourceOfIncome: "Salary",
      upgradePurpose: "GoPay Pinjam",
    });
    const result = decide(answered, opened.sessionId, NOW);
    expect(result.decision.outcome).toBe("approve");
    const approved = result.state.submissions.find((submission) => submission.status === "approved");
    expect(approved?.riskTier).toBe("high");
    expect(approved?.riskScore).toBe(88);
    expect(result.state.account.oddIntervalDays).toBe(90);
    expect(accountRiskTier(result.state)).toBe("high");
  });

  it("downgrades when the approved submission is rejected and restores on a later approval", () => {
    const seed = createSeedState();
    const downgraded = agentSetStatus(seed, "sub_0001", "rejected", NOW);
    expect(downgraded.account.kycStatus).toBe("downgraded");
    expect(downgraded.submissions).toHaveLength(1);
    expect(accountRiskTier(downgraded)).toBeNull();
    expect(partnerIdentityView(downgraded).data).toBeNull();
    expect(() => createSession(downgraded, NOW)).toThrow(/KYC status is approved/);

    const restored = agentSetStatus(downgraded, "sub_0001", "approved", NOW);
    expect(restored.submissions).toHaveLength(1);
    expect(restored.account.kycStatus).toBe("approved");
    expect(accountRiskTier(restored)).toBe("low");
  });

  it("notifies partners with account id, event, and timestamp only", () => {
    const { state, sessionId } = ready();
    const result = decide(state, sessionId, NOW);
    expect(result.state.callbacks.map((callback) => callback.partner)).toEqual(["SNI", "Merchant", "Pinjam", "Driver"]);
    for (const callback of result.state.callbacks) {
      const payload = callbackPayload(callback);
      expect(Object.keys(payload).sort()).toEqual(["accountId", "event", "timestamp"]);
      expect(JSON.stringify(payload)).not.toContain(DEMO_IDENTITY.nik);
      expect(JSON.stringify(payload)).not.toContain(DEMO_IDENTITY.fullName);
    }
  });

  it("confirms unchanged data without a new submission", () => {
    const seed = createSeedState();
    const confirmed = confirmOdd(seed, NOW);
    expect(confirmed.submissions).toHaveLength(seed.submissions.length);
    expect(confirmed.account.kycStatus).toBe("approved");
    expect(confirmed.account.oddDueAt).not.toBe(seed.account.oddDueAt);
  });

  it("rejects a system supersede reason chosen by an agent", () => {
    const seed = createSeedState();
    expect(() => agentSetStatus(seed, "sub_0001", "rejected", NOW, "superseded_by_newer_approval")).toThrow(/system-set/);
  });
});
