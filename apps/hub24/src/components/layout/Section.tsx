import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "white" | "tint" | "navy" | "teal";

const TONES: Record<Tone, string> = {
  white: "bg-white",
  tint: "bg-surface-tint",
  navy: "bg-h24-navy text-white",
  teal: "bg-h24-teal text-white",
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
    <section id={id} className={cn("py-16 md:py-20", TONES[tone], className)}>
      <div className={cn(wide ? "container-h24-wide" : "container-h24", innerClassName)}>{children}</div>
    </section>
  );
}
