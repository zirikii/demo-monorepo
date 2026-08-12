import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function TextField({
  label,
  className,
  id,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="block" htmlFor={fieldId}>
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <input
        id={fieldId}
        className={cn(
          "focus-eh w-full rounded-eh-md border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-faint",
          className,
        )}
        {...props}
      />
    </label>
  );
}
