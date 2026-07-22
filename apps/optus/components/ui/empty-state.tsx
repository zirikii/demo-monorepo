import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function EmptyState({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-line bg-surface-subtle p-8 text-center",
        className,
      )}
    >
      <p className="font-semibold text-optus-ink">{title}</p>
      {description ? <p className="mt-1 text-sm text-optus-ink/60">{description}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
