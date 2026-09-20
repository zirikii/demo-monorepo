import { ButtonLink } from "@/components/ui/Button";
import { PageLayout } from "@/components/layout/PageLayout";

export default function NotFoundPage() {
  return (
    <PageLayout title="Not found">
      <section className="mx-auto max-w-3xl px-4 py-24">
        <p className="text-sm tracking-[0.2em] text-go-green uppercase">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">This route is not on the Super App map.</h1>
        <p className="mt-4 text-go-muted">The dummy gojek.io clone does not have that page.</p>
        <ButtonLink to="/" className="mt-8">
          Back home
        </ButtonLink>
      </section>
    </PageLayout>
  );
}
