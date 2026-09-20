import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-go-lg border border-dashed border-line bg-surface-tint px-6 py-14 text-center">
      <SearchX aria-hidden="true" className="h-8 w-8 text-ink-ghost" />
      <p className="text-lg font-extrabold text-ink-strong">{title}</p>
      <p className="max-w-md text-sm text-ink-soft">{body}</p>
      {action}
    </div>
  );
}
