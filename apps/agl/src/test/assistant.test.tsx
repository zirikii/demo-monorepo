import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "@/App";
import { AssistantProvider } from "@/features/assistant/AssistantProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { DEMO_USER, writeSession } from "@/lib/auth";

function renderApp(route = "/") {
  return render(
    <AuthProvider>
      <AssistantProvider>
        <MemoryRouter initialEntries={[route]}>
          <AppRoutes />
        </MemoryRouter>
      </AssistantProvider>
    </AuthProvider>,
  );
}

async function openChat() {
  const user = userEvent.setup();
  renderApp("/about");
  await user.click(screen.getByRole("button", { name: "Chat with us" }));
  const panel = screen.getByRole("dialog", { name: "AGL Assistant" });
  return { user, panel };
}

describe("AGL Assistant", () => {
  it("opens with the query question, topics and a voice option", async () => {
    const { panel } = await openChat();
    expect(within(panel).getByRole("heading", { name: "What's your query today?" })).toBeInTheDocument();
    for (const topic of ["Billing & payments", "Internet & mobile", "Moving house", "Outages & emergencies"]) {
      expect(within(panel).getByRole("button", { name: new RegExp(topic) })).toBeInTheDocument();
    }
    expect(within(panel).getByRole("button", { name: /Talk it through instead/ })).toBeInTheDocument();
    expect(within(panel).getByRole("button", { name: "Voice" })).toHaveAttribute("aria-pressed", "false");
  });

  it("walks the Internet & mobile flow from a topic tile", async () => {
    const { user, panel } = await openChat();
    await user.click(within(panel).getByRole("button", { name: /Internet & mobile/ }));

    expect(await within(panel).findByText(/What's your query today\?/)).toBeInTheDocument();
    const replies = await within(panel).findByRole("group", { name: "Suggested replies" });
    const internetDown = within(replies).getByRole("button", { name: /internet isn.t working/i });
    await user.click(internetDown);

    expect(await within(panel).findByRole("navigation", { name: "Where you are" })).toHaveTextContent("Internet & mobile");
    expect(await within(panel).findByText("Get back online")).toBeInTheDocument();
    expect(within(panel).getByRole("button", { name: /Still not working/ })).toBeInTheDocument();
  });

  it("understands free text and prioritises safety", async () => {
    const { user, panel } = await openChat();
    await user.type(within(panel).getByLabelText("Message"), "I can smell gas{Enter}");
    expect(await within(panel).findByText("Gas emergency")).toBeInTheDocument();
    expect(within(panel).getByRole("link", { name: /Jemena Gas Networks.*131 909/ })).toHaveAttribute("href", "tel:131909");
    expect(within(panel).getByText("I can smell gas")).toBeInTheDocument();
  });

  it("submits a meter read through the inline form", async () => {
    const { user, panel } = await openChat();
    await user.click(within(panel).getByRole("button", { name: "Submit a meter read" }));
    const form = await within(panel).findByRole("form", { name: "Gas meter read" });
    await user.click(within(form).getByRole("button", { name: "Submit read" }));
    expect(await within(form).findByRole("alert")).toHaveTextContent(/3–6 digits/);
    await user.type(within(form).getByLabelText("Meter reading"), "08421");
    await user.click(within(form).getByRole("button", { name: "Submit read" }));
    expect(await within(panel).findByText("My gas meter reads 08421")).toBeInTheDocument();
    expect(await within(panel).findByText(/Read 08421/)).toBeInTheDocument();
  });

  it("switches to voice mode with the demo voice while the Grok key is pending", async () => {
    const { user, panel } = await openChat();
    await user.click(within(panel).getByRole("button", { name: "Voice" }));
    expect(within(panel).getByRole("button", { name: "Voice" })).toHaveAttribute("aria-pressed", "true");
    expect(within(panel).getByText("Demo voice · Grok key pending")).toBeInTheDocument();
    expect(within(panel).getByRole("button", { name: "Mute microphone" })).toBeInTheDocument();
    expect(await within(panel).findByText(/What's your query today\?/)).toBeInTheDocument();

    await user.click(within(panel).getByRole("button", { name: "End voice and return to chat" }));
    expect(within(panel).getByRole("button", { name: "Chat" })).toHaveAttribute("aria-pressed", "true");
  });

  it("uses the signed-in customer's name and bill", async () => {
    writeSession(DEMO_USER);
    const { panel } = await openChat();
    expect(within(panel).getByText("Hi Alex,")).toBeInTheDocument();
    expect(within(panel).getByText("Electricity bill $487.35")).toBeInTheDocument();
  });

  it("deep-links from a help article into the matching step", async () => {
    const user = userEvent.setup();
    renderApp("/help/billing-payments/how-billing-works");
    await user.click(screen.getByRole("button", { name: "Ask AGL Assistant" }));
    const panel = screen.getByRole("dialog", { name: "AGL Assistant" });
    expect(within(panel).getByText("How billing works")).toBeInTheDocument();
  });
});
