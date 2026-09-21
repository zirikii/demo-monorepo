import fs from "node:fs";
import path from "node:path";
import { createSeedState } from "../src/domain/seed";
import type { State } from "../src/domain/types";

const dataDir = path.resolve(process.cwd(), "server/data");
const stateFile = path.join(dataDir, "state.json");

export function loadState(): State {
  try {
    const raw = fs.readFileSync(stateFile, "utf8");
    return JSON.parse(raw) as State;
  } catch {
    const seed = createSeedState();
    saveState(seed);
    return seed;
  }
}

export function saveState(state: State): void {
  fs.mkdirSync(dataDir, { recursive: true });
  const tmp = `${stateFile}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, stateFile);
}
