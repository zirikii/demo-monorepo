/** @vitest-environment node */
import { beforeEach, describe, expect, it, vi } from "vitest";

const readJson = vi.fn();
const writeJson = vi.fn();

vi.mock("@/lib/data/json-store", () => ({
  readJson: (...args: unknown[]) => readJson(...args),
  writeJson: (...args: unknown[]) => writeJson(...args),
}));

function settings() {
  return {
    team: [],
    integrations: [
      { id: "int-sport", name: "Optus Sport", description: "", connected: true },
      { id: "int-subhub", name: "SubHub", description: "", connected: false },
    ],
  };
}

describe("/api/settings/integrations", () => {
  beforeEach(() => {
    readJson.mockReset();
    writeJson.mockReset();
    writeJson.mockResolvedValue(undefined);
  });

  it("GET returns integrations", async () => {
    readJson.mockResolvedValue(settings());
    const { GET } = await import("@/app/api/settings/integrations/route");
    const res = await GET();
    expect(await res.json()).toHaveLength(2);
  });

  it("PATCH toggles an integration", async () => {
    readJson.mockResolvedValue(settings());
    const { PATCH } = await import("@/app/api/settings/integrations/route");
    const res = await PATCH(
      new Request("http://localhost/api/settings/integrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "int-subhub", connected: true }),
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.connected).toBe(true);
    expect(writeJson).toHaveBeenCalled();
  });

  it("PATCH returns 404 for unknown integration", async () => {
    readJson.mockResolvedValue(settings());
    const { PATCH } = await import("@/app/api/settings/integrations/route");
    const res = await PATCH(
      new Request("http://localhost/api/settings/integrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "nope", connected: true }),
      }),
    );
    expect(res.status).toBe(404);
  });
});
