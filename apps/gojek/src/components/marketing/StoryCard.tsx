import { Quote } from "lucide-react";
import type { EmployeeStory } from "@/data/types";
import { initials } from "@/lib/format";

export function StoryCard({ story }: { story: EmployeeStory }) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-go-lg border border-line bg-white p-6">
      <Quote aria-hidden="true" className="h-6 w-6 text-go-green" />
      <blockquote className="text-base leading-relaxed text-ink">{story.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-2">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-go-green-tint text-sm font-extrabold text-go-green-deep"
        >
          {initials(story.name)}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-extrabold text-ink-strong">{story.name}</span>
          <span className="text-xs text-ink-faint">
            {story.role} · {story.office} · {story.years}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
