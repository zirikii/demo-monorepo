import { describe, expect, it } from "vitest";
import { filterPeople, people } from "@/data/people";

describe("filterPeople", () => {
  it("has a substantial seed set", () => {
    expect(people.length).toBeGreaterThanOrEqual(25);
  });

  it("filters by team and query", () => {
    const engineering = filterPeople("", "Engineering");
    expect(engineering.every((p) => p.team === "Engineering")).toBe(true);
    const byName = filterPeople(people[0]!.name.split(" ")[0]!, "All");
    expect(byName.length).toBeGreaterThan(0);
  });
});
