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

function patchChannel(state: PropertyState, id: string | undefined, patch: Partial<PropertyState["channels"][number]>, now: Date): PropertyState {
  if (!id) return state;
  return { ...state, channels: state.channels.map((c) => (c.id === id ? { ...c, ...patch, lastSync: toLocalIso(now) } : c)) };
}

function patchBooking(state: PropertyState, id: string | undefined, patch: Partial<PropertyState["bookings"][number]>): PropertyState {
  if (!id) return state;
  return { ...state, bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)) };
}

function patchInvoice(state: PropertyState, id: string | undefined, patch: Partial<PropertyState["invoices"][number]>): PropertyState {
  if (!id) return state;
  return { ...state, invoices: state.invoices.map((i) => (i.id === id ? { ...i, ...patch } : i)) };
}

function logRate(state: PropertyState, summary: string, now: Date): PropertyState {
  return { ...state, rateLog: [{ id: `rl-${now.getTime()}`, at: toLocalIso(now), summary }, ...state.rateLog] };
}

const CATEGORIES: EventCategory[] = ["concert", "sport", "festival", "conference", "theatre", "holiday"];
const ROLES: TeamRole[] = ["Owner", "Admin", "Revenue", "Front desk", "Read only"];

/** Pure, so the assistant, the platform screens and tests all agree on what a step changes. */
export function applyEffect(state: PropertyState, effect: PropertyEffect, values: Values, now: Date = new Date()): PropertyState {
  const who = `${state.profile.firstName} ${state.profile.lastName} via Support`;
  switch (effect) {
    case "fix-mapping":
      return patchChannel(state, values.channelId, { status: "connected", issueRoom: undefined }, now);
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
      return logRate({ ...state, stopSell: [...state.stopSell, key] }, `Stop sell on ${room.name} for ${booking.checkIn.slice(0, 10)} (${who})`, now);
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
      return logRate(state, `${values.rateRoom ?? "All rooms"} ${values.rateChange ?? ""} from ${values.rateFrom ?? "today"} for ${values.rateNights ?? "7"} nights (${who})`, now);
    case "event-plan": {
      const event = state.events.find((e) => e.id === values.eventId);
      if (!event) return state;
      const upliftPct = Number(values.planUplift) || 0;
      const minStay = Number(values.planMinStay) || 1;
      const next = { ...state, events: state.events.map((e) => (e.id === event.id ? { ...e, plan: { upliftPct, minStay, appliedAt: toLocalIso(now) } } : e)) };
      return logRate(next, `Event pricing for ${event.name}: +${upliftPct}% on all rooms, ${minStay}-night minimum (${who})`, now);
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
      if (state.team.some((u) => u.email.toLowerCase() === values.newUserEmail?.toLowerCase())) return state;
      const role = ROLES.find((r) => r === values.newUserRole) ?? "Read only";
      return {
        ...state,
        team: [...state.team, { id: `u-${now.getTime()}`, name: values.newUserName ?? values.newUserEmail, email: values.newUserEmail, role, mfa: false, lastActive: "Invited" }],
      };
    }
    case "billing-details":
      return {
        ...state,
        property: { ...state.property, billingEmail: values.billingEmail ?? state.property.billingEmail, abn: values.billingAbn ?? state.property.abn },
      };
    case "change-plan": {
      const plan = (Object.keys(PLANS) as PlanId[]).find((p) => p === values.newPlan);
      return plan ? { ...state, property: { ...state.property, plan } } : state;
    }
    case "switch-pms":
      return values.newPms ? { ...state, property: { ...state.property, pms: values.newPms } } : state;
    case "reset-mfa":
      return { ...state, team: state.team.map((u) => (u.email === state.profile.email ? { ...u, mfa: true } : u)) };
    default: {
      const exhaustive: never = effect;
      return exhaustive;
    }
  }
}
