import type { KtpData, RekycState, Submission } from "@/lib/rekyc/types";

export const ACCOUNT_ID = "gopay-8882";

/** The e-KTP data currently on file — the values the review screen masks and shows. */
export const ON_FILE_KTP: KtpData = {
  nik: "3276010101930002",
  fullName: "Budi Prasetyo",
  dateOfBirth: "29 Juni 1993",
  address: "Jl. Margasatawa Raya No. 41",
  rtRw: "007/008",
  kelurahan: "Jatipadang",
  kecamatan: "Pasar Minggu",
  occupation: "Private Employee",
  maritalStatus: "Not married",
  religion: "Islam",
  gender: "Laki-laki",
};

/** What OCR reads off the newly captured card in the happy path. */
export const UPDATED_KTP: KtpData = {
  ...ON_FILE_KTP,
  address: "Jl. Kemang Selatan No. 12",
  kelurahan: "Bangka",
  kecamatan: "Mampang Prapatan",
  maritalStatus: "Married",
  occupation: "Private Employee",
};

/** A card belonging to somebody else — used by the NIK-mismatch scenario. */
export const OTHER_PERSON_KTP: KtpData = {
  ...UPDATED_KTP,
  nik: "3174062509880007",
  fullName: "Dewi Kartika",
};

const INITIAL_KYC: Submission = {
  id: "sub_2023_0417",
  accountId: ACCOUNT_ID,
  type: "initial_kyc",
  status: "approved",
  submittedAt: "2023-04-17T02:11:00.000Z",
  decidedAt: "2023-04-17T02:19:00.000Z",
  data: ON_FILE_KTP,
  documents: ["e-KTP", "Selfie"],
  riskScore: 22,
  riskTier: "low",
  rejectionReason: null,
  ocrConfidence: 0.94,
  dukcapilConfidence: 0.97,
  nameScreeningCleared: true,
  eddAnswers: null,
};

/** The demo always opens with the ODD review three days out, as the Figma frames show. */
const DAYS_UNTIL_ODD_REVIEW = 3;

export function initialRekycState(): RekycState {
  const oddDueAt = new Date(Date.now() + DAYS_UNTIL_ODD_REVIEW * 86_400_000).toISOString();

  return {
    account: {
      id: ACCOUNT_ID,
      kycStatus: "approved",
      oddDueAt,
      oddIntervalDays: 1095,
    },
    submissions: [INITIAL_KYC],
    notifications: [],
  };
}
