export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-eh-lg border border-dashed border-line bg-surface-soft px-6 py-12 text-center">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{body}</p>
    </div>
  );
}
