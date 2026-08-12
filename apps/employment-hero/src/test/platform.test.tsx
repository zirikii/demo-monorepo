import type { ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { RequireAuth } from "@/components/platform/RequireAuth";
import { PlatformDashboardPage } from "@/pages/platform/Dashboard";
import { PlatformHiringPage } from "@/pages/platform/Hiring";
import { PlatformLeavePage } from "@/pages/platform/Leave";
import { PlatformPayrollPage } from "@/pages/platform/Payroll";
import { PlatformPeoplePage } from "@/pages/platform/People";
import { AuthProvider } from "@/hooks/useAuth";
import { WorkspaceProvider } from "@/hooks/useWorkspace";
import { encodeSession, type DemoUser } from "@/lib/auth";

const demoUser: DemoUser = {
  name: "Ava Thompson",
  email: "ava.thompson@brightpath.com.au",
  company: "Brightpath Group",
  role: "People & Culture Lead",
  plan: "HR Engage",
  memberSince: "2022-03-14",
};

function signIn() {
  window.localStorage.setItem("employment-hero-demo-session", encodeSession(demoUser));
}

function renderPlatform(ui: ReactNode, route = "/platform") {
  return render(
    <AuthProvider>
      <WorkspaceProvider>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </WorkspaceProvider>
    </AuthProvider>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("RequireAuth", () => {
  it("sends an anonymous visitor to the log in page with a redirect", () => {
    renderPlatform(
      <Routes>
        <Route
          path="/platform"
          element={
            <RequireAuth>
              <p>Protected content</p>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<p>Log in page</p>} />
      </Routes>,
    );

    expect(screen.getByText("Log in page")).toBeInTheDocument();
    expect(screen.queryByText("Protected content")).toBeNull();
  });

  it("renders the protected content once a session exists", () => {
    signIn();

    renderPlatform(
      <Routes>
        <Route
          path="/platform"
          element={
            <RequireAuth>
              <p>Protected content</p>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<p>Log in page</p>} />
      </Routes>,
    );

    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });
});

describe("Platform dashboard", () => {
  beforeEach(signIn);

  it("greets the signed-in user and summarises the workspace", () => {
    renderPlatform(<PlatformDashboardPage />);

    expect(screen.getByRole("heading", { name: /Good morning, Ava/ })).toBeInTheDocument();
    expect(screen.getByText("Brightpath Group · HR Engage plan")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Next pay run" })).toBeInTheDocument();
  });

  it("lists the pay run anomalies that need confirming", () => {
    renderPlatform(<PlatformDashboardPage />);

    expect(
      screen.getByText(/Grace Fuller has no superannuation fund nominated/),
    ).toBeInTheDocument();
  });
});

describe("Leave approvals", () => {
  beforeEach(signIn);

  it("moves a request out of the pending list when it is approved", async () => {
    const user = userEvent.setup();
    renderPlatform(<PlatformLeavePage />);

    const pending = screen.getByRole("heading", { name: "Awaiting approval" }).parentElement;
    if (!pending) throw new Error("expected an awaiting approval section");
    expect(within(pending).getByText("Mei Lin Chua")).toBeInTheDocument();

    const [firstApprove] = within(pending).getAllByRole("button", { name: "Approve" });
    if (!firstApprove) throw new Error("expected an approve button");
    await user.click(firstApprove);

    expect(within(pending).queryByText("Mei Lin Chua")).toBeNull();
  });

  it("keeps a declined request out of the pending list too", async () => {
    const user = userEvent.setup();
    renderPlatform(<PlatformLeavePage />);

    const before = screen.getAllByRole("button", { name: "Decline" }).length;
    const [firstDecline] = screen.getAllByRole("button", { name: "Decline" });
    if (!firstDecline) throw new Error("expected a decline button");
    await user.click(firstDecline);

    expect(screen.queryAllByRole("button", { name: "Decline" })).toHaveLength(before - 1);
  });
});

describe("Payroll", () => {
  beforeEach(signIn);

  it("finalises the open pay run and clears its anomalies", async () => {
    const user = userEvent.setup();
    renderPlatform(<PlatformPayrollPage />);

    expect(screen.getByText("Awaiting approval")).toBeInTheDocument();
    expect(screen.getByText(/confirm the timesheet/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Approve and finalise" }));

    expect(screen.queryByText("Awaiting approval")).toBeNull();
    expect(screen.queryByText(/confirm the timesheet/)).toBeNull();
    expect(screen.getByText(/No pay run is open/)).toBeInTheDocument();
  });
});

describe("Hiring pipeline", () => {
  beforeEach(signIn);

  it("advances a candidate to the next stage", async () => {
    const user = userEvent.setup();
    renderPlatform(<PlatformHiringPage />);

    const applied = screen.getByRole("heading", { name: "Applied" }).closest("section");
    if (!applied) throw new Error("expected an Applied column");
    expect(within(applied).getByText("Jack Fenton")).toBeInTheDocument();

    const advance = within(applied)
      .getAllByRole("button", { name: "Advance" })
      .find((button) => button.closest("li")?.textContent?.includes("Jack Fenton"));
    if (!advance) throw new Error("expected an advance button for Jack Fenton");
    await user.click(advance);

    expect(within(applied).queryByText("Jack Fenton")).toBeNull();
    const screening = screen.getByRole("heading", { name: "Screening" }).closest("section");
    expect(screening && within(screening).getByText("Jack Fenton")).toBeTruthy();
  });
});

describe("People directory", () => {
  beforeEach(signIn);

  it("filters the table by search term", async () => {
    const user = userEvent.setup();
    renderPlatform(<PlatformPeoplePage />);

    expect(screen.getByRole("link", { name: /Tom Whitfield/ })).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search people"), "engineer");

    expect(screen.queryByRole("link", { name: /Tom Whitfield/ })).toBeNull();
    expect(screen.getByRole("link", { name: /Callum Reid/ })).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    renderPlatform(<PlatformPeoplePage />);

    await user.type(screen.getByLabelText("Search people"), "zzzzzz");

    expect(screen.getByText("No people match that search")).toBeInTheDocument();
  });
});
