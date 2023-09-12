import { expect, test } from "vitest";
import { createContext, useContext, useEffect, useState } from "react";
import { fireEvent, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { ApiId } from "@azure/msal-browser";
import { render } from "~/test-utils";
import { CustomNavigationClient } from "./CustomNavigationClient";

// unused default
const NavigateClientContext = createContext<CustomNavigationClient>(
  CustomNavigationClient.prototype,
);

const TestComponent = () => {
  const navigate = useNavigate();

  const navigationClient = new CustomNavigationClient(navigate);

  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  }, []);

  if (firstRender) {
    return null;
  }

  return (
    <NavigateClientContext.Provider value={navigationClient}>
      <Outlet />
    </NavigateClientContext.Provider>
  );
};

const Home = () => {
  const navigationClient = useContext(NavigateClientContext);

  const handleClick = (noHistory: boolean) => async () => {
    await navigationClient.navigateInternal("/target", {
      noHistory,
      // satisfy typescript, not important
      apiId: ApiId.handleRedirectPromise,
      timeout: 0,
    });
  };

  return (
    <>
      <button onClick={handleClick(false)}>navigate with no history</button>
      <button onClick={handleClick(true)}>navigate with history</button>
    </>
  );
};

const routes = [
  {
    path: "/",
    element: <TestComponent />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "target",
        element: <div data-testid="target">This is the Target!</div>,
      },
    ],
  },
];

test("CustomNavigationClient, with no history", () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  expect(screen.queryByTestId("target")).not.toBeTruthy();

  fireEvent.click(screen.getByText(/navigate with no history/i));

  expect(screen.getByTestId("target")).toBeTruthy();
});

test("CustomNavigationClient, with history", () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  expect(screen.queryByTestId("target")).not.toBeTruthy();

  fireEvent.click(screen.getByText(/navigate with history/i));

  expect(screen.getByTestId("target")).toBeTruthy();
});
