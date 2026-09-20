import { useMemo, useState } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { POSTS, POST_TAGS, postsByTag } from "@/data/posts";
import { cn } from "@/lib/cn";

export default function BlogPage() {
  const [tag, setTag] = useState("all");
  const posts = useMemo(() => postsByTag(tag), [tag]);

  return (
    <PageLayout title="Blogs & News">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm tracking-[0.2em] text-go-green uppercase">Blogs & News</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          Engineering notes from the Super App.
        </h1>
        <p className="mt-5 max-w-2xl text-go-muted">
          {POSTS.length} public essays — Courier, Darkroom, Atlas, why we ask for code, and the rest of the firehose.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {POST_TAGS.map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "focus-go rounded-full px-3 py-1.5 text-sm",
                tag === item ? "bg-white text-black" : "bg-white/6 text-go-muted",
              )}
              onClick={() => setTag(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
