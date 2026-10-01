import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { buildSeedRecurringTransfers, seedAccounts, seedCards, seedTransactions } from "@/data/netbank";
import type { Account, PaymentCard, RecurringTransfer, Transaction } from "@/data/types";
import { todayIso } from "@/lib/format";
import { addFrequency, isOnOrBefore } from "@/lib/recurring";
import { readJson, writeJson } from "@/lib/storage";

const ACCOUNTS_KEY = "commbank-demo-accounts";
const TRANSACTIONS_KEY = "commbank-demo-transactions";
const CARDS_KEY = "commbank-demo-cards";
const RECURRING_KEY = "commbank-demo-recurring";
const MAX_CATCH_UP_PER_SCHEDULE = 24;

export type TransferResult = { ok: true } | { ok: false; error: string };

export type CreateRecurringResult =
  | { ok: true; paymentsProcessed: number }
  | { ok: false; error: string };

export type CreateRecurringInput = {
  fromId: string;
  toId: string;
  amount: number;
  description: string;
  frequency: RecurringTransfer["frequency"];
  startDate: string;
  remainingPayments: number | null;
};

type BankingContextValue = {
  accounts: Account[];
  transactions: Transaction[];
  cards: PaymentCard[];
  recurringTransfers: RecurringTransfer[];
  transfer: (fromId: string, toId: string, amount: number, description: string) => TransferResult;
  createRecurring: (input: CreateRecurringInput) => CreateRecurringResult;
  cancelRecurring: (id: string) => void;
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

function validateTransferAccounts(
  current: Account[],
  fromId: string,
  toId: string,
  amount: number,
): { ok: false; error: string } | null {
  if (fromId === toId) return { ok: false, error: "Choose two different accounts." };
  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, error: "Enter an amount greater than $0." };
  }
  const from = current.find((account) => account.id === fromId);
  const to = current.find((account) => account.id === toId);
  if (!from || !to) return { ok: false, error: "Select both a from and a to account." };
  if (amount > from.available) {
    return { ok: false, error: "You don't have enough available funds in that account." };
  }
  return null;
}

export function BankingProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>(() => readJson(ACCOUNTS_KEY, seedAccounts));
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    readJson(TRANSACTIONS_KEY, seedTransactions),
  );
  const [cards, setCards] = useState<PaymentCard[]>(() => readJson(CARDS_KEY, seedCards));
  const [recurringTransfers, setRecurringTransfers] = useState<RecurringTransfer[]>(() =>
    readJson(RECURRING_KEY, buildSeedRecurringTransfers()),
  );

  /**
   * Money movement validates and writes against these refs rather than the values
   * captured in the render closure. Two submits in the same tick would otherwise both
   * be checked against the pre-click balances, and the second write would clobber the
   * first one's transaction rows.
   */
  const accountsRef = useRef(accounts);
  const transactionsRef = useRef(transactions);
  const recurringRef = useRef(recurringTransfers);

  const commit = useCallback((nextAccounts: Account[], nextTransactions: Transaction[]) => {
    accountsRef.current = nextAccounts;
    transactionsRef.current = nextTransactions;
    setAccounts(nextAccounts);
    setTransactions(nextTransactions);
    writeJson(ACCOUNTS_KEY, nextAccounts);
    writeJson(TRANSACTIONS_KEY, nextTransactions);
  }, []);

  const persistRecurring = useCallback((next: RecurringTransfer[]) => {
    recurringRef.current = next;
    setRecurringTransfers(next);
    writeJson(RECURRING_KEY, next);
  }, []);

  const transfer = useCallback<BankingContextValue["transfer"]>(
    (fromId, toId, amount, description) => {
      const validation = validateTransferAccounts(accountsRef.current, fromId, toId, amount);
      if (validation) return validation;

      const current = accountsRef.current;
      const from = current.find((account) => account.id === fromId);
      const to = current.find((account) => account.id === toId);
      if (!from || !to) return { ok: false, error: "Select both a from and a to account." };

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

  const advanceAfterPayment = useCallback(
    (schedule: RecurringTransfer): RecurringTransfer => {
      const remaining =
        schedule.remainingPayments === null ? null : schedule.remainingPayments - 1;
      const nextDate = addFrequency(schedule.nextDate, schedule.frequency);
      if (remaining === 0) {
        return { ...schedule, status: "completed", remainingPayments: 0, nextDate };
      }
      return { ...schedule, nextDate, remainingPayments: remaining };
    },
    [],
  );

  const runDuePayments = useCallback(
    (schedules: RecurringTransfer[]): RecurringTransfer[] => {
      const today = todayIso();
      return schedules.map((schedule) => {
        if (schedule.status !== "active") return schedule;

        let current = schedule;
        let hits = 0;
        while (
          hits < MAX_CATCH_UP_PER_SCHEDULE &&
          isOnOrBefore(current.nextDate, today) &&
          (current.remainingPayments === null || current.remainingPayments > 0)
        ) {
          const result = transfer(
            current.fromId,
            current.toId,
            current.amount,
            current.description,
          );
          if (!result.ok) break;
          hits += 1;
          current = advanceAfterPayment(current);
          if (current.status === "completed") break;
        }
        return current;
      });
    },
    [advanceAfterPayment, transfer],
  );

  const catchUpRan = useRef(false);

  useEffect(() => {
    if (catchUpRan.current) return;
    catchUpRan.current = true;
    const before = recurringRef.current;
    const processed = runDuePayments(before);
    const changed = processed.some((item, index) => {
      const previous = before[index];
      if (!previous || item.id !== previous.id) return true;
      return item.nextDate !== previous.nextDate || item.status !== previous.status;
    });
    if (changed) persistRecurring(processed);
  }, [persistRecurring, runDuePayments]);

  const createRecurring = useCallback<BankingContextValue["createRecurring"]>(
    (input) => {
      const { fromId, toId, amount, description, frequency, startDate, remainingPayments } =
        input;

      const validation = validateTransferAccounts(accountsRef.current, fromId, toId, amount);
      if (validation) return validation;

      if (!startDate.trim()) {
        return { ok: false, error: "Choose a start date." };
      }

      if (
        remainingPayments !== null &&
        (!Number.isFinite(remainingPayments) || remainingPayments < 1)
      ) {
        return { ok: false, error: "Enter at least one payment, or choose Never." };
      }

      let schedule: RecurringTransfer = {
        id: nextId("rec"),
        fromId,
        toId,
        amount,
        description: description.trim() || "Transfer",
        frequency,
        startDate,
        nextDate: startDate,
        remainingPayments,
        status: "active",
      };

      const today = todayIso();
      let paymentsProcessed = 0;
      while (
        paymentsProcessed < MAX_CATCH_UP_PER_SCHEDULE &&
        isOnOrBefore(schedule.nextDate, today) &&
        (schedule.remainingPayments === null || schedule.remainingPayments > 0)
      ) {
        const result = transfer(fromId, toId, amount, schedule.description);
        if (!result.ok) {
          if (paymentsProcessed > 0) {
            persistRecurring([schedule, ...recurringRef.current]);
          }
          return result;
        }
        paymentsProcessed += 1;
        schedule = advanceAfterPayment(schedule);
        if (schedule.status === "completed") break;
      }

      persistRecurring([schedule, ...recurringRef.current]);
      return { ok: true, paymentsProcessed };
    },
    [advanceAfterPayment, persistRecurring, transfer],
  );

  const cancelRecurring = useCallback(
    (id: string) => {
      persistRecurring(recurringRef.current.filter((item) => item.id !== id));
    },
    [persistRecurring],
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
    persistRecurring(buildSeedRecurringTransfers());
    catchUpRan.current = false;
  }, [commit, persistRecurring]);

  const value = useMemo(
    () => ({
      accounts,
      transactions,
      cards,
      recurringTransfers,
      transfer,
      createRecurring,
      cancelRecurring,
      payBill,
      toggleCardLock,
      reset,
    }),
    [
      accounts,
      transactions,
      cards,
      recurringTransfers,
      transfer,
      createRecurring,
      cancelRecurring,
      payBill,
      toggleCardLock,
      reset,
    ],
  );

  return <BankingContext.Provider value={value}>{children}</BankingContext.Provider>;
}

export function useBanking(): BankingContextValue {
  const ctx = useContext(BankingContext);
  if (!ctx) throw new Error("useBanking must be used within BankingProvider");
  return ctx;
}
