import { readJson } from "@/lib/data/json-store";
import type { Invoice, ReportSubscription, ServiceHealth } from "@/lib/types";
export type InsightsStore = {
  inboundCalls: { label: string; calls: number; missed: number }[];
  costCentres: { name: string; amount: number }[];
  monthlySpend: { month: string; amount: number }[];
  alerts: { id: string; title: string; detail: string; severity: "High" | "Medium" | "Low" }[];
};
export async function getInsights(): Promise<InsightsStore> {
  return readJson<InsightsStore>("insights.json");
}
export async function getInvoices(): Promise<Invoice[]> {
  return readJson<Invoice[]>("invoices.json");
}
export async function getServiceHealth(): Promise<ServiceHealth[]> {
  return readJson<ServiceHealth[]>("services.json");
}
export async function getReportSubscriptions(): Promise<ReportSubscription[]> {
  return readJson<ReportSubscription[]>("reports.json");
}
