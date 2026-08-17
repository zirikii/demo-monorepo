import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { findLegalPage } from "@/data/company";
import { formatLongDate } from "@/lib/format";

export default function LegalPage() {
  const { slug = "" } = useParams();
  const page = findLegalPage(slug);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageLayout title={page.title}>
      <PageHero
        eyebrow="Legal"
        title={page.title}
        body={`Last updated ${formatLongDate(page.updated)}`}
        crumbs={[{ label: "Home", to: "/" }, { label: page.title }]}
      />

      <Section>
        <div className="flex max-w-3xl flex-col gap-10">
          {page.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="font-display text-2xl font-semibold text-ink-strong">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[1.05rem] leading-[1.75] text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
