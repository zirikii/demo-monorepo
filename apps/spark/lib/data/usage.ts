import type { UsageRecord } from "@/lib/types";
import { readData } from "./store";

export async function getUsage(): Promise<UsageRecord[]> {
  const usage = await readData<UsageRecord[]>("usage");
  return [...usage].sort((a, b) => (a.date < b.date ? 1 : -1));
}
