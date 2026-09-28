import { describe, expect, it } from "vitest";
import { comparableBill, latestBill, totalOutstanding } from "@/data/account";
import { energyPlans, estimateAnnualCost } from "@/data/plans";
import { daysUntil, formatCurrency, formatDate, formatKwh, formatPercentChange, telHref } from "@/lib/format";

describe("formatters", () => {
  it("formats AUD", () => {
    expect(formatCurrency(487.35)).toBe("$487.35");
    expect(formatCurrency(1576.4, { whole: true })).toBe("$1,576");
  });

  it("formats calendar dates without drifting a day", () => {
    expect(formatDate("2026-10-14")).toBe("14 October 2026");
    expect(formatDate("2026-10-14", "short")).toBe("14 Oct 2026");
  });

  it("formats usage, change and phone links", () => {
    expect(formatKwh(1214)).toBe("1,214 kWh");
    expect(formatPercentChange(1214, 988)).toBe("+23%");
    expect(formatPercentChange(90, 100)).toBe("-10%");
    expect(telHref("13 13 88")).toBe("tel:131388");
  });

  it("counts days until a due date", () => {
    expect(daysUntil("2026-10-14", new Date("2026-09-28T09:00:00Z"))).toBe(16);
  });
});

describe("account data", () => {
  it("totals outstanding electricity and gas", () => {
    expect(totalOutstanding()).toBeCloseTo(700.15, 2);
  });

  it("finds the same quarter last year for the high-bill explanation", () => {
    const elec = latestBill("electricity")!;
    expect(comparableBill(elec)?.usageKwh).toBe(988);
  });

  it("estimates plan costs by state", () => {
    const valueSaver = energyPlans.find((p) => p.slug === "value-saver")!;
    expect(estimateAnnualCost(valueSaver, 3900, "NSW")).toBe(1300);
    expect(estimateAnnualCost(valueSaver, 3900, "VIC")).toBeLessThan(1300);
  });
});
