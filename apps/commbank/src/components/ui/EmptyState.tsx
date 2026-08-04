export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-surface px-6 py-10 text-center">
      <p className="text-base font-bold text-ink">{title}</p>
      <p className="mt-2 text-sm text-ink-soft">{body}</p>
    </div>
  );
}
