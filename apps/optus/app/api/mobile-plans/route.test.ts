/** @vitest-environment node */
import { beforeEach, describe, expect, it, vi } from "vitest";

const readJson = vi.fn();

vi.mock("@/lib/data/json-store", () => ({
  readJson: (...args: unknown[]) => readJson(...args),
}));

const PLANS = [
  { id: "plan-small", name: "Small", price: 49 },
  { id: "plan-medium", name: "Medium", price: 59 },
  { id: "plan-xlarge", name: "Extra Large", price: 99 },
];

describe("GET /api/mobile-plans", () => {
  beforeEach(() => readJson.mockReset());

  it("returns all plans by default", async () => {
    readJson.mockResolvedValue(PLANS);
    const { GET } = await import("@/app/api/mobile-plans/route");
    const res = await GET(new Request("http://localhost/api/mobile-plans"));
    expect(res.status).toBe(200);
    expect(await res.json()).toHaveLength(3);
  });

  it("filters by maxPrice", async () => {
    readJson.mockResolvedValue(PLANS);
    const { GET } = await import("@/app/api/mobile-plans/route");
    const res = await GET(new Request("http://localhost/api/mobile-plans?maxPrice=60"));
    const body = await res.json();
    expect(body).toHaveLength(2);
    expect(body.every((p: { price: number }) => p.price <= 60)).toBe(true);
  });
});
