import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { AddOn, AddOnPurchase } from "@/lib/types";

export async function GET() {
  const addOns = await readJson<AddOn[]>("add-ons.json");
  const purchases = await readJson<AddOnPurchase[]>("add-on-purchases.json");
  return NextResponse.json({ addOns, purchases });
}

const patchSchema = z.object({
  id: z.string().min(1),
  enabled: z.boolean(),
});

export async function PATCH(request: Request) {
  const body = patchSchema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const addOns = await readJson<AddOn[]>("add-ons.json");
  const idx = addOns.findIndex((a) => a.id === body.data.id);
  const existing = addOns[idx];
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const updated: AddOn = { ...existing, enabled: body.data.enabled };
  addOns[idx] = updated;
  await writeJson("add-ons.json", addOns);
  return NextResponse.json(updated);
}

const postSchema = z.object({ id: z.string().min(1) });

export async function POST(request: Request) {
  const body = postSchema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const addOns = await readJson<AddOn[]>("add-ons.json");
  const item = addOns.find((a) => a.id === body.data.id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const purchases = await readJson<AddOnPurchase[]>("add-on-purchases.json");
  const entry: AddOnPurchase = {
    id: `p-${Date.now()}`,
    addOnId: item.id,
    name: item.name,
    amount: item.price,
    createdAt: new Date().toISOString(),
    note: "Purchased in My Optus demo",
  };
  purchases.unshift(entry);
  await writeJson("add-on-purchases.json", purchases);
  return NextResponse.json(entry, { status: 201 });
}
