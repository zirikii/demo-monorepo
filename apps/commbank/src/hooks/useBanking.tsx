import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
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

// A counter rather than randomness, because a double submit mints ids within the same
// millisecond and duplicates would collide as React keys.
let idCounter = 0;

function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

export function BankingProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>(() => readJson(ACCOUNTS_KEY, seedAccounts));
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    readJson(TRANSACTIONS_KEY, seedTransactions),
  );
  const [cards, setCards] = useState<PaymentCard[]>(() => readJson(CARDS_KEY, seedCards));

  /**
   * Money movement validates and writes against these refs rather than the values
   * captured in the render closure. Two submits in the same tick would otherwise both
   * be checked against the pre-click balances, and the second write would clobber the
   * first one's transaction rows.
   */
  const accountsRef = useRef(accounts);
  const transactionsRef = useRef(transactions);

  const commit = useCallback((nextAccounts: Account[], nextTransactions: Transaction[]) => {
    accountsRef.current = nextAccounts;
    transactionsRef.current = nextTransactions;
    setAccounts(nextAccounts);
    setTransactions(nextTransactions);
    writeJson(ACCOUNTS_KEY, nextAccounts);
    writeJson(TRANSACTIONS_KEY, nextTransactions);
  }, []);

  const transfer = useCallback<BankingContextValue["transfer"]>(
    (fromId, toId, amount, description) => {
      if (fromId === toId) return { ok: false, error: "Choose two different accounts." };
      if (!Number.isFinite(amount) || amount <= 0) {
        return { ok: false, error: "Enter an amount greater than $0." };
      }

      const current = accountsRef.current;
      const from = current.find((account) => account.id === fromId);
      const to = current.find((account) => account.id === toId);
      if (!from || !to) return { ok: false, error: "Select both a from and a to account." };
      if (amount > from.available) {
        return { ok: false, error: "You don't have enough available funds in that account." };
      }

      const stamp = todayIso();
      const label = description.trim() || "Transfer";

      commit(
        current.map((account) => {
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
        [
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
          ...transactionsRef.current,
        ],
      );

      return { ok: true };
    },
    [commit],
  );

  const payBill = useCallback<BankingContextValue["payBill"]>(
    (accountId, payeeName, amount, reference) => {
      if (!Number.isFinite(amount) || amount <= 0) {
        return { ok: false, error: "Enter an amount greater than $0." };
      }

      const current = accountsRef.current;
      const from = current.find((account) => account.id === accountId);
      if (!from) return { ok: false, error: "Select an account to pay from." };
      if (amount > from.available) {
        return { ok: false, error: "You don't have enough available funds in that account." };
      }

      commit(
        current.map((account) =>
          account.id === accountId
            ? {
                ...account,
                balance: account.balance - amount,
                available: account.available - amount,
              }
            : account,
        ),
        [
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
          ...transactionsRef.current,
        ],
      );

      return { ok: true };
    },
    [commit],
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
    commit(seedAccounts, seedTransactions);
    setCards(seedCards);
    writeJson(CARDS_KEY, seedCards);
  }, [commit]);

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
