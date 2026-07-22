import { PageHeader } from "@/components/layout/page-header";
import { ReportCatalog } from "@/components/reports/report-catalog";
import { getReportSubscriptions } from "@/lib/data/business";
export default async function ReportsPage() {
  const reports = await getReportSubscriptions();
  return (
    <div>
      <PageHeader
        eyebrow="Reports"
        title="Saved report catalogue"
        description="Download-ready mock reports and recurring subscriptions for business stakeholders."
      />
      <ReportCatalog reports={reports} />
    </div>
  );
}
