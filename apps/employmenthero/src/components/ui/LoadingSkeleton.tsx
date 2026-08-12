import { cn } from "@/lib/cn";

interface LoadingSkeletonProps {
  rows?: number;
  className?: string;
}

export function LoadingSkeleton({ rows = 3, className }: LoadingSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} aria-hidden>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-4 animate-pulse rounded-full bg-surface-deep"
          style={{ width: `${100 - index * 12}%` }}
        />
      ))}
    </div>
  );
}
