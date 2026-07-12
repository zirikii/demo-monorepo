import type { UsageRecord } from "@/lib/types";
import { formatDate } from "@/lib/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Tone } from "@/lib/types";

const KIND_TONE: Record<UsageRecord["kind"], Tone> = {
  data: "info",
  calls: "positive",
  text: "neutral",
  roaming: "caution",
};

function amountLabel(record: UsageRecord): string {
  if (record.unit === "GB") return `${record.amount}GB`;
  if (record.unit === "min") return `${record.amount} min`;
  return `${record.amount} texts`;
}

export function UsageTable({ usage }: { usage: UsageRecord[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usage.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="whitespace-nowrap text-ink-secondary">
                {formatDate(record.date)}
              </TableCell>
              <TableCell>
                <Badge tone={KIND_TONE[record.kind]} className="capitalize">
                  {record.kind}
                </Badge>
              </TableCell>
              <TableCell className="font-medium text-spark-ink">{record.description}</TableCell>
              <TableCell className="text-ink-muted">{record.location ?? "—"}</TableCell>
              <TableCell className="text-right font-semibold text-spark-ink">
                {amountLabel(record)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
