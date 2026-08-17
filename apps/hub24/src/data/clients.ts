import type { ClientAccount } from "./types";

const FIRST = [
  "Amelia", "Ben", "Chloe", "Daniel", "Elena", "Farid", "Grace", "Hugo", "Isla", "James",
  "Keira", "Liam", "Maya", "Noah", "Olivia", "Patrick", "Quinn", "Rosa", "Sam", "Talia",
  "Uma", "Victor", "Willa", "Xavier", "Yasmin", "Zane",
];
const LAST = [
  "Nguyen", "Patel", "Okafor", "Singh", "Rossi", "Kowalski", "Chen", "Williams", "Ahmed", "Berg",
  "Santos", "Murphy", "Tanaka", "Ibrahim", "Costa",
];
const PRODUCTS = ["Super", "Pension", "Invest", "Private Invest"] as const;
const MENUS = ["Discover", "Core", "Choice"] as const;
const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT"];
const ADVISERS = ["Alex Chen", "Morgan Blake", "Priya Nair", "Sam Okonkwo"];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(24);

export const CLIENTS: ClientAccount[] = Array.from({ length: 28 }, (_, index) => {
  const first = FIRST[index % FIRST.length]!;
  const last = LAST[index % LAST.length]!;
  const product = PRODUCTS[index % PRODUCTS.length]!;
  const menu = MENUS[index % MENUS.length]!;
  const balance = Math.round(180000 + rand() * 4200000);
  const cash = Math.round(balance * (0.02 + rand() * 0.08));
  return {
    id: `HUB-${String(10420 + index).padStart(6, "0")}`,
    name: `${first} ${last}`,
    adviser: ADVISERS[index % ADVISERS.length]!,
    practice: "Harbourline Wealth",
    product,
    menu,
    state: STATES[index % STATES.length]!,
    balance,
    cash,
    ytd: Number((-1.2 + rand() * 14).toFixed(2)),
    status: index === 7 ? "Pending" : "Open",
  };
});

export function clientById(id: string): ClientAccount | undefined {
  return CLIENTS.find((client) => client.id === id);
}

export function filterClients(
  clients: ClientAccount[],
  query: string,
  product: string,
): ClientAccount[] {
  const q = query.trim().toLowerCase();
  return clients.filter((client) => {
    const matchesQuery =
      !q ||
      client.name.toLowerCase().includes(q) ||
      client.id.toLowerCase().includes(q) ||
      client.adviser.toLowerCase().includes(q);
    const matchesProduct = product === "all" || client.product === product;
    return matchesQuery && matchesProduct;
  });
}
