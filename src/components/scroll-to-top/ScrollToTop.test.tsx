import { expect, test, vi } from "vitest";
import type { SpyInstance } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import {
  Link,
  Outlet,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { render } from "~/test-utils";
import ScrollToTop from "./ScrollToTop";

const Wrapper = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

const routes = [
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Link to="/result">Click to navigate</Link>,
      },
      {
        path: "result",
        element: <div />,
      },
    ],
  },
];

test("ScrollToTop renders", () => {
  const mockSpy: SpyInstance<[], Pick<HTMLElement, "scrollTo">> = vi.spyOn(
    document,
    "documentElement",
    "get",
  );

  const mockFn = vi.fn();

  mockSpy.mockReturnValue({
    scrollTo: mockFn,
  });

  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  expect(screen).toBeTruthy();
});

test("ScrollToTop side effect works", () => {
  const mockSpy: SpyInstance<[], Pick<HTMLElement, "scrollTo">> = vi.spyOn(
    document,
    "documentElement",
    "get",
  );

  const mockFn = vi.fn();

  mockSpy.mockReturnValue({
    scrollTo: mockFn,
  });

  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  fireEvent.click(screen.getByText(/Click to navigate/i));

  expect(mockFn).toBeCalledTimes(2);
});
