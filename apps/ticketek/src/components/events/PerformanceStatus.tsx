import type { PerformanceStatus } from "@/data/types";
import { cn } from "@/lib/cn";

const LABELS: Record<PerformanceStatus, string> = {
  "on-sale": "On sale",
  "selling-fast": "Selling fast",
  "sold-out": "Sold out",
  cancelled: "Cancelled",
  rescheduled: "Rescheduled",
};

const TONES: Record<PerformanceStatus, string> = {
  "on-sale": "bg-positive-bg text-positive",
  "selling-fast": "bg-caution-bg text-caution",
  "sold-out": "bg-line-soft text-ink-soft",
  cancelled: "bg-critical-bg text-critical",
  rescheduled: "bg-tk-blue-tint text-tk-blue",
};

export function PerformanceStatusPill({ status, className }: { status: PerformanceStatus; className?: string }) {
  return <span className={cn("inline-block rounded-full px-2 py-0.5 text-xs font-semibold", TONES[status], className)}>{LABELS[status]}</span>;
}
