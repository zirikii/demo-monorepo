import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardTone = "default" | "success" | "danger" | "brand" | "night";

const TONES: Record<CardTone, string> = {
  default: "border-line-soft bg-white",
  success: "border-positive/25 bg-positive-bg",
  danger: "border-critical/30 bg-critical-bg",
  brand: "border-royal/20 bg-white",
  night: "border-transparent sm-night text-white",
};

export function CardShell({
  title,
  icon,
  tone = "default",
  aside,
  children,
  className,
}: {
  title?: string;
  icon?: ReactNode;
  tone?: CardTone;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-fade-up rounded-[20px] border p-4 text-sm shadow-card",
        TONES[tone],
        className,
      )}
    >
      {title && (
        <div
          className={cn(
            "mb-3 flex items-center gap-2 font-semibold",
            tone === "night" ? "text-white" : "text-heading",
          )}
        >
          {icon}
          <span className="min-w-0 flex-1">{title}</span>
          {aside}
        </div>
      )}
      {children}
    </div>
  );
}

export function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1">
      <span className="text-ink-soft">{label}</span>
      <span
        className={cn(
          "text-right",
          strong ? "text-base font-bold text-heading" : "font-semibold text-heading",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: "positive" | "critical" | "caution" | "neutral";
  children: ReactNode;
}) {
  const cls = {
    positive: "bg-positive-bg text-positive",
    critical: "bg-critical-bg text-critical",
    caution: "bg-caution-bg text-caution",
    neutral: "bg-canvas text-ink-soft",
  }[tone];
  return <span className={cn("pill shrink-0 text-[11px]", cls)}>{children}</span>;
}
