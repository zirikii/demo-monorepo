import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { GlobeMark } from "@/components/brand/GlobeMark";

export function NotFoundPage() {
  return (
    <PageLayout>
      <section className="changi-aurora flex min-h-[60vh] items-center bg-plum text-white">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <GlobeMark size={72} className="mx-auto" />
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-white/70">
            Error 404
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">This gate doesn&apos;t exist</h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/80">
            The page you were looking for may have departed. Let&apos;s get you back on course.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/" variant="primary-dark" withArrow>
              Back to home
            </Button>
            <Button to="/fly/flights" variant="secondary-dark">
              Check flights
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
