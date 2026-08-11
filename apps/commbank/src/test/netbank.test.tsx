import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import App from "@/App";
import { seedAccounts } from "@/data/netbank";
import { AuthProvider } from "@/hooks/useAuth";
import { BankingProvider, useBanking } from "@/hooks/useBanking";
import { RequireAuth } from "@/components/netbank/RequireAuth";
import { NetBankTransferPage } from "@/pages/netbank/Transfer";
import { encodeSession } from "@/lib/auth";

function signIn() {
  window.localStorage.setItem(
    "commbank-demo-session",
    encodeSession({
      clientNumber: "12345678",
      name: "Alex Nguyen",
      email: "alex.nguyen@example.com",
      yelloTier: "Gold",
      customerSince: "2016-04-18",
    }),
  );
}

function renderTransferPage() {
  return render(
    <AuthProvider>
      <BankingProvider>
        <MemoryRouter initialEntries={["/netbank/transfer"]}>
          <Routes>
            <Route path="/netbank/transfer" element={<NetBankTransferPage />} />
            <Route path="/login" element={<p>Log on page</p>} />
          </Routes>
        </MemoryRouter>
      </BankingProvider>
    </AuthProvider>,
  );
}

describe("RequireAuth", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("redirects an anonymous visitor to the log on page", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/netbank"]}>
          <Routes>
            <Route
              path="/netbank"
              element={
                <RequireAuth>
                  <p>Secret accounts</p>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<p>Log on page</p>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByText("Log on page")).toBeInTheDocument();
    expect(screen.queryByText("Secret accounts")).toBeNull();
  });

  it("lets a signed-in customer through", () => {
    signIn();

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/netbank"]}>
          <Routes>
            <Route
              path="/netbank"
              element={
                <RequireAuth>
                  <p>Secret accounts</p>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<p>Log on page</p>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByText("Secret accounts")).toBeInTheDocument();
  });
});

describe("NetBank transfers", () => {
  beforeEach(() => {
    window.localStorage.clear();
    signIn();
  });

  it("moves money between accounts and updates both balances", async () => {
    const user = userEvent.setup();
    renderTransferPage();

    const smartAccess = seedAccounts.find((account) => account.id === "smart-access");
    const saver = seedAccounts.find((account) => account.id === "netbank-saver");
    if (!smartAccess || !saver) throw new Error("expected the seeded accounts to exist");

    const balances = screen.getByRole("heading", { name: "Your balances" }).parentElement;
    if (!balances) throw new Error("expected a balances panel");

    expect(within(balances).getByText("$4,218.63")).toBeInTheDocument();
    expect(within(balances).getByText("$18,740.22")).toBeInTheDocument();

    const amount = screen.getByLabelText("Amount");
    await user.clear(amount);
    await user.type(amount, "250");
    await user.click(screen.getByRole("button", { name: "Transfer" }));

    expect(screen.getByRole("status")).toHaveTextContent("$250.00 transferred to NetBank Saver.");
    expect(within(balances).getByText("$3,968.63")).toBeInTheDocument();
    expect(within(balances).getByText("$18,990.22")).toBeInTheDocument();
  });

  it("rejects a transfer larger than the available balance", async () => {
    const user = userEvent.setup();
    renderTransferPage();

    const amount = screen.getByLabelText("Amount");
    await user.clear(amount);
    await user.type(amount, "999999");
    await user.click(screen.getByRole("button", { name: "Transfer" }));

    expect(
      screen.getByText("You don't have enough available funds in that account."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("rejects a transfer to the same account", async () => {
    const user = userEvent.setup();
    renderTransferPage();

    await user.selectOptions(screen.getByLabelText("To"), "smart-access");
    await user.click(screen.getByRole("button", { name: "Transfer" }));

    expect(screen.getByText("Choose two different accounts.")).toBeInTheDocument();
  });
});

describe("double-submitted money movement", () => {
  beforeEach(() => {
    window.localStorage.clear();
    signIn();
  });

  /** Fires two transfers in a single tick, the way an impatient double-click does. */
  function DoubleTransfer() {
    const { accounts, transactions, transfer } = useBanking();
    const saver = accounts.find((account) => account.id === "netbank-saver");
    const rows = transactions.filter((row) => row.description.includes("Double"));

    return (
      <div>
        <button
          type="button"
          onClick={() => {
            transfer("smart-access", "netbank-saver", 100, "Double");
            transfer("smart-access", "netbank-saver", 100, "Double");
          }}
        >
          Send twice
        </button>
        <p data-testid="saver-balance">{saver?.balance.toFixed(2)}</p>
        <p data-testid="row-count">{rows.length}</p>
      </div>
    );
  }

  it("applies both transfers and keeps both sets of transaction rows", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <BankingProvider>
          <DoubleTransfer />
        </BankingProvider>
      </AuthProvider>,
    );

    expect(screen.getByTestId("saver-balance")).toHaveTextContent("18740.22");

    await user.click(screen.getByRole("button", { name: "Send twice" }));

    // Both must land. Reading balances from the render closure applied each $100 to the
    // same starting figure and the second write dropped the first one's rows.
    expect(screen.getByTestId("saver-balance")).toHaveTextContent("18940.22");
    expect(screen.getByTestId("row-count")).toHaveTextContent("4");
  });

  it("stops the second transfer when the first one spends the available balance", async () => {
    const results: boolean[] = [];

    function SpendItTwice() {
      const { accounts, transfer } = useBanking();
      const everyday = accounts.find((account) => account.id === "smart-access");
      return (
        <div>
          <button
            type="button"
            onClick={() => {
              results.push(transfer("smart-access", "netbank-saver", 4218.63, "All of it").ok);
              results.push(transfer("smart-access", "netbank-saver", 4218.63, "All of it").ok);
            }}
          >
            Drain twice
          </button>
          <p data-testid="everyday-balance">{everyday?.balance.toFixed(2)}</p>
        </div>
      );
    }

    const user = userEvent.setup();
    render(
      <AuthProvider>
        <BankingProvider>
          <SpendItTwice />
        </BankingProvider>
      </AuthProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Drain twice" }));

    expect(results).toEqual([true, false]);
    expect(screen.getByTestId("everyday-balance")).toHaveTextContent("0.00");
  });
});

describe("app routing", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the homepage hero and quick links", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Earn up to 300,000 Qantas Points/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Rates & calculators" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Insurance & more" })).toBeInTheDocument();
  });

  it("renders the default log on page without crashing", () => {
    window.history.pushState({}, "", "/login");

    render(<App />);

    const main = screen.getByRole("main");
    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
    expect(within(main).getByText("Everyday personal banking")).toBeInTheDocument();
  });

  it("renders service-specific log on pages from query params", () => {
    window.history.pushState({}, "", "/login?service=commbiz");

    render(<App />);

    const main = screen.getByRole("main");
    expect(screen.getByRole("heading", { name: "Log on to CommBiz" })).toBeInTheDocument();
    expect(within(main).getByText("Business banking")).toBeInTheDocument();
  });
});
