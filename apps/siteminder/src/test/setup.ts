import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

const hasDom = typeof window !== "undefined";

if (hasDom) {
  Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });
  Element.prototype.scrollIntoView = vi.fn();
}

beforeEach(() => {
  // The assistant probes /api/voice/status on mount; jsdom has no dev server behind it.
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ configured: false }), { status: 200 })),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  if (!hasDom) return;
  cleanup();
  window.localStorage.clear();
  window.sessionStorage.clear();
});
