import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  body?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, body, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-h24-lg border border-dashed border-line bg-surface-tint px-6 py-12 text-center",
        className,
      )}
    >
      <p className="font-display text-lg font-semibold text-ink-strong">{title}</p>
      {body ? <p className="max-w-md text-sm text-ink-soft">{body}</p> : null}
      {action}
    </div>
  );
}
