import { describe, expect, it } from "vitest";
import { formatCompact, formatRupiah, formatDate, slugify } from "@/lib/format";

describe("format helpers", () => {
  it("formats compact numbers", () => {
    expect(formatCompact(3_000_000)).toBe("3M");
    expect(formatCompact(6_400_000)).toBe("6.4M");
    expect(formatCompact(190)).toBe("190");
  });

  it("formats rupiah without decimals or spaces", () => {
    const value = formatRupiah(48000);
    expect(value).toContain("Rp");
    expect(value).toContain("48.000");
    expect(value).not.toMatch(/\s/);
  });

  it("formats ISO dates as day-month-year", () => {
    expect(formatDate("2024-08-01")).toBe("1 Aug 2024");
  });

  it("returns the original string for invalid dates", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });

  it("slugifies product names", () => {
    expect(slugify("GoFood")).toBe("gofood");
    expect(slugify("Go Pay Later")).toBe("go-pay-later");
  });
});
