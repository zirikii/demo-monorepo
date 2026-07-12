import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/server";
import { changePlanSchema } from "@/lib/validation";
import { getPlanById } from "@/lib/data/plans";
import { getAccount, setPlan } from "@/lib/data/account";

/** Return the account's current plan id. */
export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const account = await getAccount();
  return NextResponse.json({ planId: account.planId });
}

/** Change the account's mobile plan. */
export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const parsed = changePlanSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }

  const plan = await getPlanById(parsed.data.planId);
  if (!plan) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 404 });
  }

  const account = await setPlan(parsed.data.planId);
  return NextResponse.json({ planId: account.planId });
}
