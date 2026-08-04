import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

const control =
  "focus-cba w-full rounded-cba border border-line bg-surface px-3 py-2.5 text-[15px] text-ink placeholder:text-ink-ghost";

export function TextField({
  label,
  hint,
  error,
  prefix,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  prefix?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-bold text-ink">
        {label}
      </label>
      {hint ? <p className="mt-0.5 text-[13px] text-ink-faint">{hint}</p> : null}
      <div className="relative mt-1.5">
        {prefix ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-ink-soft"
          >
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          className={cn(control, prefix && "pl-7", error && "border-critical")}
          {...props}
        />
      </div>
      {error ? <p className="mt-1 text-[13px] font-bold text-critical">{error}</p> : null}
    </div>
  );
}

export function SelectField({
  label,
  hint,
  error,
  children,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-bold text-ink">
        {label}
      </label>
      {hint ? <p className="mt-0.5 text-[13px] text-ink-faint">{hint}</p> : null}
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(control, "mt-1.5", error && "border-critical")}
        {...props}
      >
        {children}
      </select>
      {error ? <p className="mt-1 text-[13px] font-bold text-critical">{error}</p> : null}
    </div>
  );
}

export function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div>
        <p className="text-[15px] font-bold text-ink">{label}</p>
        <p className="mt-0.5 text-sm text-ink-soft">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "focus-cba relative h-7 w-12 shrink-0 rounded-full transition-colors",
          checked ? "bg-ink" : "bg-surface-deep",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1 h-5 w-5 rounded-full bg-surface shadow transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}
