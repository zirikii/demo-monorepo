import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function CardShell({ title, icon, tone = "default", children, className }: {
  title?: string;
  icon?: ReactNode;
  tone?: "default" | "success" | "danger" | "sky";
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    default: "border-line-soft bg-white",
    success: "border-positive/25 bg-positive-bg",
    danger: "border-critical/30 bg-critical-bg",
    sky: "border-agl-sky-deep bg-agl-sky",
  };
  return (
    <div className={cn("rounded-2xl border p-4 text-sm shadow-[0_1px_2px_rgba(0,16,51,0.06)]", tones[tone], className)}>
      {title && (
        <div className="mb-3 flex items-center gap-2 font-extrabold text-ink">
          {icon}
          <span>{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

export function Row({ label, value, strong }: { label: string; value: ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1">
      <span className="text-ink-soft">{label}</span>
      <span className={cn("text-right", strong ? "text-base font-extrabold text-ink" : "font-semibold text-ink")}>{value}</span>
    </div>
  );
}
