import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { partnerTiers } from "@/data/company";

export function PartnershipsPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Partnerships" }]} />
      <PageHero
        eyebrow="Partnerships"
        title="Better together: the Squiz partner ecosystem"
        copy="Agencies, technology vendors, and consultancies extend what customers can do with the platform — and grow their own practices doing it."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="Partner types" title="Three ways to partner" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {partnerTiers.map((tier) => (
            <div key={tier.name} className="flex flex-col rounded-2xl border border-cream-deep bg-card p-7 shadow-card">
              <span className="flex size-11 items-center justify-center rounded-xl bg-mint-tint text-navy">
                <Icon name={tier.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-navy">{tier.name}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{tier.copy}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tier.examples.map((e) => (
                  <Badge key={e} tint="outline">
                    {e}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-alt py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="What partners get"
            title="A program built for momentum"
            copy="Certification pathways, co-selling support, a dedicated partner portal, and early access to the roadmap — plus customers who genuinely need what you build."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Certification", copy: "Structured training and accreditation across every product in the platform." },
              { title: "Co-selling", copy: "Joint pursuit support on opportunities, from RFP responses to demo environments." },
              { title: "Partner portal", copy: "Deal registration, enablement content, and support in one place." },
              { title: "Roadmap access", copy: "Quarterly briefings and preview environments before features ship." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-cream-deep bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Become a partner"
        copy="Tell us about your practice and the customers you serve — we'll map the fastest path to certification."
        primaryLabel="Start the conversation"
        primaryTo="/contact"
        secondaryLabel="About Squiz"
        secondaryTo="/about"
      />
    </PageLayout>
  );
}
