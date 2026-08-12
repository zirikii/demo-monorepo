import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "purple" | "lime" | "neutral" | "positive" | "critical" | "amber";

const tones: Record<Tone, string> = {
  purple: "bg-eh-purple-tint text-eh-purple-deep",
  lime: "bg-eh-lime/40 text-eh-ink",
  neutral: "bg-eh-surface-deep text-eh-ink-soft",
  positive: "bg-eh-positive/12 text-eh-positive",
  critical: "bg-eh-critical/12 text-eh-critical",
  amber: "bg-eh-amber/20 text-[#8a5600]",
};

export function Badge({
  tone = "purple",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
