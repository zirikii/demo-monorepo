import { describe, expect, it } from "vitest";
import { ACCOUNTS, HOLDINGS } from "@/data/platform";
import type { Holding, PortfolioAccount } from "@/data/types";
import {
  accountValue,
  allocationBreakdown,
  brokerageFor,
  dayMovement,
  holdingsValue,
  MINIMUM_BROKERAGE,
  portfolioValue,
  sortTransactions,
  totalGain,
  validateTrade,
  valueHolding,
} from "@/lib/portfolio";

const ACCOUNT: PortfolioAccount = {
  id: "acc-test",
  name: "Test account",
  type: "HUB24 Invest",
  menu: "Choice",
  opened: "2024-01-01",
  cash: 10_000,
};

const HOLDING: Holding = {
  id: "hld-test",
  accountId: "acc-test",
  code: "BHP",
  name: "BHP Group Limited",
  kind: "ASX listed",
  assetClass: "Australian equities",
  units: 100,
  unitPrice: 50,
  cost: 4_000,
  dayChangePercent: 0,
};

describe("valuation", () => {
  it("values a holding and derives its gain", () => {
    const valued = valueHolding(HOLDING);
    expect(valued.value).toBe(5_000);
    expect(valued.gain).toBe(1_000);
    expect(valued.gainPercent).toBeCloseTo(25);
  });

  it("treats a zero-cost holding as flat rather than dividing by zero", () => {
    const valued = valueHolding({ ...HOLDING, cost: 0 });
    expect(Number.isFinite(valued.gainPercent)).toBe(true);
    expect(valued.gainPercent).toBe(0);
  });

  it("adds cash to the account value", () => {
    expect(accountValue(ACCOUNT, [HOLDING])).toBe(15_000);
  });

  it("sums every account in the portfolio", () => {
    expect(portfolioValue(ACCOUNTS, HOLDINGS)).toBeCloseTo(
      ACCOUNTS.reduce((total, account) => total + account.cash, 0) + holdingsValue(HOLDINGS),
    );
  });

  it("reports the aggregate unrealised gain", () => {
    // 100 units and 50 units at $50 is $7,500 of value against $8,000 of combined cost.
    const { gain, gainPercent } = totalGain([HOLDING, { ...HOLDING, id: "b", units: 50 }]);
    expect(gain).toBe(-500);
    expect(gainPercent).toBeCloseTo(-6.25);
  });

  it("backs the day movement out of the already-moved price", () => {
    const moved = dayMovement([{ ...HOLDING, dayChangePercent: 10 }]);
    // 100 units at $50 after a 10% rise means the previous close was 5000 / 1.1.
    expect(moved).toBeCloseTo(5_000 - 5_000 / 1.1);
  });
});

describe("allocation", () => {
  it("folds account cash into the cash slice and weights to 100%", () => {
    const slices = allocationBreakdown(ACCOUNTS, HOLDINGS);
    const total = slices.reduce((sum, slice) => sum + slice.weight, 0);
    expect(total).toBeCloseTo(100);

    const cash = slices.find((slice) => slice.assetClass === "Cash");
    const accountCash = ACCOUNTS.reduce((sum, account) => sum + account.cash, 0);
    expect(cash?.value).toBeGreaterThan(accountCash);
  });

  it("sorts slices from largest to smallest", () => {
    const slices = allocationBreakdown(ACCOUNTS, HOLDINGS);
    const values = slices.map((slice) => slice.value);
    expect(values).toEqual([...values].sort((a, b) => b - a));
  });
});

describe("brokerage", () => {
  it("applies a minimum on small orders", () => {
    expect(brokerageFor(100)).toBe(MINIMUM_BROKERAGE);
  });

  it("charges the rate on larger orders", () => {
    expect(brokerageFor(100_000)).toBeCloseTo(110);
  });
});

describe("trade validation", () => {
  it("accepts a buy the account can fund", () => {
    const result = validateTrade(
      { accountId: ACCOUNT.id, code: "CBA", name: "CBA", side: "Buy", units: 10, price: 100 },
      ACCOUNT,
      [],
    );
    expect(result.ok).toBe(true);
    expect(result.consideration).toBe(1_000);
  });

  it("rejects a buy that exceeds available cash once brokerage is added", () => {
    const result = validateTrade(
      { accountId: ACCOUNT.id, code: "CBA", name: "CBA", side: "Buy", units: 100, price: 100 },
      ACCOUNT,
      [],
    );
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/insufficient cash/i);
  });

  it("rejects fractional and non-positive unit counts", () => {
    for (const units of [0, -5, 1.5]) {
      const result = validateTrade(
        { accountId: ACCOUNT.id, code: "CBA", name: "CBA", side: "Buy", units, price: 10 },
        ACCOUNT,
        [],
      );
      expect(result.ok, `${units} units should be rejected`).toBe(false);
    }
  });

  it("rejects a sell of units the account does not hold", () => {
    const result = validateTrade(
      { accountId: ACCOUNT.id, code: "BHP", name: "BHP", side: "Sell", units: 500, price: 50 },
      ACCOUNT,
      [HOLDING],
    );
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/enough units/i);
  });

  it("accepts a sell within the held units", () => {
    const result = validateTrade(
      { accountId: ACCOUNT.id, code: "BHP", name: "BHP", side: "Sell", units: 40, price: 50 },
      ACCOUNT,
      [HOLDING],
    );
    expect(result.ok).toBe(true);
  });

  it("rejects an order with no account selected", () => {
    const result = validateTrade(
      { accountId: "missing", code: "BHP", name: "BHP", side: "Buy", units: 1, price: 1 },
      undefined,
      [],
    );
    expect(result.ok).toBe(false);
  });
});

describe("transaction ordering", () => {
  it("sorts newest first without mutating the input", () => {
    const input = [
      { id: "a", accountId: "x", date: "2026-01-01", description: "a", type: "Fee" as const, amount: -1 },
      { id: "b", accountId: "x", date: "2026-06-01", description: "b", type: "Fee" as const, amount: -1 },
    ];
    const sorted = sortTransactions(input);
    expect(sorted.map((entry) => entry.id)).toEqual(["b", "a"]);
    expect(input.map((entry) => entry.id)).toEqual(["a", "b"]);
  });
});
