import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Invoice } from "@/lib/types";
function statusTone(status: Invoice["status"]): "success" | "warning" | "yellow" {
  if (status === "Paid") return "success";
  if (status === "Review") return "warning";
  return "yellow";
}
export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Cost centre</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-bold">{invoice.id}</TableCell>
              <TableCell>{invoice.month}</TableCell>
              <TableCell>{invoice.costCentre}</TableCell>
              <TableCell>{formatDate(invoice.dueDate)}</TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell>
                <Badge tone={statusTone(invoice.status)}>{invoice.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
