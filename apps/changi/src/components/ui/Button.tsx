import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
const variants: Record<Variant, string> = {
  primary: "bg-[#806d5d] text-white hover:bg-[#665448]",
  secondary: "bg-white text-[#2f271f] ring-1 ring-[#d8cabb] hover:bg-[#fbf8f4]",
  ghost: "text-[#806d5d] hover:bg-[#f0e7dd]",
};

export function Button({ children, className, variant = "primary", ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }>) {
  return <button className={cn("focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition", variants[variant], className)} {...props}>{children}</button>;
}

export function ButtonLink({ children, className, variant = "primary", ...props }: PropsWithChildren<LinkProps & { variant?: Variant }>) {
  return <Link className={cn("focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition", variants[variant], className)} {...props}>{children}</Link>;
}
