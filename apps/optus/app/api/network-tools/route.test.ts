/** @vitest-environment node */
import { beforeEach, describe, expect, it, vi } from "vitest";

const readJson = vi.fn();
const writeJson = vi.fn();

vi.mock("@/lib/data/json-store", () => ({
  readJson: (...args: unknown[]) => readJson(...args),
  writeJson: (...args: unknown[]) => writeJson(...args),
}));

const baseState = {
  unlimitedDataDay: { active: false, activatedAt: null, expiresAt: null },
  donateData: { lastDonationGb: 0, totalDonatedGb: 4 },
  scamwise: { reports: [] },
  networkPulse: {
    mobile: { status: "Excellent", latencyMs: 18, signal: "5G" },
    home: { status: "Good", latencyMs: 12, signal: "WiFi 6" },
    publicWifi: { status: "Fair", latencyMs: 48, signal: "Optus WiFi" },
    updatedAt: "2026-07-22T08:30:00.000Z",
  },
};

describe("/api/network-tools", () => {
  beforeEach(() => {
    readJson.mockReset();
    writeJson.mockReset();
  });

  it("returns network tools state", async () => {
    readJson.mockResolvedValue(baseState);
    const { GET } = await import("@/app/api/network-tools/route");
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ donateData: { totalDonatedGb: 4 } });
  });

  it("activates Unlimited Data Day", async () => {
    readJson.mockResolvedValue(structuredClone(baseState));
    writeJson.mockResolvedValue(undefined);
    const { POST } = await import("@/app/api/network-tools/route");
    const res = await POST(
      new Request("http://localhost/api/network-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "activate-udd" }),
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.unlimitedDataDay.active).toBe(true);
    expect(writeJson).toHaveBeenCalledWith("network-tools.json", expect.any(Object));
  });

  it("rejects invalid payloads", async () => {
    const { POST } = await import("@/app/api/network-tools/route");
    const res = await POST(
      new Request("http://localhost/api/network-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "nope" }),
      }),
    );
    expect(res.status).toBe(400);
  });
});
