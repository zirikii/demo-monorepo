import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <PageLayout title="Page not found">
      <Section>
        <div className="flex flex-col items-start gap-6 py-10">
          <span className="text-xs font-extrabold tracking-[0.2em] text-go-green uppercase">
            404
          </span>
          <h1 className="display-go text-4xl text-ink-strong sm:text-5xl">
            That page took a different route.
          </h1>
          <p className="max-w-xl text-lg text-ink-soft">
            The link may be old, or the page may never have existed in this demo. Try the product
            portfolio or the open roles instead.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/">Back home</ButtonLink>
            <ButtonLink to="/products" variant="secondary">
              Products
            </ButtonLink>
            <ButtonLink to="/join-us" variant="secondary">
              Join us
            </ButtonLink>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
