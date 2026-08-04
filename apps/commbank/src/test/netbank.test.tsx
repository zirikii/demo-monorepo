import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import App from "@/App";
import { seedAccounts } from "@/data/netbank";
import { AuthProvider } from "@/hooks/useAuth";
import { BankingProvider } from "@/hooks/useBanking";
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
});
