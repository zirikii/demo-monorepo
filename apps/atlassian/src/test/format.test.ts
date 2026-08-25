import { describe, expect, it } from "vitest";
import { initials, readingTime, slugify } from "@/lib/format";

describe("slugify", () => {
  it("treats apostrophes as empty, not as word separators", () => {
    expect(slugify("Atlassian's Cloud")).toBe("atlassians-cloud");
  });
});

describe("initials", () => {
  it("skips parenthetical tokens", () => {
    expect(initials("Samuel (Sam) Wright")).toBe("SW");
  });

  it("skips double-quoted nickname tokens", () => {
    expect(initials('Samuel "Sam" Wright')).toBe("SW");
  });
});

describe("readingTime", () => {
  it("returns 0 min read for empty or whitespace-only body", () => {
    expect(readingTime("")).toBe("0 min read");
    expect(readingTime("   ")).toBe("0 min read");
  });
});
