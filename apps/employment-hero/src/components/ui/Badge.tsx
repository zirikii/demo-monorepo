import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  purple: "bg-eh-purple-tint text-eh-purple",
  soft: "bg-surface-deep text-ink-soft",
  success: "bg-green-100 text-positive",
  danger: "bg-red-100 text-critical",
  warn: "bg-amber-100 text-amber-800",
} as const;

export function Badge({
  children,
  tone = "purple",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}
