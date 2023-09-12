import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render } from "~/test-utils";
import Home from "./Home";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
];

test("Home renders", () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  expect(screen).toBeTruthy();
});
