"use client";
import { useMemo, useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FleetDevice, FleetStatus } from "@/lib/types";
export function statusTone(status: FleetStatus): "success" | "warning" | "neutral" {
  if (status === "Active") return "success";
  if (status === "Pending") return "warning";
  return "neutral";
}
export function FleetTable({ devices }: { devices: FleetDevice[] }) {
  const [rows, setRows] = useState(devices);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;
    return rows.filter((row) =>
      [row.user, row.serviceNumber, row.device, row.costCentre, row.location].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [query, rows]);
  function updateStatus(id: string, status: FleetStatus) {
    startTransition(async () => {
      const response = await fetch("/api/fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (response.ok) {
        const updated = (await response.json()) as FleetDevice;
        setRows((current) => current.map((row) => (row.id === id ? updated : row)));
      }
    });
  }
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-optus-line p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-black text-optus-ink">Mobile fleet services</h2>
          <p className="text-sm text-optus-muted">
            Search, suspend, or reactivate local demo services.
          </p>
        </div>
        <input
          className="h-10 rounded-md border border-optus-line px-3 text-sm outline-none focus:border-optus-teal focus:ring-2 focus:ring-optus-teal/20"
          placeholder="Search fleet"
          aria-label="Search fleet"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((device) => (
              <TableRow key={device.id}>
                <TableCell>
                  <div className="font-bold">{device.user}</div>
                  <div className="text-xs text-optus-muted">
                    {device.costCentre} · {device.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{device.serviceNumber}</div>
                  <div className="text-xs text-optus-muted">{device.device}</div>
                </TableCell>
                <TableCell>{device.plan}</TableCell>
                <TableCell>
                  {device.usageGb}GB / {device.includedGb}GB
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={statusTone(device.status)}>{device.status}</Badge>
                    {device.roaming ? <Badge tone="yellow">Roaming</Badge> : null}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={device.status === "Suspended" ? "secondary" : "ghost"}
                    disabled={isPending || device.status === "Pending"}
                    onClick={() =>
                      updateStatus(
                        device.id,
                        device.status === "Suspended" ? "Active" : "Suspended",
                      )
                    }
                  >
                    {device.status === "Suspended" ? "Reactivate" : "Suspend"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
