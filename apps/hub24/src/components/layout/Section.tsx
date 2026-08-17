import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "surface" | "tint" | "navy" | "deep";

const TONES: Record<Tone, string> = {
  surface: "bg-white",
  tint: "bg-surface-tint",
  navy: "bg-hub-navy text-white",
  deep: "bg-hub-navy-deep text-white",
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  width?: "default" | "wide";
}

export function Section({
  children,
  tone = "surface",
  id,
  className,
  width = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-20", TONES[tone], className)}>
      <div className={width === "wide" ? "container-hub-wide" : "container-hub"}>{children}</div>
    </section>
  );
}
