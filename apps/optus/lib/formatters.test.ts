import { describe, expect, it } from "vitest";
import { formatCurrency, formatPercent } from "@/lib/formatters";
describe("Optus formatters", () => {
  it("formats Australian dollars without cents", () => {
    expect(formatCurrency(12890)).toBe("$12,890");
  });
  it("formats percentages with one decimal", () => {
    expect(formatPercent(99.92)).toBe("99.9%");
  });
});
