import { ODD_INTERVAL_DAYS, evaluateCapture, evaluateFace, screenName, type CaptureDecision, type FaceDecision } from "./decision";
import { MISMATCH_NIK, UPDATED_IDENTITY, createSeedState } from "./seed";
import { scenarioToCapture } from "./scenario";
import type {
  EktpData,
  PartnerCallback,
  PartnerCallbackPayload,
  PartnerEvent,
  RejectionReason,
  RiskTier,
  Scenario,
  Session,
  State,
  Submission,
  SubmissionStatus,
} from "./types";
import { PARTNERS } from "./types";

export class StoreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StoreError";
  }
}

function addDays(iso: string, days: number): string {
  const date = new Date(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

function withId(state: State, prefix: string): [State, string] {
  const seq = state.seq + 1;
  return [{ ...state, seq }, `${prefix}_${String(seq).padStart(4, "0")}`];
}

function requireSession(state: State, sessionId: string): Session {
  const session = state.sessions.find((item) => item.id === sessionId);
  if (!session) throw new StoreError("Session not found");
  return session;
}

function closeSession(state: State, sessionId: string): State {
  return {
    ...state,
    sessions: state.sessions.map((session) =>
      session.id === sessionId ? { ...session, status: "decided" } : session,
    ),
  };
}

export function approvedSubmissions(state: State): Submission[] {
  return state.submissions.filter((submission) => submission.status === "approved");
}

export function activeSubmission(state: State): Submission | undefined {
  const approved = approvedSubmissions(state);
  if (approved.length > 1) throw new StoreError("More than one approved submission");
  return approved[0];
}

export function accountRiskTier(state: State): RiskTier | null {
  return activeSubmission(state)?.riskTier ?? null;
}

export function assertNoExistingApproval(submissions: Submission[], exceptId?: string): void {
  const blocking = submissions.some(
    (submission) => submission.status === "approved" && submission.id !== exceptId,
  );
  if (blocking) {
    throw new StoreError("Approving is not permitted while another submission is approved");
  }
}

export function callbackPayload(callback: PartnerCallback): PartnerCallbackPayload {
  return {
    accountId: callback.accountId,
    event: callback.event,
    timestamp: callback.timestamp,
  };
}

function appendCallbacks(state: State, event: PartnerEvent, now: string): State {
  let next = state;
  const callbacks = [...state.callbacks];
  for (const partner of PARTNERS) {
    const [withSeq, id] = withId(next, "cb");
    next = withSeq;
    callbacks.push({
      id,
      accountId: state.account.id,
      partner,
      event,
      timestamp: now,
    });
  }
  return { ...next, callbacks };
}

function scoreFor(tier: RiskTier): number {
  if (tier === "high") return 88;
  if (tier === "medium") return 55;
  return 22;
}

function capturedIdentity(state: State): EktpData {
  if (!state.scenario.nikMatches) return { ...UPDATED_IDENTITY, nik: MISMATCH_NIK };
  return UPDATED_IDENTITY;
}

/**
 * Approving supersedes the previous approval in the same write. The superseded
 * reason is system-set and is the only marker that the row once held approval.
 */
export function commitApproval(state: State, submission: Submission, now: string): State {
  const superseded = state.submissions.map((existing) =>
    existing.status === "approved" && existing.id !== submission.id
      ? {
          ...existing,
          status: "rejected" as const,
          rejectionReason: "superseded_by_newer_approval" as const,
        }
      : existing,
  );
  assertNoExistingApproval(superseded, submission.id);
  const exists = superseded.some((existing) => existing.id === submission.id);
  const submissions = exists
    ? superseded.map((existing) =>
        existing.id === submission.id
          ? { ...existing, status: "approved" as const, rejectionReason: undefined }
          : existing,
      )
    : [...superseded, { ...submission, status: "approved" as const, rejectionReason: undefined }];
  if (submissions.filter((existing) => existing.status === "approved").length !== 1) {
    throw new StoreError("Exactly one submission must be approved");
  }
  const approved = submissions.find((existing) => existing.status === "approved");
  if (!approved) throw new StoreError("Approved submission missing after commit");
  const days = ODD_INTERVAL_DAYS[approved.riskTier];
  const withAccount: State = {
    ...state,
    submissions,
    account: {
      ...state.account,
      kycStatus: "approved",
      oddDueAt: addDays(now, days),
      oddIntervalDays: days,
    },
  };
  return appendCallbacks(withAccount, "submission_approved", now);
}

export function updateSubmissionData(): never {
  throw new StoreError("Submission data cannot be edited or deleted");
}

export function createSession(state: State, now: string): { state: State; session: Session } {
  if (state.account.kycStatus !== "approved") {
    throw new StoreError("reKYC is available only to accounts whose KYC status is approved");
  }
  const [withSeq, id] = withId(state, "ses");
  const session: Session = {
    id,
    accountId: state.account.id,
    startedAt: now,
    faceAttempts: 0,
    facePassed: false,
    faceImageReused: false,
    edd: {},
    status: "open",
  };
  return { state: { ...withSeq, sessions: [...state.sessions, session] }, session };
}

export function abandonSession(state: State, sessionId: string): State {
  return {
    ...state,
    sessions: state.sessions.map((session) =>
      session.id === sessionId ? { ...session, status: "abandoned" } : session,
    ),
  };
}

export function recordFace(
  state: State,
  sessionId: string,
  mode: "pass" | "fail" | "lockout",
): { state: State; decision: FaceDecision } {
  const session = requireSession(state, sessionId);
  if (session.status !== "open") throw new StoreError("Session is not open");
  const decision = evaluateFace(session.faceAttempts, mode);
  const sessions = state.sessions.map((item) => {
    if (item.id !== sessionId) return item;
    if (decision.outcome === "passed") {
      return { ...item, facePassed: true, faceImageReused: true };
    }
    if (decision.outcome === "retry") {
      return { ...item, faceAttempts: item.faceAttempts + 1, facePassed: false };
    }
    return { ...item, faceAttempts: item.faceAttempts + 1, facePassed: false };
  });
  return { state: { ...state, sessions }, decision };
}

export function completeEdd(
  state: State,
  sessionId: string,
  answers: { sourceOfIncome: string; upgradePurpose: string },
): State {
  const session = requireSession(state, sessionId);
  if (session.status !== "open") throw new StoreError("Session is not open");
  if (!session.facePassed) throw new StoreError("Face verification has not passed");
  return {
    ...state,
    sessions: state.sessions.map((item) => (item.id === sessionId ? { ...item, edd: answers } : item)),
  };
}

function previewFrom(state: State, sessionId: string): CaptureDecision {
  const session = requireSession(state, sessionId);
  if (session.status !== "open") throw new StoreError("Session is not open");
  if (!session.facePassed) throw new StoreError("Face verification has not passed");
  const eddComplete = Boolean(session.edd.sourceOfIncome && session.edd.upgradePurpose);
  return evaluateCapture(scenarioToCapture(state.scenario, eddComplete));
}

export function previewCapture(state: State, sessionId: string): CaptureDecision {
  return previewFrom(state, sessionId);
}

export function decide(
  state: State,
  sessionId: string,
  now: string,
): { state: State; decision: CaptureDecision } {
  const decision = previewFrom(state, sessionId);
  if (
    decision.outcome === "retry" ||
    decision.outcome === "pending_timeout" ||
    decision.outcome === "needs_edd"
  ) {
    return { state, decision };
  }

  const [withSeq, id] = withId(state, "sub");
  const tier = screenName(state.scenario.highRisk, "low");
  const draft: Submission = {
    id,
    accountId: state.account.id,
    type: "reverification",
    status: "rejected",
    identity: capturedIdentity(state),
    riskScore: scoreFor(tier),
    riskTier: tier,
    submittedAt: now,
  };

  if (decision.outcome === "pending_manual_review") {
    const submission: Submission = { ...draft, status: "pending_manual_review" };
    return {
      state: closeSession(
        { ...withSeq, submissions: [...withSeq.submissions, submission] },
        sessionId,
      ),
      decision,
    };
  }

  if (decision.outcome === "reject") {
    const submission: Submission = {
      ...draft,
      status: "rejected",
      rejectionReason: decision.reason,
    };
    const next = closeSession(
      { ...withSeq, submissions: [...withSeq.submissions, submission] },
      sessionId,
    );
    return { state: next, decision };
  }

  if (decision.outcome === "approve") {
    const submission: Submission = { ...draft, status: "approved", riskTier: tier, riskScore: scoreFor(tier) };
    return {
      state: commitApproval(closeSession(withSeq, sessionId), submission, now),
      decision,
    };
  }

  const unreachable: never = decision;
  return unreachable;
}

export function agentSetStatus(
  state: State,
  submissionId: string,
  status: SubmissionStatus,
  now: string,
  reason: RejectionReason = "dukcapil_not_verified",
): State {
  const current = state.submissions.find((submission) => submission.id === submissionId);
  if (!current) throw new StoreError("Submission not found");
  if (current.status === status) return state;
  if (reason === "superseded_by_newer_approval") {
    throw new StoreError("superseded_by_newer_approval is system-set");
  }

  if (status === "approved") {
    return commitApproval(state, { ...current, status: "approved" }, now);
  }

  if (current.status === "approved") {
    const submissions = state.submissions.map((submission) =>
      submission.id === submissionId
        ? {
            ...submission,
            status,
            rejectionReason: status === "rejected" ? reason : undefined,
          }
        : submission,
    );
    if (submissions.some((submission) => submission.status === "approved")) {
      throw new StoreError("Nothing is promoted in place of a rejected approval");
    }
    const downgraded: State = {
      ...state,
      submissions,
      account: { ...state.account, kycStatus: "downgraded" },
    };
    if (status === "rejected") return appendCallbacks(downgraded, "approval_revoked", now);
    return downgraded;
  }

  return {
    ...state,
    submissions: state.submissions.map((submission) =>
      submission.id === submissionId
        ? { ...submission, status, rejectionReason: status === "rejected" ? reason : undefined }
        : submission,
    ),
  };
}

export function confirmOdd(state: State, now: string): State {
  const tier = accountRiskTier(state);
  if (!tier) throw new StoreError("No approved submission to confirm");
  const days = ODD_INTERVAL_DAYS[tier];
  return {
    ...state,
    account: {
      ...state.account,
      oddDueAt: addDays(now, days),
      oddIntervalDays: days,
    },
  };
}

export function partnerIdentityView(state: State): { accountId: string; data: EktpData | null } {
  const approved = activeSubmission(state);
  return {
    accountId: state.account.id,
    data: approved ? approved.identity : null,
  };
}

export function setScenario(state: State, scenario: Scenario): State {
  return { ...state, scenario };
}

export function resetState(): State {
  return createSeedState();
}
