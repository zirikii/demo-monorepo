import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { RequireAuth } from "@/components/jira/RequireAuth";
import { AuthProvider } from "@/hooks/useAuth";
import { writeSession, type DemoUser } from "@/lib/auth";
import BoardPage from "@/pages/jira/Board";
import BacklogPage from "@/pages/jira/Backlog";
import IssuePage from "@/pages/jira/Issue";
import SettingsPage from "@/pages/jira/Settings";

const USER: DemoUser = {
  email: "demo@atlassian.com",
  name: "Maya Chen",
  jobTitle: "Product Delivery Lead",
  company: "Northline Payments",
  portal: "jira",
  plan: "Jira Cloud Premium",
  landing: "/jira",
};

function LoginProbe() {
  const location = useLocation();
  return (
    <div>
      <p>Log in page</p>
      <p>{location.search}</p>
    </div>
  );
}

function columnSection(name: string): HTMLElement {
  const heading = screen.getByRole("heading", { name });
  const section = heading.closest("section");
  if (!(section instanceof HTMLElement)) {
    throw new Error(`Missing column section for ${name}`);
  }
  return section;
}

function renderJira(route: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route
            path="/jira"
            element={
              <RequireAuth>
                <BoardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/jira/backlog"
            element={
              <RequireAuth>
                <BacklogPage />
              </RequireAuth>
            }
          />
          <Route
            path="/jira/issues/:key"
            element={
              <RequireAuth>
                <IssuePage />
              </RequireAuth>
            }
          />
          <Route
            path="/jira/settings"
            element={
              <RequireAuth>
                <SettingsPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginProbe />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("Jira board", () => {
  beforeEach(() => {
    window.localStorage.clear();
    writeSession(USER);
  });

  it("shows PORTAL-142 and hides it when the search matches nothing", async () => {
    const user = userEvent.setup();
    renderJira("/jira");

    expect(screen.getByText("PORTAL-142")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search work items"), "zzzz");

    expect(screen.queryByText("PORTAL-142")).not.toBeInTheDocument();
  });

  it("drags PORTAL-170 onto In progress and keeps that status after remount", () => {
    const view = renderJira("/jira");

    const card = screen.getByRole("link", { name: /PORTAL-170/ });
    expect(card).toHaveAttribute("draggable", "true");

    fireEvent.dragStart(card);
    expect(card.className).toMatch(/opacity-/);

    const inProgress = columnSection("In progress");
    fireEvent.dragOver(inProgress);
    expect(inProgress.className).toMatch(/atl-blue/);

    fireEvent.drop(inProgress);

    const moved = screen.getByRole("link", { name: /PORTAL-170/ });
    expect(columnSection("In progress")).toContainElement(moved);
    expect(columnSection("To do")).not.toContainElement(moved);

    const stored = JSON.parse(window.localStorage.getItem("atlassian-demo-issues") ?? "[]") as {
      key: string;
      status: string;
    }[];
    expect(stored.find((issue) => issue.key === "PORTAL-170")?.status).toBe("In progress");

    view.unmount();
    renderJira("/jira");

    const restored = screen.getByRole("link", { name: /PORTAL-170/ });
    expect(columnSection("In progress")).toContainElement(restored);
    expect(columnSection("To do")).not.toContainElement(restored);
  });
});

describe("Jira backlog", () => {
  beforeEach(() => {
    window.localStorage.clear();
    writeSession(USER);
  });

  it("lists PORTAL-161", () => {
    renderJira("/jira/backlog");
    expect(screen.getByRole("link", { name: "PORTAL-161" })).toBeInTheDocument();
  });
});

describe("Jira issue", () => {
  beforeEach(() => {
    window.localStorage.clear();
    writeSession(USER);
  });

  it("renders the work item summary", () => {
    renderJira("/jira/issues/PORTAL-142");
    expect(screen.getByRole("heading", { name: "Add 300k-account onboarding path" })).toBeInTheDocument();
  });

  it("persists a status change so the board can pick it up", async () => {
    const user = userEvent.setup();
    renderJira("/jira/issues/PORTAL-142");

    await user.selectOptions(screen.getByLabelText("Status"), "Done");

    const stored = JSON.parse(window.localStorage.getItem("atlassian-demo-issues") ?? "[]") as {
      key: string;
      status: string;
    }[];
    expect(stored.find((issue) => issue.key === "PORTAL-142")?.status).toBe("Done");
  });
});

describe("Jira settings", () => {
  beforeEach(() => {
    window.localStorage.clear();
    writeSession(USER);
  });

  it("persists the email notifications toggle", async () => {
    const user = userEvent.setup();
    renderJira("/jira/settings");

    const toggle = screen.getByRole("switch", { name: "Email notifications" });
    expect(toggle).toHaveAttribute("aria-checked", "true");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(JSON.parse(window.localStorage.getItem("atlassian-demo-settings") ?? "{}")).toMatchObject({
      emailNotifications: false,
    });
  });
});

describe("Jira create and comments", () => {
  beforeEach(() => {
    window.localStorage.clear();
    writeSession(USER);
  });

  it("creates a work item from a column and leaves cards draggable", async () => {
    const user = userEvent.setup();
    renderJira("/jira");

    const card = screen.getByRole("link", { name: /PORTAL-170/ });
    expect(card).toHaveAttribute("draggable", "true");

    await user.click(screen.getByRole("button", { name: "Create in To do" }));
    await user.type(screen.getByLabelText("Summary"), "Write launch FAQ");
    await user.click(screen.getByRole("button", { name: "Create work item" }));

    expect(screen.getByText("Write launch FAQ")).toBeInTheDocument();
    const stored = JSON.parse(window.localStorage.getItem("atlassian-demo-issues") ?? "[]") as {
      summary: string;
      status: string;
    }[];
    expect(stored.some((issue) => issue.summary === "Write launch FAQ" && issue.status === "To do")).toBe(
      true,
    );
  });
});

describe("Jira comments", () => {
  beforeEach(() => {
    window.localStorage.clear();
    writeSession(USER);
  });

  it("appends a comment on a work item", async () => {
    const user = userEvent.setup();
    renderJira("/jira/issues/PORTAL-161");

    await user.type(screen.getByLabelText("Add a comment"), "Shipping in this sprint.");
    await user.click(screen.getByRole("button", { name: "Comment" }));

    expect(screen.getByText("Shipping in this sprint.")).toBeInTheDocument();
  });
});

describe("Jira access control", () => {
  it("redirects an anonymous visitor to login with a redirect param", () => {
    renderJira("/jira");

    expect(screen.getByText("Log in page")).toBeInTheDocument();
    expect(screen.getByText(/redirect=/)).toBeInTheDocument();
    expect(screen.queryByLabelText("Search work items")).not.toBeInTheDocument();
  });
});
