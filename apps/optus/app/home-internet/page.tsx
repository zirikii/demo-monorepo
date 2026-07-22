import type { Metadata } from "next";
import { HomeInternetClient } from "@/components/marketing/home-internet-client";
import { readJson } from "@/lib/data/json-store";
import type { HomeInternetPlan } from "@/lib/types";

export const metadata: Metadata = { title: "Home Internet" };

export default async function HomeInternetPage() {
  const plans = await readJson<HomeInternetPlan[]>("home-internet.json");
  return <HomeInternetClient plans={plans} />;
}
