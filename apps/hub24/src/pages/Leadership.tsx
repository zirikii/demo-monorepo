import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LEADERS } from "@/data/company";

export default function LeadershipPage() {
  return (
    <PageLayout title="Leadership">
      <PageHero
        eyebrow="About HUB24"
        title="Our leadership team"
        body="HUB24 is led by a team with a strong track record of delivering market-leading solutions in the financial services industry."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "About us", to: "/about-us/" },
          { label: "Leadership" },
        ]}
      />

      <Section>
        <SectionHeading eyebrow="Executive team" title="Who runs the Group" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {LEADERS.map((leader) => (
            <Card key={leader.id} className="flex gap-5">
              <Avatar name={leader.name} size="lg" />
              <div className="flex flex-col gap-1.5">
                <CardHeading>{leader.name}</CardHeading>
                <p className="text-sm font-semibold text-h24-teal-dark">{leader.role}</p>
                <CardBody className="text-sm">{leader.bio}</CardBody>
                <p className="mt-1 text-xs text-ink-ghost">Focus: {leader.focus}</p>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-faint">
          These profiles are invented for a demonstration build and do not represent real HUB24
          Limited executives.
        </p>
      </Section>

      <CtaBand
        eyebrow="Careers"
        title="Want to work with this team?"
        body="We're hiring across engineering, distribution, product, operations and risk."
        primary={{ label: "See open roles", to: "/about-us/careers/" }}
        secondary={{ label: "About HUB24", to: "/about-us/" }}
      />
    </PageLayout>
  );
}
