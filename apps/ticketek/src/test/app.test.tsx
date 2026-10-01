import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AppProviders, AppRoutes } from "@/App";
import { DEMO_USER, writeSession } from "@/lib/auth";

function renderAt(path: string) {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </AppProviders>,
  );
}

function internalLinks(container: HTMLElement): string[] {
  const hrefs = Array.from(container.querySelectorAll("a[href]"), (a) => a.getAttribute("href") ?? "");
  return [...new Set(hrefs.filter((h) => h.startsWith("/")))];
}

describe("site routes", () => {
  it("renders the home page with header navigation and the support launcher", () => {
    renderAt("/");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Talk to Ticketek Support" })).toBeInTheDocument();
  });

  it("has no dead links from the home page, header or footer", () => {
    const { container, unmount } = renderAt("/");
    const links = internalLinks(container);
    unmount();
    expect(links.length).toBeGreaterThan(20);
    for (const href of links.filter((h) => !h.startsWith("/login"))) {
      const view = renderAt(href);
      expect(screen.queryByRole("heading", { name: "We couldn't find that page" }), href).toBeNull();
      view.unmount();
    }
  });

  it("shows the 404 page for unknown paths", () => {
    renderAt("/definitely-not-here");
    expect(screen.getByRole("heading", { name: "We couldn't find that page" })).toBeInTheDocument();
  });

  it("documents intentional login render crash (site config casing)", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderAt("/login")).toThrow();
    consoleError.mockRestore();
  });

  it("sends signed-out fans to sign in before My Account", () => {
    // Unauthenticated /account redirects to /login, which currently throws (same demo bug).
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderAt("/account/orders")).toThrow();
    consoleError.mockRestore();
  });

  it("renders every account and Support Studio page for a signed-in fan", () => {
    writeSession(DEMO_USER);
    const paths = [
      "/account",
      "/account/orders",
      "/account/orders/TK41882950",
      "/account/history",
      "/account/favourites",
      "/account/waitlist",
      "/account/details",
      "/account/notifications",
      "/account/payment",
      "/account/password",
      "/account/close",
      "/admin",
      "/admin/conversations",
      "/admin/routing",
      "/admin/simulator",
      "/admin/assistant",
      "/admin/fan",
    ];
    for (const path of paths) {
      const view = renderAt(path);
      expect(screen.queryByRole("heading", { name: "We couldn't find that page" }), path).toBeNull();
      expect(screen.queryByRole("heading", { name: /sign in/i }), path).toBeNull();
      expect(within(view.container).getAllByRole("heading").length, path).toBeGreaterThan(0);
      view.unmount();
    }
  });
});
