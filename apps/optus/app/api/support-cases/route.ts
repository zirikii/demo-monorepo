import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { SupportCase } from "@/lib/types";

export async function GET() {
  const cases = await readJson<SupportCase[]>("support-cases.json");
  return NextResponse.json({ cases });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    subject?: string;
    service?: string;
    priority?: SupportCase["priority"];
  };
  if (!body.subject || !body.service) {
    return NextResponse.json({ error: "Subject and service are required" }, { status: 400 });
  }
  const cases = await readJson<SupportCase[]>("support-cases.json");
  const created: SupportCase = {
    id: `case-${Date.now()}`,
    subject: body.subject,
    service: body.service,
    priority: body.priority ?? "Medium",
    status: "Open",
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  await writeJson("support-cases.json", [created, ...cases]);
  return NextResponse.json({ case: created }, { status: 201 });
}
