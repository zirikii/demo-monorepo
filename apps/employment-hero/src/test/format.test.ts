import { describe, expect, it } from "vitest";
import { formatCurrency, formatDate } from "@/lib/format";

describe("formatters", () => {
  it("formats AUD without cents by default", () => {
    expect(formatCurrency(486200)).toMatch(/\$486,200/);
  });

  it("formats en-AU dates", () => {
    expect(formatDate("2026-08-16")).toMatch(/16/);
  });
});
