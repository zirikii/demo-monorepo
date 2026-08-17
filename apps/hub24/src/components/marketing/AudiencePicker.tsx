import { AUDIENCES } from "@/data/audiences";
import type { AudienceId } from "@/data/types";
import { cn } from "@/lib/cn";

interface AudiencePickerProps {
  value: AudienceId;
  onChange: (id: AudienceId) => void;
}

export function AudiencePicker({ value, onChange }: AudiencePickerProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-white/70">I am an</p>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Audience">
        {AUDIENCES.map((audience) => {
          const selected = audience.id === value;
          return (
            <button
              key={audience.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={cn(
                "focus-hub rounded-full border px-3.5 py-1.5 text-sm font-semibold transition",
                selected
                  ? "border-white bg-white text-hub-navy"
                  : "border-white/25 text-white/80 hover:border-white/60 hover:text-white",
              )}
              onClick={() => onChange(audience.id)}
            >
              {audience.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
