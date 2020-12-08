import React from "react";
import { render } from "@testing-library/react";
import PrimaWebTransactionalApp from "./PrimaWebTransactionalApp";

test("renders learn react link", () => {
  const { getByText } = render(<PrimaWebTransactionalApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
