import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  className?: string;
}

export function StatCard({ icon: Icon, label, value, hint, className }: StatCardProps) {
  return (
    <div className={cn("rounded-2xl border border-line bg-white p-5 shadow-card", className)}>
      <div className="flex items-center gap-2 text-ink-muted">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold text-spark-ink">{value}</p>
      {hint ? <p className="mt-1 text-sm text-ink-secondary">{hint}</p> : null}
    </div>
  );
}
