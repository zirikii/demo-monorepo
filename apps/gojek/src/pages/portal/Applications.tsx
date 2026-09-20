import { useMemo, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { PortalLayout } from "@/components/layout/PortalLayout";
import {
  readApplications,
  statusLabel,
  updateApplicationStatus,
  type Application,
} from "@/lib/applications";
import type { ApplicationStatus } from "@/data/types";
import { formatDate } from "@/lib/format";

const helper = createColumnHelper<Application>();

export default function PortalApplicationsPage() {
  const [rows, setRows] = useState(readApplications);
  const columns = useMemo(
    () => [
      helper.accessor("jobTitle", {
        header: "Role",
        cell: (info) => (
          <Link to={`/careers/${info.row.original.jobSlug}`} className="font-semibold hover:text-go-green">
            {info.getValue()}
          </Link>
        ),
      }),
      helper.accessor("location", { header: "Location" }),
      helper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <Select
            value={info.getValue()}
            onChange={(event) => {
              const status = event.target.value as ApplicationStatus;
              updateApplicationStatus(info.row.original.id, status);
              setRows(readApplications());
            }}
            className="max-w-40 py-1.5"
          >
            {(["drafted", "submitted", "take-home", "onsite", "offer"] as const).map((status) => (
              <option key={status} value={status}>
                {statusLabel(status)}
              </option>
            ))}
          </Select>
        ),
      }),
      helper.accessor("submittedAt", {
        header: "Submitted",
        cell: (info) => formatDate(info.getValue()),
      }),
    ],
    [],
  );
  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <PortalLayout title="Applications">
      <h1 className="text-3xl font-semibold">Applications</h1>
      <p className="mt-2 text-sm text-go-muted">Statuses are local. Move a card the way a recruiter would.</p>
      {rows.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No applications yet"
            body="Apply from a role on Join us. The dummy pipeline lives only in this browser."
            action={<ButtonLink to="/careers">Browse roles</ButtonLink>}
          />
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto">
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
                    <td key={cell.id} className="px-2 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PortalLayout>
  );
}
