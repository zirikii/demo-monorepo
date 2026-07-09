import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { posts } from "@/data/posts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/shared/PostCard";

/** Horizontally scrollable blog-card carousel with arrow controls. */
export function InsightsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Insights" title="Latest stories, news and insights" />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll insights left"
            className="flex size-11 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-navy hover:text-mint"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll insights right"
            className="flex size-11 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-navy hover:text-mint"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none -mx-4 mt-10 flex snap-x gap-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6"
      >
        {posts.slice(0, 6).map((post) => (
          <div key={post.slug} className="w-[320px] shrink-0 snap-start sm:w-[360px]">
            <PostCard post={post} />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button to="/blog" variant="secondary" withArrow>
          View more
        </Button>
      </div>
    </section>
  );
}
