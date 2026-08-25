import { readJson, writeJson } from "./storage";

export function readCollection<T>(key: string, seed: readonly T[]): T[] {
  const stored = readJson<T[] | null>(key, null);
  if (stored?.length) return stored.map((item) => ({ ...item }));
  return seed.map((item) => ({ ...item }));
}

export function writeCollection<T>(key: string, items: T[]): void {
  writeJson(key, items);
}
