import {
  BarChart3,
  Clock,
  Globe2,
  GraduationCap,
  Heart,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import type { FeatureIcon as FeatureIconName } from "@/data/types";
import { cn } from "@/lib/cn";

const ICONS = {
  sparkles: Sparkles,
  users: Users,
  wallet: Wallet,
  shield: ShieldCheck,
  clock: Clock,
  chart: BarChart3,
  graduation: GraduationCap,
  globe: Globe2,
  heart: Heart,
  workflow: Workflow,
  search: Search,
  message: MessageSquare,
} as const;

interface FeatureIconProps {
  name: FeatureIconName;
  className?: string;
}

export function FeatureIcon({ name, className }: FeatureIconProps) {
  const Icon = ICONS[name];
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-eh bg-eh-tint text-eh-purple",
        className,
      )}
    >
      <Icon aria-hidden className="h-5 w-5" />
    </span>
  );
}
