import { NextResponse } from "next/server";
import { readJson } from "@/lib/data/json-store";
import type { Bill } from "@/lib/types";

export async function GET(request: Request) {
  const bills = await readJson<Bill[]>("bills.json");
  const status = new URL(request.url).searchParams.get("status");
  const filtered = status ? bills.filter((b) => b.status.toLowerCase() === status.toLowerCase()) : bills;
  return NextResponse.json(filtered);
}
