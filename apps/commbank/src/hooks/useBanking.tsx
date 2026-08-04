import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  seedAccounts,
  seedCards,
  seedTransactions,
  type DemoCard,
  type NetBankAccount,
  type Transaction,
} from "@/data/netbank";
import { readJson, writeJson } from "@/lib/storage";

const ACCOUNTS_KEY = "commbank-demo-accounts";
const TRANSACTIONS_KEY = "commbank-demo-transactions";
const CARDS_KEY = "commbank-demo-cards";

export type TransferInput = {
  fromId: string;
  toId: string;
  amount: number;
  description: string;
};

export type TransferResult = { ok: true; reference: string } | { ok: false; error: string };

export type BankingState = {
  accounts: NetBankAccount[];
  transactions: Transaction[];
  cards: DemoCard[];
};

/**
 * Pure so it can be unit tested without React. Credit accounts hold a negative balance, so
 * "available" is derived from the limit rather than the balance itself.
 */
export function applyTransfer(state: BankingState, input: TransferInput): TransferResult {
  const { fromId, toId, amount, description } = input;

  if (fromId === toId) return { ok: false, error: "Choose two different accounts." };
  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, error: "Enter an amount greater than $0." };
  }

  const from = state.accounts.find((account) => account.id === fromId);
  const to = state.accounts.find((account) => account.id === toId);
  if (!from || !to) return { ok: false, error: "Select both a from and a to account." };
  if (from.kind === "super") return { ok: false, error: "You can't transfer out of super." };
  if (amount > from.available) {
    return { ok: false, error: "There isn't enough available balance in that account." };
  }

  const date = new Date().toISOString().slice(0, 10);
  const reference = `TFR${Date.now().toString().slice(-8)}`;

  from.balance -= amount;
  from.available = from.limit ? from.limit + from.balance : from.balance;
  to.balance += amount;
  to.available = to.limit ? to.limit + to.balance : to.balance;

  state.transactions.unshift(
    {
      id: `${reference}-out`,
      accountId: from.id,
      date,
      description: description || `Transfer to ${to.name}`,
      category: "Transfer",
      amount: -amount,
    },
    {
      id: `${reference}-in`,
      accountId: to.id,
      date,
      description: description || `Transfer from ${from.name}`,
      category: "Transfer",
      amount,
    },
  );

  return { ok: true, reference };
}

type BankingContextValue = BankingState & {
  transfer: (input: TransferInput) => TransferResult;
  toggleCardFlag: (cardId: string, flag: "locked" | "blockInternational" | "travelNotice") => void;
  reset: () => void;
};

const BankingContext = createContext<BankingContextValue | null>(null);

export function BankingProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<NetBankAccount[]>(() =>
    readJson(ACCOUNTS_KEY, seedAccounts),
  );
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    readJson(TRANSACTIONS_KEY, seedTransactions),
  );
  const [cards, setCards] = useState<DemoCard[]>(() => readJson(CARDS_KEY, seedCards));

  const transfer = useCallback(
    (input: TransferInput): TransferResult => {
      const draft: BankingState = {
        accounts: accounts.map((account) => ({ ...account })),
        transactions: [...transactions],
        cards,
      };
      const result = applyTransfer(draft, input);
      if (!result.ok) return result;

      setAccounts(draft.accounts);
      setTransactions(draft.transactions);
      writeJson(ACCOUNTS_KEY, draft.accounts);
      writeJson(TRANSACTIONS_KEY, draft.transactions);
      return result;
    },
    [accounts, transactions, cards],
  );

  const toggleCardFlag = useCallback(
    (cardId: string, flag: "locked" | "blockInternational" | "travelNotice") => {
      setCards((current) => {
        const next = current.map((card) =>
          card.id === cardId ? { ...card, [flag]: !card[flag] } : card,
        );
        writeJson(CARDS_KEY, next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    setAccounts(seedAccounts);
    setTransactions(seedTransactions);
    setCards(seedCards);
    writeJson(ACCOUNTS_KEY, seedAccounts);
    writeJson(TRANSACTIONS_KEY, seedTransactions);
    writeJson(CARDS_KEY, seedCards);
  }, []);

  const value = useMemo(
    () => ({ accounts, transactions, cards, transfer, toggleCardFlag, reset }),
    [accounts, transactions, cards, transfer, toggleCardFlag, reset],
  );

  return <BankingContext.Provider value={value}>{children}</BankingContext.Provider>;
}

export function useBanking(): BankingContextValue {
  const ctx = useContext(BankingContext);
  if (!ctx) throw new Error("useBanking must be used within BankingProvider");
  return ctx;
}
