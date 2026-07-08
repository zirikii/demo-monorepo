/** Indian mobile numbers: 10 digits, starting 6-9. */
export function isValidMobile(value: string): boolean {
  return /^[6-9]\d{9}$/.test(value.replace(/\s/g, ""));
}

/** Recharge amount: whole rupees between ₹10 and ₹10,000. */
export function isValidAmount(value: string): boolean {
  if (!/^\d+$/.test(value.trim())) return false;
  const n = Number(value);
  return n >= 10 && n <= 10_000;
}

/** Consumer/account numbers used by boards & lenders: 6–16 alphanumerics. */
export function isValidConsumerNumber(value: string): boolean {
  return /^[A-Za-z0-9]{6,16}$/.test(value.trim());
}

/** Indian vehicle registration, e.g. DL01AB1234 / KA05MN0007. */
export function isValidVehicleNumber(value: string): boolean {
  return /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/i.test(value.replace(/[\s-]/g, ""));
}

/** 10-char IRCTC-style PNR. */
export function isValidPnr(value: string): boolean {
  return /^\d{10}$/.test(value.trim());
}

/** Simple email check for demo forms. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
