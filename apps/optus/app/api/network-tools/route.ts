import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson, writeJson } from "@/lib/data/json-store";
import type { NetworkToolsState } from "@/lib/types";

export async function GET() {
  const state = await readJson<NetworkToolsState>("network-tools.json");
  return NextResponse.json(state);
}

const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("activate-udd") }),
  z.object({ action: z.literal("deactivate-udd") }),
  z.object({ action: z.literal("donate"), gb: z.number().min(1).max(20) }),
  z.object({ action: z.literal("scam-report"), message: z.string().min(3).max(280) }),
  z.object({ action: z.literal("refresh-pulse") }),
]);

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid network tools request" }, { status: 400 });
  }

  const state = await readJson<NetworkToolsState>("network-tools.json");
  const now = new Date();

  switch (body.data.action) {
    case "activate-udd": {
      const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      state.unlimitedDataDay = {
        active: true,
        activatedAt: now.toISOString(),
        expiresAt: expires.toISOString(),
      };
      break;
    }
    case "deactivate-udd": {
      state.unlimitedDataDay = { active: false, activatedAt: null, expiresAt: null };
      break;
    }
    case "donate": {
      state.donateData.lastDonationGb = body.data.gb;
      state.donateData.totalDonatedGb += body.data.gb;
      break;
    }
    case "scam-report": {
      state.scamwise.reports.unshift({
        id: `scam-${now.getTime()}`,
        message: body.data.message,
        createdAt: now.toISOString(),
      });
      state.scamwise.reports = state.scamwise.reports.slice(0, 20);
      break;
    }
    case "refresh-pulse": {
      const jitter = (base: number) => base + Math.floor(Math.random() * 8);
      state.networkPulse = {
        mobile: { status: "Excellent", latencyMs: jitter(16), signal: "5G" },
        home: { status: "Good", latencyMs: jitter(10), signal: "WiFi 6" },
        publicWifi: { status: "Fair", latencyMs: jitter(42), signal: "Optus WiFi" },
        updatedAt: now.toISOString(),
      };
      break;
    }
  }

  await writeJson("network-tools.json", state);
  return NextResponse.json(state);
}
