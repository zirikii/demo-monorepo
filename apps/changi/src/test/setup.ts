import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// jsdom doesn't implement scrolling; ScrollToTop calls it on navigation.
Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });

afterEach(() => {
  cleanup();
});
