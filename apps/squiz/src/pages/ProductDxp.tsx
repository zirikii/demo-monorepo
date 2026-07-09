import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { FaqSection } from "@/components/shared/FaqSection";
import { CapabilityCard } from "@/components/shared/CapabilityCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { capabilities } from "@/data/capabilities";

const pillars = [
  {
    icon: "LayoutTemplate",
    title: "Content Management",
    copy: "Create and publish pages in minutes with built-in governance that keeps everything on-brand — even across hundreds of sites.",
    to: "/products/capabilities/content-management",
  },
  {
    icon: "Search",
    title: "Funnelback Search",
    copy: "Keyword and conversational search that helps users find answers from your content everywhere they look.",
    to: "/products/squiz-funnelback-search",
  },
  {
    icon: "Sparkles",
    title: "Content Intelligence",
    copy: "Audits your whole estate for accessibility and AI readiness, with impact-based prioritization and remediation guidance.",
    to: "/products/content-intelligence",
  },
  {
    icon: "Database",
    title: "Customer Data Platform",
    copy: "Unify behavioural and CRM data into segments you can activate for personalization and campaigns.",
    to: "/products/capabilities/customer-data-platform",
  },
  {
    icon: "Images",
    title: "Digital Asset Management",
    copy: "One shared library for every image, video, and document — with renditions and rights handled automatically.",
    to: "/products/capabilities/digital-asset-management",
  },
  {
    icon: "Workflow",
    title: "Integrations",
    copy: "A low-code workflow engine connecting your CRM, student systems, and legacy APIs without middleware projects.",
    to: "/products/capabilities/integrations",
  },
];

const dxpFaqs = [
  {
    q: "What is a Digital Experience Platform (DXP)?",
    a: "A DXP helps teams deliver seamless experiences across websites, portals, intranets, and apps. It combines content management, search, personalization, analytics, and integrations on one platform — so marketers create and optimize experiences without heavy developer reliance.",
  },
  {
    q: "How is Squiz DXP delivered?",
    a: "As managed SaaS. Upgrades, scaling, and security patching are handled by Squiz on a monthly release cadence, so your team is always on the latest version.",
  },
  {
    q: "How long does migration from a legacy CMS take?",
    a: "With AI-assisted migration tooling, most mid-size portfolios move in weeks to months rather than years. Content, metadata, and redirect maps are generated automatically, with editors reviewing by exception.",
  },
  {
    q: "Do we need in-house developers?",
    a: "Teams with developers can build and own their component libraries; teams without can lean on Squiz professional services. Either way, day-to-day publishing needs no developer involvement once the library exists.",
  },
];

export function ProductDxpPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Products" }, { label: "Squiz DXP" }]} />
      <PageHero
        eyebrow="Squiz DXP"
        title="The digital experience platform that puts marketing back in control"
        copy="Squiz DXP combines content management, personalization, search, and analytics so teams build, manage, and optimize fast — without developer dependency."
      >
        <Button to="/book-a-call" size="lg" withArrow>
          Book a call
        </Button>
        <Button to="/demos" variant="secondary" size="lg">
          Watch demo videos
        </Button>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          eyebrow="One platform"
          title="Everything an experience needs, sharing one data model"
          copy="Point solutions each solve a slice and leave you to glue the rest. The DXP's products are built together, so segments, assets, and analytics flow everywhere without integration projects."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Link
              key={pillar.title}
              to={pillar.to}
              className="group rounded-2xl border border-cream-deep bg-card p-6 shadow-card transition-shadow hover:shadow-float"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-mint-tint text-navy">
                <Icon name={pillar.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy group-hover:underline">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pillar.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream-alt py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Capabilities"
            title="Explore the full capability catalog"
            copy="Fourteen capabilities, one platform. Here are the ones teams reach for first."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.slice(0, 6).map((c) => (
              <CapabilityCard key={c.slug} capability={c} />
            ))}
          </div>
          <div className="mt-10">
            <Button to="/products/capabilities" variant="secondary" withArrow>
              View all capabilities
            </Button>
          </div>
        </div>
      </section>

      <FaqSection items={dxpFaqs} />
      <CtaSection />
    </PageLayout>
  );
}
