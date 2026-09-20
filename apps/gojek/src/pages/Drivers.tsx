import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { BenefitGrid } from "@/components/marketing/BenefitGrid";
import { StepList, type Step } from "@/components/marketing/StepList";
import { StatsBand } from "@/components/marketing/StatsBand";
import { driverBenefits } from "@/data/benefits";

const steps: Step[] = [
  { title: "Register online", body: "Sign up with your details and upload your documents in minutes." },
  { title: "Get verified", body: "We review your application and run the required safety checks." },
  { title: "Start earning", body: "Go online, accept trips or orders, and get paid to GoPay." },
];

const driverStats = [
  { value: 3_000_000, label: "Driver-partners", sublabel: "And growing" },
  { value: 190, suffix: "+", label: "Cities & towns", sublabel: "To earn in" },
  { value: 2_800_000_000, label: "Trips & orders", sublabel: "Completed to date" },
  { value: 24, suffix: "/7", label: "Support", sublabel: "Whenever you need it" },
];

export function DriversPage() {
  return (
    <PageLayout title="Drivers — Gojek (Demo)">
      <PageHero
        eyebrow="Driver-partners"
        title="Drive with Gojek. Earn on your terms."
        description="Join 3 million driver-partners enjoying flexibility, sustainable income and exclusive benefit programs."
      >
        <ButtonLink to="/signup" size="lg">
          Start driving
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </ButtonLink>
      </PageHero>

      <section className="py-14">
        <Container>
          <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12">
            <StatsBand stats={driverStats} />
          </div>
        </Container>
      </section>

      <section className="py-6 sm:py-10">
        <Container>
          <SectionHeading eyebrow="Why drive with us" title="Benefits that go the distance" />
          <div className="mt-10">
            <BenefitGrid items={driverBenefits} accent="text-transport" columns={2} />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="How to join" title="On the road in three steps" />
          <div className="mt-10">
            <StepList steps={steps} accentDot="bg-transport" />
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
