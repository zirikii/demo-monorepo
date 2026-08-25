import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <PageLayout title="Page not found">
      <Section className="py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-strong md:text-4xl">
            Page not found
          </h1>
          <p className="text-[1.05rem] leading-relaxed text-ink-soft">
            That URL is not part of this demo. Head home, or open Jira, resources, or support from
            the header.
          </p>
          <ButtonLink to="/" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </Section>
    </PageLayout>
  );
}
