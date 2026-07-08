import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "../components/ui/Accordion";

const items = [
  { id: "a", title: "First question", body: "First answer body" },
  { id: "b", title: "Second question", body: "Second answer body" },
];

describe("Accordion", () => {
  it("starts collapsed and expands on click", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    expect(screen.queryByText("First answer body")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "First question" }));
    expect(screen.getByText("First answer body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "First question" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("only keeps one panel open at a time", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    await user.click(screen.getByRole("button", { name: "First question" }));
    await user.click(screen.getByRole("button", { name: "Second question" }));

    expect(screen.queryByText("First answer body")).not.toBeInTheDocument();
    expect(screen.getByText("Second answer body")).toBeInTheDocument();
  });

  it("collapses again when the open item is clicked", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const btn = screen.getByRole("button", { name: "First question" });
    await user.click(btn);
    await user.click(btn);
    expect(screen.queryByText("First answer body")).not.toBeInTheDocument();
  });
});
