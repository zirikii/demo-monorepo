import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { JOBS } from "@/data/jobs";

export default function CareersPage() {
  return (
    <PageLayout title="Careers">
      <PageHero
        eyebrow="Careers at HUB24"
        title="Build Australia’s Best Platform"
        body="Dummy roles across distribution, operations, product and Class. Applications in this demo stay in your browser."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {JOBS.map((job) => (
            <LinkCard key={job.id} to={`/jobs/${job.id}`}>
              <p className="text-xs font-bold tracking-[0.12em] text-hub-teal uppercase">
                {job.team} · {job.location}
              </p>
              <CardHeading className="mt-2">{job.title}</CardHeading>
              <CardBody className="mt-2">{job.summary}</CardBody>
            </LinkCard>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
