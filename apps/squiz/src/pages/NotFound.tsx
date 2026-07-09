import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";

export function NotFoundPage() {
  return (
    <PageLayout>
      <section className="squiz-lines">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-4 py-24 sm:px-6 lg:py-36">
          <p className="font-heading text-7xl font-semibold text-mint sm:text-8xl">404</p>
          <h1 className="mt-4 text-3xl font-semibold text-navy sm:text-5xl">
            This page took a headless approach
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ink-soft">
            The page you&rsquo;re after doesn&rsquo;t exist — or moved without leaving a redirect
            map. Let&rsquo;s get you somewhere useful.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button to="/" size="lg" withArrow>
              Back to the homepage
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
