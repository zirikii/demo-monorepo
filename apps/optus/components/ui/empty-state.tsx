export function EmptyState({ title, description }: { title: string; description?: string }) {
  return <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center"><p className="text-base font-bold text-optus-ink">{title}</p>{description ? <p className="mt-2 text-sm text-optus-ink/70">{description}</p> : null}</div>;
}
