import { JoinUsBand } from "@/components/layout/JoinUsBand";
import { PageLayout } from "@/components/layout/PageLayout";
import { BENEFITS } from "@/data/benefits";
import { PRINCIPLES, WAYS_OF_WORKING } from "@/data/principles";
import { STORIES } from "@/data/stories";

export default function LifePage() {
  return (
    <PageLayout title="Life@Gojek">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm tracking-[0.2em] text-go-green uppercase">Culture</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
          We ardently believe failing is learning. If we&apos;re not failing, we&apos;re not doing it right.
        </h1>
      </section>
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold">Our ways of working</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {WAYS_OF_WORKING.map((item) => (
              <li key={item} className="border-t border-white/10 pt-4 text-go-muted">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <article key={principle.title} className="rounded-go-lg border border-white/8 bg-go-card p-6">
                <h3 className="text-xl font-semibold">{principle.title}</h3>
                <p className="mt-3 text-sm text-go-muted">{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold">We care for you</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li key={benefit.title}>
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-go-muted">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold">Our stories</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {STORIES.map((story) => (
              <li key={story.id} className="rounded-go-lg border border-white/8 bg-go-card p-6">
                <blockquote className="text-go-muted">&ldquo;{story.quote}&rdquo;</blockquote>
                <p className="mt-4 text-sm font-semibold">{story.name}</p>
                <p className="text-xs text-go-faint">
                  {story.role} · {story.hub}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JoinUsBand />
    </PageLayout>
  );
}
