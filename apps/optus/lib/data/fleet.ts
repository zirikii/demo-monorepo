import { readJson, writeJson } from "@/lib/data/json-store";
import type { FleetDevice } from "@/lib/types";
export async function getFleetDevices(): Promise<FleetDevice[]> {
  return readJson<FleetDevice[]>("fleet.json");
}
export async function updateFleetStatus(
  id: string,
  status: FleetDevice["status"],
): Promise<FleetDevice> {
  const devices = await getFleetDevices();
  const nextDevices = devices.map((device) => (device.id === id ? { ...device, status } : device));
  const updated = nextDevices.find((device) => device.id === id);
  if (!updated) throw new Error(`Fleet device ${id} not found`);
  await writeJson("fleet.json", nextDevices);
  return updated;
}
