/**
 * Thin localStorage helpers. Every write is best-effort: private browsing modes and the
 * jsdom test environment can both throw on `setItem`, and a demo should never hard-fail
 * because persistence is unavailable.
 */
export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the in-memory state is still correct for this session */
  }
}

export function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeRaw(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* see readJson */
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* see readJson */
  }
}
