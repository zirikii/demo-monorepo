import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ReportSubscription } from "@/lib/types";
export function ReportCatalog({ reports }: { reports: ReportSubscription[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reports.map((report) => (
        <Card key={report.id} className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-optus-ink">{report.name}</h2>
              <p className="mt-2 text-sm text-optus-muted">
                Owner: {report.owner} · Cadence: {report.cadence}
              </p>
            </div>
            <Button size="sm" variant="secondary">
              <Download className="h-4 w-4" aria-hidden="true" /> CSV
            </Button>
          </div>
          <p className="mt-4 rounded-md bg-optus-page p-3 text-sm text-optus-muted">
            Last generated {report.lastRun}. Downloads are simulated for demo review.
          </p>
        </Card>
      ))}
    </div>
  );
}
