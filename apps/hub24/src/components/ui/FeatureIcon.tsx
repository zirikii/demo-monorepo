import {
  BarChart3,
  Clock3,
  Gauge,
  Layers,
  Lock,
  Plug,
  Receipt,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { FeatureIconName } from "@/data/types";
import { cn } from "@/lib/cn";

const ICONS = {
  layers: Layers,
  gauge: Gauge,
  shield: ShieldCheck,
  chart: BarChart3,
  clock: Clock3,
  sparkles: Sparkles,
  users: Users,
  receipt: Receipt,
  plug: Plug,
  lock: Lock,
} as const satisfies Record<FeatureIconName, unknown>;

interface FeatureIconProps {
  name: FeatureIconName;
  className?: string;
  tone?: "blue" | "teal" | "inverse";
}

const TONES = {
  blue: "bg-hub-tint text-hub-blue",
  teal: "bg-hub-teal-tint text-hub-teal-dark",
  inverse: "bg-white/10 text-hub-teal-soft",
} as const;

export function FeatureIcon({ name, className, tone = "blue" }: FeatureIconProps) {
  const Icon = ICONS[name];
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-hub",
        TONES[tone],
        className,
      )}
    >
      <Icon aria-hidden className="h-5 w-5" />
    </span>
  );
}
