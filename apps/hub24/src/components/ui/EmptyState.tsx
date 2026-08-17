import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  body: string;
  action?: ReactNode;
}

export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-hub-lg border border-dashed border-line bg-surface-tint px-6 py-10">
      <h3 className="text-lg font-bold text-ink-strong">{title}</h3>
      <p className="max-w-md text-sm leading-relaxed text-ink-soft">{body}</p>
      {action}
    </div>
  );
}
