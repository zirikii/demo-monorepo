import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { seedAccounts, seedCards, seedTransactions } from "@/data/netbank";
import type { Account, PaymentCard, Transaction } from "@/data/types";
import { todayIso } from "@/lib/format";
import { readJson, writeJson } from "@/lib/storage";

const ACCOUNTS_KEY = "commbank-demo-accounts";
const TRANSACTIONS_KEY = "commbank-demo-transactions";
const CARDS_KEY = "commbank-demo-cards";

export type TransferResult = { ok: true } | { ok: false; error: string };

type BankingContextValue = {
  accounts: Account[];
  transactions: Transaction[];
  cards: PaymentCard[];
  transfer: (fromId: string, toId: string, amount: number, description: string) => TransferResult;
  payBill: (
    accountId: string,
    payeeName: string,
    amount: number,
    reference: string,
  ) => TransferResult;
  toggleCardLock: (cardId: string) => void;
  reset: () => void;
};

const BankingContext = createContext<BankingContextValue | null>(null);

function nextId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function BankingProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>(() => readJson(ACCOUNTS_KEY, seedAccounts));
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    readJson(TRANSACTIONS_KEY, seedTransactions),
  );
  const [cards, setCards] = useState<PaymentCard[]>(() => readJson(CARDS_KEY, seedCards));

  const persistAccounts = useCallback((next: Account[]) => {
    setAccounts(next);
    writeJson(ACCOUNTS_KEY, next);
  }, []);

  const persistTransactions = useCallback((next: Transaction[]) => {
    setTransactions(next);
    writeJson(TRANSACTIONS_KEY, next);
  }, []);

  const transfer = useCallback<BankingContextValue["transfer"]>(
    (fromId, toId, amount, description) => {
      if (fromId === toId) return { ok: false, error: "Choose two different accounts." };
      if (!Number.isFinite(amount) || amount <= 0) {
        return { ok: false, error: "Enter an amount greater than $0." };
      }

      const from = accounts.find((account) => account.id === fromId);
      const to = accounts.find((account) => account.id === toId);
      if (!from || !to) return { ok: false, error: "Select both a from and a to account." };
      if (amount > from.available) {
        return { ok: false, error: "You don't have enough available funds in that account." };
      }

      persistAccounts(
        accounts.map((account) => {
          if (account.id === fromId) {
            return {
              ...account,
              balance: account.balance - amount,
              available: account.available - amount,
            };
          }
          if (account.id === toId) {
            return {
              ...account,
              balance: account.balance + amount,
              available: account.available + amount,
            };
          }
          return account;
        }),
      );

      const stamp = todayIso();
      const label = description.trim() || "Transfer";
      persistTransactions([
        {
          id: nextId("tx"),
          accountId: fromId,
          date: stamp,
          description: `${label} to ${to.name}`,
          merchant: "CommBank",
          category: "Transfers",
          amount: -amount,
        },
        {
          id: nextId("tx"),
          accountId: toId,
          date: stamp,
          description: `${label} from ${from.name}`,
          merchant: "CommBank",
          category: "Transfers",
          amount,
        },
        ...transactions,
      ]);

      return { ok: true };
    },
    [accounts, transactions, persistAccounts, persistTransactions],
  );

  const payBill = useCallback<BankingContextValue["payBill"]>(
    (accountId, payeeName, amount, reference) => {
      if (!Number.isFinite(amount) || amount <= 0) {
        return { ok: false, error: "Enter an amount greater than $0." };
      }
      const from = accounts.find((account) => account.id === accountId);
      if (!from) return { ok: false, error: "Select an account to pay from." };
      if (amount > from.available) {
        return { ok: false, error: "You don't have enough available funds in that account." };
      }

      persistAccounts(
        accounts.map((account) =>
          account.id === accountId
            ? {
                ...account,
                balance: account.balance - amount,
                available: account.available - amount,
              }
            : account,
        ),
      );

      persistTransactions([
        {
          id: nextId("tx"),
          accountId,
          date: todayIso(),
          description: reference ? `${payeeName} — ${reference}` : payeeName,
          merchant: payeeName,
          category: "Transfers",
          amount: -amount,
          pending: true,
        },
        ...transactions,
      ]);

      return { ok: true };
    },
    [accounts, transactions, persistAccounts, persistTransactions],
  );

  const toggleCardLock = useCallback((cardId: string) => {
    setCards((current) => {
      const next = current.map((card) =>
        card.id === cardId
          ? {
              ...card,
              status: card.status === "active" ? ("locked" as const) : ("active" as const),
            }
          : card,
      );
      writeJson(CARDS_KEY, next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    persistAccounts(seedAccounts);
    persistTransactions(seedTransactions);
    setCards(seedCards);
    writeJson(CARDS_KEY, seedCards);
  }, [persistAccounts, persistTransactions]);

  const value = useMemo(
    () => ({ accounts, transactions, cards, transfer, payBill, toggleCardLock, reset }),
    [accounts, transactions, cards, transfer, payBill, toggleCardLock, reset],
  );

  return <BankingContext.Provider value={value}>{children}</BankingContext.Provider>;
}

export function useBanking(): BankingContextValue {
  const ctx = useContext(BankingContext);
  if (!ctx) throw new Error("useBanking must be used within BankingProvider");
  return ctx;
}
