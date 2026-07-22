import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/cursor/health")) {
        return new Response(
          JSON.stringify({
            ok: true,
            configured: true,
            me: { apiKeyName: "test-key" },
            repoUrl: "https://github.com/zirikii/demo-monorepo",
            startingRef: "main",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
      return new Response(JSON.stringify({ error: "not mocked" }), { status: 404 });
    }),
  );
});

describe("Optus NOC App", () => {
  it("renders Optus branding and the automation pipeline", async () => {
    render(<App />);
    expect(screen.getByAltText("Optus")).toBeInTheDocument();
    expect(screen.getByText(/Network Operations/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Network event → SNMP → filter → RabbitMQ → remediation/i,
      }),
    ).toBeInTheDocument();
    expect(await screen.findByText(/API ready/i)).toBeInTheDocument();
  });

  it("lists showcase scenarios including an agentic handoff", () => {
    render(<App />);
    expect(screen.getByText(/Cell site backhaul degrade/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Needs agent/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: /Dispatch live Cursor Cloud Agent/i }),
    ).toBeDisabled();
  });

  it("runs the pipeline for the selected scenario", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /Run selected scenario/i }));
    expect(
      await screen.findByText(/SNMP trap accepted/i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();
  });
});
