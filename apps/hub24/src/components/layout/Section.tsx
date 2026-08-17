import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "white" | "tint" | "navy" | "teal";

const TONES: Record<Tone, string> = {
  white: "bg-white",
  tint: "bg-surface-tint",
  navy: "bg-hub-navy-deep text-white",
  teal: "bg-hub-teal text-white",
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  innerClassName?: string;
  wide?: boolean;
}

export function Section({
  children,
  tone = "white",
  id,
  className,
  innerClassName,
  wide = false,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", TONES[tone], className)}>
      <div className={cn(wide ? "container-hub-wide" : "container-hub", innerClassName)}>{children}</div>
    </section>
  );
}
