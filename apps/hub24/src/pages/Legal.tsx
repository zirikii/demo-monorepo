import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { PRIVACY_SECTIONS, TERMS_SECTIONS } from "@/data/legal";

export default function LegalPage({ variant }: { variant: "privacy" | "terms" }) {
  const title = variant === "privacy" ? "Privacy policy" : "Website terms of use";
  const sections = variant === "privacy" ? PRIVACY_SECTIONS : TERMS_SECTIONS;

  return (
    <PageLayout title={title}>
      <Section className="py-16">
        <h1 className="font-serif text-4xl font-bold">{title}</h1>
        <div className="mt-10 max-w-2xl space-y-8">
          {sections.map((section) => (
            <article key={section.heading}>
              <h2 className="text-xl font-bold">{section.heading}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{section.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
