"use client";

import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Bill } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";

const columnHelper = createColumnHelper<Bill>();
const columns = [
  columnHelper.accessor("period", { header: "Period" }),
  columnHelper.accessor("amount", { header: "Amount", cell: (info) => formatAud(info.getValue(), { cents: true }) }),
  columnHelper.accessor("dueDate", { header: "Due", cell: (info) => formatShortDate(info.getValue()) }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <Badge className={info.getValue() === "Paid" ? "bg-green-100 text-green-800" : info.getValue() === "Due" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}>{info.getValue()}</Badge>,
  }),
];

export function BillsTable({ bills }: { bills: Bill[] }) {
  const table = useReactTable({ data: bills, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize: 8 } } });
  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-line bg-white"><table className="w-full text-left text-sm"><thead className="border-b border-line bg-surface-subtle">{table.getHeaderGroups().map((headerGroup) => <tr key={headerGroup.id}>{headerGroup.headers.map((header) => <th key={header.id} className="px-4 py-3 font-bold">{flexRender(header.column.columnDef.header, header.getContext())}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map((row) => <tr key={row.id} className="border-b border-line last:border-0">{row.getVisibleCells().map((cell) => <td key={cell.id} className="px-4 py-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</tr>)}</tbody></table></div>
      <div className="mt-4 flex gap-2"><Button type="button" variant="secondary" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button><Button type="button" variant="secondary" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button></div>
    </div>
  );
}
