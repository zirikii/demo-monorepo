import type { Bill, BillStatus, Tone } from "@/lib/types";
import { formatDate, formatNzdCents } from "@/lib/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATUS_TONE: Record<BillStatus, Tone> = {
  Paid: "positive",
  Due: "caution",
  Overdue: "critical",
};

export function BillsTable({ bills }: { bills: Bill[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Issued</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell className="font-medium text-spark-ink">{bill.period}</TableCell>
              <TableCell className="whitespace-nowrap text-ink-secondary">
                {formatDate(bill.issuedAt)}
              </TableCell>
              <TableCell className="whitespace-nowrap text-ink-secondary">
                {formatDate(bill.dueAt)}
              </TableCell>
              <TableCell>
                <Badge tone={STATUS_TONE[bill.status]}>{bill.status}</Badge>
              </TableCell>
              <TableCell className="text-right font-semibold text-spark-ink">
                {formatNzdCents(bill.amount)}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="link" size="sm" className="h-auto p-0">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
