import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "yellow" | "dark" | "positive" | "critical" | "info" | "muted";

const tones: Record<BadgeTone, string> = {
  yellow: "bg-cba-yellow text-ink",
  dark: "bg-ink text-surface",
  positive: "bg-positive/10 text-positive",
  critical: "bg-critical/10 text-critical",
  info: "bg-info/10 text-info",
  muted: "bg-surface-tint text-ink-soft",
};

export function Badge({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
