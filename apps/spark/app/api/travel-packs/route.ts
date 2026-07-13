import { NextResponse } from "next/server";
import { readJson } from "@/lib/data/json-store";
import type { TravelPack } from "@/lib/types";

export async function GET() {
  const packs = await readJson<TravelPack[]>("travel-packs.json");
  return NextResponse.json(packs);
}
