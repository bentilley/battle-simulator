import React from "react";
import App from "../App";

import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";

afterEach(cleanup);

describe("<App />", () => {
  it("renders correctly", () => {
    const { getByText } = render(<App />);

    expect(getByText("BATTLE SIMULATOR")).toBeTruthy();
  });

  it("performs an attack correctly", async () => {
    const app = render(<App />);

    const attackButton = app.getByText("ATTACK!");
    fireEvent.click(attackButton);

    await waitFor(() => app.getByTestId("combat-result"));
  });
});
