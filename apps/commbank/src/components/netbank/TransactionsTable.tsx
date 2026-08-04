import { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { DemoTransaction } from "@/data/transactions";
import { formatAud, formatDate } from "@/lib/format";
import { TextField } from "@/components/ui/TextField";
import { EmptyState } from "@/components/ui/EmptyState";

const columnHelper = createColumnHelper<DemoTransaction>();

const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => {
      const value = info.getValue();
      return (
        <span className={value < 0 ? "text-ink" : "font-semibold text-success"}>
          {formatAud(value)}
        </span>
      );
    },
  }),
];

export function TransactionsTable({ rows }: { rows: DemoTransaction[] }) {
  const [filter, setFilter] = useState("");
  const data = useMemo(() => rows, [rows]);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter: filter },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      <TextField
        label="Filter transactions"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search description or category"
      />
      {table.getRowModel().rows.length === 0 ? (
        <EmptyState title="No transactions" body="Try a different filter." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-card">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-surface text-xs uppercase tracking-wide text-ink-faint">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 font-bold">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-line last:border-0">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-ink-soft">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
