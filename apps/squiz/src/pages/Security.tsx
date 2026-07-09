import { FileCheck2, Globe2, Lock, ServerCog, ShieldCheck, Siren } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const practices = [
  {
    icon: Lock,
    title: "Encryption everywhere",
    copy: "TLS in transit, encryption at rest, and managed key rotation across every tenancy.",
  },
  {
    icon: ShieldCheck,
    title: "Independent assurance",
    copy: "Regular third-party penetration testing and audited controls aligned with recognized frameworks (ISO 27001-style, illustrative in this demo).",
  },
  {
    icon: ServerCog,
    title: "Managed patching",
    copy: "Platform upgrades and security patches ship monthly, applied by Squiz — customers are always on the current version.",
  },
  {
    icon: Globe2,
    title: "Data residency",
    copy: "Region-pinned hosting options for Australia, the UK/EU, and the US to satisfy sovereignty requirements.",
  },
  {
    icon: Siren,
    title: "Incident response",
    copy: "A 24/7 on-call rotation, defined severity ladder, and customer notification commitments measured in hours, not weeks.",
  },
  {
    icon: FileCheck2,
    title: "Access governance",
    copy: "Role-based access, SSO/SAML support, audit logging, and least-privilege defaults across all products.",
  },
];

export function SecurityPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Security" }]} />
      <PageHero
        eyebrow="Security"
        title="Security is an engineering discipline, not a marketing line"
        copy="Government and education run on trust. Here's how the platform earns it — from infrastructure through to editorial permissions."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="Our practices" title="How the platform is protected" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practices.map(({ icon: PracticeIcon, title, copy }) => (
            <div key={title} className="rounded-2xl border border-cream-deep bg-card p-7 shadow-card">
              <span className="flex size-11 items-center justify-center rounded-xl bg-mint-tint text-navy">
                <PracticeIcon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-navy">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{copy}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-2xl text-sm text-ink-faint">
          Demo note: this page illustrates the shape of a security posture page. It is not a
          statement about any real vendor&rsquo;s certifications or controls.
        </p>
      </section>
      <CtaSection
        title="Need the full security pack?"
        copy="Procurement teams can request detailed documentation through the sales channel."
        primaryLabel="Contact us"
        primaryTo="/contact"
        secondaryLabel="Read the legal pages"
        secondaryTo="/legal"
      />
    </PageLayout>
  );
}
