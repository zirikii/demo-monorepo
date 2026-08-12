import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { writeSession, type DemoUser } from "@/lib/auth";
import PlatformDashboard from "@/pages/platform/Dashboard";
import PlatformLeave from "@/pages/platform/Leave";
import PlatformPeople from "@/pages/platform/People";
import { EMPLOYEES } from "@/data/platform";

const USER: DemoUser = {
  email: "demo@employmenthero.com",
  name: "Priya Raman",
  jobTitle: "People & Culture Lead",
  company: "Harbourline Hospitality Group",
  portal: "employer",
  plan: "Employment Unlimited",
  landing: "/platform",
};

function renderPlatform(ui: React.ReactNode, route = "/platform") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
  writeSession(USER);
});

describe("Employment OS dashboard", () => {
  it("greets the signed-in user and shows the organisation", () => {
    renderPlatform(<PlatformDashboard />);
    expect(screen.getByRole("heading", { name: /good morning, priya/i })).toBeInTheDocument();
    expect(screen.getAllByText(/harbourline hospitality group/i).length).toBeGreaterThan(0);
  });

  it("summarises headcount and the pay run exceptions", () => {
    renderPlatform(<PlatformDashboard />);

    const headcountTile = screen.getByText("Headcount").closest<HTMLElement>("div.rounded-eh-lg");
    expect(headcountTile).not.toBeNull();
    expect(within(headcountTile!).getByText(String(EMPLOYEES.length))).toBeInTheDocument();
    expect(screen.getByText("No superannuation fund recorded")).toBeInTheDocument();
  });

  it("marks Hero AI activity as needing review", () => {
    renderPlatform(<PlatformDashboard />);
    expect(screen.getAllByText("Awaiting your review").length).toBeGreaterThan(0);
  });
});

describe("People directory", () => {
  it("lists every employee", () => {
    renderPlatform(<PlatformPeople />, "/platform/people");
    expect(screen.getByRole("link", { name: /sam okafor/i })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(EMPLOYEES.length + 1);
  });

  it("filters by department", async () => {
    const user = userEvent.setup();
    renderPlatform(<PlatformPeople />, "/platform/people");

    await user.selectOptions(screen.getByLabelText("Filter by department"), "Kitchen");
    const kitchenCount = EMPLOYEES.filter((employee) => employee.department === "Kitchen").length;
    expect(screen.getAllByRole("row")).toHaveLength(kitchenCount + 1);
  });

  it("shows an empty state when a search matches nobody", async () => {
    const user = userEvent.setup();
    renderPlatform(<PlatformPeople />, "/platform/people");

    await user.type(screen.getByLabelText("Search employees"), "zzzz");
    expect(screen.getByText("No employees match those filters")).toBeInTheDocument();
  });
});

describe("Leave approvals", () => {
  it("approves a pending request and moves it out of the pending tab", async () => {
    const user = userEvent.setup();
    renderPlatform(<PlatformLeave />, "/platform/leave");

    expect(screen.getByText("Diego Álvarez")).toBeInTheDocument();
    const approveButtons = screen.getAllByRole("button", { name: "Approve" });
    await user.click(approveButtons[0]!);

    expect(screen.queryByText("Diego Álvarez")).not.toBeInTheDocument();
  });

  it("shows approved requests under the approved tab", async () => {
    const user = userEvent.setup();
    renderPlatform(<PlatformLeave />, "/platform/leave");

    await user.click(screen.getByRole("tab", { name: "Approved" }));
    expect(screen.getByText("Grace Whitlock")).toBeInTheDocument();
  });
});
