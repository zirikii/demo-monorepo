import type { AssetClass, Holding, PortfolioAccount, Transaction } from "@/data/types";

export interface ValuedHolding extends Holding {
  value: number;
  gain: number;
  gainPercent: number;
}

export function valueHolding(holding: Holding): ValuedHolding {
  const value = holding.units * holding.unitPrice;
  const gain = value - holding.cost;
  return {
    ...holding,
    value,
    gain,
    // A holding transferred in at zero cost would otherwise divide by zero.
    gainPercent: holding.cost === 0 ? 0 : (gain / holding.cost) * 100,
  };
}

export function valueHoldings(holdings: Holding[]): ValuedHolding[] {
  return holdings.map(valueHolding);
}

export function holdingsValue(holdings: Holding[]): number {
  return holdings.reduce((total, holding) => total + holding.units * holding.unitPrice, 0);
}

export function accountValue(account: PortfolioAccount, holdings: Holding[]): number {
  return account.cash + holdingsValue(holdings.filter((holding) => holding.accountId === account.id));
}

export function portfolioValue(accounts: PortfolioAccount[], holdings: Holding[]): number {
  return accounts.reduce((total, account) => total + accountValue(account, holdings), 0);
}

export interface AllocationSlice {
  assetClass: AssetClass;
  value: number;
  weight: number;
}

/**
 * Cash balances are part of the client's allocation, so they are folded into the Cash
 * slice rather than being reported separately from the invested holdings.
 */
export function allocationBreakdown(
  accounts: PortfolioAccount[],
  holdings: Holding[],
): AllocationSlice[] {
  const totals = new Map<AssetClass, number>();

  for (const holding of holdings) {
    const current = totals.get(holding.assetClass) ?? 0;
    totals.set(holding.assetClass, current + holding.units * holding.unitPrice);
  }

  const cash = accounts.reduce((total, account) => total + account.cash, 0);
  if (cash > 0) {
    totals.set("Cash", (totals.get("Cash") ?? 0) + cash);
  }

  const grandTotal = Array.from(totals.values()).reduce((total, value) => total + value, 0);

  return Array.from(totals.entries())
    .map(([assetClass, value]) => ({
      assetClass,
      value,
      weight: grandTotal === 0 ? 0 : (value / grandTotal) * 100,
    }))
    .sort((a, b) => b.value - a.value);
}

export function totalGain(holdings: Holding[]): { gain: number; gainPercent: number } {
  const cost = holdings.reduce((total, holding) => total + holding.cost, 0);
  const value = holdingsValue(holdings);
  const gain = value - cost;
  return { gain, gainPercent: cost === 0 ? 0 : (gain / cost) * 100 };
}

export function dayMovement(holdings: Holding[]): number {
  return holdings.reduce((total, holding) => {
    const value = holding.units * holding.unitPrice;
    // dayChangePercent is the move already reflected in unitPrice, so back out the
    // previous close to get the dollar movement.
    const previous = value / (1 + holding.dayChangePercent / 100);
    return total + (value - previous);
  }, 0);
}

export function sortTransactions(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => b.date.localeCompare(a.date));
}

export interface TradeRequest {
  accountId: string;
  code: string;
  name: string;
  side: "Buy" | "Sell";
  units: number;
  price: number;
}

export interface TradeResult {
  ok: boolean;
  message: string;
  consideration: number;
}

/** Brokerage applied to mock direct market trades, matching the demo's rate card. */
export const BROKERAGE_RATE = 0.0011;
export const MINIMUM_BROKERAGE = 12.5;

export function brokerageFor(consideration: number): number {
  return Math.max(MINIMUM_BROKERAGE, consideration * BROKERAGE_RATE);
}

export function validateTrade(
  request: TradeRequest,
  account: PortfolioAccount | undefined,
  holdings: Holding[],
): TradeResult {
  const consideration = request.units * request.price;

  if (!account) {
    return { ok: false, message: "Select an account before placing the order.", consideration };
  }
  if (!Number.isFinite(request.units) || request.units <= 0) {
    return { ok: false, message: "Enter a whole number of units greater than zero.", consideration };
  }
  if (!Number.isInteger(request.units)) {
    return { ok: false, message: "Listed securities trade in whole units.", consideration };
  }

  const brokerage = brokerageFor(consideration);

  if (request.side === "Buy" && consideration + brokerage > account.cash) {
    return {
      ok: false,
      message: "Insufficient cash in the account for this order plus brokerage.",
      consideration,
    };
  }

  if (request.side === "Sell") {
    const existing = holdings.find(
      (holding) => holding.accountId === request.accountId && holding.code === request.code,
    );
    if (!existing || existing.units < request.units) {
      return { ok: false, message: "The account does not hold enough units to sell.", consideration };
    }
  }

  return { ok: true, message: "Order accepted.", consideration };
}
