"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { Bill } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const columns: ColumnDef<Bill>[] = [
  { accessorKey: "period", header: "Period" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => formatAud(getValue<number>(), { cents: true }),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Bill["status"]>();
      return (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-semibold",
            status === "Paid" && "bg-emerald-50 text-emerald-700",
            status === "Due" && "bg-amber-50 text-amber-800",
            status === "Overdue" && "bg-red-50 text-red-700",
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due",
    cell: ({ getValue }) => formatShortDate(getValue<string>()),
  },
];

export function BillsTable({ bills }: { bills: Bill[] }) {
  const data = useMemo(() => [...bills].reverse(), [bills]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-subtle text-optus-ink/60">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="px-4 py-3 font-semibold">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-line">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-optus-ink">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-optus-ink/60">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="h-9 rounded-md border border-line px-3 text-xs font-semibold disabled:opacity-40"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            type="button"
            className="h-9 rounded-md border border-line px-3 text-xs font-semibold disabled:opacity-40"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
