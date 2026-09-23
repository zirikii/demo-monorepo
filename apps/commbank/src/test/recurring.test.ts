import { describe, expect, it } from "vitest";
import { addFrequency, nextDateAfter } from "@/lib/recurring";

describe("addFrequency", () => {
  it("adds seven days for weekly", () => {
    expect(addFrequency("2026-01-10", "weekly")).toBe("2026-01-17");
  });

  it("adds fourteen days for fortnightly", () => {
    expect(addFrequency("2026-01-10", "fortnightly")).toBe("2026-01-24");
  });

  it("adds one calendar month", () => {
    expect(addFrequency("2026-03-15", "monthly")).toBe("2026-04-15");
  });

  it("clamps Jan 31 to the last day of February", () => {
    expect(addFrequency("2026-01-31", "monthly")).toBe("2026-02-28");
  });

  it("clamps Jan 31 to Feb 29 in a leap year", () => {
    expect(addFrequency("2024-01-31", "monthly")).toBe("2024-02-29");
  });
});

describe("nextDateAfter", () => {
  it("returns the next monthly anchor day strictly after the reference", () => {
    expect(nextDateAfter("2026-06-18", "monthly", "2026-08-05")).toBe("2026-08-18");
    expect(nextDateAfter("2026-06-18", "monthly", "2026-08-18")).toBe("2026-09-18");
  });

  it("clamps anchor day when the target month is shorter", () => {
    expect(nextDateAfter("2026-01-31", "monthly", "2026-01-31")).toBe("2026-02-28");
  });

  it("advances weekly anchors past the reference day", () => {
    expect(nextDateAfter("2026-08-01", "weekly", "2026-08-05")).toBe("2026-08-08");
  });
});
