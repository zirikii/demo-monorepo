import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { BenefitGrid } from "@/components/marketing/BenefitGrid";
import { StepList, type Step } from "@/components/marketing/StepList";
import { StatsBand } from "@/components/marketing/StatsBand";
import { merchantBenefits } from "@/data/benefits";

const steps: Step[] = [
  { title: "Create your GoBiz account", body: "Register your business and add your menu or catalogue." },
  { title: "Go live", body: "Get discovered by customers across GoFood and the ecosystem." },
  { title: "Grow with insights", body: "Run promos, track sales and get paid with fast settlements." },
];

const merchantStats = [
  { value: 6_400_000, label: "Merchant-partners", sublabel: "In the GoTo ecosystem" },
  { value: 1_000_000, label: "Menu items", sublabel: "Listed on GoFood" },
  { value: 190_000_000, label: "App downloads", sublabel: "Reaching customers" },
  { value: 1, label: "Dashboard", sublabel: "Everything in GoBiz" },
];

export function MerchantsPage() {
  return (
    <PageLayout title="Merchants — Gojek (Demo)">
      <PageHero
        eyebrow="Merchant-partners"
        title="Grow your business with GoBiz"
        description="We empower 6.4 million merchants with leading technology to reach customers, manage operations and grow."
      >
        <ButtonLink to="/signup" size="lg" className="bg-business hover:bg-business/90">
          Become a merchant
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </ButtonLink>
      </PageHero>

      <section className="py-14">
        <Container>
          <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12">
            <StatsBand stats={merchantStats} />
          </div>
        </Container>
      </section>

      <section className="py-6 sm:py-10">
        <Container>
          <SectionHeading eyebrow="Why partner with us" title="Tools that help you grow" />
          <div className="mt-10">
            <BenefitGrid items={merchantBenefits} accent="text-business" columns={2} />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="How to join" title="Selling in three steps" />
          <div className="mt-10">
            <StepList steps={steps} accentDot="bg-business" />
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
