import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card } from "@/components/ui/Card";

const STATEMENTS = [
  { name: "Annual statement FY26", date: "July 2026" },
  { name: "Quarterly report — Jun 2026", date: "July 2026" },
  { name: "eTax pack 2025", date: "July 2025" },
  { name: "Fee disclosure", date: "January 2026" },
];

export default function InvestorStatementsPage() {
  return (
    <PortalLayout title="Reports and eStatements">
      <div className="grid gap-4 md:grid-cols-2">
        {STATEMENTS.map((item) => (
          <Card key={item.name}>
            <h2 className="font-bold">{item.name}</h2>
            <p className="mt-1 text-sm text-ink-soft">{item.date}</p>
          </Card>
        ))}
      </div>
    </PortalLayout>
  );
}
