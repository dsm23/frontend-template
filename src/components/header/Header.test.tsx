import { expect, test } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "~/test-utils";
import Header from "./Header";

test("Header renders", () => {
  render(<Header />);

  expect(screen.getByLabelText(/Primary/i)).toBeTruthy();
});

test("Header, toggle", () => {
  render(<Header />);

  const button = screen.getByText(/Menu/i);

  expect(screen.getByText(/Residents/i)).toBeTruthy();
  expect(screen.getByText(/Businesses/i)).toBeTruthy();
  expect(screen.getByText(/MyWestminster accounts/i)).toBeTruthy();

  fireEvent.click(button);

  expect(screen.getAllByText(/Residents/i)).toHaveLength(2);
  expect(screen.getAllByText(/Businesses/i)).toHaveLength(2);
  expect(screen.getAllByText(/MyWestminster accounts/i)).toHaveLength(2);

  fireEvent.click(button);

  expect(screen.getAllByText(/Residents/i)).toHaveLength(1);
  expect(screen.getAllByText(/Businesses/i)).toHaveLength(1);
  expect(screen.getAllByText(/MyWestminster accounts/i)).toHaveLength(1);
});
