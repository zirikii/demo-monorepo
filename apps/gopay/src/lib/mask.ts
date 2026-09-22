import { ON_FILE, ON_FILE_MASKED, type Identity, type MaskedIdentity } from "@/data/identity";

/** NIK shows the first 4 and last 4 digits. 16-digit NIK → 8 stars in the middle. */
export function maskNik(nik: string): string {
  if (nik.length <= 8) return nik;
  const stars = "*".repeat(nik.length - 8);
  return `${nik.slice(0, 4)}${stars}${nik.slice(-4)}`;
}

export function maskName(fullName: string): string {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1)}***`)
    .join(" ");
}

function maskToken(token: string): string {
  if (token.length <= 4) return `${token.slice(0, 1)}***`;
  return `${token.slice(0, 2)}***${token.slice(-2)}`;
}

/** Middle-of-value mask used once the on-file Figma strings no longer apply. */
export function maskLoose(value: string): string {
  const parts = value.split(" ");
  if (parts.length === 1) return maskToken(value);
  const [first, ...rest] = parts;
  if (!first) return value;
  return [first, ...rest.map(maskToken)].join(" ");
}

export function maskedIdentity(identity: Identity): MaskedIdentity {
  if (identity.nik === ON_FILE.nik && identity.address === ON_FILE.address) {
    return ON_FILE_MASKED;
  }
  return {
    fullName: maskName(identity.fullName),
    nik: maskNik(identity.nik),
    dateOfBirth: maskLoose(identity.dateOfBirth),
    occupation: maskLoose(identity.occupation),
    address: maskLoose(identity.address),
    maritalStatus: maskLoose(identity.maritalStatus),
    rtRw: identity.rtRw.includes("/")
      ? `${identity.rtRw.split("/")[0] ?? ""}/***`
      : maskLoose(identity.rtRw),
    kelurahan: maskLoose(identity.kelurahan),
    kecamatan: maskLoose(identity.kecamatan),
    religion: maskLoose(identity.religion),
    gender: maskLoose(identity.gender),
  };
}
