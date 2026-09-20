import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function NotFoundPage() {
  return (
    <PageLayout title="Page not found — Gojek (Demo)">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <img src="/brand/solv-green.svg" alt="" className="mb-6 h-16 w-auto" />
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-gojek">404</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 max-w-md text-ink-soft">
          The page you&apos;re looking for may have moved or never existed. Let&apos;s get you
          back on track.
        </p>
        <ButtonLink to="/" size="lg" className="mt-8">
          Back to home
        </ButtonLink>
      </Container>
    </PageLayout>
  );
}
