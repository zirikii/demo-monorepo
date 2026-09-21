/**
 * Capture-onboarding copy is resolved from a config keyed by the entry context so a
 * returning customer re-uploading their e-KTP is told they are updating data rather
 * than registering (PRD 4.2, "Config-driven onboarding copy").
 */
export type OnboardingContext = "initial_kyc" | "rekyc" | "odd";

export interface OnboardingCopy {
  title: string;
  subtitle: string;
  steps: string[];
  footnote: string;
  primaryCta: string;
}

export const ONBOARDING_COPY: Record<OnboardingContext, OnboardingCopy> = {
  initial_kyc: {
    title: "Verify your identity",
    subtitle: "Take your e-KTP and selfie",
    steps: ["Take e-KTP photo", "Selfie"],
    footnote: "An electronic certificate will be generated for you by DigiSign",
    primaryCta: "Continue",
  },
  rekyc: {
    title: "Update your e-KTP data",
    subtitle: "Take your e-KTP and selfie",
    steps: ["Take e-KTP photo", "Selfie"],
    footnote: "An electronic certificate will be generated for you by DigiSign",
    primaryCta: "Continue",
  },
  odd: {
    title: "Confirm your e-KTP data",
    subtitle: "Take your e-KTP and selfie",
    steps: ["Take e-KTP photo", "Selfie"],
    footnote: "An electronic certificate will be generated for you by DigiSign",
    primaryCta: "Continue",
  },
};
