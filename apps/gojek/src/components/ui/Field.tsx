import { cn } from "@/lib/cn";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

const controlBase =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-gojek focus:ring-2 focus:ring-gojek/30";

export function TextField({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
}) {
  const inputId = id ?? props.name ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(controlBase, error && "border-food focus:border-food focus:ring-food/30")}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-xs font-medium text-food">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-ink-faint">{hint}</p>
      ) : null}
    </div>
  );
}

export function SelectField({
  label,
  children,
  className,
  id,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
}) {
  const selectId = id ?? props.name ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className={className}>
      <label htmlFor={selectId} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <select id={selectId} className={cn(controlBase, "appearance-none")} {...props}>
        {children}
      </select>
    </div>
  );
}
