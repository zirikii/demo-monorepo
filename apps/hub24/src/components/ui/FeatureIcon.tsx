import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface FeatureIconProps {
  icon: LucideIcon;
  tone?: "teal" | "navy" | "inverse";
  className?: string;
}

const TONES = {
  teal: "bg-h24-tint text-h24-teal-dark",
  navy: "bg-h24-navy text-h24-aqua",
  inverse: "bg-white/12 text-h24-aqua",
} as const;

export function FeatureIcon({ icon: Icon, tone = "teal", className }: FeatureIconProps) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-h24",
        TONES[tone],
        className,
      )}
    >
      <Icon aria-hidden className="h-6 w-6" />
    </span>
  );
}
