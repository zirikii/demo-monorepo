import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "@/App";
import { AuthProvider } from "@/hooks/useAuth";
import { RequireAuth } from "@/components/adviser/RequireAuth";
import AdviserClientDetailPage from "@/pages/adviser/ClientDetail";
import AdviserTradingPage from "@/pages/adviser/Trading";
import LoginPage from "@/pages/Login";
import { writeSession } from "@/lib/auth";

const ADVISER = {
  email: "adviser@hub24.com.au",
  name: "Alicia Nguyen",
  jobTitle: "Senior Financial Adviser",
  practice: "Meridian Private Wealth",
  portal: "adviser" as const,
  adviserCode: "ADV-40218",
  landing: "/adviserhub",
};

function renderRoutes(path: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/adviserhub/clients/:id"
            element={
              <RequireAuth>
                <AdviserClientDetailPage />
              </RequireAuth>
            }
          />
          <Route
            path="/adviserhub/trading"
            element={
              <RequireAuth>
                <AdviserTradingPage />
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("AdviserHUB access control", () => {
  it("sends anonymous visitors to the login screen", () => {
    renderRoutes("/adviserhub/clients/cl-10241");
    expect(
      screen.getByRole("heading", { level: 1, name: /Log in to AdviserHUB/i }),
    ).toBeInTheDocument();
  });

  it("renders the client once a session exists", () => {
    writeSession(ADVISER);
    renderRoutes("/adviserhub/clients/cl-10241");
    expect(screen.getByRole("heading", { level: 1, name: "Daniel Whitlock" })).toBeInTheDocument();
    expect(screen.getByText("Total balance")).toBeInTheDocument();
  });
});

describe("login flow", () => {
  // App owns its BrowserRouter, so drive the entry point through history rather than nesting routers.
  function renderApp(path: string) {
    window.history.pushState({}, "", path);
    return render(<App />);
  }

  it("signs in with the pre-filled demo credentials and lands on the dashboard", async () => {
    const user = userEvent.setup();
    renderApp("/login?portal=adviser");

    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(
      await screen.findByRole("heading", { level: 1, name: /Good morning, Alicia/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Funds under administration").length).toBeGreaterThan(0);
  });

  it("rejects credentials that do not match a demo account", async () => {
    const user = userEvent.setup();
    renderApp("/login?portal=adviser");

    const password = screen.getByLabelText("Password");
    await user.clear(password);
    await user.type(password, "wrong-password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/don't match a demo account/i);
  });
});

describe("client detail", () => {
  it("switches between the client's accounts", async () => {
    const user = userEvent.setup();
    writeSession(ADVISER);
    renderRoutes("/adviserhub/clients/cl-10241");

    expect(screen.getByRole("tab", { name: "HUB-884201" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("HUB24 Invest — holdings")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "HUB-884202" }));

    expect(screen.getByText("HUB24 Super — holdings")).toBeInTheDocument();
    const holdings = screen.getByRole("table", { name: /Holdings for HUB-884202/i });
    expect(within(holdings).getByText("Meridian Balanced Managed Portfolio")).toBeInTheDocument();
  });
});

describe("trading", () => {
  it("estimates pre-trade CGT for a disposal and clears it for a purchase", async () => {
    const user = userEvent.setup();
    writeSession(ADVISER);
    renderRoutes("/adviserhub/trading");

    // 50,000 × 12% embedded gain × 50% discount × 39% marginal rate = $1,170.
    expect(screen.getByText("$1,170")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Instruction"), "Buy");
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(
      screen.getByText(/No disposal, so no capital gains tax estimate applies/i),
    ).toBeInTheDocument();
  });

  it("blocks a purchase larger than the client's available cash", async () => {
    const user = userEvent.setup();
    writeSession(ADVISER);
    renderRoutes("/adviserhub/trading");

    await user.selectOptions(screen.getByLabelText("Instruction"), "Buy");
    const amount = screen.getByLabelText("Amount");
    await user.clear(amount);
    await user.type(amount, "5000000");

    expect(screen.getByRole("alert")).toHaveTextContent(/exceeds available cash/i);
    expect(screen.getByRole("button", { name: "Queue for approval" })).toBeDisabled();
  });

  it("queues a valid instruction for approval", async () => {
    const user = userEvent.setup();
    writeSession(ADVISER);
    renderRoutes("/adviserhub/trading");

    await user.click(screen.getByRole("button", { name: "Queue for approval" }));

    expect(screen.getByRole("status")).toHaveTextContent(/queued for approval/i);
  });
});
