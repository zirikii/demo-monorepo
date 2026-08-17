import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ACCOUNTS, HOLDINGS, TRANSACTIONS } from "@/data/platform";
import type { Holding, PortfolioAccount, Transaction } from "@/data/types";
import { readJson, writeJson } from "@/lib/storage";
import { brokerageFor, validateTrade, type TradeRequest, type TradeResult } from "@/lib/portfolio";

const STORE_KEY = "hub24-demo-portfolio";

interface PortfolioState {
  accounts: PortfolioAccount[];
  holdings: Holding[];
  transactions: Transaction[];
}

interface PortfolioContextValue extends PortfolioState {
  placeTrade: (request: TradeRequest) => TradeResult;
  reset: () => void;
}

const SEED: PortfolioState = {
  accounts: ACCOUNTS,
  holdings: HOLDINGS,
  transactions: TRANSACTIONS,
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

function todayIso(): string {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Applies a validated order to the portfolio. Buys create or top up a holding at a
 * weighted-average cost; sells reduce units and release the proportional cost base so the
 * remaining holding's gain stays sensible.
 */
function applyTrade(state: PortfolioState, request: TradeRequest): PortfolioState {
  const consideration = request.units * request.price;
  const brokerage = brokerageFor(consideration);
  const cashDelta =
    request.side === "Buy" ? -(consideration + brokerage) : consideration - brokerage;

  const accounts = state.accounts.map((account) =>
    account.id === request.accountId ? { ...account, cash: account.cash + cashDelta } : account,
  );

  const existing = state.holdings.find(
    (holding) => holding.accountId === request.accountId && holding.code === request.code,
  );

  let holdings: Holding[];
  if (request.side === "Buy") {
    if (existing) {
      holdings = state.holdings.map((holding) =>
        holding.id === existing.id
          ? {
              ...holding,
              units: holding.units + request.units,
              unitPrice: request.price,
              cost: holding.cost + consideration,
            }
          : holding,
      );
    } else {
      holdings = [
        ...state.holdings,
        {
          id: `hld-${request.code.toLowerCase()}-${Date.now()}`,
          accountId: request.accountId,
          code: request.code,
          name: request.name,
          kind: "ASX listed",
          assetClass: "Australian equities",
          units: request.units,
          unitPrice: request.price,
          cost: consideration,
          dayChangePercent: 0,
        },
      ];
    }
  } else {
    holdings = state.holdings.flatMap((holding) => {
      if (!existing || holding.id !== existing.id) return [holding];
      const remaining = holding.units - request.units;
      if (remaining <= 0) return [];
      const releasedCost = holding.cost * (request.units / holding.units);
      return [
        {
          ...holding,
          units: remaining,
          unitPrice: request.price,
          cost: holding.cost - releasedCost,
        },
      ];
    });
  }

  const transaction: Transaction = {
    id: `txn-${Date.now()}`,
    accountId: request.accountId,
    date: todayIso(),
    description: `${request.side} ${request.units} ${request.name}`,
    type: request.side,
    amount: cashDelta,
  };

  return { accounts, holdings, transactions: [transaction, ...state.transactions] };
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortfolioState>(() => readJson(STORE_KEY, SEED));

  /**
   * The state updater must stay pure — StrictMode invokes it twice in development, so the
   * trade is applied against the closed-over state and the result is returned synchronously
   * rather than being captured from inside the updater.
   */
  const placeTrade = useCallback(
    (request: TradeRequest): TradeResult => {
      const account = state.accounts.find((candidate) => candidate.id === request.accountId);
      const result = validateTrade(request, account, state.holdings);
      if (!result.ok) return result;

      const next = applyTrade(state, request);
      writeJson(STORE_KEY, next);
      setState(next);
      return result;
    },
    [state],
  );

  const reset = useCallback(() => {
    setState(SEED);
    writeJson(STORE_KEY, SEED);
  }, []);

  const value = useMemo<PortfolioContextValue>(
    () => ({ ...state, placeTrade, reset }),
    [state, placeTrade, reset],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio(): PortfolioContextValue {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used inside a PortfolioProvider");
  }
  return context;
}
