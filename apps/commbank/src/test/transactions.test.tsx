import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AccountDetailPage } from "@/pages/netbank/AccountsPages";

describe("transaction filtering", () => {
  it("filters an account by merchant text", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/netbank/accounts/smart-access"]}>
        <Routes>
          <Route path="/netbank/accounts/:id" element={<AccountDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getAllByText("Woolworths Town Hall").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Coles Broadway").length).toBeGreaterThan(0);

    await user.type(screen.getByPlaceholderText("Search merchant or reference"), "Woolworths");

    expect(screen.getAllByText("Woolworths Town Hall").length).toBeGreaterThan(0);
    expect(screen.queryByText("Coles Broadway")).not.toBeInTheDocument();
    expect(screen.getByText(/transactions/)).toBeInTheDocument();
  });
});
