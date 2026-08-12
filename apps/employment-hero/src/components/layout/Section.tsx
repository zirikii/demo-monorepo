import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "soft" | "purple";
}) {
  const tones = {
    white: "bg-white",
    soft: "bg-surface-soft",
    purple: "hero-purple text-white",
  };
  return <section className={cn("py-16 sm:py-20", tones[tone], className)}>{children}</section>;
}
