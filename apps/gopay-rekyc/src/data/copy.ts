export const ONBOARDING_COPY = {
  rekyc: {
    title: "Update your e-KTP data",
    subtitle: "Take your e-KTP and selfie",
    steps: [
      { n: "1", label: "Take e-KTP photo" },
      { n: "2", label: "Selfie" },
    ],
    note: "An electronic certificate will be generated for you by DigiSign",
    supervised: "GoPay is supervised by Bank Indonesia",
    legalLead: "By continuing, you agree to the",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    cta: "Continue",
  },
} as const;

export type OnboardingContext = keyof typeof ONBOARDING_COPY;

export const MISMATCH_COPY = {
  code: "rekyc_id_mismatch",
  en: "Because eKTP did not match with the current eKTP that registered. Please resubmit and ensure you use the same eKTP.",
  id: "Soalnya eKTP kamu tidak sesuai dengan eKTP yang terdaftar saat ini. Mohon submit ulang dan gunakan eKTP yang sama dengan yang sekarang terdaftar.",
} as const;

export const SUCCESS_TOAST = "Data KYC kamu sudah diperbarui";

export const CONFIRM_TOAST = "Data KYC kamu sudah dikonfirmasi";

export const INCOME_OPTIONS = ["Business", "Salary", "Pension Fund", "Spouse", "Inheritance"] as const;

export const PURPOSE_OPTIONS = [
  "Daily transactions",
  "Transfer to bank",
  "GoPay Pinjam",
  "GoPay Tabungan",
  "Pay at merchants",
] as const;

export const FIELD_LABELS = {
  nik: "NIK",
  dateOfBirth: "Tgl. Lahir",
  occupation: "Occupation",
  address: "Address",
  maritalStatus: "Marital Status",
  rtRw: "RT/RW",
  kelurahan: "Kelurahan",
  kecamatan: "Kecamatan",
  religion: "Religion",
  gender: "Jenis Kelamin",
} as const;
