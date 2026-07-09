import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a react-router link when `to` is provided", () => {
    render(
      <MemoryRouter>
        <Button to="/book-a-call">Book a call</Button>
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: "Book a call" });
    expect(link).toHaveAttribute("href", "/book-a-call");
  });

  it("renders a button element and fires onClick otherwise", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies the dark-surface primary variant classes", () => {
    render(<Button variant="primary-dark">Get started</Button>);
    expect(screen.getByRole("button", { name: "Get started" }).className).toContain("bg-mint");
  });
});
