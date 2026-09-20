import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Pagination({
  page,
  pages,
  onChange,
  label,
}: {
  page: number;
  pages: number;
  onChange: (next: number) => void;
  label: string;
}) {
  if (pages <= 1) return null;

  return (
    <nav aria-label={label} className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="focus-go flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-go-green hover:text-go-green disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft aria-hidden="true" className="h-4 w-4" />
      </button>

      {Array.from({ length: pages }, (_, index) => index + 1).map((entry) => (
        <button
          key={entry}
          type="button"
          onClick={() => onChange(entry)}
          aria-current={entry === page ? "page" : undefined}
          className={cn(
            "focus-go h-10 min-w-10 rounded-full px-3 text-sm font-bold transition",
            entry === page
              ? "bg-ink-strong text-white"
              : "border border-line text-ink-soft hover:border-go-green hover:text-go-green",
          )}
        >
          {entry}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pages}
        aria-label="Next page"
        className="focus-go flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-go-green hover:text-go-green disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </nav>
  );
}
