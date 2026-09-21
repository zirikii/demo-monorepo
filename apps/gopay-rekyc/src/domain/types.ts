export type RiskTier = "low" | "medium" | "high";

export type SubmissionStatus = "approved" | "rejected" | "pending_manual_review";

export type SubmissionType = "initial_kyc" | "reverification";

export type RejectionReason =
  | "rekyc_id_mismatch"
  | "superseded_by_newer_approval"
  | "dukcapil_not_verified"
  | "session_expired";

export type EktpData = {
  fullName: string;
  nik: string;
  dateOfBirth: string;
  placeOfBirth: string;
  occupation: string;
  address: string;
  maritalStatus: string;
  rtRw: string;
  kelurahan: string;
  kecamatan: string;
  religion: string;
  gender: string;
  bloodType: string;
};

export type Submission = {
  id: string;
  accountId: string;
  type: SubmissionType;
  status: SubmissionStatus;
  rejectionReason?: RejectionReason;
  identity: EktpData;
  riskScore: number;
  riskTier: RiskTier;
  submittedAt: string;
};

export type KycStatus = "approved" | "downgraded";

export type Account = {
  id: string;
  phone: string;
  email: string;
  displayName: string;
  kycStatus: KycStatus;
  oddDueAt: string;
  oddIntervalDays: number;
};

export const PARTNERS = ["SNI", "Merchant", "Pinjam", "Driver"] as const;

export type PartnerName = (typeof PARTNERS)[number];

export type PartnerEvent = "submission_approved" | "approval_revoked";

export type PartnerCallback = {
  id: string;
  accountId: string;
  partner: PartnerName;
  event: PartnerEvent;
  timestamp: string;
};

/** Wire body. Identity fields are intentionally absent. */
export type PartnerCallbackPayload = {
  accountId: string;
  event: PartnerEvent;
  timestamp: string;
};

export type SessionStatus = "open" | "decided" | "abandoned";

export type EddAnswers = {
  sourceOfIncome?: string;
  upgradePurpose?: string;
};

export type Session = {
  id: string;
  accountId: string;
  startedAt: string;
  faceAttempts: number;
  facePassed: boolean;
  faceImageReused: boolean;
  edd: EddAnswers;
  status: SessionStatus;
};

export type FaceMode = "pass" | "fail" | "lockout";

export type SessionExpiryMode = "none" | "five_min" | "twenty_four_h";

export type DukcapilMode = "cache_hit" | "verified" | "not_verified";

export type Scenario = {
  face: FaceMode;
  photoClear: boolean;
  ktpAligned: boolean;
  ktpReadable: boolean;
  detectedWithin15s: boolean;
  ocrConfidence: "high" | "low";
  nikMatches: boolean;
  highRisk: boolean;
  dukcapil: DukcapilMode;
  uploadSuccessful: boolean;
  sessionExpiry: SessionExpiryMode;
  ektpExpiring: boolean;
};

export type State = {
  account: Account;
  submissions: Submission[];
  sessions: Session[];
  callbacks: PartnerCallback[];
  scenario: Scenario;
  seq: number;
};
