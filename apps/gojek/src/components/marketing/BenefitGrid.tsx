import {
  Award,
  BookOpen,
  Brain,
  Clock,
  Fuel,
  Heart,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { Benefit } from "@/data/benefits";
import { cn } from "@/lib/cn";

const icons: Record<string, LucideIcon> = {
  heart: Heart,
  sparkles: Sparkles,
  brain: Brain,
  book: BookOpen,
  clock: Clock,
  wallet: Wallet,
  shield: ShieldCheck,
  fuel: Fuel,
  award: Award,
  users: Users,
  layout: LayoutDashboard,
  trending: TrendingUp,
};

export function BenefitGrid({
  items,
  accent = "text-gojek",
  columns = 3,
}: {
  items: Benefit[];
  accent?: string;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
      )}
    >
      {items.map((benefit) => {
        const Icon = icons[benefit.icon] ?? Sparkles;
        return (
          <div
            key={benefit.title}
            className="flex h-full flex-col rounded-2xl border border-line bg-card p-6"
          >
            <Icon aria-hidden="true" className={cn("h-7 w-7", accent)} />
            <h3 className="mt-4 text-lg font-bold text-ink">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{benefit.body}</p>
          </div>
        );
      })}
    </div>
  );
}
