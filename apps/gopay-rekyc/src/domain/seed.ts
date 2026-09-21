import type { EktpData, Scenario, State } from "./types";

/** On-file identity. Masked strings are asserted against the Figma review screen. */
export const DEMO_IDENTITY: EktpData = {
  fullName: "Budi Pratama",
  nik: "3276012907930002",
  dateOfBirth: "29 July 1993",
  placeOfBirth: "Jakarta",
  occupation: "Private Employee",
  address: "Jl. Margasatawa Raya No. 41",
  maritalStatus: "Not married",
  rtRw: "007/009",
  kelurahan: "Jatipadang",
  kecamatan: "Pasar Minggu",
  religion: "Islam",
  gender: "Laki-laki",
  bloodType: "O",
};

/** Replacement document used when a reKYC attempt is approved. NIK stays the same. */
export const UPDATED_IDENTITY: EktpData = {
  ...DEMO_IDENTITY,
  address: "Jl. Margasatawa Baru No. 88",
  maritalStatus: "Married",
};

export const MISMATCH_NIK = "3175010101909999";

export const SEED_NOW = "2026-09-21T12:00:00.000Z";

export const defaultScenario = {
  face: "pass",
  photoClear: true,
  ktpAligned: true,
  ktpReadable: true,
  detectedWithin15s: true,
  ocrConfidence: "high",
  nikMatches: true,
  highRisk: false,
  dukcapil: "cache_hit",
  uploadSuccessful: true,
  sessionExpiry: "none",
  ektpExpiring: false,
} as const satisfies Scenario;

export function createSeedState(): State {
  return {
    account: {
      id: "acc_budi",
      phone: "+6281000000111",
      email: "budi@gopay.demo",
      displayName: "Budi Keren",
      kycStatus: "approved",
      oddDueAt: "2026-09-24T12:00:00.000Z",
      oddIntervalDays: 365,
    },
    submissions: [
      {
        id: "sub_0001",
        accountId: "acc_budi",
        type: "initial_kyc",
        status: "approved",
        identity: DEMO_IDENTITY,
        riskScore: 22,
        riskTier: "low",
        submittedAt: "2024-09-12T00:00:00.000Z",
      },
    ],
    sessions: [],
    callbacks: [],
    scenario: { ...defaultScenario },
    seq: 1,
  };
}
