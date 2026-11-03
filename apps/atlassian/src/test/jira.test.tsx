import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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

function mockDataTransfer() {
  const store = new Map<string, string>();
  return {
    dropEffect: "none",
    effectAllowed: "all",
    setData(format: string, data: string) {
      store.set(format, data);
    },
    getData(format: string) {
      return store.get(format) ?? "";
    },
  };
}

function stubHitTest(nodes: Element[]) {
  Object.defineProperty(document, "elementsFromPoint", {
    configurable: true,
    writable: true,
    value: () => nodes,
  });
}

function storedIssueStatus(key: string) {
  const stored = JSON.parse(window.localStorage.getItem("atlassian-demo-issues") ?? "[]") as {
    key: string;
    status: string;
  }[];
  return stored.find((issue) => issue.key === key)?.status;
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

  it("puts the Jira logo in the header and has no sidebar", () => {
    renderJira("/jira");

    const logo = screen.getByRole("link", { name: "Jira" });
    expect(logo.closest("header")).not.toBeNull();
    expect(screen.queryByRole("navigation", { name: "Jira" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Collapse sidebar" })).not.toBeInTheDocument();
  });

  it("shows PORTAL-142 and hides it when the search matches nothing", async () => {
    const user = userEvent.setup();
    renderJira("/jira");

    expect(screen.getByText("PORTAL-142")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search work items"), "zzzz");

    expect(screen.queryByText("PORTAL-142")).not.toBeInTheDocument();
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
    expect(
      screen.getByRole("heading", { name: "Add 300k-account onboarding path" }),
    ).toBeInTheDocument();
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
    expect(
      JSON.parse(window.localStorage.getItem("atlassian-demo-settings") ?? "{}"),
    ).toMatchObject({
      emailNotifications: false,
    });
  });
});

describe("Jira create and comments", () => {
  beforeEach(() => {
    window.localStorage.clear();
    writeSession(USER);
  });

  it("creates a work item from a column", async () => {
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
    expect(
      stored.some((issue) => issue.summary === "Write launch FAQ" && issue.status === "To do"),
    ).toBe(true);
  });
});

describe("Jira board drag", () => {
  beforeEach(() => {
    window.localStorage.clear();
    writeSession(USER);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("drops a card onto another column and keeps the status", () => {
    renderJira("/jira");

    const card = screen.getByRole("link", { name: /PORTAL-170/ });
    const dataTransfer = mockDataTransfer();
    fireEvent.dragStart(card, { dataTransfer });
    const inProgress = screen.getByRole("region", { name: "In progress" });
    fireEvent.dragOver(inProgress, { dataTransfer });
    fireEvent.drop(inProgress, { dataTransfer });

    expect(within(inProgress).getByRole("link", { name: /PORTAL-170/ })).toBeInTheDocument();
    expect(storedIssueStatus("PORTAL-170")).toBe("In progress");
    expect(
      within(screen.getByRole("region", { name: "To do" })).queryByRole("link", {
        name: /PORTAL-170/,
      }),
    ).not.toBeInTheDocument();
  });

  it("moves a card on dragEnd when the browser never fires drop", () => {
    renderJira("/jira");

    const card = screen.getByRole("link", { name: /PORTAL-170/ });
    const inReview = screen.getByRole("region", { name: "In review" });
    stubHitTest([inReview]);

    fireEvent.dragStart(card, { dataTransfer: mockDataTransfer() });
    fireEvent(card, new MouseEvent("dragend", { bubbles: true, clientX: 40, clientY: 40 }));

    expect(within(inReview).getByRole("link", { name: /PORTAL-170/ })).toBeInTheDocument();
    expect(storedIssueStatus("PORTAL-170")).toBe("In review");
  });

  it("uses the last hovered column when the pointer hit-test is empty", () => {
    renderJira("/jira");

    const card = screen.getByRole("link", { name: /PORTAL-170/ });
    const done = screen.getByRole("region", { name: "Done" });
    stubHitTest([]);
    const dataTransfer = mockDataTransfer();

    fireEvent.dragStart(card, { dataTransfer });
    fireEvent.dragOver(done, { dataTransfer });
    fireEvent(card, new MouseEvent("dragend", { bubbles: true, clientX: 8, clientY: 8 }));

    expect(within(done).getByRole("link", { name: /PORTAL-170/ })).toBeInTheDocument();
    expect(storedIssueStatus("PORTAL-170")).toBe("Done");
  });

  it("does not move a card that is released outside the board after hovering a column", () => {
    renderJira("/jira");

    const card = screen.getByRole("link", { name: /PORTAL-170/ });
    const inProgress = screen.getByRole("region", { name: "In progress" });
    stubHitTest([document.body]);
    const dataTransfer = mockDataTransfer();

    fireEvent.dragStart(card, { dataTransfer });
    fireEvent.dragOver(inProgress, { dataTransfer });
    fireEvent(card, new MouseEvent("dragend", { bubbles: true, clientX: 0, clientY: 0 }));

    expect(
      within(screen.getByRole("region", { name: "To do" })).getByRole("link", {
        name: /PORTAL-170/,
      }),
    ).toBeInTheDocument();
    expect(storedIssueStatus("PORTAL-170")).toBeUndefined();
  });

  it("leaves the card in place when the drag ends outside the board", () => {
    renderJira("/jira");

    const card = screen.getByRole("link", { name: /PORTAL-170/ });
    stubHitTest([document.body]);

    fireEvent.dragStart(card, { dataTransfer: mockDataTransfer() });
    fireEvent(card, new MouseEvent("dragend", { bubbles: true, clientX: 0, clientY: 0 }));

    expect(
      within(screen.getByRole("region", { name: "To do" })).getByRole("link", {
        name: /PORTAL-170/,
      }),
    ).toBeInTheDocument();
    expect(storedIssueStatus("PORTAL-170")).toBeUndefined();
  });

  it("still opens the work item from a click", async () => {
    const user = userEvent.setup();
    renderJira("/jira");

    await user.click(screen.getByRole("link", { name: /PORTAL-170/ }));

    expect(
      screen.getByRole("heading", { name: "Campaign ad refresh landing page" }),
    ).toBeInTheDocument();
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
