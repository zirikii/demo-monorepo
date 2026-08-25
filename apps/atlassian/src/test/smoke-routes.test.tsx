import { cleanup, render, screen } from "@testing-library/react";
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

describe("route smoke", () => {
  it.each([
    ["/", /Unleash your teams and their agents/],
    ["/software", /Explore Atlassian products/],
    ["/software/jira", /Great outcomes start with Jira/],
    ["/software/confluence", /The AI workspace that works with you/],
    ["/software/jira/pricing", /Plans for every team/],
    ["/solutions", /Built for how real teams work/],
    ["/collections/teamwork", /Turn scattered tools into a seamless system/],
    ["/customers", /How teams of the future ship faster/],
    ["/customers/northline-payments", /Northline Payments/],
    ["/resources", /Best practices for unstoppable teams/],
    ["/company", /Unleash the potential of every team/],
    ["/login", /Log in to Jira/],
    ["/signup", /Start your 14-day trial/],
    ["/legal/privacy", /Privacy policy/],
    ["/support", /How can we help/],
    ["/try", /Get started with Jira/],
    ["/nope", /Page not found/],
  ] as const)("renders %s", (path, heading) => {
    renderPath(path);
    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
  });

  it("sends anonymous /jira to login", () => {
    renderPath("/jira");
    expect(screen.getByRole("heading", { name: /Log in to Jira/ })).toBeInTheDocument();
  });

  it("opens the board when a session exists", () => {
    writeSession(USER);
    renderPath("/jira");
    expect(screen.getByText("PORTAL-142")).toBeInTheDocument();
    expect(screen.getByLabelText("Search work items")).toBeInTheDocument();
  });
});
