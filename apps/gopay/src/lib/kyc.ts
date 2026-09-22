import { ACCOUNT_ID, ON_FILE, type Identity } from "@/data/identity";

export type RiskTier = "low" | "medium" | "high";
export type SubmissionStatus = "approved" | "rejected" | "pending";
export type SubmissionType = "kyc" | "rekyc";

export type RejectionReason =
  | "rekyc_id_mismatch"
  | "dukcapil_not_verified"
  | "superseded_by_newer_approval"
  | "fr_failed";

export type PartnerEventName = "rekyc_approved" | "rekyc_approval_revoked";

export interface Submission {
  id: string;
  accountId: string;
  type: SubmissionType;
  status: SubmissionStatus;
  reason: RejectionReason | null;
  data: Identity;
  riskScore: number;
  riskTier: RiskTier;
  createdAt: string;
  selfieReusedFromFr: boolean;
}

export interface PartnerEvent {
  accountId: string;
  event: PartnerEventName;
  submissionId: string;
  at: string;
  reason: RejectionReason | null;
}

export interface AccountState {
  accountId: string;
  kycStatus: "approved" | "downgraded";
  submissions: Submission[];
  oddDueAt: string;
  oddConfirmedAt: string | null;
  partnerEvents: PartnerEvent[];
  nextSeq: number;
}

export type KycError =
  | "rekyc_requires_approved_kyc"
  | "already_approved"
  | "submission_immutable"
  | "not_found";

export type KycResult<T> = { ok: true; value: T } | { ok: false; error: KycError };

const INITIAL_KYC_ID = "sub-kyc-1";

export function oddMonths(tier: RiskTier): number {
  switch (tier) {
    case "low":
      return 24;
    case "medium":
      return 12;
    case "high":
      return 6;
    default: {
      const unreachable: never = tier;
      return unreachable;
    }
  }
}

export function addMonths(from: Date, months: number): Date {
  const next = new Date(from.getTime());
  next.setMonth(next.getMonth() + months);
  return next;
}

export function tierForScore(score: number): RiskTier {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

export function createSeedAccount(now: Date): AccountState {
  const submission: Submission = {
    id: INITIAL_KYC_ID,
    accountId: ACCOUNT_ID,
    type: "kyc",
    status: "approved",
    reason: null,
    data: ON_FILE,
    riskScore: 22,
    riskTier: "low",
    createdAt: "2024-03-12T02:10:00.000Z",
    selfieReusedFromFr: false,
  };
  return {
    accountId: ACCOUNT_ID,
    kycStatus: "approved",
    submissions: [submission],
    oddDueAt: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    oddConfirmedAt: null,
    partnerEvents: [],
    nextSeq: 2,
  };
}

export function approvedSubmission(state: AccountState): Submission | undefined {
  return state.submissions.find((item) => item.status === "approved");
}

export function activeIdentity(state: AccountState): Identity | null {
  return approvedSubmission(state)?.data ?? null;
}

export function activeTier(state: AccountState): RiskTier | null {
  return approvedSubmission(state)?.riskTier ?? null;
}

function clone(state: AccountState): AccountState {
  return {
    ...state,
    submissions: state.submissions.map((item) => ({ ...item, data: { ...item.data } })),
    partnerEvents: state.partnerEvents.map((item) => ({ ...item })),
  };
}

function nextId(state: AccountState): { id: string; nextSeq: number } {
  return { id: `sub-${state.nextSeq}`, nextSeq: state.nextSeq + 1 };
}

export function confirmUnchanged(state: AccountState, now: Date): KycResult<AccountState> {
  const tier = activeTier(state);
  if (!tier || state.kycStatus !== "approved") {
    return { ok: false, error: "rekyc_requires_approved_kyc" };
  }
  const next = clone(state);
  next.oddDueAt = addMonths(now, oddMonths(tier)).toISOString();
  next.oddConfirmedAt = now.toISOString();
  return { ok: true, value: next };
}

interface CaptureInput {
  data: Identity;
  riskScore: number;
  outcome: "approved" | "nik-mismatch" | "pending" | "dukcapil-fail";
  now: Date;
}

/**
 * One attempt is always a new row. Approving supersedes the previous approval
 * in the same transition; a rejection leaves the account, tier, and due date alone.
 */
export function recordCapture(state: AccountState, input: CaptureInput): KycResult<AccountState> {
  if (state.kycStatus !== "approved" || !approvedSubmission(state)) {
    return { ok: false, error: "rekyc_requires_approved_kyc" };
  }
  const onFile = approvedSubmission(state);
  if (!onFile) return { ok: false, error: "rekyc_requires_approved_kyc" };

  if (input.data.nik !== onFile.data.nik || input.outcome === "nik-mismatch") {
    return {
      ok: true,
      value: appendRejected(state, input.data, input.riskScore, "rekyc_id_mismatch", input.now),
    };
  }

  if (input.outcome === "pending") {
    return { ok: true, value: appendPending(state, input.data, input.riskScore, input.now) };
  }

  if (input.outcome === "dukcapil-fail") {
    return {
      ok: true,
      value: appendRejected(state, input.data, input.riskScore, "dukcapil_not_verified", input.now),
    };
  }

  if (input.outcome === "approved") {
    return { ok: true, value: approveNew(state, input.data, input.riskScore, input.now) };
  }

  const unreachable: never = input.outcome;
  return unreachable;
}

function appendRejected(
  state: AccountState,
  data: Identity,
  riskScore: number,
  reason: RejectionReason,
  now: Date,
): AccountState {
  const next = clone(state);
  const ids = nextId(next);
  next.nextSeq = ids.nextSeq;
  next.submissions = [
    ...next.submissions,
    {
      id: ids.id,
      accountId: state.accountId,
      type: "rekyc",
      status: "rejected",
      reason,
      data: { ...data },
      riskScore,
      riskTier: tierForScore(riskScore),
      createdAt: now.toISOString(),
      selfieReusedFromFr: true,
    },
  ];
  return next;
}

function appendPending(state: AccountState, data: Identity, riskScore: number, now: Date): AccountState {
  const next = clone(state);
  const ids = nextId(next);
  next.nextSeq = ids.nextSeq;
  next.submissions = [
    ...next.submissions,
    {
      id: ids.id,
      accountId: state.accountId,
      type: "rekyc",
      status: "pending",
      reason: null,
      data: { ...data },
      riskScore,
      riskTier: tierForScore(riskScore),
      createdAt: now.toISOString(),
      selfieReusedFromFr: true,
    },
  ];
  return next;
}

function approveNew(state: AccountState, data: Identity, riskScore: number, now: Date): AccountState {
  const next = clone(state);
  const ids = nextId(next);
  const tier = tierForScore(riskScore);
  const createdAt = now.toISOString();
  const previous = next.submissions.find((item) => item.status === "approved");
  next.submissions = next.submissions.map((item) =>
    item.status === "approved"
      ? { ...item, status: "rejected", reason: "superseded_by_newer_approval" }
      : item,
  );
  const created: Submission = {
    id: ids.id,
    accountId: state.accountId,
    type: "rekyc",
    status: "approved",
    reason: null,
    data: { ...data },
    riskScore,
    riskTier: tier,
    createdAt,
    selfieReusedFromFr: true,
  };
  next.submissions = [...next.submissions, created];
  next.nextSeq = ids.nextSeq;
  next.kycStatus = "approved";
  next.oddDueAt = addMonths(now, oddMonths(tier)).toISOString();
  next.oddConfirmedAt = createdAt;
  if (previous) {
    next.partnerEvents = [
      ...next.partnerEvents,
      {
        accountId: state.accountId,
        event: "rekyc_approval_revoked",
        submissionId: previous.id,
        at: createdAt,
        reason: "superseded_by_newer_approval",
      },
      {
        accountId: state.accountId,
        event: "rekyc_approved",
        submissionId: ids.id,
        at: createdAt,
        reason: null,
      },
    ];
  }
  return next;
}

/** Submissions are append-only. Agents change status, never the identity payload. */
export function editSubmissionData(
  _state: AccountState,
  _id: string,
  _data: Identity,
): KycResult<AccountState> {
  return { ok: false, error: "submission_immutable" };
}

export function agentSetStatus(
  state: AccountState,
  id: string,
  status: "approved" | "rejected",
  now: Date,
): KycResult<AccountState> {
  const target = state.submissions.find((item) => item.id === id);
  if (!target) return { ok: false, error: "not_found" };
  if (status === "approved" && state.submissions.some((item) => item.status === "approved" && item.id !== id)) {
    return { ok: false, error: "already_approved" };
  }
  const next = clone(state);
  const at = now.toISOString();
  next.submissions = next.submissions.map((item) => {
    if (item.id !== id) return item;
    if (status === "approved") return { ...item, status, reason: null };
    return { ...item, status, reason: item.reason };
  });
  const updated = next.submissions.find((item) => item.id === id);
  const stillApproved = next.submissions.some((item) => item.status === "approved");
  if (!stillApproved) {
    next.kycStatus = "downgraded";
    if (target.status === "approved" && updated) {
      next.partnerEvents = [
        ...next.partnerEvents,
        {
          accountId: state.accountId,
          event: "rekyc_approval_revoked",
          submissionId: id,
          at,
          reason: updated.reason,
        },
      ];
    }
  }
  if (status === "approved" && updated) {
    next.kycStatus = "approved";
    next.oddDueAt = addMonths(now, oddMonths(updated.riskTier)).toISOString();
    next.partnerEvents = [
      ...next.partnerEvents,
      {
        accountId: state.accountId,
        event: "rekyc_approved",
        submissionId: id,
        at,
        reason: null,
      },
    ];
  }
  return { ok: true, value: next };
}

export interface PullResponse {
  accountId: string;
  data: Identity | null;
}

export function pullApproved(state: AccountState): PullResponse {
  const approved = approvedSubmission(state);
  return {
    accountId: state.accountId,
    data: approved ? { ...approved.data } : null,
  };
}

export function isOddDue(dueAt: string, now: Date, leadDays: number): boolean {
  const due = new Date(dueAt).getTime();
  const lead = leadDays * 24 * 60 * 60 * 1000;
  return now.getTime() >= due - lead;
}

export function isOverdue(dueAt: string, now: Date): boolean {
  return now.getTime() > new Date(dueAt).getTime();
}
