import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { tintBg } from "@/lib/tints";
import type { CustomerStory } from "@/data/stories";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export function StoryCard({ story }: { story: CustomerStory }) {
  return (
    <Link
      to={`/customer-stories/${story.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-deep bg-card shadow-card transition-shadow hover:shadow-float"
    >
      <div className={cn("p-6", tintBg[story.tint])}>
        <p className="font-heading text-sm font-semibold text-navy/70">{story.customer}</p>
        <p className="mt-2 font-heading text-4xl font-semibold text-navy">{story.heroStat.stat}</p>
        <p className="mt-1 text-sm text-navy/70">{story.heroStat.label}</p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Badge tint={story.tint}>{story.industryLabel}</Badge>
        <h3 className="mt-3 flex-1 text-lg font-semibold leading-snug text-navy group-hover:underline">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">{story.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
          Read the story
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
