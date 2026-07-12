import type { Account } from "@/lib/types";
import { readData, writeData } from "./store";

export async function getAccount(): Promise<Account> {
  return readData<Account>("account");
}

export async function setActiveAddOn(addOnId: string, active: boolean): Promise<Account> {
  const account = await getAccount();
  const set = new Set(account.activeAddOnIds);
  if (active) {
    set.add(addOnId);
  } else {
    set.delete(addOnId);
  }
  const next: Account = { ...account, activeAddOnIds: [...set] };
  await writeData("account", next);
  return next;
}

export async function setPlan(planId: string): Promise<Account> {
  const account = await getAccount();
  const next: Account = { ...account, planId };
  await writeData("account", next);
  return next;
}
