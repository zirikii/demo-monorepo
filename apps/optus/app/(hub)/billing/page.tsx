import { InvoiceTable } from "@/components/billing/invoice-table";
import { CostCentreChart } from "@/components/dashboard/cost-centre-chart";
import { PageHeader } from "@/components/layout/page-header";
import { getInsights, getInvoices } from "@/lib/data/business";
export default async function BillingPage() {
  const [invoices, insights] = await Promise.all([getInvoices(), getInsights()]);
  return (
    <div>
      <PageHeader
        eyebrow="Billing"
        title="Invoices and cost allocation"
        description="Review invoices, due dates, and monthly spend distribution for each business team."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <InvoiceTable invoices={invoices} />
        <CostCentreChart rows={insights.costCentres} />
      </div>
    </div>
  );
}
