import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "brand" | "neutral" | "positive" | "info" | "caution" | "inverse";

const TONES: Record<BadgeTone, string> = {
  brand: "bg-go-green-tint text-go-green-deep",
  neutral: "bg-surface-deep text-ink-soft",
  positive: "bg-positive-tint text-positive",
  info: "bg-info-tint text-info",
  caution: "bg-caution-tint text-caution",
  inverse: "bg-white/10 text-white",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
