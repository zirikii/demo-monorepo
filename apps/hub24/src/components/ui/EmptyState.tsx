import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  body: string;
}

export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-hub-lg border border-dashed border-line bg-surface-tint px-6 py-12 text-center">
      <SearchX aria-hidden className="h-8 w-8 text-ink-ghost" />
      <p className="text-lg font-bold text-ink-strong">{title}</p>
      <p className="max-w-md text-ink-faint">{body}</p>
    </div>
  );
}
