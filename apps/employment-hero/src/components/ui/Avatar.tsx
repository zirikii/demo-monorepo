import { formatInitials } from "@/lib/format";
import { cn } from "@/lib/cn";

const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
};

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-eh-purple-tint font-semibold text-eh-purple-deep",
        sizes[size],
        className,
      )}
    >
      {formatInitials(name)}
    </span>
  );
}
