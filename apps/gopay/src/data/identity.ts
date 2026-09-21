export interface Identity {
  fullName: string;
  nik: string;
  dateOfBirth: string;
  occupation: string;
  address: string;
  maritalStatus: string;
  rtRw: string;
  kelurahan: string;
  kecamatan: string;
  religion: string;
  gender: string;
}

export interface MaskedIdentity {
  fullName: string;
  nik: string;
  dateOfBirth: string;
  occupation: string;
  address: string;
  maritalStatus: string;
  rtRw: string;
  kelurahan: string;
  kecamatan: string;
  religion: string;
  gender: string;
}

export const ACCOUNT_ID = "gopay-acc-budi";

export const PROFILE = {
  fullName: "Budi Pratama",
  phone: "+628187888188",
  email: "hanz@gmail.com",
};

/** On-file e-KTP. Masked strings below are the Figma review screen, not a guess. */
export const ON_FILE: Identity = {
  fullName: "Budi Pratama",
  nik: "3276012906930002",
  dateOfBirth: "29 June 1993",
  occupation: "Private Employee",
  address: "Jl. Margasatwa Raya No. 41",
  maritalStatus: "Not married",
  rtRw: "007/008",
  kelurahan: "Jatiwaringin",
  kecamatan: "Pasar Minggu",
  religion: "Islam",
  gender: "Laki-laki",
};

export const ON_FILE_MASKED: MaskedIdentity = {
  fullName: "B*** P***",
  nik: "3276********0002",
  dateOfBirth: "29 Ju*** 1993",
  occupation: "Private Em***ee",
  address: "Jl. Margasatawa *** No. 41",
  maritalStatus: "Not m***ed",
  rtRw: "007/***",
  kelurahan: "Jat***dang",
  kecamatan: "Pasar ***gu",
  religion: "Isl***",
  gender: "Lak***-laki",
};

/** Same NIK, updated address and marital status — the happy-path OCR result. */
export const UPDATED_KTP: Identity = {
  fullName: "Budi Pratama",
  nik: "3276012906930002",
  dateOfBirth: "29 June 1993",
  occupation: "Private Employee",
  address: "Jl. Melati Indah No. 18",
  maritalStatus: "Married",
  rtRw: "004/002",
  kelurahan: "Menteng",
  kecamatan: "Menteng",
  religion: "Islam",
  gender: "Laki-laki",
};

export const MISMATCH_NIK = "3175010101900001";

export const INCOME_OPTIONS = [
  "Business",
  "Salary",
  "Pension Fund",
  "Spouse",
  "Inheritance",
] as const;

export const PURPOSE_OPTIONS = [
  "Transfer & payments",
  "Savings",
  "Online shopping",
  "Business payments",
  "Other",
] as const;

export const SUCCESS_TOAST =
  "Data KYC diperbarui — akunmu udah aktif lagi. Yuk transaksi seperti biasa.";

export const CONFIRM_TOAST =
  "Your e-KTP is confirmed. Your next review has been rescheduled.";

export const GENIE_BANNER = "Data KYC kamu sudah diperbarui ✅";

export const NIK_MISMATCH_COPY =
  "Because eKTP did not match with the current eKTP that registered. Please resubmit and ensure you use the same eKTP.";
