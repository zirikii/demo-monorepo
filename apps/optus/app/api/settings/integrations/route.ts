import { NextResponse } from "next/server";
import { updateIntegration } from "@/lib/data/settings";
export async function POST(request: Request) {
  const body = (await request.json()) as { id?: string; connected?: boolean };
  if (!body.id || typeof body.connected !== "boolean")
    return NextResponse.json({ error: "id and connected are required" }, { status: 400 });
  try {
    return NextResponse.json(await updateIntegration(body.id, body.connected));
  } catch {
    return NextResponse.json({ error: "Integration not found" }, { status: 404 });
  }
}
