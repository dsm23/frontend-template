import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { render } from "~/test-utils";
import { ClientSideNavigation } from "./ClientSideNavigation";

export const pca = new PublicClientApplication({
  auth: {
    clientId: "",
  },
});

const routes = [
  {
    path: "/",
    element: <ClientSideNavigation pca={pca}>{null}</ClientSideNavigation>,
  },
];

test("ClientSideNavigation renders", () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  expect(screen).toBeTruthy();
});
