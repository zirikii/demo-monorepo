import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "teal" | "navy" | "neutral" | "positive" | "caution" | "critical" | "info";

const TONES: Record<BadgeTone, string> = {
  teal: "bg-h24-tint text-h24-teal-dark",
  navy: "bg-h24-navy text-white",
  neutral: "bg-surface-deep text-ink-soft",
  positive: "bg-positive-tint text-positive",
  caution: "bg-caution-tint text-caution",
  critical: "bg-critical-tint text-critical",
  info: "bg-info-tint text-info",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "teal", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
