import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <PageLayout title="Page not found">
      <Section className="py-24 text-center">
        <p className="text-xs font-bold tracking-[0.16em] text-hub-teal uppercase">404</p>
        <h1 className="mt-3 font-serif text-4xl font-bold">We can’t find that page</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          The unofficial HUB24 demo doesn’t include every URL from hub24.com.au. Try the home page or AdviserHUB.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink to="/">Home</ButtonLink>
          <ButtonLink to="/login" variant="secondary">
            Login
          </ButtonLink>
        </div>
      </Section>
    </PageLayout>
  );
}
