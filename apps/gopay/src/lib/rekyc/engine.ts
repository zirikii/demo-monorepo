import type {
  Account,
  EddAnswers,
  KtpData,
  PartnerNotification,
  RejectionReason,
  RekycState,
  RiskTier,
  Submission,
  SubmissionStatus,
} from "./types";

/** OCR below this confidence goes to the manual review queue instead of a decision. */
export const OCR_REVIEW_THRESHOLD = 0.75;
/** Dukcapil cache above this confidence is reused instead of re-running verification. */
export const DUKCAPIL_CACHE_THRESHOLD = 0.9;

export const ODD_INTERVAL_DAYS: Record<RiskTier, number> = {
  low: 1095,
  medium: 730,
  high: 365,
};

/** Every OneKYC partner that holds a copy of the customer's identity data. */
export const LINKED_PARTNERS = ["SNI", "Merchant", "Pinjam", "Driver"] as const;

export const NIK_MISMATCH_COPY = {
  en: "Because eKTP did not match with the current eKTP that registered. Please resubmit and ensure you use the same eKTP.",
  id: "Soalnya eKTP kamu tidak sesuai dengan eKTP yang terdaftar saat ini. Mohon submit ulang dan gunakan eKTP yang sama dengan yang sekarang terdaftar.",
};

export function approvedSubmission(state: RekycState): Submission | null {
  return state.submissions.find((s) => s.status === "approved") ?? null;
}

export function pendingSubmission(state: RekycState): Submission | null {
  return state.submissions.find((s) => s.status === "pending_review") ?? null;
}

/** The identity data in use is found by status alone — no ordering or fallback logic. */
export function dataInUse(state: RekycState): KtpData | null {
  return approvedSubmission(state)?.data ?? null;
}

/** No approved submission means no tier is reported for the account (PRD 4.3.2). */
export function accountRiskTier(state: RekycState): RiskTier | null {
  return approvedSubmission(state)?.riskTier ?? null;
}

/** re-KYC is only available to accounts whose KYC status is approved. */
export function canStartRekyc(state: RekycState): boolean {
  return state.account.kycStatus === "approved" && approvedSubmission(state) !== null;
}

export function addDays(from: string, days: number): string {
  const date = new Date(from);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

export function riskTierFor(score: number): RiskTier {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

export interface VerificationInput {
  state: RekycState;
  capturedData: KtpData;
  /** Face-recognition gate result; a failed gate never reaches KTP capture. */
  faceMatchPassed: boolean;
  ocrConfidence: number;
  dukcapilConfidence: number;
  dukcapilVerified: boolean;
  nameScreeningCleared: boolean;
  riskScore: number;
  eddAnswers: EddAnswers | null;
  now: string;
  submissionId: string;
}

export type VerificationOutcome =
  | { kind: "rejected"; reason: RejectionReason; state: RekycState; submission: Submission }
  | { kind: "pending_review"; state: RekycState; submission: Submission }
  | { kind: "edd_required"; riskTier: RiskTier }
  | { kind: "approved"; state: RekycState; submission: Submission };

function createSubmission(
  input: VerificationInput,
  status: SubmissionStatus,
  rejectionReason: RejectionReason | null,
  data: KtpData,
): Submission {
  return {
    id: input.submissionId,
    accountId: input.state.account.id,
    type: "reverification",
    status,
    submittedAt: input.now,
    decidedAt: status === "pending_review" ? null : input.now,
    data,
    documents: ["e-KTP", "Selfie"],
    riskScore: input.riskScore,
    riskTier: riskTierFor(input.riskScore),
    rejectionReason,
    ocrConfidence: input.ocrConfidence,
    dukcapilConfidence: input.dukcapilConfidence,
    nameScreeningCleared: input.nameScreeningCleared,
    eddAnswers: input.eddAnswers,
  };
}

/**
 * A rejected re-KYC changes nothing else: not the account status, not the data in
 * use, not the review date, not the risk tier (PRD 4.3 Rules).
 */
function withRejected(state: RekycState, submission: Submission): RekycState {
  return { ...state, submissions: [...state.submissions, submission] };
}

/**
 * Approving writes the new submission as approved and supersedes the previously
 * approved one in the same transaction, then resets the ODD interval from the newly
 * assessed tier and notifies every linked partner.
 */
function withApproved(state: RekycState, submission: Submission): RekycState {
  const superseded = state.submissions.map((s) =>
    s.status === "approved"
      ? {
          ...s,
          status: "rejected" as const,
          rejectionReason: "superseded_by_newer_approval" as const,
          decidedAt: submission.decidedAt,
        }
      : s,
  );

  const intervalDays = ODD_INTERVAL_DAYS[submission.riskTier];
  const account: Account = {
    ...state.account,
    kycStatus: "approved",
    oddIntervalDays: intervalDays,
    oddDueAt: addDays(submission.decidedAt ?? submission.submittedAt, intervalDays),
  };

  const notifications: PartnerNotification[] = LINKED_PARTNERS.map((partner) => ({
    partner,
    accountId: account.id,
    event: "reverification.approved",
    timestamp: submission.decidedAt ?? submission.submittedAt,
  }));

  return {
    account,
    submissions: [...superseded, submission],
    notifications: [...state.notifications, ...notifications],
  };
}

/**
 * Runs one re-KYC attempt end to end: FR gate, local NIK match, OCR confidence,
 * name screening, risk scoring, EDD, then Dukcapil (PRD 4.2).
 */
export function runVerification(input: VerificationInput): VerificationOutcome {
  const onFileNik = dataInUse(input.state)?.nik ?? "";

  if (!input.faceMatchPassed) {
    const submission = createSubmission(
      input,
      "rejected",
      "rekyc_face_verification_failed",
      input.capturedData,
    );
    return {
      kind: "rejected",
      reason: "rekyc_face_verification_failed",
      state: withRejected(input.state, submission),
      submission,
    };
  }

  // NIK mismatch is rejected locally — no Dukcapil call is made.
  if (input.capturedData.nik !== onFileNik) {
    const submission = createSubmission(input, "rejected", "rekyc_id_mismatch", input.capturedData);
    return {
      kind: "rejected",
      reason: "rekyc_id_mismatch",
      state: withRejected(input.state, submission),
      submission,
    };
  }

  if (input.ocrConfidence < OCR_REVIEW_THRESHOLD) {
    const submission = createSubmission(input, "pending_review", null, input.capturedData);
    return {
      kind: "pending_review",
      state: withRejected(input.state, submission),
      submission,
    };
  }

  const riskTier = riskTierFor(input.riskScore);
  if (riskTier === "high" && input.eddAnswers === null) {
    return { kind: "edd_required", riskTier };
  }

  const reuseDukcapilCache = input.dukcapilConfidence >= DUKCAPIL_CACHE_THRESHOLD;
  if (!reuseDukcapilCache && !input.dukcapilVerified) {
    const submission = createSubmission(
      input,
      "rejected",
      "rekyc_dukcapil_unverified",
      input.capturedData,
    );
    return {
      kind: "rejected",
      reason: "rekyc_dukcapil_unverified",
      state: withRejected(input.state, submission),
      submission,
    };
  }

  const submission = createSubmission(input, "approved", null, input.capturedData);
  return { kind: "approved", state: withApproved(input.state, submission), submission };
}

/** Agent override from the e-money portal (PRD 4.3 meeting notes, 18 Sep). */
export function overrideDecision(
  state: RekycState,
  submissionId: string,
  status: Extract<SubmissionStatus, "approved" | "rejected">,
  now: string,
): RekycState {
  const target = state.submissions.find((s) => s.id === submissionId);
  if (!target || target.status === status) return state;

  if (status === "approved") {
    const promoted: Submission = {
      ...target,
      status: "approved",
      rejectionReason: null,
      decidedAt: now,
    };
    const rest = state.submissions.filter((s) => s.id !== submissionId);
    return withApproved({ ...state, submissions: rest }, promoted);
  }

  const wasApproved = target.status === "approved";
  const submissions = state.submissions.map((s) =>
    s.id === submissionId
      ? { ...s, status: "rejected" as const, decidedAt: now, rejectionReason: s.rejectionReason }
      : s,
  );

  // Rejecting the approved submission downgrades the account in the same transaction,
  // and nothing is promoted in its place.
  const account: Account = wasApproved
    ? { ...state.account, kycStatus: "downgraded" }
    : state.account;

  const notifications: PartnerNotification[] = wasApproved
    ? LINKED_PARTNERS.map((partner) => ({
        partner,
        accountId: account.id,
        event: "reverification.revoked" as const,
        timestamp: now,
      }))
    : [];

  return {
    account,
    submissions,
    notifications: [...state.notifications, ...notifications],
  };
}

/** The existing on-demand partner pull API returns the approved submission's data. */
export function pullApiResponse(
  state: RekycState,
): { status: "ok"; data: KtpData } | { status: "no_data" } {
  const data = dataInUse(state);
  return data ? { status: "ok", data } : { status: "no_data" };
}
