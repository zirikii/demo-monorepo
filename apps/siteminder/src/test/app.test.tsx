import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AppProviders, AppRoutes } from "@/App";
import { seedProperty } from "@/data/property";
import { applyEffect } from "@/features/property/effects";
import { nextEvent } from "@/features/property/insights";
import { DEMO_USER, writeSession } from "@/lib/auth";
import { toLocalIso } from "@/lib/clock";
import { formatCurrency } from "@/lib/format";

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
  const hrefs = Array.from(
    container.querySelectorAll("a[href]"),
    (a) => a.getAttribute("href") ?? "",
  );
  return [...new Set(hrefs.filter((h) => h.startsWith("/")))];
}

const NOT_FOUND = "We couldn't find that page";

describe("site routes", () => {
  it("renders the home page with header navigation and the support launcher", () => {
    renderAt("/");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Talk to SiteMinder Support" })).toBeInTheDocument();
  });

  it("has no dead links from the home page, header or footer", () => {
    const { container, unmount } = renderAt("/");
    const links = internalLinks(container);
    unmount();
    expect(links.length).toBeGreaterThan(20);
    for (const href of links.filter((h) => !h.startsWith("/login"))) {
      const view = renderAt(href);
      expect(screen.queryByRole("heading", { name: NOT_FOUND }), href).toBeNull();
      view.unmount();
    }
  });

  it("renders every product, solution and resource page linked from the platform pages", () => {
    for (const start of ["/platform", "/resources"]) {
      const { container, unmount } = renderAt(start);
      const links = internalLinks(container).filter((h) =>
        /^\/(platform|solutions|resources)\//.test(h),
      );
      unmount();
      expect(links.length, start).toBeGreaterThan(3);
      for (const href of links) {
        const view = renderAt(href);
        expect(screen.queryByRole("heading", { name: NOT_FOUND }), href).toBeNull();
        view.unmount();
      }
    }
  });

  it("shows the 404 page for unknown paths and unknown products", () => {
    renderAt("/definitely-not-here");
    expect(screen.getByRole("heading", { name: NOT_FOUND })).toBeInTheDocument();
  });

  it("documents intentional login render crash (product config casing)", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderAt("/login")).toThrow();
    consoleError.mockRestore();
  });

  it("sends signed-out visitors to log in before the platform", () => {
    // Unauthenticated /app redirects to /login, which currently throws (same demo bug).
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderAt("/app/channels")).toThrow();
    consoleError.mockRestore();
  });

  it("captures demo requests", async () => {
    renderAt("/demo");
    const user = userEvent.setup();
    const form = screen.getByRole("form", { name: "Book my demo" });
    const fields: [string, string][] = [
      ["First name", "Sophie"],
      ["Last name", "Tran"],
      ["Work email", "sophie@harbourlane.com.au"],
      ["Phone", "0412 555 019"],
      ["Property name", "The Harbour Lane Hotel"],
    ];
    for (const [label, value] of fields) await user.type(within(form).getByLabelText(label), value);
    await user.selectOptions(within(form).getByLabelText("Number of rooms"), "81–150");
    await user.click(within(form).getByRole("button", { name: "Book my demo" }));
    expect(await screen.findByRole("status")).toHaveTextContent("you're all set");
  });

  it("renders every platform and Support Studio page for a signed-in hotelier", () => {
    writeSession(DEMO_USER);
    const paths = [
      "/app",
      "/app/channels",
      "/app/reservations",
      "/app/rates",
      "/app/events",
      "/app/billing",
      "/app/team",
      "/app/help",
      "/admin",
      "/admin/conversations",
      "/admin/routing",
      "/admin/simulator",
      "/admin/assistant",
      "/admin/property",
    ];
    for (const path of paths) {
      const view = renderAt(path);
      expect(screen.queryByRole("heading", { name: NOT_FOUND }), path).toBeNull();
      expect(screen.queryByRole("heading", { name: "Log in to SiteMinder" }), path).toBeNull();
      expect(within(view.container).getAllByRole("heading").length, path).toBeGreaterThan(0);
      view.unmount();
    }
  });

  it("shows applied event pricing as live on the dashboard", () => {
    writeSession(DEMO_USER);
    const now = new Date();
    const seeded = seedProperty();
    const next = nextEvent(seeded.events, now)!;
    const events = seeded.events.map((e) =>
      e.id === next.id
        ? { ...e, plan: { upliftPct: 40, minStay: 3, appliedAt: toLocalIso(now) } }
        : e,
    );
    localStorage.setItem("siteminder-property-v1", JSON.stringify({ ...seeded, events }));
    renderAt("/app");
    expect(screen.getByText("Live").previousElementSibling).toHaveTextContent("+40%");
    expect(screen.getByText("3 nights")).toBeInTheDocument();
    expect(screen.queryByText("Suggested")).toBeNull();
  });

  it("shows a bulk rate change on the nights it covers", () => {
    writeSession(DEMO_USER);
    const now = new Date();
    const start = toLocalIso(new Date(now.getFullYear(), now.getMonth(), now.getDate())).slice(
      0,
      10,
    );
    const later = toLocalIso(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3)).slice(
      0,
      10,
    );
    const next = applyEffect(
      seedProperty(now),
      "bulk-rates",
      {
        rateRoom: "Deluxe King",
        rateChange: "up 10%",
        rateFromDate: start,
        rateNights: "1 night",
      },
      now,
    );
    localStorage.setItem("siteminder-property-v1", JSON.stringify(next));
    renderAt("/app/rates");
    const shown = (base: number, day: string) => {
      const weekend = [5, 6].includes(new Date(`${day}T12:00:00`).getDay());
      return Math.round(base * (weekend ? 1.12 : 1));
    };
    expect(
      screen.getByRole("button", {
        name: `Deluxe King ${start}: ${formatCurrency(shown(Math.round(279 * 1.1), start))}. Toggle stop sell`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Deluxe King ${later}: ${formatCurrency(shown(279, later))}. Toggle stop sell`,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Deluxe King up 10%/)).toBeInTheDocument();
  });

  it("toggles a stop sell from the rate grid", async () => {
    writeSession(DEMO_USER);
    renderAt("/app/rates");
    const cell = screen.getAllByRole("button", { name: /^Deluxe King .*Toggle stop sell$/ })[0]!;
    await userEvent.setup().click(cell);
    expect(cell).toHaveAccessibleName(/closed\. Toggle stop sell$/);
  });

  it("adds an event to the demand calendar", async () => {
    writeSession(DEMO_USER);
    renderAt("/app/events");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add event" }));
    const form = screen.getByRole("form", { name: "Add an event" });
    await user.type(within(form).getByLabelText("Event name"), "Fred again.. at Allianz Stadium");
    await user.type(within(form).getByLabelText("Date"), "2030-03-01");
    await user.click(within(form).getByRole("button", { name: "Save event" }));
    expect(screen.getByText("Fred again.. at Allianz Stadium")).toBeInTheDocument();
  });

  it("simulates routing for any scenario", async () => {
    writeSession(DEMO_USER);
    renderAt("/admin/simulator");
    const result = screen.getByTestId("sim-result");
    expect(result).toHaveTextContent("Assistant keeps helping");
    expect(screen.getByText(/they land in/)).toHaveTextContent("Connectivity at P1");
    await userEvent.setup().click(screen.getByRole("button", { name: "Account hacked" }));
    expect(result).toHaveTextContent("Hands off to Security");
  });
});
