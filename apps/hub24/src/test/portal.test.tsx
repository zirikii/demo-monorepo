import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { RequireAuth } from "@/components/portal/RequireAuth";
import { AuthProvider } from "@/hooks/useAuth";
import { PortfolioProvider } from "@/hooks/usePortfolio";
import { writeSession, type DemoUser } from "@/lib/auth";
import LoginPage from "@/pages/Login";
import InvestorOverviewPage from "@/pages/investorhub/Overview";
import InvestorPortfolioPage from "@/pages/investorhub/Portfolio";
import InvestorTransactionsPage from "@/pages/investorhub/Transactions";
import AdviserDashboardPage from "@/pages/adviserhub/Dashboard";
import AdviserClientsPage from "@/pages/adviserhub/Clients";
import AdviserTradingPage from "@/pages/adviserhub/Trading";
import { CLIENTS } from "@/data/platform";

const INVESTOR: DemoUser = {
  email: "investor@hub24.com.au",
  name: "Margaret Whitlam",
  jobTitle: "Advised client",
  organisation: "Kembla Advice Partners",
  portal: "investor",
  landing: "/investorhub",
};

const ADVISER: DemoUser = {
  email: "adviser@hub24.com.au",
  name: "Daniel Okonjo",
  jobTitle: "Senior Financial Adviser",
  organisation: "Kembla Advice Partners",
  portal: "adviser",
  landing: "/adviserhub",
};

function renderPortal(ui: ReactNode, route: string) {
  return render(
    <AuthProvider>
      <PortfolioProvider>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </PortfolioProvider>
    </AuthProvider>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("route protection", () => {
  it("sends an anonymous visitor to the login page with a redirect", () => {
    renderPortal(
      <Routes>
        <Route
          path="/investorhub"
          element={
            <RequireAuth>
              <InvestorOverviewPage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>,
      "/investorhub",
    );

    expect(screen.getByRole("heading", { level: 2, name: "Log in" })).toBeInTheDocument();
  });

  it("lets a signed-in client through", () => {
    writeSession(INVESTOR);
    renderPortal(
      <RequireAuth>
        <InvestorOverviewPage />
      </RequireAuth>,
      "/investorhub",
    );

    expect(screen.getByRole("heading", { level: 1, name: /welcome back, margaret/i })).toBeInTheDocument();
  });
});

describe("login", () => {
  it("pre-fills the credentials for the selected portal", async () => {
    const user = userEvent.setup();
    renderPortal(<LoginPage />, "/login");

    expect(screen.getByLabelText("Email")).toHaveValue("investor@hub24.com.au");

    await user.click(screen.getByRole("button", { name: "AdviserHUB" }));
    expect(screen.getByLabelText("Email")).toHaveValue("adviser@hub24.com.au");
  });

  it("honours the portal query parameter", () => {
    renderPortal(<LoginPage />, "/login?portal=adviser");
    expect(screen.getByLabelText("Email")).toHaveValue("adviser@hub24.com.au");
  });

  it("rejects a bad password without creating a session", async () => {
    const user = userEvent.setup();
    renderPortal(<LoginPage />, "/login");

    await user.clear(screen.getByLabelText("Password"));
    await user.type(screen.getByLabelText("Password"), "wrong");
    await user.click(screen.getByRole("button", { name: /log in to investorhub/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/couldn't match those details/i);
    expect(window.localStorage.getItem("hub24-demo-session")).toBeNull();
  });

  it("signs in and lands on the portal", async () => {
    const user = userEvent.setup();
    renderPortal(
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/investorhub" element={<InvestorOverviewPage />} />
      </Routes>,
      "/login",
    );

    await user.click(screen.getByRole("button", { name: /log in to investorhub/i }));

    expect(
      screen.getByRole("heading", { level: 1, name: /welcome back, margaret/i }),
    ).toBeInTheDocument();
  });
});

describe("InvestorHUB", () => {
  beforeEach(() => writeSession(INVESTOR));

  it("summarises the portfolio across every account", () => {
    renderPortal(<InvestorOverviewPage />, "/investorhub");
    expect(screen.getByText("Portfolio value")).toBeInTheDocument();
    expect(screen.getByText("M & J Whitlam — Investment")).toBeInTheDocument();
    expect(screen.getByText("Margaret Whitlam — Super")).toBeInTheDocument();
  });

  it("filters holdings down to one account", async () => {
    const user = userEvent.setup();
    renderPortal(<InvestorPortfolioPage />, "/investorhub/portfolio");

    expect(screen.getByText("Tallowood Growth Managed Portfolio")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Filter by account"), "acc-invest");

    expect(screen.queryByText("Tallowood Growth Managed Portfolio")).not.toBeInTheDocument();
    expect(screen.getByText("Tallowood Balanced Managed Portfolio")).toBeInTheDocument();
  });

  it("filters transactions by type", async () => {
    const user = userEvent.setup();
    renderPortal(<InvestorTransactionsPage />, "/investorhub/transactions");

    await user.selectOptions(screen.getByLabelText("Type"), "Contribution");

    const table = screen.getByRole("table", { name: "Transaction history" });
    const rows = within(table).getAllByRole("row").slice(1);
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      expect(within(row).getByText("Contribution")).toBeInTheDocument();
    }
  });
});

describe("AdviserHUB", () => {
  beforeEach(() => writeSession(ADVISER));

  it("greets the adviser and sizes the book", () => {
    renderPortal(<AdviserDashboardPage />, "/adviserhub");
    expect(screen.getByRole("heading", { level: 1, name: /good morning, daniel/i })).toBeInTheDocument();
    expect(screen.getByText(`${CLIENTS.length} clients`)).toBeInTheDocument();
  });

  it("filters the client book by segment", async () => {
    const user = userEvent.setup();
    renderPortal(<AdviserClientsPage />, "/adviserhub/clients");

    await user.selectOptions(screen.getByLabelText("Segment"), "SMSF");

    const table = screen.getByRole("table", { name: "Client book" });
    const rows = within(table).getAllByRole("row").slice(1);
    const expected = CLIENTS.filter((client) => client.segment === "SMSF").length;
    expect(rows).toHaveLength(expected);
  });

  it("searches the client book by name", async () => {
    const user = userEvent.setup();
    renderPortal(<AdviserClientsPage />, "/adviserhub/clients");

    await user.type(screen.getByLabelText("Search"), "Whitlam");

    const table = screen.getByRole("table", { name: "Client book" });
    expect(within(table).getAllByRole("row")).toHaveLength(2);
    expect(within(table).getByText("Margaret & John Whitlam")).toBeInTheDocument();
  });
});

describe("trading", () => {
  beforeEach(() => writeSession(ADVISER));

  it("places a buy and adds the units to the account holdings", async () => {
    const user = userEvent.setup();
    renderPortal(<AdviserTradingPage />, "/adviserhub/trading");

    await user.selectOptions(screen.getByLabelText("Account"), "acc-invest");
    await user.selectOptions(screen.getByLabelText("Security"), "BHP");
    await user.clear(screen.getByLabelText("Units"));
    await user.type(screen.getByLabelText("Units"), "50");
    await user.click(screen.getByRole("button", { name: /place buy order/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/buy order for 50 bhp accepted/i);

    const table = screen.getByRole("table", { name: "Holdings in the selected account" });
    const bhpRow = within(table).getByText("BHP").closest("tr") as HTMLElement;
    // The seed holding is 1,450 units, so a 50-unit buy must settle at 1,500.
    expect(within(bhpRow).getByText("1,500")).toBeInTheDocument();
  });

  it("rejects a sell larger than the holding and leaves the units untouched", async () => {
    const user = userEvent.setup();
    renderPortal(<AdviserTradingPage />, "/adviserhub/trading");

    await user.selectOptions(screen.getByLabelText("Account"), "acc-invest");
    await user.selectOptions(screen.getByLabelText("Security"), "BHP");
    await user.click(screen.getByRole("button", { name: "Sell" }));
    await user.clear(screen.getByLabelText("Units"));
    await user.type(screen.getByLabelText("Units"), "99999");
    await user.click(screen.getByRole("button", { name: /place sell order/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/does not hold enough units/i);

    const table = screen.getByRole("table", { name: "Holdings in the selected account" });
    const bhpRow = within(table).getByText("BHP").closest("tr") as HTMLElement;
    expect(within(bhpRow).getByText("1,450")).toBeInTheDocument();
  });

  it("rejects a buy the account cannot fund", async () => {
    const user = userEvent.setup();
    renderPortal(<AdviserTradingPage />, "/adviserhub/trading");

    await user.selectOptions(screen.getByLabelText("Account"), "acc-invest");
    await user.selectOptions(screen.getByLabelText("Security"), "CSL");
    await user.clear(screen.getByLabelText("Units"));
    await user.type(screen.getByLabelText("Units"), "500");
    await user.click(screen.getByRole("button", { name: /place buy order/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/insufficient cash/i);
  });

  it("persists a completed trade so InvestorHUB sees it", async () => {
    const user = userEvent.setup();
    const { unmount } = renderPortal(<AdviserTradingPage />, "/adviserhub/trading");

    await user.selectOptions(screen.getByLabelText("Account"), "acc-invest");
    await user.selectOptions(screen.getByLabelText("Security"), "TLS");
    await user.clear(screen.getByLabelText("Units"));
    await user.type(screen.getByLabelText("Units"), "200");
    await user.click(screen.getByRole("button", { name: /place buy order/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/accepted/i);
    unmount();

    writeSession(INVESTOR);
    renderPortal(<InvestorPortfolioPage />, "/investorhub/portfolio");
    expect(screen.getByText("Telstra Group Limited")).toBeInTheDocument();
  });
});
