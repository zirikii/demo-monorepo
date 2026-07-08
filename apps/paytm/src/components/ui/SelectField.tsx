import type { SelectHTMLAttributes } from "react";
import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export function SelectField({
  label,
  options,
  placeholder,
  error,
  className,
  id,
  ...props
}: SelectFieldProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={selectId} className="text-xs font-medium text-ink-soft">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={Boolean(error) || undefined}
          className={cn(
            "w-full appearance-none border-b bg-transparent pb-2 pr-6 text-sm text-ink outline-none",
            "focus:border-paytm-cyan",
            error ? "border-danger" : "border-hairline",
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1 h-4 w-4 text-ink-faint"
        />
      </div>
      {error ? (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
