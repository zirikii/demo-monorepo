import { useState } from "react";
import { Play, X } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { Badge } from "@/components/ui/Badge";
import { demoVideos, type DemoVideo } from "@/data/company";
import { tintBg } from "@/lib/tints";
import { cn } from "@/lib/cn";

export function DemosPage() {
  const [active, setActive] = useState<DemoVideo | null>(null);

  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Demo videos" }]} />
      <PageHero
        eyebrow="Demo videos"
        title="Watch the platform in action"
        copy="Short, capability-by-capability walkthroughs recorded by our product team. (Demo build: players are simulated.)"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoVideos.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActive(video)}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-deep bg-card text-left shadow-card transition-shadow hover:shadow-float"
            >
              <div className={cn("relative flex h-44 items-center justify-center", tintBg[video.tint])}>
                <span className="flex size-14 items-center justify-center rounded-full bg-navy text-mint transition-transform group-hover:scale-110">
                  <Play className="ml-0.5 size-6" aria-hidden />
                </span>
                <span className="absolute bottom-3 right-3 rounded-md bg-navy/80 px-2 py-0.5 text-xs font-semibold text-white">
                  {video.duration}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Badge tint={video.tint}>{video.product}</Badge>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-navy group-hover:underline">
                  {video.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{video.copy}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-card p-6 shadow-float"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold text-navy">{active.title}</h2>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close video"
                className="rounded-lg p-1.5 text-navy hover:bg-cream-alt"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className={cn("mt-4 flex h-64 items-center justify-center rounded-xl", tintBg[active.tint])}>
              <div className="text-center">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-navy text-mint">
                  <Play className="ml-1 size-7" aria-hidden />
                </span>
                <p className="mt-4 text-sm font-medium text-navy/70">
                  Simulated player — this is a demo build with no real video assets.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{active.copy}</p>
          </div>
        </div>
      )}

      <CtaSection
        title="Prefer a live demo?"
        copy="Bring your own content and questions — we'll drive the platform on a call."
      />
    </PageLayout>
  );
}
