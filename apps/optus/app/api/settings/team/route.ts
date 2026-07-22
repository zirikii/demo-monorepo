import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { Integration, TeamMember } from "@/lib/types";

type SettingsFile = { team: TeamMember[]; integrations: Integration[] };

export async function GET() {
  const settings = await readJson<SettingsFile>("settings.json");
  return NextResponse.json(settings.team);
}

const addSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["Admin", "Member"]).default("Member"),
});

export async function POST(request: Request) {
  const body = addSchema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid member" }, { status: 400 });
  }

  const settings = await readJson<SettingsFile>("settings.json");
  const member: TeamMember = {
    id: `tm-${Date.now()}`,
    name: body.data.name,
    email: body.data.email,
    role: body.data.role,
  };
  settings.team.push(member);
  await writeJson("settings.json", settings);
  return NextResponse.json(member, { status: 201 });
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const settings = await readJson<SettingsFile>("settings.json");
  const target = settings.team.find((m) => m.id === id);
  if (target?.role === "Account holder") {
    return NextResponse.json({ error: "Cannot remove the account holder" }, { status: 403 });
  }
  settings.team = settings.team.filter((m) => m.id !== id);
  await writeJson("settings.json", settings);
  return NextResponse.json({ ok: true });
}
