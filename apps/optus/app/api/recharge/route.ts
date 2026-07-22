import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { Recharge } from "@/lib/types";

export async function GET() {
  const items = await readJson<Recharge[]>("recharges.json");
  return NextResponse.json(items);
}

const schema = z.object({
  amount: z.number().positive(),
  method: z.string().min(1),
  service: z.string().min(1),
});

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid recharge" }, { status: 400 });
  }

  const items = await readJson<Recharge[]>("recharges.json");
  const entry: Recharge = {
    id: `rc-${Date.now()}`,
    amount: body.data.amount,
    method: body.data.method,
    service: body.data.service,
    createdAt: new Date().toISOString(),
  };
  items.unshift(entry);
  await writeJson("recharges.json", items);
  return NextResponse.json(entry, { status: 201 });
}
