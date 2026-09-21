import type { EktpData } from "../domain/types";

export type MaskedEktp = {
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
};

function maskKeepEdges(word: string, head: number, tail: number): string {
  if (word.length <= head + tail) return word;
  return `${word.slice(0, head)}***${tail > 0 ? word.slice(-tail) : ""}`;
}

export function maskFullName(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `${word.slice(0, 1)}***`)
    .join(" ");
}

export function maskNik(value: string): string {
  if (value.length < 8) return value;
  return `${value.slice(0, 4)}********${value.slice(-4)}`;
}

export function maskDateOfBirth(value: string): string {
  const [day, month, year] = value.split(/\s+/);
  if (!day || !month || !year) return value;
  return `${day} ${month.slice(0, 2)}*** ${year}`;
}

export function maskOccupation(value: string): string {
  const [first, ...rest] = value.split(/\s+/).filter(Boolean);
  if (!first) return "";
  if (rest.length === 0) return maskKeepEdges(first, 2, 2);
  return `${first} ${rest.map((word) => maskKeepEdges(word, 2, 2)).join(" ")}`;
}

export function maskAddress(value: string): string {
  const parts = value.split(/\s+/).filter(Boolean);
  if (parts.length < 3) return value;
  parts[2] = "***";
  return parts.join(" ");
}

export function maskMaritalStatus(value: string): string {
  const parts = value.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return maskKeepEdges(parts[0], 1, 2);
  const [first, ...rest] = parts;
  return `${first} ${rest.map((word) => maskKeepEdges(word, 1, 2)).join(" ")}`;
}

export function maskRtRw(value: string): string {
  const [left] = value.split("/");
  if (!left || !value.includes("/")) return value;
  return `${left}/***`;
}

export function maskKelurahan(value: string): string {
  return maskKeepEdges(value.replace(/\s+/g, ""), 3, 4);
}

export function maskKecamatan(value: string): string {
  const parts = value.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return maskKeepEdges(value, 3, 2);
  const last = parts[parts.length - 1] ?? "";
  return `${parts[0]} ***${last.slice(-2)}`;
}

export function maskReligion(value: string): string {
  return `${value.slice(0, 3)}***`;
}

export function maskGender(value: string): string {
  const [first, second] = value.split("-");
  if (!first) return "";
  if (!second) return maskKeepEdges(first, 3, 2);
  return `${first.slice(0, 3)}***-${second}`;
}

export function maskIdentity(identity: EktpData): MaskedEktp {
  return {
    fullName: maskFullName(identity.fullName),
    nik: maskNik(identity.nik),
    dateOfBirth: maskDateOfBirth(identity.dateOfBirth),
    occupation: maskOccupation(identity.occupation),
    address: maskAddress(identity.address),
    maritalStatus: maskMaritalStatus(identity.maritalStatus),
    rtRw: maskRtRw(identity.rtRw),
    kelurahan: maskKelurahan(identity.kelurahan),
    kecamatan: maskKecamatan(identity.kecamatan),
    religion: maskReligion(identity.religion),
    gender: maskGender(identity.gender),
  };
}

export const COLLAPSED_FIELDS = [
  "nik",
  "dateOfBirth",
  "occupation",
  "address",
  "maritalStatus",
] as const;

export const EXPANDED_FIELDS = [
  "rtRw",
  "kelurahan",
  "kecamatan",
  "religion",
  "gender",
] as const;
