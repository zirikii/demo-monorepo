import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "blue" | "sky" | "positive" | "caution" | "critical" | "neutral";

const tones: Record<Tone, string> = {
  blue: "bg-agl-blue text-white",
  sky: "bg-agl-sky text-agl-blue-dark",
  positive: "bg-positive-bg text-positive",
  caution: "bg-caution-bg text-caution",
  critical: "bg-critical-bg text-critical",
  neutral: "bg-surface-deep text-ink-soft",
};

export function Badge({ tone = "sky", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold", tones[tone], className)}>
      {children}
    </span>
  );
}
