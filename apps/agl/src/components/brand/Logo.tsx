import { cn } from "@/lib/cn";

type Props = { className?: string; variant?: "default" | "white" };

export function Logo({ className, variant = "default" }: Props) {
  return (
    <img
      src={variant === "white" ? "/brand/logo-white.png" : "/brand/logo.png"}
      alt="AGL"
      width={253}
      height={240}
      className={cn("h-11 w-auto select-none", className)}
      draggable={false}
    />
  );
}
