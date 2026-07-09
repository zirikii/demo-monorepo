import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Tone = "cyan" | "navy" | "green" | "amber" | "neutral";

const tones: Record<Tone, string> = {
  cyan: "bg-paytm-sky text-paytm-navy",
  navy: "bg-paytm-navy text-white",
  green: "bg-success/10 text-success",
  amber: "bg-warning/15 text-amber-700",
  neutral: "bg-surface text-ink-soft",
};

interface BadgeProps {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
