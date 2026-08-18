import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

const CONTROL =
  "w-full rounded-hub border border-line bg-white px-4 py-2.5 text-[0.95rem] text-ink outline-none transition focus:border-hub-blue focus-hub placeholder:text-ink-ghost";

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  children: (id: string) => ReactNode;
  className?: string;
}

export function Field({ label, hint, error, children, className }: FieldShellProps) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-bold text-ink-strong">
        {label}
      </label>
      {children(id)}
      {hint && !error ? <span className="text-xs text-ink-faint">{hint}</span> : null}
      {error ? (
        <span role="alert" className="text-xs font-semibold text-critical">
          {error}
        </span>
      ) : null}
    </div>
  );
}

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export function TextField({ label, hint, error, wrapperClassName, ...props }: InputProps) {
  return (
    <Field label={label} hint={hint} error={error} className={wrapperClassName}>
      {(id) => <input id={id} className={cn(CONTROL, error && "border-critical")} {...props} />}
    </Field>
  );
}

type SelectProps = ComponentPropsWithoutRef<"select"> & {
  label: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  wrapperClassName?: string;
};

export function SelectField({
  label,
  hint,
  error,
  options,
  wrapperClassName,
  ...props
}: SelectProps) {
  return (
    <Field label={label} hint={hint} error={error} className={wrapperClassName}>
      {(id) => (
        <select id={id} className={cn(CONTROL, error && "border-critical")} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export function TextAreaField({ label, hint, error, wrapperClassName, ...props }: TextAreaProps) {
  return (
    <Field label={label} hint={hint} error={error} className={wrapperClassName}>
      {(id) => (
        <textarea id={id} rows={4} className={cn(CONTROL, error && "border-critical")} {...props} />
      )}
    </Field>
  );
}
