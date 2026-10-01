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

async function openPanel() {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Support" }));
  return { user, panel: await screen.findByRole("dialog") };
}

describe("support assistant", () => {
  it("greets a signed-in fan with their tier and next event", async () => {
    writeSession(DEMO_USER);
    renderAt("/");
    const { panel } = await openPanel();
    expect(within(panel).getByText(`Hi ${DEMO_USER.firstName}`)).toBeInTheDocument();
    expect(within(panel).getByText(/events with Ticketek/)).toBeInTheDocument();
    expect(within(panel).getByRole("region", { name: "Your next event" })).toBeInTheDocument();
  });

  it("walks the Where's my ticket flow through the fan's own orders", async () => {
    writeSession(DEMO_USER);
    renderAt("/");
    const { user, panel } = await openPanel();
    await user.click(within(panel).getByRole("button", { name: /^Where's my ticket\?/ }));
    const orders = await within(panel).findByRole("list", { name: "Your orders" }, { timeout: 3000 });
    await user.click(within(orders).getByRole("button", { name: /Freddie's Queen/ }));
    expect(await within(panel).findByText(/Your Freddie's Queen tickets are App\/Mobile Tickets/, {}, { timeout: 3000 })).toBeInTheDocument();
  });

  it("puts safety first and routes the fan to Customer Relations", async () => {
    writeSession(DEMO_USER);
    renderAt("/");
    const { user, panel } = await openPanel();
    await user.type(within(panel).getByLabelText("Message"), "someone got hurt in the queue{Enter}");
    expect(await within(panel).findByText(/call triple zero \(000\) now/, {}, { timeout: 3000 })).toBeInTheDocument();
    expect(await within(panel).findByText("Customer Relations team", { selector: "span" }, { timeout: 3000 })).toBeInTheDocument();
    expect(within(panel).getByText(/Routed to Customer Relations · P1 · Safety or distress/)).toBeInTheDocument();
  });

  it("opens help for a specific order straight from the order page", async () => {
    writeSession(DEMO_USER);
    renderAt("/account/orders/TK41882950");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Get help with this order" }));
    const panel = await screen.findByRole("dialog");
    expect(await within(panel).findByText(/Freddie's Queen/, { selector: "p" }, { timeout: 3000 })).toBeInTheDocument();
    expect(within(panel).queryByRole("list", { name: "Your orders" })).toBeNull();
  });

  it("updates recommendations when the fan adds an event they've been to", async () => {
    writeSession(DEMO_USER);
    renderAt("/account/history");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add an event" }));
    await user.selectOptions(screen.getByLabelText("Event or artist"), "eric-church");
    await user.type(screen.getByLabelText("Date"), "2025-03-01");
    await user.click(screen.getByRole("button", { name: "Save to my history" }));
    expect(screen.getByRole("status")).toHaveTextContent("Added Eric Church");
    expect(screen.getByText(/Because you saw Eric Church in 2025/)).toBeInTheDocument();
  });

  it("opens straight into voice from the launcher's talk button", async () => {
    renderAt("/");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Talk to Ticketek Support" }));
    const panel = await screen.findByRole("dialog");
    expect(within(panel).getByText("Voice · demo mode")).toBeInTheDocument();
    await user.click(within(panel).getByRole("button", { name: "End voice and return to chat" }));
    expect(within(panel).getByText(/Hi there, I'm Ticketek Support/)).toBeInTheDocument();
    expect(within(panel).getByLabelText("Message")).toBeInTheDocument();
  });

  it("stays out of the Support Studio", () => {
    writeSession(DEMO_USER);
    renderAt("/admin");
    expect(screen.queryByRole("button", { name: "Talk to Ticketek Support" })).toBeNull();
  });
});
