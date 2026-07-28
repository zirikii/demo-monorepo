import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../SearchBar";

const push = vi.fn();

// Override the global next/navigation mock so we can assert navigation.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn(), refresh: vi.fn(), back: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
  push.mockClear();
});

describe("SearchBar keyword suggestions", () => {
  it("shows type-ahead suggestions as the user types", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByRole("combobox", { name: /enter keywords/i });

    expect(screen.queryByRole("listbox")).toBeNull();
    await user.type(input, "reg");

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("option", { name: /registered nurse/i })).toBeInTheDocument();
  });

  it("navigates to /jobs when a suggestion is clicked", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    await user.type(screen.getByRole("combobox", { name: /enter keywords/i }), "regis");

    await user.click(screen.getByRole("option", { name: /registered nurse/i }));

    expect(push).toHaveBeenCalledWith("/jobs?keywords=Registered+Nurse");
  });

  it("supports keyboard navigation and Enter to select", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByRole("combobox", { name: /enter keywords/i });
    await user.type(input, "regis");

    await user.keyboard("{ArrowDown}");
    const firstOption = screen.getAllByRole("option")[0]!;
    expect(firstOption).toHaveAttribute("aria-selected", "true");
    expect(input).toHaveAttribute("aria-activedescendant", firstOption.id);

    await user.keyboard("{Enter}");
    expect(push).toHaveBeenCalledWith("/jobs?keywords=Registered+Nurse");
  });

  it("moves the active option with repeated ArrowDown across multiple matches", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByRole("combobox", { name: /enter keywords/i });
    // "nurse" matches at least two seeded suggestions (e.g. Registered/Enrolled Nurse).
    await user.type(input, "nurse");
    const options = screen.getAllByRole("option");
    expect(options.length).toBeGreaterThan(1);

    await user.keyboard("{ArrowDown}");
    expect(screen.getAllByRole("option")[0]!).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowDown}");
    expect(screen.getAllByRole("option")[0]!).toHaveAttribute("aria-selected", "false");
    expect(screen.getAllByRole("option")[1]!).toHaveAttribute("aria-selected", "true");
  });

  it("closes the suggestion list on Escape", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByRole("combobox", { name: /enter keywords/i });
    await user.type(input, "reg");
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});
