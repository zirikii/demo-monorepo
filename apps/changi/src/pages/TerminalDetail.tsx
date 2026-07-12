import { useParams } from "react-router-dom";
import { Check, Sparkles, Train } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { terminals } from "@/data/terminals";
import { NotFoundPage } from "./NotFound";

export function TerminalDetailPage() {
  const { terminal: slug } = useParams();
  const terminal = terminals.find((t) => t.slug === slug);

  if (!terminal) return <NotFoundPage />;

  return (
    <PageLayout>
      <PageHero
        eyebrow={terminal.name}
        title={terminal.tagline}
        copy={terminal.summary}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "At Changi", to: "/at-changi" },
          { label: terminal.name },
        ]}
      >
        <Button to="/fly/flights" variant="primary-dark" withArrow>
          Check flights at {terminal.code}
        </Button>
      </PageHero>

      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3">
          <div className="rounded-card border border-sand-deep bg-card p-7 shadow-card">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-badge-purple text-magenta">
              <Sparkles className="size-5" aria-hidden />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-ink">Highlights</h2>
            <ul className="mt-4 space-y-2.5">
              {terminal.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-sand-deep bg-card p-7 shadow-card">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-badge-amber text-amber-700">
              <Check className="size-5" aria-hidden />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-ink">Facilities & services</h2>
            <ul className="mt-4 space-y-2.5">
              {terminal.facilities.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-sand-deep bg-card p-7 shadow-card">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-badge-green text-emerald-700">
              <Train className="size-5" aria-hidden />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-ink">Getting here</h2>
            <ul className="mt-4 space-y-2.5">
              {terminal.transport.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
