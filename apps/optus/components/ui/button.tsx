import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optus-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-optus-teal text-white hover:bg-optus-teal-dark",
        secondary: "border border-optus-teal bg-white text-optus-teal-dark hover:bg-optus-teal-light",
        ghost: "bg-transparent text-optus-ink hover:bg-surface-muted",
        dark: "bg-optus-ink text-white hover:bg-optus-teal-dark",
        link: "h-auto bg-transparent px-0 text-optus-teal-dark underline-offset-4 hover:underline",
      },
      size: { default: "h-11 px-5", sm: "h-9 px-3", lg: "h-12 px-6" },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
