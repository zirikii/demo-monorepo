import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");

export async function readJson<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDir, filename);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

/** Atomic write: temp file in same directory then rename. */
export async function writeJson<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(dataDir, filename);
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  const payload = `${JSON.stringify(data, null, 2)}\n`;
  await fs.writeFile(tmpPath, payload, "utf8");
  await fs.rename(tmpPath, filePath);
}
