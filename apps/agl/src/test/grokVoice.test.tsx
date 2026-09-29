import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AppRoutes } from "@/App";
import { AssistantProvider } from "@/features/assistant/AssistantProvider";
import { AuthProvider } from "@/hooks/useAuth";

class MockSocket {
  static last: MockSocket | null = null;
  readyState = 0;
  sent: Record<string, unknown>[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((e: { data: string }) => void) | null = null;
  onerror: (() => void) | null = null;
  onclose: (() => void) | null = null;

  constructor(
    public url: string,
    public protocols: string[],
  ) {
    MockSocket.last = this;
  }

  send(data: string) {
    this.sent.push(JSON.parse(data) as Record<string, unknown>);
  }

  close() {
    this.readyState = 3;
    this.onclose?.();
  }

  open() {
    this.readyState = 1;
    this.onopen?.();
  }
}

class MockAudioContext {
  static instances: MockAudioContext[] = [];
  state = "suspended";
  currentTime = 0;
  destination = {};
  resume = vi.fn(async () => {
    this.state = "running";
  });
  close = vi.fn(async () => {
    this.state = "closed";
  });

  constructor() {
    MockAudioContext.instances.push(this);
  }

  createAnalyser() {
    return { fftSize: 512, connect: vi.fn(), getFloatTimeDomainData: vi.fn() };
  }
}

const grant = { token: "ephemeral-123", expiresAt: null, model: "grok-voice-latest", voice: "eve", url: "wss://api.x.ai/v1/realtime" };
let releaseGrant: () => void = () => {};

beforeEach(() => {
  MockSocket.last = null;
  MockAudioContext.instances = [];
  const grantReady = new Promise<void>((resolve) => {
    releaseGrant = resolve;
  });
  vi.stubGlobal("WebSocket", MockSocket);
  vi.stubGlobal("AudioContext", MockAudioContext);
  vi.stubGlobal("requestAnimationFrame", () => 0);
  vi.stubGlobal("cancelAnimationFrame", () => {});
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      if (url === "/api/voice/session") {
        await grantReady;
        return new Response(JSON.stringify(grant), { status: 200 });
      }
      return new Response(JSON.stringify({ configured: true }), { status: 200 });
    }),
  );
});

function renderApp(route: string) {
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

async function openChatWithGrok() {
  const user = userEvent.setup();
  renderApp("/about");
  await user.click(screen.getByRole("button", { name: "Chat with us" }));
  const panel = screen.getByRole("dialog", { name: "AGL Assistant" });
  await within(panel).findByText("Grok voice");
  return { user, panel };
}

async function connectGrok() {
  await act(async () => releaseGrant());
  await waitFor(() => expect(MockSocket.last).not.toBeNull());
  const socket = MockSocket.last!;
  act(() => socket.open());
  return socket;
}

function notesSent(socket: MockSocket): string[] {
  return socket.sent
    .filter((e) => e.type === "conversation.item.create")
    .map((e) => JSON.stringify(e.item));
}

describe("Grok voice session", () => {
  it("unlocks audio inside the click, before the session grant arrives", async () => {
    const { user, panel } = await openChatWithGrok();
    await user.click(within(panel).getByRole("button", { name: "Voice" }));

    expect(MockSocket.last).toBeNull();
    expect(MockAudioContext.instances).toHaveLength(1);
    expect(MockAudioContext.instances[0]!.resume).toHaveBeenCalled();

    await connectGrok();
    expect(MockAudioContext.instances).toHaveLength(1);
  });

  it("tells Grok the resolved facts behind a tapped chip", async () => {
    const { user, panel } = await openChatWithGrok();
    await user.type(within(panel).getByLabelText("Message"), "pay with saved card{Enter}");
    await within(panel).findByRole("button", { name: "Pay both bills ($700.15)" });

    await user.click(within(panel).getByRole("button", { name: "Voice" }));
    const socket = await connectGrok();
    await user.click(within(panel).getByRole("button", { name: "Pay both bills ($700.15)" }));

    const note = notesSent(socket).find((n) => n.includes("Customer tapped"));
    expect(note).toContain("Your payment of $700.15");
    expect(note).not.toMatch(/\{[a-zA-Z]+\}/);
  });

  it("starts a voice deep link on the linked step", async () => {
    const user = userEvent.setup();
    renderApp("/help/billing-payments/how-billing-works");
    await screen.findByRole("button", { name: "Talk instead" });
    await waitFor(() => expect(fetch).toHaveBeenCalledWith("/api/voice/status"));
    await act(async () => {});
    await user.click(screen.getByRole("button", { name: "Talk instead" }));

    const panel = screen.getByRole("dialog", { name: "AGL Assistant" });
    expect(within(panel).getByRole("navigation", { name: "Where you are" })).toHaveTextContent("Understand my bill");

    const socket = await connectGrok();
    const update = socket.sent.find((e) => e.type === "session.update") as { session: { instructions: string } } | undefined;
    expect(update?.session.instructions).toContain("on step billing.understand");
  });
});

describe("Demo voice deep link", () => {
  it("shows the linked step immediately without a second greeting", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ configured: false }), { status: 200 })),
    );
    const user = userEvent.setup();
    renderApp("/help/billing-payments/how-billing-works");
    await user.click(await screen.findByRole("button", { name: "Talk instead" }));

    const panel = screen.getByRole("dialog", { name: "AGL Assistant" });
    expect(within(panel).getByText("Demo voice · Grok key pending")).toBeInTheDocument();
    expect(within(panel).getByRole("navigation", { name: "Where you are" })).toHaveTextContent("Understand my bill");
    expect(within(panel).queryByText(/What's your query today\?/)).not.toBeInTheDocument();
  });
});
