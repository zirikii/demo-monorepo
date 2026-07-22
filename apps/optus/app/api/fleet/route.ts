import { NextResponse } from "next/server";
import { getFleetDevices, updateFleetStatus } from "@/lib/data/fleet";
import type { FleetStatus } from "@/lib/types";
export async function GET() {
  return NextResponse.json(await getFleetDevices());
}
export async function POST(request: Request) {
  const body = (await request.json()) as { id?: string; status?: FleetStatus };
  if (!body.id || !body.status)
    return NextResponse.json({ error: "id and status are required" }, { status: 400 });
  try {
    const updated = await updateFleetStatus(body.id, body.status);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Fleet service not found" }, { status: 404 });
  }
}
