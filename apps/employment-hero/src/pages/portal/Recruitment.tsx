import { PortalLayout } from "@/components/portal/PortalLayout";
import { Badge } from "@/components/ui/Badge";
import { jobs } from "@/data/recruitment";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PortalRecruitmentPage() {
  useDocumentTitle("Recruitment");
  return (
    <PortalLayout title="Recruitment">
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <article key={job.id} className="rounded-eh-lg border border-line bg-white p-5 shadow-eh">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-bold">{job.title}</h2>
              <Badge tone={job.status === "Open" ? "success" : job.status === "Filled" ? "soft" : "warn"}>{job.status}</Badge>
            </div>
            <p className="mt-2 text-sm text-ink-soft">{job.team} · {job.location}</p>
            <p className="mt-4 text-sm font-semibold text-eh-purple">{job.candidates} candidates</p>
          </article>
        ))}
      </div>
    </PortalLayout>
  );
}
