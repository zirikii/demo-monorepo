import { SearchX } from "lucide-react";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-cba-lg border border-dashed border-line bg-surface-tint px-6 py-12 text-center">
      <SearchX aria-hidden="true" className="mx-auto h-8 w-8 text-ink-ghost" />
      <p className="mt-3 text-base font-bold text-ink">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-ink-soft">{body}</p>
    </div>
  );
}
