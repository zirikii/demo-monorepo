import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { SettingsFile } from "@/lib/types";

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
    return NextResponse.json({ error: "Invalid integration update" }, { status: 400 });
  }
  const settings = await readJson<SettingsFile>("settings.json");
  const integration = settings.integrations.find((i) => i.id === body.data.id);
  if (!integration) {
    return NextResponse.json({ error: "Unknown integration" }, { status: 404 });
  }
  integration.connected = body.data.connected;
  await writeJson("settings.json", settings);
  return NextResponse.json(integration);
}
