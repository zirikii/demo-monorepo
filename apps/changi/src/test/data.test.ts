import { describe, expect, it } from "vitest";
import { outlets } from "@/data/dine";
import { experiences } from "@/data/experiences";
import { happenings } from "@/data/happenings";
import { terminals } from "@/data/terminals";
import { destinations } from "@/data/destinations";
import { navMenus } from "@/data/nav";

function uniqueSlugs(items: { slug: string }[]) {
  return new Set(items.map((i) => i.slug)).size === items.length;
}

describe("data integrity", () => {
  it("has enough directory outlets to exercise the filter", () => {
    expect(outlets.length).toBeGreaterThanOrEqual(20);
    expect(outlets.some((o) => o.category === "dine")).toBe(true);
    expect(outlets.some((o) => o.category === "shop")).toBe(true);
  });

  it("uses unique slugs for routable collections", () => {
    expect(uniqueSlugs(outlets)).toBe(true);
    expect(uniqueSlugs(experiences)).toBe(true);
    expect(uniqueSlugs(happenings)).toBe(true);
    expect(uniqueSlugs(terminals)).toBe(true);
  });

  it("covers both happening types", () => {
    expect(happenings.some((h) => h.type === "events")).toBe(true);
    expect(happenings.some((h) => h.type === "promotions")).toBe(true);
  });

  it("has four terminals", () => {
    expect(terminals).toHaveLength(4);
  });

  it("has a destination strip and complete nav", () => {
    expect(destinations.length).toBeGreaterThanOrEqual(12);
    expect(navMenus.map((m) => m.label)).toContain("Fly");
    expect(navMenus.every((m) => m.links.length > 0)).toBe(true);
  });
});
