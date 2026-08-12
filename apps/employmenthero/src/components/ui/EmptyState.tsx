import { SearchX } from "lucide-react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  body: string;
  className?: string;
}

export function EmptyState({ title, body, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-eh-lg border border-dashed border-line bg-surface-tint px-6 py-14 text-center",
        className,
      )}
    >
      <SearchX aria-hidden className="h-8 w-8 text-ink-ghost" />
      <p className="text-lg font-bold text-ink-strong">{title}</p>
      <p className="max-w-md text-sm text-ink-soft">{body}</p>
    </div>
  );
}
