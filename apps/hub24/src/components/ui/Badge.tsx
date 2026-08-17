import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone =
  "blue" | "teal" | "neutral" | "positive" | "critical" | "caution" | "inverse";

const TONES: Record<BadgeTone, string> = {
  blue: "bg-hub-tint text-hub-blue-dark",
  teal: "bg-hub-teal-tint text-hub-teal-dark",
  neutral: "bg-surface-deep text-ink-soft",
  positive: "bg-positive-tint text-positive",
  critical: "bg-critical-tint text-critical",
  caution: "bg-caution-tint text-caution",
  inverse: "bg-white/15 text-white",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "blue", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
