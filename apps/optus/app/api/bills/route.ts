import { NextResponse } from "next/server";
import { readJson } from "@/lib/data/json-store";
import type { Bill } from "@/lib/types";

export async function GET() {
  const bills = await readJson<Bill[]>("bills.json");
  return NextResponse.json(bills);
}
