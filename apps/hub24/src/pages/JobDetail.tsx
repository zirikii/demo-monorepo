import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { jobById } from "@/data/jobs";

export default function JobDetailPage() {
  const { id = "" } = useParams();
  const job = jobById(id);
  if (!job) return <Navigate to="/careers" replace />;

  return (
    <PageLayout title={job.title}>
      <Section className="py-16">
        <p className="text-xs font-bold tracking-[0.14em] text-hub-teal uppercase">
          {job.team} · {job.location} · {job.type}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold">{job.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{job.summary}</p>
        <p className="mt-4 max-w-2xl text-ink-soft">
          This is a fictional listing for the unofficial HUB24 demo. Use the contact form if you want to pretend to apply.
        </p>
        <ButtonLink to="/contact" className="mt-8">
          Enquire
        </ButtonLink>
      </Section>
    </PageLayout>
  );
}
