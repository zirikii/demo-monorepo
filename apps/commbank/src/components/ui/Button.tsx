import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "yellow" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-cba-blue text-white hover:bg-[#003d7a]",
  secondary: "bg-card text-ink border border-line hover:bg-surface",
  ghost: "bg-transparent text-ink hover:bg-surface",
  yellow: "bg-cba-yellow text-cba-black hover:bg-cba-yellow-deep font-bold",
  dark: "bg-cba-black text-white hover:bg-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
