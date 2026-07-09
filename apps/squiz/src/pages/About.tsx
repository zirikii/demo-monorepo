import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { companyStats, companyValues, offices } from "@/data/company";

export function AboutPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "About" }]} />
      <PageHero
        eyebrow="About Squiz"
        title="Reducing the complexity of creating services online that improve lives offline"
        copy="Since 1998 we've partnered with large, service-led organizations — universities, governments, and regulated enterprises — helping lean digital teams and thousands of non-technical editors deliver intelligent, multi-channel experiences."
      />

      <section className="bg-navy py-14 text-white squiz-lines-dark">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {companyStats.map(({ stat, label }) => (
            <div key={label}>
              <p className="font-heading text-5xl font-semibold text-mint">{stat}</p>
              <p className="mt-2 text-sm text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="What we believe" title="The principles behind the platform" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {companyValues.map((value) => (
            <div key={value.title} className="rounded-2xl border border-cream-deep bg-card p-7 shadow-card">
              <span className="flex size-11 items-center justify-center rounded-xl bg-mint-tint text-navy">
                <Icon name={value.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy">{value.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{value.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-alt py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Where we are"
            title="A global team across three continents"
            copy="Squiz teams work from six hubs, close to the customers and time zones we serve."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office) => (
              <div key={office.city} className="rounded-2xl border border-cream-deep bg-card p-6 shadow-card">
                <h3 className="font-heading text-xl font-semibold text-navy">{office.city}</h3>
                <p className="mt-1 text-sm text-ink-faint">{office.country}</p>
                <p className="mt-3 text-sm font-medium text-ink-soft">{office.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Come see who you'd be working with"
        copy="Meet the team on a call, or explore open roles across engineering, product, and customer success."
        secondaryLabel="View careers"
        secondaryTo="/careers"
      />
    </PageLayout>
  );
}
