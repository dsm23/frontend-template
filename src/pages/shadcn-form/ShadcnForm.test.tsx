import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render } from "~/test-utils";
import ShadcnForm from "./ShadcnForm";

const routes = [
  {
    path: "/",
    element: <ShadcnForm />,
  },
];

test("ShadcnForm renders", () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  expect(screen).toBeTruthy();
});
