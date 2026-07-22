import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { TeamMember } from "@/lib/types";

type SettingsFile = {
  team: TeamMember[];
  integrations: unknown;
  profile: unknown;
};

export async function GET() {
  const settings = await readJson<SettingsFile>("settings.json");
  return NextResponse.json(settings.team);
}

const postSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["Owner", "Admin", "Member"]).default("Member"),
});

export async function POST(request: Request) {
  const body = postSchema.safeParse(await request.json());
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
  settings.team = settings.team.filter((m) => m.id !== id || m.role === "Owner");
  await writeJson("settings.json", settings);
  return NextResponse.json({ ok: true });
}
