import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { ReportSubscription } from "@/lib/types";
export async function POST(request: Request) {
  const body = (await request.json()) as { id?: string; enabled?: boolean };
  if (!body.id || typeof body.enabled !== "boolean")
    return NextResponse.json({ error: "id and enabled are required" }, { status: 400 });
  const reports = await readJson<ReportSubscription[]>("reports.json");
  const next = reports.map((report) =>
    report.id === body.id ? { ...report, enabled: body.enabled } : report,
  );
  await writeJson("reports.json", next);
  return NextResponse.json(next.find((report) => report.id === body.id));
}
