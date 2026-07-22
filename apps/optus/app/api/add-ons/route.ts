import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { AddOn } from "@/lib/types";

export async function GET() {
  const items = await readJson<AddOn[]>("add-ons.json");
  return NextResponse.json(items);
}

const schema = z.object({ id: z.string().min(1), active: z.boolean() });

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: "Invalid add-on update" }, { status: 400 });
  const items = await readJson<AddOn[]>("add-ons.json");
  const index = items.findIndex((item) => item.id === body.data.id);
  const current = index >= 0 ? items[index] : undefined;
  if (!current) return NextResponse.json({ error: "Add-on not found" }, { status: 404 });
  const updated: AddOn = { ...current, active: body.data.active, purchasedAt: body.data.active ? new Date().toISOString() : undefined };
  items[index] = updated;
  await writeJson("add-ons.json", items);
  return NextResponse.json(updated, { status: 200 });
}
