import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  violet: "bg-violet-soft text-ink",
  coral: "bg-coral-soft text-ink",
  green: "bg-green-soft text-ink",
  blue: "bg-blue-soft text-ink",
  yellow: "bg-yellow-soft text-ink",
  neutral: "bg-neutral-soft text-ink-soft",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
