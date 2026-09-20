import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RequireAuth } from "@/components/hub/RequireAuth";
import { AuthProvider } from "@/hooks/useAuth";
import { encodeSession } from "@/lib/auth";
import LoginPage from "@/pages/Login";
import HubApplicationsPage from "@/pages/hub/Applications";
import HubInterviewsPage from "@/pages/hub/Interviews";
import HubOverviewPage from "@/pages/hub/Overview";
import HubProfilePage from "@/pages/hub/Profile";
import HubSavedRolesPage from "@/pages/hub/SavedRoles";

function signIn() {
  window.localStorage.setItem(
    "gojek-demo-session",
    encodeSession({
      email: "candidate@gojek.io",
      name: "Sasha Widjaja",
      headline: "Senior Backend Engineer",
      location: "Jakarta, Indonesia",
      candidateId: "CAND-40218",
    }),
  );
}

function renderHub(ui: React.ReactElement, route = "/hub") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path={route} element={<RequireAuth>{ui}</RequireAuth>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("RequireAuth", () => {
  it("sends a signed-out visitor to the login page with a redirect", () => {
    renderHub(<HubOverviewPage />);
    expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
  });
});

describe("Hub overview", () => {
  it("greets the signed-in candidate and summarises the pipeline", () => {
    signIn();
    renderHub(<HubOverviewPage />);

    expect(screen.getByRole("heading", { name: "Welcome back, Sasha" })).toBeInTheDocument();
    expect(screen.getByText("Active applications")).toBeInTheDocument();
    expect(screen.getByText("Furthest along")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Senior Backend Engineer, Allocation" }),
    ).toBeInTheDocument();
  });
});

describe("Hub applications", () => {
  it("lists the seeded applications and withdraws one", async () => {
    const user = userEvent.setup();
    signIn();
    renderHub(<HubApplicationsPage />, "/hub/applications");

    expect(screen.getAllByRole("button", { name: "Withdraw" })).toHaveLength(3);

    const [first] = screen.getAllByRole("button", { name: "Withdraw" });
    await user.click(first!);

    expect(screen.getAllByRole("button", { name: "Withdraw" })).toHaveLength(2);
  });
});

describe("Hub saved roles", () => {
  it("shows the seeded bookmarks and removes one", async () => {
    const user = userEvent.setup();
    signIn();
    renderHub(<HubSavedRolesPage />, "/hub/saved");

    expect(
      screen.getByRole("heading", { name: "Staff Engineer, Payments Ledger" }),
    ).toBeInTheDocument();

    const [remove] = screen.getAllByRole("button", { name: "Remove from saved" });
    await user.click(remove!);

    expect(
      screen.queryByRole("heading", { name: "Staff Engineer, Payments Ledger" }),
    ).not.toBeInTheDocument();
  });
});

describe("Hub interviews", () => {
  it("lists scheduled interviews in Jakarta time", () => {
    signIn();
    renderHub(<HubInterviewsPage />, "/hub/interviews");

    expect(
      screen.getByRole("heading", { name: "Debugging session — allocation service" }),
    ).toBeInTheDocument();
    expect(screen.getByText("24 Sept 2026, 10:00 am WIB")).toBeInTheDocument();
  });
});

describe("Hub profile", () => {
  it("persists preference changes to localStorage", async () => {
    const user = userEvent.setup();
    signIn();
    renderHub(<HubProfilePage />, "/hub/profile");

    const relocation = screen.getByRole("button", { name: "Open to relocation" });
    expect(relocation).toHaveAttribute("aria-pressed", "true");

    await user.click(relocation);
    expect(relocation).toHaveAttribute("aria-pressed", "false");

    await user.click(screen.getByRole("button", { name: "Save preferences" }));
    expect(screen.getByRole("status")).toHaveTextContent("Saved to this browser");
    expect(window.localStorage.getItem("gojek-demo-preferences")).toContain(
      '"openToRelocation":false',
    );
  });
});

describe("Login", () => {
  it("rejects credentials that do not match a demo account", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    const password = screen.getByLabelText("Password");
    await user.clear(password);
    await user.type(password, "wrong-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("do not match a demo account");
  });
});
