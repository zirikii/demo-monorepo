import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-spark-purple-light px-2.5 py-0.5 text-xs font-semibold text-spark-purple",
        className,
      )}
    >
      {children}
    </span>
  );
}
