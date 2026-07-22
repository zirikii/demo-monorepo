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
    team: [
      { id: "tm-1", name: "Alex", email: "alex@x.au", role: "Account holder" },
      { id: "tm-2", name: "Sam", email: "sam@x.au", role: "Member" },
    ],
    integrations: [],
  };
}

describe("/api/settings/team", () => {
  beforeEach(() => {
    readJson.mockReset();
    writeJson.mockReset();
    writeJson.mockResolvedValue(undefined);
  });

  it("GET returns the team list", async () => {
    readJson.mockResolvedValue(settings());
    const { GET } = await import("@/app/api/settings/team/route");
    const res = await GET();
    expect(await res.json()).toHaveLength(2);
  });

  it("POST adds a member", async () => {
    readJson.mockResolvedValue(settings());
    const { POST } = await import("@/app/api/settings/team/route");
    const res = await POST(
      new Request("http://localhost/api/settings/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Jo", email: "jo@x.au", role: "Member" }),
      }),
    );
    expect(res.status).toBe(201);
    expect(writeJson).toHaveBeenCalled();
  });

  it("DELETE refuses to remove the account holder", async () => {
    readJson.mockResolvedValue(settings());
    const { DELETE } = await import("@/app/api/settings/team/route");
    const res = await DELETE(new Request("http://localhost/api/settings/team?id=tm-1"));
    expect(res.status).toBe(403);
    expect(writeJson).not.toHaveBeenCalled();
  });

  it("DELETE removes a regular member", async () => {
    readJson.mockResolvedValue(settings());
    const { DELETE } = await import("@/app/api/settings/team/route");
    const res = await DELETE(new Request("http://localhost/api/settings/team?id=tm-2"));
    expect(res.status).toBe(200);
    expect(writeJson).toHaveBeenCalled();
  });
});
