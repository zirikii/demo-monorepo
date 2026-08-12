import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const CONTROL =
  "w-full rounded-eh border border-line bg-white px-4 py-3 text-[0.95rem] text-ink transition placeholder:text-ink-ghost focus-eh focus:border-eh-purple";

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
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink-strong">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="text-xs text-ink-faint">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-xs font-semibold text-critical">
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
    return <textarea ref={ref} className={cn(CONTROL, "min-h-32 resize-y", className)} {...props} />;
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
