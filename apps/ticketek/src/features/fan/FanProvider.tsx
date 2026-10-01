import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { SEED_FAN, seedOrders } from "@/data/fan";
import { useAuth } from "@/hooks/useAuth";
import { toLocalIso } from "@/lib/clock";
import { readJson, writeJson } from "@/lib/storage";
import { viewOrders, type OrderView } from "./orders";
import type { AttendedEvent, FanProfile, Order, RefundRecord } from "./types";

const STORAGE_KEY = "ticketek-fan-v1";

type FanState = { profile: FanProfile; orders: Order[] };

function seedState(): FanState {
  return { profile: structuredClone(SEED_FAN), orders: seedOrders() };
}

export type FanContextValue = {
  profile: FanProfile;
  orders: Order[];
  views: OrderView[];
  signedIn: boolean;
  updateProfile: (patch: Partial<FanProfile>) => void;
  placeOrder: (order: Order) => void;
  transferTickets: (orderId: string, seats: string[], toName: string, toEmail: string) => void;
  listForResale: (orderId: string, seats: string[], price: number) => void;
  removeListing: (orderId: string) => void;
  requestRefund: (orderId: string, reason: RefundRecord["reason"]) => RefundRecord | null;
  toggleFavourite: (slug: string) => void;
  toggleWaitlist: (slug: string) => void;
  addAttended: (event: Omit<AttendedEvent, "id">) => void;
  removeAttended: (id: string) => void;
  resetFan: () => void;
};

const FanContext = createContext<FanContextValue | null>(null);

export function FanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<FanState>(() => readJson<FanState | null>(STORAGE_KEY, null) ?? seedState());

  useEffect(() => writeJson(STORAGE_KEY, state), [state]);

  useEffect(() => {
    if (!user) return;
    setState((s) =>
      s.profile.email === user.email
        ? s
        : { ...s, profile: { ...s.profile, firstName: user.firstName, lastName: user.lastName, email: user.email } },
    );
  }, [user]);

  const patchOrder = useCallback((orderId: string, fn: (o: Order) => Order) => {
    setState((s) => ({ ...s, orders: s.orders.map((o) => (o.id === orderId ? fn(o) : o)) }));
  }, []);

  const updateProfile = useCallback((patch: Partial<FanProfile>) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  }, []);

  const placeOrder = useCallback((order: Order) => {
    setState((s) => ({ ...s, orders: [order, ...s.orders] }));
  }, []);

  const transferTickets = useCallback(
    (orderId: string, seats: string[], toName: string, toEmail: string) => {
      const at = toLocalIso(new Date());
      patchOrder(orderId, (o) => ({
        ...o,
        transfers: [...o.transfers, ...seats.map((seat) => ({ seat, toName, toEmail, at, status: "pending" as const }))],
      }));
    },
    [patchOrder],
  );

  const listForResale = useCallback(
    (orderId: string, seats: string[], price: number) => {
      const at = toLocalIso(new Date());
      patchOrder(orderId, (o) => ({
        ...o,
        resale: [...o.resale.filter((r) => !seats.includes(r.seat)), ...seats.map((seat) => ({ seat, price, at, status: "listed" as const }))],
      }));
    },
    [patchOrder],
  );

  const removeListing = useCallback(
    (orderId: string) => patchOrder(orderId, (o) => ({ ...o, resale: o.resale.filter((r) => r.status !== "listed") })),
    [patchOrder],
  );

  const requestRefund = useCallback(
    (orderId: string, reason: RefundRecord["reason"]): RefundRecord | null => {
      const order = state.orders.find((o) => o.id === orderId);
      if (!order || order.refund) return order?.refund ?? null;
      const refund: RefundRecord = { amount: order.total, requestedAt: toLocalIso(new Date()), status: "processing", reason };
      patchOrder(orderId, (o) => ({ ...o, refund }));
      return refund;
    },
    [patchOrder, state.orders],
  );

  const toggleIn = useCallback((key: "favourites" | "waitlist", slug: string) => {
    setState((s) => {
      const list = s.profile[key];
      return { ...s, profile: { ...s.profile, [key]: list.includes(slug) ? list.filter((x) => x !== slug) : [...list, slug] } };
    });
  }, []);

  const toggleFavourite = useCallback((slug: string) => toggleIn("favourites", slug), [toggleIn]);
  const toggleWaitlist = useCallback((slug: string) => toggleIn("waitlist", slug), [toggleIn]);

  const addAttended = useCallback((event: Omit<AttendedEvent, "id">) => {
    setState((s) => ({
      ...s,
      profile: { ...s.profile, attended: [{ ...event, id: `att-${Date.now()}` }, ...s.profile.attended].sort((a, b) => b.date.localeCompare(a.date)) },
    }));
  }, []);

  const removeAttended = useCallback((id: string) => {
    setState((s) => ({ ...s, profile: { ...s.profile, attended: s.profile.attended.filter((a) => a.id !== id) } }));
  }, []);

  const resetFan = useCallback(() => setState(seedState()), []);

  const views = useMemo(() => viewOrders(state.orders), [state.orders]);

  const value = useMemo<FanContextValue>(
    () => ({
      profile: state.profile,
      orders: state.orders,
      views,
      signedIn: Boolean(user),
      updateProfile,
      placeOrder,
      transferTickets,
      listForResale,
      removeListing,
      requestRefund,
      toggleFavourite,
      toggleWaitlist,
      addAttended,
      removeAttended,
      resetFan,
    }),
    [state, views, user, updateProfile, placeOrder, transferTickets, listForResale, removeListing, requestRefund, toggleFavourite, toggleWaitlist, addAttended, removeAttended, resetFan],
  );

  return <FanContext.Provider value={value}>{children}</FanContext.Provider>;
}

export function useFan(): FanContextValue {
  const ctx = useContext(FanContext);
  if (!ctx) throw new Error("useFan must be used inside <FanProvider>");
  return ctx;
}
