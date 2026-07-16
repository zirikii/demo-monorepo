import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import type { PillarId } from "@/data/types";
import { pillars } from "@/data/pillars";

type Props = {
  children: ReactNode;
  pillar?: PillarId;
  tone?: "live" | "sponsored" | "neutral";
  className?: string;
};

export function Badge({ children, pillar, tone, className }: Props) {
  const toneClass =
    tone === "live"
      ? "bg-live text-white"
      : tone === "sponsored"
        ? "bg-surface-deep text-ink-soft"
        : tone === "neutral"
          ? "bg-surface text-ink-soft"
          : pillar
            ? cn(pillars[pillar].bg, "text-white")
            : "bg-surface text-ink-soft";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]",
        toneClass,
        className,
      )}
    >
      {children}
    </span>
  );
}
