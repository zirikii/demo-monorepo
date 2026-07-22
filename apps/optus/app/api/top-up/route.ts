import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { TopUp } from "@/lib/types";

export async function GET() {
  const items = await readJson<TopUp[]>("top-ups.json");
  return NextResponse.json(items);
}

const schema = z.object({
  amount: z.number().positive(),
  method: z.string().min(1),
  note: z.string().min(1),
});

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid recharge" }, { status: 400 });
  }

  const items = await readJson<TopUp[]>("top-ups.json");
  const entry: TopUp = {
    id: `tu-${Date.now()}`,
    amount: body.data.amount,
    method: body.data.method,
    note: body.data.note,
    createdAt: new Date().toISOString(),
  };
  items.unshift(entry);
  await writeJson("top-ups.json", items);
  return NextResponse.json(entry, { status: 201 });
}
