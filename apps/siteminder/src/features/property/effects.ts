import { toLocalIso } from "@/lib/clock";
import type { EventCategory, PlanId, PropertyState, TeamRole } from "./types";
import { PLANS } from "./views";

/** Changes an assistant step makes to the property's account when it's shown. */
export type PropertyEffect =
  | "fix-mapping"
  | "reconnect-channel"
  | "resume-channel"
  | "resend-booking"
  | "retry-card"
  | "close-out"
  | "pay-invoice"
  | "direct-debit"
  | "extension"
  | "instalment"
  | "credit-refund"
  | "bulk-rates"
  | "event-plan"
  | "add-event"
  | "add-user"
  | "billing-details"
  | "change-plan"
  | "switch-pms"
  | "reset-mfa";

type Values = Record<string, string | undefined>;

function patchChannel(
  state: PropertyState,
  id: string | undefined,
  patch: Partial<PropertyState["channels"][number]>,
  now: Date,
): PropertyState {
  if (!id) return state;
  return {
    ...state,
    channels: state.channels.map((c) =>
      c.id === id ? { ...c, ...patch, lastSync: toLocalIso(now) } : c,
    ),
  };
}

function patchBooking(
  state: PropertyState,
  id: string | undefined,
  patch: Partial<PropertyState["bookings"][number]>,
): PropertyState {
  if (!id) return state;
  return { ...state, bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)) };
}

function patchInvoice(
  state: PropertyState,
  id: string | undefined,
  patch: Partial<PropertyState["invoices"][number]>,
): PropertyState {
  if (!id) return state;
  return { ...state, invoices: state.invoices.map((i) => (i.id === id ? { ...i, ...patch } : i)) };
}

function logRate(state: PropertyState, summary: string, now: Date): PropertyState {
  return {
    ...state,
    rateLog: [{ id: `rl-${now.getTime()}`, at: toLocalIso(now), summary }, ...state.rateLog],
  };
}

/** "up 10%", "down $20", "set to $289" — the phrases `describeRateChange` stores on the step. */
function parseRateAdjustment(change: string | undefined): ((base: number) => number) | null {
  const text = (change ?? "").trim();
  const pct = /^(up|down) (\d+(?:\.\d+)?)%$/.exec(text);
  if (pct) {
    const amount = Number(pct[2]);
    const factor = pct[1] === "up" ? 1 + amount / 100 : 1 - amount / 100;
    return (base) => Math.max(0, Math.round(base * factor));
  }
  const dollars = /^(up|down) \$(\d+(?:\.\d+)?)$/.exec(text);
  if (dollars) {
    const amount = Number(dollars[2]);
    const delta = dollars[1] === "up" ? amount : -amount;
    return (base) => Math.max(0, Math.round(base + delta));
  }
  const setTo = /^set to \$(\d+(?:\.\d+)?)$/.exec(text);
  if (setTo) {
    const amount = Math.max(0, Math.round(Number(setTo[1])));
    return () => amount;
  }
  return null;
}

function bulkNights(value: string | undefined): number {
  const n = Number(/^(\d+)/.exec(value ?? "")?.[1]);
  return Number.isFinite(n) && n >= 1 ? n : 7;
}

function bulkStart(values: Values, now: Date): string {
  for (const raw of [values.rateFromDate, values.rateFrom, values.today]) {
    if (raw && /^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
  }
  return toLocalIso(now).slice(0, 10);
}

function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return toLocalIso(new Date(y, m - 1, d + days)).slice(0, 10);
}

/**
 * The rate grid prices a cell from the room's base for that night, then the weekend bump and any
 * event plan. `rateLog` is only the Recent changes list, so the new base has to land on the room.
 */
function applyBulkRates(state: PropertyState, values: Values, now: Date): PropertyState {
  const adjust = parseRateAdjustment(values.rateChange);
  if (!adjust) return state;
  const name = values.rateRoom?.trim();
  const selected =
    !name || name === "All rooms"
      ? state.property.roomTypes
      : state.property.roomTypes.filter((room) => room.name === name);
  if (!selected.length) return state;
  const start = bulkStart(values, now);
  const dates = Array.from({ length: bulkNights(values.rateNights) }, (_, i) => addDays(start, i));
  const ids = new Set(selected.map((room) => room.id));
  return {
    ...state,
    property: {
      ...state.property,
      roomTypes: state.property.roomTypes.map((room) => {
        if (!ids.has(room.id)) return room;
        const rates = { ...room.rates };
        for (const day of dates) rates[day] = adjust(rates[day] ?? room.baseRate);
        return { ...room, rates };
      }),
    },
  };
}

const CATEGORIES: EventCategory[] = [
  "concert",
  "sport",
  "festival",
  "conference",
  "theatre",
  "holiday",
];
const ROLES: TeamRole[] = ["Owner", "Admin", "Revenue", "Front desk", "Read only"];

/** Pure, so the assistant, the platform screens and tests all agree on what a step changes. */
export function applyEffect(
  state: PropertyState,
  effect: PropertyEffect,
  values: Values,
  now: Date = new Date(),
): PropertyState {
  const who = `${state.profile.firstName} ${state.profile.lastName} via Support`;
  switch (effect) {
    case "fix-mapping":
      return patchChannel(
        state,
        values.channelId,
        { status: "connected", issueRoom: undefined },
        now,
      );
    case "reconnect-channel":
    case "resume-channel":
      return patchChannel(state, values.channelId, { status: "connected" }, now);
    case "resend-booking":
    case "retry-card":
      return patchBooking(state, values.bookingId, { status: "confirmed" });
    case "close-out": {
      const booking = state.bookings.find((b) => b.id === values.bookingId);
      const room = state.property.roomTypes.find((r) => r.name === booking?.room);
      if (!booking || !room) return state;
      const key = `${room.id}@${booking.checkIn.slice(0, 10)}`;
      if (state.stopSell.includes(key)) return state;
      return logRate(
        { ...state, stopSell: [...state.stopSell, key] },
        `Stop sell on ${room.name} for ${booking.checkIn.slice(0, 10)} (${who})`,
        now,
      );
    }
    case "pay-invoice":
      return patchInvoice(state, values.invoiceId, { status: "paid", paidAt: toLocalIso(now) });
    case "direct-debit":
      return { ...state, property: { ...state.property, directDebit: true } };
    case "extension": {
      const invoice = state.invoices.find((i) => i.id === values.invoiceId);
      if (!invoice) return state;
      const due = new Date(invoice.due);
      due.setDate(due.getDate() + 14);
      return patchInvoice(state, invoice.id, { status: "extended", due: toLocalIso(due) });
    }
    case "instalment":
      return patchInvoice(state, values.invoiceId, { status: "instalments" });
    case "credit-refund":
      return { ...state, property: { ...state.property, credit: 0 } };
    case "bulk-rates":
      return logRate(
        applyBulkRates(state, values, now),
        `${values.rateRoom ?? "All rooms"} ${values.rateChange ?? ""} from ${values.rateFrom ?? "today"} for ${values.rateNights ?? "7 nights"} (${who})`,
        now,
      );
    case "event-plan": {
      const event = state.events.find((e) => e.id === values.eventId);
      if (!event) return state;
      const upliftPct = Number(values.planUplift) || 0;
      const minStay = Number(values.planMinStay) || 1;
      const next = {
        ...state,
        events: state.events.map((e) =>
          e.id === event.id
            ? { ...e, plan: { upliftPct, minStay, appliedAt: toLocalIso(now) } }
            : e,
        ),
      };
      return logRate(
        next,
        `Event pricing for ${event.name}: +${upliftPct}% on all rooms, ${minStay}-night minimum (${who})`,
        now,
      );
    }
    case "add-event": {
      const date = values.newEventDate ?? "";
      if (!values.newEventName || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return state;
      const category = CATEGORIES.find((c) => c === values.newEventCategory) ?? "concert";
      return {
        ...state,
        events: [
          ...state.events,
          {
            id: `evt-${now.getTime()}`,
            name: values.newEventName,
            category,
            venue: values.newEventVenue ?? "Sydney",
            start: `${date}T19:00:00`,
            end: `${date}T23:00:00`,
            distanceKm: 5,
            attendance: Number(values.newEventCrowd) || 20_000,
            source: "manual",
            onBooksPct: 35,
          },
        ],
      };
    }
    case "add-user": {
      if (!values.newUserEmail) return state;
      if (state.team.some((u) => u.email.toLowerCase() === values.newUserEmail?.toLowerCase()))
        return state;
      const role = ROLES.find((r) => r === values.newUserRole) ?? "Read only";
      return {
        ...state,
        team: [
          ...state.team,
          {
            id: `u-${now.getTime()}`,
            name: values.newUserName ?? values.newUserEmail,
            email: values.newUserEmail,
            role,
            mfa: false,
            lastActive: "Invited",
          },
        ],
      };
    }
    case "billing-details":
      return {
        ...state,
        property: {
          ...state.property,
          billingEmail: values.billingEmail ?? state.property.billingEmail,
          abn: values.billingAbn ?? state.property.abn,
        },
      };
    case "change-plan": {
      const plan = (Object.keys(PLANS) as PlanId[]).find((p) => p === values.newPlan);
      return plan ? { ...state, property: { ...state.property, plan } } : state;
    }
    case "switch-pms":
      return values.newPms
        ? { ...state, property: { ...state.property, pms: values.newPms } }
        : state;
    case "reset-mfa":
      return {
        ...state,
        team: state.team.map((u) => (u.email === state.profile.email ? { ...u, mfa: true } : u)),
      };
    default: {
      const exhaustive: never = effect;
      return exhaustive;
    }
  }
}
