import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number;
  label: string;
  tone?: "teal" | "navy";
  className?: string;
}

export function ProgressBar({ value, label, tone = "teal", className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-deep", className)}
    >
      <div
        className={cn("h-full rounded-full", tone === "teal" ? "bg-h24-teal" : "bg-h24-navy")}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
