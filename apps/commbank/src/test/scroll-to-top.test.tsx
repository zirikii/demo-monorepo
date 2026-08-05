import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const scrollIntoView = vi.fn();

function Page({ label }: { label: string }) {
  return (
    <div>
      <h1>{label}</h1>
      <nav>
        <Link to="/calculators">Calculators, no hash</Link>
        <Link to="/calculators#repayments">Calculators, repayments</Link>
        <Link to="/calculators#missing-section">Calculators, missing section</Link>
      </nav>
      <section id="repayments" style={{ marginTop: 2000 }}>
        Repayments calculator
      </section>
      <Link to="#repayments">Jump to repayments</Link>
    </div>
  );
}

function renderApp(initialEntry = "/") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Page label="Home" />} />
        <Route path="/calculators" element={<Page label="Calculators" />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ScrollToTop", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // jsdom does not implement scrollIntoView.
    Element.prototype.scrollIntoView = scrollIntoView;
  });

  // "instant" matters as much as the target: `auto` defers to the CSS scroll-behavior,
  // which is smooth in this app, so asking for `auto` would animate every navigation.
  it("scrolls to the top when a navigation has no hash", async () => {
    const user = userEvent.setup();
    renderApp();
    vi.clearAllMocks();

    await user.click(screen.getByRole("link", { name: "Calculators, no hash" }));

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("scrolls a cross-page hash target into view instead of the top", async () => {
    const user = userEvent.setup();
    renderApp();
    vi.clearAllMocks();

    await user.click(screen.getByRole("link", { name: "Calculators, repayments" }));

    // Landing at the top instead of the section was the reported bug.
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
  });

  it("scrolls same-page anchors smoothly even though the pathname is unchanged", async () => {
    const user = userEvent.setup();
    renderApp();
    vi.clearAllMocks();

    await user.click(screen.getByRole("link", { name: "Jump to repayments" }));

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("scrolls again when the same anchor is clicked twice", async () => {
    const user = userEvent.setup();
    renderApp();
    vi.clearAllMocks();

    const anchor = screen.getByRole("link", { name: "Jump to repayments" });
    await user.click(anchor);
    await user.click(anchor);

    expect(scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it("falls back to the top when the hash target does not exist", async () => {
    const user = userEvent.setup();
    renderApp();
    vi.clearAllMocks();

    await user.click(screen.getByRole("link", { name: "Calculators, missing section" }));

    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
  });

  it("jumps rather than animates to a hash on the very first render", () => {
    // A shared or refreshed deep link arrives on a page the visitor has not seen, so
    // it should land instantly like any other page change.
    renderApp("/calculators#repayments");

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
  });

  /**
   * The assertions above check which argument is passed, not what the browser does with
   * it, and that blind spot already shipped a bug once: `behavior: "auto"` defers to the
   * CSS `scroll-behavior`, so with a smooth global default every "jump" quietly animated
   * while these tests stayed green. jsdom cannot observe that, so pin the coupling
   * between the stylesheet and the component instead.
   */
  it("never asks for the 'auto' behaviour, which the smooth global CSS would animate", () => {
    // Vite serves import.meta.url over http, so resolve from the Vitest root instead.
    const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
    const css = read("src/index.css");
    const source = read("src/components/layout/ScrollToTop.tsx");
    const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*/g, "");

    expect(css).toMatch(/scroll-behavior:\s*smooth/);
    expect(withoutComments).toMatch(/["']instant["']/);
    expect(withoutComments).not.toMatch(/["']auto["']/);
  });
});
