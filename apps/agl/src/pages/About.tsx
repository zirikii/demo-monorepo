import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const stats = [
  { value: "1837", label: "Year AGL was founded, as The Australian Gas Light Company" },
  { value: "4.5m+", label: "Customer services across energy, internet and mobile" },
  { value: "12GW", label: "Target renewable and firming capacity by 2035" },
];

export function AboutPage() {
  useDocumentTitle("About AGL");
  return (
    <PageLayout>
      <PageHero crumbs={[{ label: "About AGL" }]} eyebrow="About AGL" title="Progressing a sustainable future for all" intro="We've been powering Australian homes and businesses for more than 185 years." />
      <Section>
        <dl className="grid gap-5 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.value} className="rounded-agl-lg bg-agl-sky p-6">
              <dt className="text-4xl font-extrabold text-agl-blue-dark">{s.value}</dt>
              <dd className="mt-1 text-ink-soft">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section tone="tint" id="sustainability" title="Sustainability">
        <p className="max-w-3xl text-ink-soft">
          Our Climate Transition Action Plan sets out how we’ll close our coal-fired power stations and invest in renewables, batteries and
          firming to support Australia’s energy transition.
        </p>
      </Section>
      <Section id="careers" title="Careers">
        <p className="max-w-3xl text-ink-soft">Join a team of more than 4,000 people building a lower-carbon energy future.</p>
      </Section>
      <Section tone="tint" id="privacy" title="Privacy, terms and accessibility">
        <p id="terms" className="max-w-3xl text-ink-soft">
          This is an unofficial demo recreation. No real personal information is collected; demo sessions are stored in your browser only.
        </p>
        <p id="accessibility" className="mt-3 max-w-3xl text-ink-soft">
          We aim to meet WCAG 2.2 AA. The assistant supports keyboard use, screen readers and a text fallback in voice mode.
        </p>
      </Section>
    </PageLayout>
  );
}
