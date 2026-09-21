import type { KtpData } from "./types";

/**
 * Replaces the middle of a value with a fixed-width mask.
 *
 * The design masks every e-KTP field with exactly three asterisks regardless of how
 * many characters are hidden; only the NIK widens the mask to cover each digit.
 */
export function maskMiddle(value: string, keepStart: number, keepEnd: number, stars = 3): string {
  if (value.length <= keepStart + keepEnd) return value;
  const end = keepEnd === 0 ? "" : value.slice(value.length - keepEnd);
  return `${value.slice(0, keepStart)}${"*".repeat(stars)}${end}`;
}

export function maskNik(nik: string): string {
  return maskMiddle(nik, 4, 4, Math.max(nik.length - 8, 3));
}

/** Names are masked per word: only the initial survives. */
export function maskName(name: string): string {
  return name
    .split(" ")
    .map((word) => (word ? `${word[0]}***` : word))
    .join(" ");
}

/** Masks a single word inside a phrase, keeping the words around it intact. */
export function maskWordAt(phrase: string, index: number, keepStart: number): string {
  const words = phrase.split(" ");
  if (index >= words.length) return phrase;
  words[index] = maskMiddle(words[index], keepStart, 0);
  return words.join(" ");
}

/** Same shape as `KtpData`, but every value is display-masked. */
export type MaskedKtpData = KtpData;

/**
 * Field-level masking follows the e-KTP review screen in the Figma flow, which masks
 * every field. (The PRD's masking table leaves occupation, marital status, religion
 * and gender unmasked; the design is the source of truth for what is rendered.)
 */
export function maskKtpData(data: KtpData): MaskedKtpData {
  return {
    nik: maskNik(data.nik),
    fullName: maskName(data.fullName),
    dateOfBirth: maskWordAt(data.dateOfBirth, 1, 2),
    address: maskWordAt(data.address, 2, 0),
    rtRw: maskMiddle(data.rtRw, 4, 0),
    kelurahan: maskMiddle(data.kelurahan, 3, 4),
    kecamatan: maskMiddle(data.kecamatan, 6, 2),
    occupation: maskMiddle(data.occupation, 10, 2),
    maritalStatus: maskMiddle(data.maritalStatus, 5, 2),
    religion: maskMiddle(data.religion, 3, 0),
    gender: maskMiddle(data.gender, 3, 5),
  };
}
