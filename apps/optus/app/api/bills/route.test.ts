/** @vitest-environment node */
import { beforeEach, describe, expect, it, vi } from "vitest";

const readJson = vi.fn();

vi.mock("@/lib/data/json-store", () => ({
  readJson: (...args: unknown[]) => readJson(...args),
}));

const BILLS = [
  { id: "b1", status: "Due", amount: 59 },
  { id: "b2", status: "Paid", amount: 89 },
  { id: "b3", status: "Paid", amount: 89 },
];

describe("GET /api/bills", () => {
  beforeEach(() => readJson.mockReset());

  it("returns all bills by default", async () => {
    readJson.mockResolvedValue(BILLS);
    const { GET } = await import("@/app/api/bills/route");
    const res = await GET(new Request("http://localhost/api/bills"));
    expect(await res.json()).toHaveLength(3);
  });

  it("filters by status", async () => {
    readJson.mockResolvedValue(BILLS);
    const { GET } = await import("@/app/api/bills/route");
    const res = await GET(new Request("http://localhost/api/bills?status=paid"));
    const body = await res.json();
    expect(body).toHaveLength(2);
    expect(body.every((b: { status: string }) => b.status === "Paid")).toBe(true);
  });
});
