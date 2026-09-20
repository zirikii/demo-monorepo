import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const CONTROL =
  "w-full rounded-go border border-go-line bg-go-card px-4 py-3 text-sm text-white transition placeholder:text-go-faint focus-go focus:border-go-green";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-white">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="text-xs text-go-faint">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-xs font-semibold text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const TextInput = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  function TextInput({ className, ...props }, ref) {
    return <input ref={ref} className={cn(CONTROL, className)} {...props} />;
  },
);

export const TextArea = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<"textarea">>(
  function TextArea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn(CONTROL, "min-h-28 resize-y", className)} {...props} />;
  },
);

export const Select = forwardRef<HTMLSelectElement, ComponentPropsWithoutRef<"select">>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select ref={ref} className={cn(CONTROL, "appearance-none pr-10", className)} {...props}>
        {children}
      </select>
    );
  },
);
