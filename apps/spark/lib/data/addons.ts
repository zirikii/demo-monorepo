import type { AddOn, AddOnCategory } from "@/lib/types";
import { readData } from "./store";

export async function getAddOns(): Promise<AddOn[]> {
  return readData<AddOn[]>("addons");
}

export async function getAddOnsByCategory(category: AddOnCategory): Promise<AddOn[]> {
  const addons = await getAddOns();
  return addons.filter((a) => a.category === category);
}

export async function getAddOnById(id: string): Promise<AddOn | undefined> {
  const addons = await getAddOns();
  return addons.find((a) => a.id === id);
}
