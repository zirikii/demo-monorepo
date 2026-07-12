// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/server", () => ({
  getSession: vi.fn(),
}));
vi.mock("@/lib/data/addons", () => ({
  getAddOns: vi.fn(),
}));
vi.mock("@/lib/data/account", () => ({
  getAccount: vi.fn(),
  setActiveAddOn: vi.fn(),
}));

import { GET, POST } from "../addons/route";
import { getSession } from "@/lib/auth/server";
import { getAddOns } from "@/lib/data/addons";
import { getAccount, setActiveAddOn } from "@/lib/data/account";

const SESSION = { id: "user_1", email: "you@example.co.nz", name: "Aria Ngata" };
const ADDONS = [
  { id: "addon-roam-daily", name: "Daily Roaming", category: "roaming", description: "", price: 7, unit: "per day" },
];
const ACCOUNT = {
  planId: "plan-mobile-endless",
  activeAddOnIds: ["addon-roam-daily"],
  dataAllowanceGb: 0,
  dataUsedGb: 0,
  cycleResetAt: "2026-08-02T00:00:00.000Z",
  balanceOwing: 65,
};

function postRequest(body: unknown): Request {
  return new Request("http://localhost/api/addons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getAddOns).mockResolvedValue(ADDONS as never);
  vi.mocked(getAccount).mockResolvedValue(ACCOUNT as never);
});

describe("GET /api/addons", () => {
  it("401s when there is no session", async () => {
    vi.mocked(getSession).mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns add-ons and active ids for a signed-in user", async () => {
    vi.mocked(getSession).mockResolvedValue(SESSION);
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.addons).toHaveLength(1);
    expect(json.activeAddOnIds).toContain("addon-roam-daily");
  });
});

describe("POST /api/addons", () => {
  it("rejects an invalid body", async () => {
    vi.mocked(getSession).mockResolvedValue(SESSION);
    const res = await POST(postRequest({ addOnId: "" }));
    expect(res.status).toBe(400);
  });

  it("404s for an unknown add-on", async () => {
    vi.mocked(getSession).mockResolvedValue(SESSION);
    const res = await POST(postRequest({ addOnId: "nope", active: true }));
    expect(res.status).toBe(404);
  });

  it("connects a valid add-on", async () => {
    vi.mocked(getSession).mockResolvedValue(SESSION);
    vi.mocked(setActiveAddOn).mockResolvedValue({
      ...ACCOUNT,
      activeAddOnIds: ["addon-roam-daily"],
    } as never);
    const res = await POST(postRequest({ addOnId: "addon-roam-daily", active: true }));
    expect(res.status).toBe(200);
    expect(setActiveAddOn).toHaveBeenCalledWith("addon-roam-daily", true);
  });
});
