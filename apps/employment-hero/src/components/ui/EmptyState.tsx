import { SearchX } from "lucide-react";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-eh-lg border border-dashed border-eh-line bg-eh-surface-tint px-6 py-14 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-eh-purple">
        <SearchX size={22} />
      </span>
      <p className="mt-4 text-lg font-semibold text-eh-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-eh-ink-soft">{body}</p>
    </div>
  );
}
