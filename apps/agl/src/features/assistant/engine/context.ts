import {
  comparableBill,
  household,
  internetUsage,
  latestBill,
  mobileUsage,
  totalOutstanding,
} from "@/data/account";
import { formatCurrency, formatKwh, formatPercentChange } from "@/lib/format";
import type { TemplateValues } from "../flows";

function dayMonth(isoDate: string): string {
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(`${isoDate}T12:00:00Z`),
  );
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export type CustomerProfile = { firstName: string; email: string };

export const GUEST: CustomerProfile = { firstName: "there", email: "alex.nguyen@example.com" };

/**
 * Everything the flow templates (and the Grok voice agent) may say about the customer.
 * Guests get the same demo household so the flows stay walkable without logging in.
 */
export function buildContext(profile: CustomerProfile): TemplateValues {
  const elec = latestBill("electricity");
  const gas = latestBill("gas");
  const previous = elec ? comparableBill(elec) : undefined;
  const elecAmount = formatCurrency(elec?.amount ?? 0);

  return {
    firstName: profile.firstName,
    email: profile.email,
    elecAmount,
    elecDue: elec ? dayMonth(elec.due) : "",
    gasAmount: formatCurrency(gas?.amount ?? 0),
    gasDue: gas ? dayMonth(gas.due) : "",
    totalDue: formatCurrency(totalOutstanding()),
    extendedDue: elec ? dayMonth(addDays(elec.due, 14)) : "",
    elecKwh: formatKwh(elec?.usageKwh ?? 0),
    usageChange:
      elec?.usageKwh && previous?.usageKwh
        ? `${formatPercentChange(elec.usageKwh, previous.usageKwh)}`
        : "similar",
    card: `${household.savedCard.brand} ending ${household.savedCard.last4}`,
    bankAccount: household.bankAccount,
    shortAddress: household.shortAddress,
    mailingAddress: household.mailingAddress,
    distributor: household.electricityDistributor.name,
    distributorPhone: household.electricityDistributor.phone,
    gasDistributor: household.gasDistributor.name,
    gasDistributorPhone: household.gasDistributor.phone,
    gasMeterNumber: household.gasMeterNumber,
    gasCredit: formatCurrency(household.gasCredit),
    nbnPlan: `Home Fast ${internetUsage.planSpeed}`,
    nbnPrice: "$95",
    mobileNumber: household.mobileNumber,
    dataUsed: `${mobileUsage.usedGb}GB`,
    dataAllowance: `${mobileUsage.allowanceGb}GB`,
    receipt: "AGL-58213904",
    revisedGas: formatCurrency(171.4),
    paidAmount: elecAmount,
    debitMethod: household.bankAccount,
    refundTarget: household.bankAccount,
  };
}
