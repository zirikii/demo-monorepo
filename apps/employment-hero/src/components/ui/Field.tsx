import { useId } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const controlClass =
  "h-11 w-full rounded-eh border border-eh-line bg-white px-4 text-sm text-eh-ink outline-none transition placeholder:text-eh-ink-ghost focus:border-eh-purple focus:ring-2 focus:ring-eh-purple/25";

export function Field({
  label,
  hint,
  error,
  ...rest
}: { label: string; hint?: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-eh-ink">
        {label}
      </label>
      <input
        id={id}
        className={cn(controlClass, error && "border-eh-critical focus:border-eh-critical")}
        aria-describedby={hint ? `${id}-hint` : undefined}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-eh-ink-faint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs font-medium text-eh-critical">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SelectField({
  label,
  children,
  ...rest
}: { label: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-eh-ink">
        {label}
      </label>
      <select id={id} className={cn(controlClass, "pr-8")} {...rest}>
        {children}
      </select>
    </div>
  );
}

export function TextAreaField({
  label,
  rows = 4,
  ...rest
}: { label: string; rows?: number } & InputHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-eh-ink">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={cn(controlClass, "h-auto py-3 leading-relaxed")}
        {...rest}
      />
    </div>
  );
}
