import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number;
  label: string;
  className?: string;
  tone?: "blue" | "teal";
}

export function ProgressBar({ value, label, className, tone = "blue" }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-deep", className)}
    >
      <div
        className={cn("h-full rounded-full", tone === "blue" ? "bg-hub-blue" : "bg-hub-teal")}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
