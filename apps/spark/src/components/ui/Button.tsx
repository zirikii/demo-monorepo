import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "spark-focus inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-extrabold transition",
        variant === "primary" &&
          "bg-spark-purple text-white shadow-purple hover:bg-spark-purple-deep",
        variant === "secondary" &&
          "border-2 border-spark-purple bg-white text-spark-purple hover:bg-spark-lilac",
        variant === "ghost" && "bg-transparent text-spark-purple underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
