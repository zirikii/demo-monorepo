import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
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
    for (const href of links) {
      const view = renderAt(href);
      expect(screen.queryByRole("heading", { name: "We couldn't find that page" }), href).toBeNull();
      view.unmount();
    }
  });

  it("shows the 404 page for unknown paths", () => {
    renderAt("/definitely-not-here");
    expect(screen.getByRole("heading", { name: "We couldn't find that page" })).toBeInTheDocument();
  });

  it("renders the sign-in form and starts a mock session", async () => {
    const user = userEvent.setup();
    renderAt("/login");
    expect(screen.getByRole("heading", { name: "Sign in to Ticketek Premier" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(await screen.findByRole("heading", { name: "My Account" })).toBeInTheDocument();
  });

  it("matches the site query case-insensitively and ignores unknown sites", () => {
    const marketplace = renderAt("/login?site=Marketplace");
    expect(screen.getByRole("heading", { name: "Sign in to Ticketek Marketplace" })).toBeInTheDocument();
    marketplace.unmount();

    const unknown = renderAt("/login?site=toString");
    expect(screen.getByRole("heading", { name: "Sign in to Ticketek Premier" })).toBeInTheDocument();
    unknown.unmount();
  });

  it("sends signed-out fans to sign in before My Account", () => {
    renderAt("/account/orders");
    expect(screen.getByRole("heading", { name: "Sign in to Ticketek Premier" })).toBeInTheDocument();
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
