import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary" | "pill";
type Size = "regular" | "tiny";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

/**
 * `molecules/button` — the primary variant carries the bevel + top light sheen that
 * every filled GoPay button uses.
 */
export function Button({
  variant = "primary",
  size = "regular",
  fullWidth = true,
  className,
  children,
  ...props
}: ButtonProps) {
  const base = cn(
    "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-[24px] text-center",
    "disabled:cursor-not-allowed disabled:opacity-40",
    size === "regular"
      ? "h-[44px] px-[16px] py-[12px] text-[16px] leading-[20px] font-bold"
      : "px-[16px] py-[8px] text-[14px] leading-[20px] font-bold",
    fullWidth && "w-full",
  );

  if (variant === "primary") {
    return (
      <button type="button" className={cn(base, "bg-fill-active text-type-static-white", className)} {...props}>
        <span aria-hidden className="light-sheen pointer-events-none absolute inset-0 rounded-[24px]" />
        <span className="relative">{children}</span>
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        type="button"
        className={cn(base, "light-sheen-strong border border-fill-active text-fill-active", className)}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        className={cn(
          "text-type-body border-border-mute bg-fill-primary cursor-pointer rounded-[24px] border px-[12px] py-[8px] text-[14px] leading-[20px]",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "text-fill-active flex w-full cursor-pointer items-center justify-center px-[16px] py-[8px] text-center text-[14px] leading-[20px] font-bold",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
