import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Tone = "yellow" | "black" | "neutral" | "positive" | "alert" | "info";

const tones: Record<Tone, string> = {
  yellow: "bg-cba-yellow text-black",
  black: "bg-black text-white",
  neutral: "bg-surface-grey text-ink-soft",
  positive: "bg-positive/10 text-positive",
  alert: "bg-alert/10 text-alert",
  info: "bg-info/10 text-info",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
