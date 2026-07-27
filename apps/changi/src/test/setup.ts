import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });
Object.defineProperty(Element.prototype, "scrollBy", { value: vi.fn(), writable: true });

function createStorage(): Storage {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    key: (index: number) => [...store.keys()][index] ?? null,
    get length() {
      return store.size;
    },
  };
}

if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", { value: createStorage(), writable: true });
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.mocked(Element.prototype.scrollBy).mockClear();
});
