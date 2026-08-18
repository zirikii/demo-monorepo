import { Trophy } from "lucide-react";
import { AWARDS } from "@/data/features";

export function AwardStrip({ limit = 6 }: { limit?: number }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {AWARDS.slice(0, limit).map((award) => (
        <li
          key={award.title}
          className="flex gap-3 rounded-hub-lg border border-line bg-white p-5 shadow-hub"
        >
          <Trophy aria-hidden className="h-5 w-5 shrink-0 text-hub-teal" />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-ink-strong">{award.title}</span>
            <span className="text-sm text-ink-faint">
              {award.year} {award.source}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
