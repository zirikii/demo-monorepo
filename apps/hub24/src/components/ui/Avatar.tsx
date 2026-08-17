import { initials } from "@/lib/format";
import { cn } from "@/lib/cn";

interface AvatarProps {
  name: string;
  className?: string;
  tone?: "blue" | "teal" | "navy";
}

const TONES = {
  blue: "bg-hub-tint text-hub-blue-dark",
  teal: "bg-hub-teal-tint text-hub-teal-dark",
  navy: "bg-hub-navy text-white",
} as const;

export function Avatar({ name, className, tone = "blue" }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
        TONES[tone],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
