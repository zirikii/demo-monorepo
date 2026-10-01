import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppProviders, AppRoutes } from "@/App";
import type { PropertyState } from "@/features/property/types";
import { DEMO_USER, writeSession } from "@/lib/auth";

const WAIT = { timeout: 3000 };

function renderAt(path: string) {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </AppProviders>,
  );
}

async function openPanel() {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Support" }));
  return { user, panel: await screen.findByRole("dialog") };
}

function storedProperty(): PropertyState {
  return JSON.parse(window.localStorage.getItem("siteminder-property-v1") ?? "{}") as PropertyState;
}

describe("SiteMinder Support", () => {
  it("greets a signed-in hotelier with their property, next event and most urgent issue", async () => {
    writeSession(DEMO_USER);
    renderAt("/");
    const { panel } = await openPanel();
    expect(within(panel).getByText(`Hi ${DEMO_USER.firstName}`)).toBeInTheDocument();
    expect(within(panel).getByText(/The Harbour Lane Hotel · SiteMinder Plus · 10 past events/)).toBeInTheDocument();
    const event = within(panel).getByRole("region", { name: "Your next demand event" });
    expect(within(event).getByText("Wallabies v All Blacks — Bledisloe Cup")).toBeInTheDocument();
    expect(within(event).getByRole("button", { name: /Last time: NRL Grand Final/ })).toBeInTheDocument();
    expect(within(panel).getByText(/Overbooked: Hannah Okafor arrives today/)).toBeInTheDocument();
  });

  it("fixes an Expedia mapping error end to end and updates the account", async () => {
    writeSession(DEMO_USER);
    renderAt("/");
    const { user, panel } = await openPanel();
    await user.click(within(panel).getByRole("button", { name: /^Channels & connectivity/ }));
    const records = await within(panel).findByRole("list", { name: "Your records" }, WAIT);
    await user.click(within(records).getByRole("button", { name: /Expedia/ }));
    expect(await within(panel).findByText(/Expedia has a mapping error on Deluxe King/, {}, WAIT)).toBeInTheDocument();
    await user.click(within(panel).getByRole("button", { name: "Yes, fix the mapping" }));
    expect(await within(panel).findByText(/Deluxe King is mapped to Expedia again/, {}, WAIT)).toBeInTheDocument();
    await waitFor(() => expect(storedProperty().channels.find((c) => c.id === "exp")?.status).toBe("connected"));
  });

  it("builds an event plan from past events and applies it to the store", async () => {
    writeSession(DEMO_USER);
    renderAt("/app/events");
    const user = userEvent.setup();
    await user.click(screen.getAllByRole("button", { name: "Plan pricing with Support" })[0]!);
    const panel = await screen.findByRole("dialog");
    expect(await within(panel).findByText(/Bledisloe Cup is in 5 days at Accor Stadium/, {}, WAIT)).toBeInTheDocument();
    expect(within(panel).queryByRole("list", { name: "Your records" })).toBeNull();
    await user.click(within(panel).getByRole("button", { name: "Apply event pricing" }));
    const form = await within(panel).findByRole("form", { name: /Event pricing for/ }, WAIT);
    expect(within(form).getByLabelText("Rate uplift (%)")).toHaveValue("55");
    await user.click(within(form).getByRole("button", { name: "Apply to all channels" }));
    expect(await within(panel).findByText(/Rates for Wallabies v All Blacks — Bledisloe Cup are up 55%/, {}, WAIT)).toBeInTheDocument();
    await waitFor(() => expect(storedProperty().events.find((e) => e.id === "evt-bledisloe")?.plan).toMatchObject({ upliftPct: 55, minStay: 2 }));
  });

  it("hands a hacked account straight to Security and explains why", async () => {
    writeSession(DEMO_USER);
    renderAt("/");
    const { user, panel } = await openPanel();
    await user.type(within(panel).getByLabelText("Message SiteMinder Support"), "I think someone hacked our extranet{Enter}");
    expect(await within(panel).findByText("Security team", {}, WAIT)).toBeInTheDocument();
    expect(within(panel).getByText(/Routed to Security · P1 · Security or fraud/)).toBeInTheDocument();
    expect(within(panel).getByText("Why this team?")).toBeInTheDocument();
  });

  it("puts safety first", async () => {
    writeSession(DEMO_USER);
    renderAt("/");
    const { user, panel } = await openPanel();
    await user.type(within(panel).getByLabelText("Message SiteMinder Support"), "a guest collapsed in the lobby{Enter}");
    expect(await within(panel).findByText(/call triple zero \(000\) now/, {}, WAIT)).toBeInTheDocument();
  });

  it("opens a platform record straight into its flow", async () => {
    writeSession(DEMO_USER);
    renderAt("/app/channels");
    const user = userEvent.setup();
    const row = screen.getByRole("row", { name: /Airbnb/ });
    await user.click(within(row).getByRole("button", { name: "Fix with Support" }));
    const panel = await screen.findByRole("dialog");
    expect(await within(panel).findByText(/Airbnb stopped accepting SiteMinder's connection/, {}, WAIT)).toBeInTheDocument();
  });

  it("follows the events store: a new event becomes Support's next event", async () => {
    writeSession(DEMO_USER);
    renderAt("/app/events");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add event" }));
    const form = screen.getByRole("form", { name: "Add an event" });
    const tomorrow = new Date(Date.now() + 86_400_000);
    const iso = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
    await user.type(within(form).getByLabelText("Event name"), "Fred again.. at Allianz Stadium");
    await user.type(within(form).getByLabelText("Date"), iso);
    await user.click(within(form).getByRole("button", { name: "Save event" }));
    const { panel } = await openPanel();
    const event = within(panel).getByRole("region", { name: "Your next demand event" });
    expect(within(event).getByText("Fred again.. at Allianz Stadium")).toBeInTheDocument();
  });

  it("opens straight into voice from the launcher's talk button", async () => {
    renderAt("/");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Talk to SiteMinder Support" }));
    const panel = await screen.findByRole("dialog");
    expect(within(panel).getByText("Browser voice · demo mode")).toBeInTheDocument();
    await user.click(within(panel).getByRole("button", { name: "End voice and return to chat" }));
    expect(within(panel).getByText(/Hi there, I'm SiteMinder Support/)).toBeInTheDocument();
    expect(within(panel).getByLabelText("Message SiteMinder Support")).toBeInTheDocument();
  });

  it("stays out of the Support Studio", () => {
    writeSession(DEMO_USER);
    renderAt("/admin");
    expect(screen.queryByRole("button", { name: "Talk to SiteMinder Support" })).toBeNull();
  });
});
