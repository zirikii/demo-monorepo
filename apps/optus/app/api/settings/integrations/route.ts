import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { Integration } from "@/lib/types";

type SettingsFile = {
  team: unknown;
  integrations: Integration[];
  profile: unknown;
};

export async function GET() {
  const settings = await readJson<SettingsFile>("settings.json");
  return NextResponse.json(settings.integrations);
}

const schema = z.object({
  id: z.string().min(1),
  connected: z.boolean(),
});

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid integration update" }, { status: 400 });
  }
  const settings = await readJson<SettingsFile>("settings.json");
  settings.integrations = settings.integrations.map((item) =>
    item.id === body.data.id ? { ...item, connected: body.data.connected } : item,
  );
  await writeJson("settings.json", settings);
  return NextResponse.json({ ok: true });
}
