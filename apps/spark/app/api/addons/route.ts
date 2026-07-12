import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/server";
import { toggleAddOnSchema } from "@/lib/validation";
import { getAddOns } from "@/lib/data/addons";
import { getAccount, setActiveAddOn } from "@/lib/data/account";

/** List add-ons + the account's currently active ids. */
export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const [addons, account] = await Promise.all([getAddOns(), getAccount()]);
  return NextResponse.json({ addons, activeAddOnIds: account.activeAddOnIds });
}

/** Connect or disconnect an add-on. */
export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const parsed = toggleAddOnSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }

  const addons = await getAddOns();
  if (!addons.some((a) => a.id === parsed.data.addOnId)) {
    return NextResponse.json({ error: "Unknown add-on" }, { status: 404 });
  }

  const account = await setActiveAddOn(parsed.data.addOnId, parsed.data.active);
  return NextResponse.json({ activeAddOnIds: account.activeAddOnIds });
}
