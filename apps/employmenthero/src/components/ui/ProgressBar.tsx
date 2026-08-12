import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number;
  label?: string;
  tone?: "purple" | "positive" | "caution";
  className?: string;
}

const TONES = {
  purple: "bg-eh-purple",
  positive: "bg-positive",
  caution: "bg-caution",
} as const;

export function ProgressBar({ value, label, tone = "purple", className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label ? (
        <div className="flex items-center justify-between text-xs font-semibold text-ink-faint">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-deep"
      >
        <div className={cn("h-full rounded-full transition-all", TONES[tone])} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
