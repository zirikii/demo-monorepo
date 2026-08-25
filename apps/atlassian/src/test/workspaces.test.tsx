import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "@/App";
import { writeSession, type DemoUser } from "@/lib/auth";

const USER: DemoUser = {
  email: "demo@atlassian.com",
  name: "Maya Chen",
  jobTitle: "Product Delivery Lead",
  company: "Northline Payments",
  portal: "jira",
  plan: "Jira Cloud Premium",
  landing: "/jira",
};

function renderPath(path: string) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("product workspaces", () => {
  it.each([
    ["/confluence", /Northline/, "confluence"],
    ["/jsm", /Queues/, "jsm"],
    ["/jpd", /Ideas/, "jpd"],
    ["/bitbucket", /Repositories/, "bitbucket"],
    ["/trello", /Northline launch/, "trello"],
    ["/loom", /Library/, "loom"],
    ["/rovo", /Rovo Studio/, "rovo"],
    ["/admin", /^Admin$/, "admin"],
  ] as const)("sends anonymous %s to that product login", (path, _heading, portal) => {
    renderPath(path);
    expect(screen.getByRole("heading", { name: `Log in to ${headingName(portal)}` })).toBeInTheDocument();
  });

  it("opens Confluence, comments, and keeps the comment after a remount", async () => {
    const user = userEvent.setup();
    writeSession(USER);
    renderPath("/confluence");

    expect(screen.getByRole("heading", { name: "Northline" })).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: /Portal 2.0 strategy brief/ }));
    expect(screen.getByRole("heading", { name: "Portal 2.0 strategy brief" })).toBeInTheDocument();

    await user.type(screen.getByLabelText("Add a comment"), "Ready for the partner review.");
    await user.click(screen.getByRole("button", { name: "Comment" }));
    expect(screen.getByText("Ready for the partner review.")).toBeInTheDocument();
  });

  it("transitions a JSM request", async () => {
    const user = userEvent.setup();
    writeSession(USER);
    renderPath("/jsm");

    await user.click(screen.getByRole("link", { name: /ITSM-14/ }));
    await user.selectOptions(screen.getByLabelText("Status"), "Resolved");

    const stored = JSON.parse(window.localStorage.getItem("atlassian-demo-requests") ?? "[]") as {
      key: string;
      status: string;
    }[];
    expect(stored.find((request) => request.key === "ITSM-14")?.status).toBe("Resolved");
  });

  it("records a vote on a discovery idea", async () => {
    const user = userEvent.setup();
    writeSession(USER);
    renderPath("/jpd");

    const before = screen.getByRole("button", { name: "Vote for DISC-9" });
    expect(before).toHaveTextContent("7 votes");
    await user.click(before);
    expect(screen.getByRole("button", { name: "Vote for DISC-9" })).toHaveTextContent("8 votes");
  });

  it("approves an open pull request", async () => {
    const user = userEvent.setup();
    writeSession(USER);
    renderPath("/bitbucket/portal-web/pull-requests/42");

    await user.click(screen.getByRole("button", { name: "Approve" }));
    expect(screen.getByText(/Approved/)).toBeInTheDocument();
  });

  it("moves a Trello card between lists", async () => {
    const user = userEvent.setup();
    writeSession(USER);
    renderPath("/trello");

    expect(screen.getByRole("article", { name: /Draft press kit/i })).toBeTruthy();
    await user.selectOptions(screen.getByLabelText("Move Draft press kit"), "Doing");

    const stored = JSON.parse(window.localStorage.getItem("atlassian-demo-trello") ?? "[]") as {
      id: string;
      list: string;
    }[];
    expect(stored.find((card) => card.id === "press-kit")?.list).toBe("Doing");
  });

  it("marks a Loom video watched", async () => {
    const user = userEvent.setup();
    writeSession(USER);
    renderPath("/loom/sprint-24-demo");

    await user.click(screen.getByRole("button", { name: "Mark as watched" }));
    expect(screen.getByRole("button", { name: "Watched" })).toBeInTheDocument();
  });

  it("toggles a Rovo agent", async () => {
    const user = userEvent.setup();
    writeSession(USER);
    renderPath("/rovo");

    const toggle = screen.getByRole("switch", { name: "Onboarding writer" });
    expect(toggle).toHaveAttribute("aria-checked", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("persists an admin policy toggle", async () => {
    const user = userEvent.setup();
    writeSession({ ...USER, portal: "admin", landing: "/admin" });
    renderPath("/admin");

    const toggle = screen.getByRole("switch", { name: "Two-step verification" });
    expect(toggle).toHaveAttribute("aria-checked", "true");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});

function headingName(portal: string): string {
  switch (portal) {
    case "confluence":
      return "Confluence";
    case "jsm":
      return "Jira Service Management";
    case "jpd":
      return "Jira Product Discovery";
    case "bitbucket":
      return "Bitbucket";
    case "trello":
      return "Trello";
    case "loom":
      return "Loom";
    case "rovo":
      return "Rovo";
    case "admin":
      return "Admin";
    default:
      return "Jira";
  }
}
