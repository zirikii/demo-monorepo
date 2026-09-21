import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "ghost" | "outline" | "muted";

const styles: Record<Variant, string> = {
  primary:
    "bg-gopay-active text-static-white shadow-pill hover:bg-gopay-active-press disabled:bg-bg-quaternary disabled:text-text-body disabled:shadow-none",
  ghost: "bg-transparent text-gopay-active",
  outline: "border border-gopay-active bg-card text-gopay-active",
  muted: "bg-bg-quaternary text-text-body",
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type={type}
      className={cn(
        "flex h-12 w-full items-center justify-center rounded-full px-4 text-title-small font-bold transition-colors",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
