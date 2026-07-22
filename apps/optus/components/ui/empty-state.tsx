import { cn } from "@/lib/utils/cn";

export function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-dashed border-line bg-surface-subtle p-8 text-center", className)}>
      <p className="text-base font-semibold text-optus-ink">{title}</p>
      {description ? <p className="mt-2 text-sm text-optus-ink/70">{description}</p> : null}
    </div>
  );
}
