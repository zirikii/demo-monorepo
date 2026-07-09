/** Format a number as Indian Rupees, e.g. 123456.5 -> "₹1,23,456.50". */
export function formatInr(amount: number, opts: { decimals?: number } = {}): string {
  const { decimals = amount % 1 === 0 ? 0 : 2 } = opts;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/** Compact Indian notation: 1500000 -> "15 Lakh", 20000000 -> "2 Cr". */
export function formatIndianCompact(value: number): string {
  if (value >= 1_00_00_000) {
    const cr = value / 1_00_00_000;
    return `${trimTrailingZero(cr)} Cr`;
  }
  if (value >= 1_00_000) {
    const lakh = value / 1_00_000;
    return `${trimTrailingZero(lakh)} Lakh`;
  }
  if (value >= 1_000) {
    return `${trimTrailingZero(value / 1_000)}K`;
  }
  return String(value);
}

function trimTrailingZero(n: number): string {
  const fixed = n.toFixed(1);
  return fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed;
}

/** "2026-07-08" -> "8 Jul 2026" */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** "2026-07-08" -> "Wed, 8 Jul" */
export function formatDayDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

/** Today's date as an ISO yyyy-mm-dd string (local time). */
export function todayIso(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
}

/** Mask a mobile number for confirmation copy: 9876543210 -> "98765 43210". */
export function formatMobile(num: string): string {
  const digits = num.replace(/\D/g, "");
  if (digits.length !== 10) return num;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}

/** Minutes -> "2h 05m" duration label. */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}
