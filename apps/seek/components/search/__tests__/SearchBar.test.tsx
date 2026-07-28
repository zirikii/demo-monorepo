import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../SearchBar";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    push.mockReset();
  });

  it("renders What and Where labels matching seek.com.au", () => {
    render(<SearchBar variant="hero" />);
    expect(screen.getByText("What")).toBeInTheDocument();
    expect(screen.getByText("Where")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /SEEK/i })).toBeInTheDocument();
  });

  it("navigates to /jobs with keywords and location query params", () => {
    render(<SearchBar />);
    fireEvent.change(screen.getByLabelText(/What/i), { target: { value: "Nurse" } });
    fireEvent.change(screen.getByLabelText(/Where/i), { target: { value: "Melbourne VIC" } });
    fireEvent.submit(screen.getByRole("search"));
    expect(push).toHaveBeenCalledWith(
      "/jobs?keywords=Nurse&location=Melbourne+VIC",
    );
  });
});
