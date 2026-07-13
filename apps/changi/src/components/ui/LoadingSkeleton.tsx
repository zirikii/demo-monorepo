import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  lines?: number;
};

export function LoadingSkeleton({ className, lines = 3 }: Props) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 animate-pulse rounded bg-line" style={{ width: `${90 - i * 12}%` }} />
      ))}
    </div>
  );
}
