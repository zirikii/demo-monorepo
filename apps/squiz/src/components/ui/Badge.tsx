import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTint = "mint" | "blue" | "purple" | "pink" | "orange" | "navy" | "outline";

const tints: Record<BadgeTint, string> = {
  mint: "bg-mint-tint text-navy border border-mint",
  blue: "bg-badge-blue text-navy border border-badge-blue",
  purple: "bg-badge-purple text-navy border border-badge-purple",
  pink: "bg-badge-pink text-navy border border-badge-pink",
  orange: "bg-badge-orange text-navy border border-badge-orange",
  navy: "bg-navy text-mint border border-navy",
  outline: "border border-navy/25 text-navy",
};

interface BadgeProps {
  tint?: BadgeTint;
  className?: string;
  children: ReactNode;
}

export function Badge({ tint = "mint", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tints[tint],
        className,
      )}
    >
      {children}
    </span>
  );
}
