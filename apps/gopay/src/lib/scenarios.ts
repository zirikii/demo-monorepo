import { ON_FILE_KTP, OTHER_PERSON_KTP, UPDATED_KTP } from "@/data/account";
import type { KtpData } from "@/lib/rekyc/types";

export type ScenarioId =
  | "happy"
  | "nik_mismatch"
  | "manual_review"
  | "high_risk"
  | "dukcapil_reject"
  | "face_fail";

export interface Scenario {
  id: ScenarioId;
  label: string;
  description: string;
  capturedData: KtpData;
  faceMatchPassed: boolean;
  ocrConfidence: number;
  dukcapilConfidence: number;
  dukcapilVerified: boolean;
  nameScreeningCleared: boolean;
  riskScore: number;
  /** Camera dwell before OCR resolves, in seconds — drives the capture countdown. */
  captureSeconds: number;
}

export const SCENARIOS: Record<ScenarioId, Scenario> = {
  happy: {
    id: "happy",
    label: "Approved",
    description: "NIK matches, OCR is confident, low risk, Dukcapil cache is reused.",
    capturedData: UPDATED_KTP,
    faceMatchPassed: true,
    ocrConfidence: 0.93,
    dukcapilConfidence: 0.95,
    dukcapilVerified: true,
    nameScreeningCleared: true,
    riskScore: 24,
    captureSeconds: 3,
  },
  nik_mismatch: {
    id: "nik_mismatch",
    label: "NIK mismatch",
    description: "A different person's card — rejected locally, no Dukcapil call.",
    capturedData: OTHER_PERSON_KTP,
    faceMatchPassed: true,
    ocrConfidence: 0.91,
    dukcapilConfidence: 0.95,
    dukcapilVerified: true,
    nameScreeningCleared: true,
    riskScore: 31,
    captureSeconds: 3,
  },
  manual_review: {
    id: "manual_review",
    label: "Manual review",
    description: "OCR confidence below threshold — routed to the review queue.",
    capturedData: UPDATED_KTP,
    faceMatchPassed: true,
    ocrConfidence: 0.58,
    dukcapilConfidence: 0.88,
    dukcapilVerified: true,
    nameScreeningCleared: true,
    riskScore: 35,
    captureSeconds: 6,
  },
  high_risk: {
    id: "high_risk",
    label: "High risk — EDD",
    description: "Fresh risk scoring returns high risk, so EDD is collected first.",
    capturedData: UPDATED_KTP,
    faceMatchPassed: true,
    ocrConfidence: 0.9,
    dukcapilConfidence: 0.94,
    dukcapilVerified: true,
    nameScreeningCleared: true,
    riskScore: 82,
    captureSeconds: 3,
  },
  dukcapil_reject: {
    id: "dukcapil_reject",
    label: "Dukcapil rejects",
    description: "Cache confidence is low and the re-run fails to verify.",
    capturedData: UPDATED_KTP,
    faceMatchPassed: true,
    ocrConfidence: 0.89,
    dukcapilConfidence: 0.62,
    dukcapilVerified: false,
    nameScreeningCleared: true,
    riskScore: 44,
    captureSeconds: 3,
  },
  face_fail: {
    id: "face_fail",
    label: "Face check fails",
    description: "The FR gate fails, so KTP capture is never reached.",
    capturedData: ON_FILE_KTP,
    faceMatchPassed: false,
    ocrConfidence: 0.9,
    dukcapilConfidence: 0.95,
    dukcapilVerified: true,
    nameScreeningCleared: true,
    riskScore: 20,
    captureSeconds: 3,
  },
};

export const SCENARIO_ORDER: ScenarioId[] = [
  "happy",
  "high_risk",
  "nik_mismatch",
  "manual_review",
  "dukcapil_reject",
  "face_fail",
];
