import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { Integration, TeamMember } from "@/lib/types";

type SettingsFile = { team: TeamMember[]; integrations: Integration[] };

export async function GET() {
  const settings = await readJson<SettingsFile>("settings.json");
  return NextResponse.json(settings.integrations);
}

const patchSchema = z.object({
  id: z.string().min(1),
  connected: z.boolean(),
});

export async function PATCH(request: Request) {
  const body = patchSchema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const settings = await readJson<SettingsFile>("settings.json");
  const item = settings.integrations.find((i) => i.id === body.data.id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  item.connected = body.data.connected;
  await writeJson("settings.json", settings);
  return NextResponse.json(item);
}
