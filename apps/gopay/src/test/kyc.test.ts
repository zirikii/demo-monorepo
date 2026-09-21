import { describe, expect, it } from "vitest";
import { ON_FILE, UPDATED_KTP, MISMATCH_NIK } from "@/data/identity";
import {
  activeIdentity,
  agentSetStatus,
  confirmUnchanged,
  createSeedAccount,
  editSubmissionData,
  pullApproved,
  recordCapture,
} from "@/lib/kyc";

const now = new Date("2026-09-21T00:00:00.000Z");

describe("reKYC submissions", () => {
  it("confirms unchanged data without a new submission", () => {
    const seed = createSeedAccount(now);
    const due = seed.oddDueAt;
    const result = confirmUnchanged(seed, now);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.submissions).toHaveLength(1);
    expect(result.value.oddDueAt).not.toBe(due);
    expect(activeIdentity(result.value)?.address).toBe(ON_FILE.address);
  });

  it("approves a new row and supersedes the previous approval together", () => {
    const seed = createSeedAccount(now);
    const result = recordCapture(seed, {
      data: UPDATED_KTP,
      riskScore: 18,
      outcome: "approved",
      now,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const approved = result.value.submissions.filter((item) => item.status === "approved");
    expect(approved).toHaveLength(1);
    expect(approved[0]?.type).toBe("rekyc");
    expect(approved[0]?.data.address).toBe(UPDATED_KTP.address);
    expect(approved[0]?.selfieReusedFromFr).toBe(true);
    const previous = result.value.submissions.find((item) => item.type === "kyc");
    expect(previous?.status).toBe("rejected");
    expect(previous?.reason).toBe("superseded_by_newer_approval");
    expect(result.value.kycStatus).toBe("approved");
    expect(result.value.partnerEvents.map((item) => item.event)).toEqual([
      "rekyc_approval_revoked",
      "rekyc_approved",
    ]);
    expect(pullApproved(result.value).data?.maritalStatus).toBe("Married");
    expect("nik" in (result.value.partnerEvents[0] ?? {})).toBe(false);
  });

  it("rejects a NIK mismatch locally and leaves the account alone", () => {
    const seed = createSeedAccount(now);
    const result = recordCapture(seed, {
      data: { ...UPDATED_KTP, nik: MISMATCH_NIK },
      riskScore: 10,
      outcome: "approved",
      now,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const attempt = result.value.submissions.at(-1);
    expect(attempt?.status).toBe("rejected");
    expect(attempt?.reason).toBe("rekyc_id_mismatch");
    expect(result.value.kycStatus).toBe("approved");
    expect(result.value.oddDueAt).toBe(seed.oddDueAt);
    expect(pullApproved(result.value).data?.nik).toBe(ON_FILE.nik);
    expect(result.value.partnerEvents).toHaveLength(0);
  });

  it("keeps a pending review from changing the live record", () => {
    const seed = createSeedAccount(now);
    const result = recordCapture(seed, {
      data: UPDATED_KTP,
      riskScore: 30,
      outcome: "pending",
      now,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.submissions.at(-1)?.status).toBe("pending");
    expect(activeIdentity(result.value)?.address).toBe(ON_FILE.address);
  });

  it("does not downgrade when Dukcapil rejects", () => {
    const seed = createSeedAccount(now);
    const result = recordCapture(seed, {
      data: UPDATED_KTP,
      riskScore: 35,
      outcome: "dukcapil-fail",
      now,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.submissions.at(-1)?.reason).toBe("dukcapil_not_verified");
    expect(result.value.kycStatus).toBe("approved");
  });

  it("refuses edits to a stored submission", () => {
    const seed = createSeedAccount(now);
    const id = seed.submissions[0]?.id ?? "";
    expect(editSubmissionData(seed, id, UPDATED_KTP)).toEqual({
      ok: false,
      error: "submission_immutable",
    });
  });

  it("blocks a second approval until the live one is rejected", () => {
    const seed = createSeedAccount(now);
    const pending = recordCapture(seed, {
      data: UPDATED_KTP,
      riskScore: 30,
      outcome: "pending",
      now,
    });
    expect(pending.ok).toBe(true);
    if (!pending.ok) return;
    const id = pending.value.submissions.at(-1)?.id ?? "";
    const blocked = agentSetStatus(pending.value, id, "approved", now);
    expect(blocked).toEqual({ ok: false, error: "already_approved" });

    const live = pending.value.submissions.find((item) => item.status === "approved");
    const rejected = agentSetStatus(pending.value, live?.id ?? "", "rejected", now);
    expect(rejected.ok).toBe(true);
    if (!rejected.ok) return;
    expect(rejected.value.kycStatus).toBe("downgraded");
    expect(pullApproved(rejected.value).data).toBeNull();

    const restored = agentSetStatus(rejected.value, id, "approved", now);
    expect(restored.ok).toBe(true);
    if (!restored.ok) return;
    expect(restored.value.kycStatus).toBe("approved");
    expect(pullApproved(restored.value).data?.address).toBe(UPDATED_KTP.address);
  });
});
