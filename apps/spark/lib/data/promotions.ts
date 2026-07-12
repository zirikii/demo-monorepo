import type { Promotion, PromotionCategory } from "@/lib/types";
import { readData } from "./store";

export async function getPromotions(): Promise<Promotion[]> {
  return readData<Promotion[]>("promotions");
}

export async function getPromotionsByCategory(
  category: PromotionCategory,
): Promise<Promotion[]> {
  const promos = await getPromotions();
  return promos.filter((p) => p.category === category);
}
