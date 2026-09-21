/** Domain types for the self-serve re-KYC PRD (sections 4.2 and 4.3). */

export type KycStatus = "approved" | "downgraded";

export type SubmissionType = "initial_kyc" | "reverification";

export type SubmissionStatus = "approved" | "rejected" | "pending_review";

export type RiskTier = "low" | "medium" | "high";

/**
 * Rejection reasons follow the existing KYC reason-code naming convention so the
 * e-money portal can render re-KYC rows with the same filters (PRD 4.4).
 */
export type RejectionReason =
  | "rekyc_id_mismatch"
  | "rekyc_dukcapil_unverified"
  | "rekyc_face_verification_failed"
  | "superseded_by_newer_approval";

export interface KtpData {
  nik: string;
  fullName: string;
  dateOfBirth: string;
  address: string;
  rtRw: string;
  kelurahan: string;
  kecamatan: string;
  occupation: string;
  maritalStatus: string;
  religion: string;
  gender: string;
}

export interface EddAnswers {
  sourceOfIncome: string;
  upgradePurpose: string;
}

export interface Submission {
  id: string;
  accountId: string;
  type: SubmissionType;
  status: SubmissionStatus;
  submittedAt: string;
  decidedAt: string | null;
  /** Frozen at creation — a submission's data is never edited (PRD 4.3.2). */
  data: KtpData;
  documents: string[];
  riskScore: number;
  riskTier: RiskTier;
  rejectionReason: RejectionReason | null;
  ocrConfidence: number;
  dukcapilConfidence: number;
  nameScreeningCleared: boolean;
  eddAnswers: EddAnswers | null;
}

export interface Account {
  id: string;
  kycStatus: KycStatus;
  /** Ongoing Due Diligence review date; recalculated from the approved tier. */
  oddDueAt: string;
  oddIntervalDays: number;
}

export interface PartnerNotification {
  partner: string;
  accountId: string;
  event: "reverification.approved" | "reverification.revoked";
  timestamp: string;
}

export interface RekycState {
  account: Account;
  submissions: Submission[];
  notifications: PartnerNotification[];
}
