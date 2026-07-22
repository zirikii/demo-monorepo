import { NextResponse } from "next/server";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";

export async function GET(request: Request) {
  const plans = await readJson<MobilePlan[]>("mobile-plans.json");
  const maxPrice = new URL(request.url).searchParams.get("maxPrice");
  if (maxPrice) {
    const cap = Number(maxPrice);
    if (Number.isFinite(cap)) {
      return NextResponse.json(plans.filter((p) => p.price <= cap));
    }
  }
  return NextResponse.json(plans);
}
