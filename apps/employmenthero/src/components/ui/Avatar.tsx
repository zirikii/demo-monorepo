import { initials } from "@/lib/format";
import { cn } from "@/lib/cn";

const TONES = [
  "bg-eh-tint text-eh-purple-dark",
  "bg-info-tint text-info",
  "bg-positive-tint text-positive",
  "bg-caution-tint text-caution",
  "bg-eh-tint-strong text-eh-purple-deep",
];

function toneFor(name: string): string {
  const sum = Array.from(name).reduce((total, char) => total + char.charCodeAt(0), 0);
  return TONES[sum % TONES.length] ?? TONES[0]!;
}

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-lg",
} as const;

export function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold",
        SIZES[size],
        toneFor(name),
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
