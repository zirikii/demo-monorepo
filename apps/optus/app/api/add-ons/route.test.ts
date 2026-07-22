/** @vitest-environment node */
import { beforeEach, describe, expect, it, vi } from "vitest";

const readJson = vi.fn();
const writeJson = vi.fn();

vi.mock("@/lib/data/json-store", () => ({ readJson: (...args: unknown[]) => readJson(...args), writeJson: (...args: unknown[]) => writeJson(...args) }));

describe("/api/add-ons", () => {
  beforeEach(() => { readJson.mockReset(); writeJson.mockReset(); });
  it("returns add-ons", async () => { readJson.mockResolvedValue([{ id: "roaming", name: "Roaming", active: false }]); const { GET } = await import("@/app/api/add-ons/route"); const res = await GET(); expect(res.status).toBe(200); expect(await res.json()).toHaveLength(1); });
  it("updates an add-on", async () => { readJson.mockResolvedValue([{ id: "roaming", name: "Roaming", price: 5, category: "Roaming", description: "Test", active: false }]); writeJson.mockResolvedValue(undefined); const { POST } = await import("@/app/api/add-ons/route"); const res = await POST(new Request("http://localhost/api/add-ons", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: "roaming", active: true }) })); expect(res.status).toBe(200); const body = await res.json(); expect(body.active).toBe(true); expect(writeJson).toHaveBeenCalledWith("add-ons.json", expect.any(Array)); });
  it("rejects invalid payloads", async () => { const { POST } = await import("@/app/api/add-ons/route"); const res = await POST(new Request("http://localhost/api/add-ons", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: "roaming" }) })); expect(res.status).toBe(400); });
});
