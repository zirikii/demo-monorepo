import { useMemo } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import type { Job } from "@/data/types";
import { formatDate } from "@/lib/format";

const helper = createColumnHelper<Job>();

const columns = [
  helper.accessor("title", {
    header: "Job title",
    cell: (info) => (
      <Link to={`/careers/${info.row.original.slug}`} className="font-semibold hover:text-go-green">
        {info.getValue()}
      </Link>
    ),
  }),
  helper.accessor("location", { header: "Location" }),
  helper.accessor("org", { header: "Org" }),
  helper.accessor("posted", {
    header: "Posted",
    cell: (info) => formatDate(info.getValue()),
  }),
];

export function JobTable({ jobs }: { jobs: Job[] }) {
  const data = useMemo(() => jobs, [jobs]);
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-white/12 text-go-faint">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id} className="px-2 py-3 font-medium">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-white/8">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-2 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
