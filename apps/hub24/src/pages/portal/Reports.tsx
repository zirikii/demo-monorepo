import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card } from "@/components/ui/Card";

const REPORTS = [
  { name: "Practice FUM pack", cadence: "Daily" },
  { name: "Fee revenue by adviser", cadence: "Monthly" },
  { name: "Corporate actions outstanding", cadence: "Intraday" },
  { name: "Managed portfolio drift", cadence: "Daily" },
  { name: "Client eStatements ready", cadence: "Quarterly" },
];

export default function ReportsPage() {
  return (
    <PortalLayout title="Reports" description="Dummy report catalogue">
      <div className="grid gap-4 md:grid-cols-2">
        {REPORTS.map((report) => (
          <Card key={report.name}>
            <h2 className="font-bold">{report.name}</h2>
            <p className="mt-1 text-sm text-ink-soft">{report.cadence}</p>
            <button type="button" className="focus-hub mt-4 text-sm font-semibold text-hub-teal hover:underline">
              Queue (demo)
            </button>
          </Card>
        ))}
      </div>
    </PortalLayout>
  );
}
