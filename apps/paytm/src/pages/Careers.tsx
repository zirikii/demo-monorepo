import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { SelectField } from "../components/ui/SelectField";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { SuccessModal } from "../components/shared/SuccessModal";
import { useDisclosure } from "../hooks/useDisclosure";
import { jobs, jobTeams, jobLocations } from "../data/company";
import { formatDate } from "../lib/format";

const values = [
  { title: "Ship for scale", body: "A slow screen here is a queue at a shop counter somewhere. Performance is a feature." },
  { title: "Own the outcome", body: "Small teams, clear charters, and the freedom to fix what's broken without a committee." },
  { title: "Earn trust daily", body: "We handle other people's money. Security and honesty are non-negotiable." },
];

export function CareersPage() {
  useDocumentTitle("Careers");
  const [team, setTeam] = useState("All");
  const [location, setLocation] = useState("All");
  const [pickedJob, setPickedJob] = useState(jobs[0].title);
  const success = useDisclosure();

  const visible = jobs.filter(
    (j) => (team === "All" || j.team === team) && (location === "All" || j.location === location),
  );

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            Build payments for <span className="text-paytm-cyan">a billion people</span>
          </>
        }
        subtitle="Engineers, designers, analysts, and operators working on India's everyday money movement. Roles below are demo listings."
      />

      <section aria-label="Our values" className="mx-auto max-w-7xl px-4 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="rounded-2xl bg-card p-6 shadow-card">
              <h2 className="text-sm font-bold text-ink">{v.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{v.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Open roles" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl bg-card p-6 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-lg font-bold text-paytm-navy">
              Open roles <span className="text-sm font-semibold text-ink-faint">({visible.length})</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:w-96">
              <SelectField
                label="Team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                options={[{ value: "All", label: "All Teams" }, ...jobTeams.map((t) => ({ value: t, label: t }))]}
              />
              <SelectField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                options={[
                  { value: "All", label: "All Locations" },
                  ...jobLocations.map((l) => ({ value: l, label: l })),
                ]}
              />
            </div>
          </div>

          <ul className="mt-6 divide-y divide-hairline">
            {visible.map((job) => (
              <li key={job.id} className="flex flex-wrap items-center gap-4 py-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-ink">{job.title}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
                    <span className="flex items-center gap-1">
                      <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock aria-hidden="true" className="h-3.5 w-3.5" /> Posted {formatDate(job.posted)}
                    </span>
                  </p>
                </div>
                <Badge tone="cyan">{job.team}</Badge>
                <Badge tone={job.type === "Internship" ? "amber" : "neutral"}>{job.type}</Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setPickedJob(job.title);
                    success.open();
                  }}
                >
                  Apply
                </Button>
              </li>
            ))}
            {visible.length === 0 ? (
              <li className="py-10 text-center text-sm text-ink-soft">
                No roles match those filters right now — try widening the search.
              </li>
            ) : null}
          </ul>
        </div>
      </section>

      <SuccessModal
        open={success.isOpen}
        onClose={success.close}
        title="Application Submitted"
        lines={[
          { label: "Role", value: pickedJob },
          { label: "Status", value: "Received (simulated)" },
          { label: "Note", value: "Demo — recruiters are not notified" },
        ]}
      />
    </PageLayout>
  );
}
