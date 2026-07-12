import type { Plan, PlanKind } from "@/lib/types";
import { readData } from "./store";

export async function getPlans(): Promise<Plan[]> {
  return readData<Plan[]>("plans");
}

export async function getPlansByKind(kind: PlanKind): Promise<Plan[]> {
  const plans = await getPlans();
  return plans.filter((p) => p.kind === kind);
}

export async function getPlanById(id: string): Promise<Plan | undefined> {
  const plans = await getPlans();
  return plans.find((p) => p.id === id);
}
