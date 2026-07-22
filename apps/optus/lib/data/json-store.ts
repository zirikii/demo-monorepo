import "server-only";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
export function getDataDir(): string {
  return process.env.OPTUS_DATA_DIR ?? path.join(process.cwd(), "data");
}
export async function readJson<T>(fileName: string): Promise<T> {
  const raw = await readFile(path.join(getDataDir(), fileName), "utf8");
  return JSON.parse(raw) as T;
}
export async function writeJson<T>(fileName: string, data: T): Promise<void> {
  const dir = getDataDir();
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, fileName);
  const tmpPath = `${filePath}.${process.pid}.tmp`;
  await writeFile(
    tmpPath,
    `${JSON.stringify(data, null, 2)}
`,
    "utf8",
  );
  await rename(tmpPath, filePath);
}
