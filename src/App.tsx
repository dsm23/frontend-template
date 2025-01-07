import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import { Layout } from "./components";
import {
  FormikPage,
  Home,
  Login,
  NotFound,
  ProtectedPage,
  ShadcnForm,
  TanstackPage,
} from "./pages";
import { auth } from "./lib/firebase";

async function loginLoader() {
  await auth.authStateReady();

  if (auth.currentUser != null) {
    return redirect("/");
  }
  return null;
}

async function protectedLoader({ request }: LoaderFunctionArgs) {
  await auth.authStateReady();

  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (auth.currentUser == null) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

const router = createBrowserRouter([
  {
    id: "root",
    element: <Layout />,
    async loader() {
      await auth.authStateReady();

      // Our root route always provides the user, if logged in
      return { user: auth.currentUser };
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: "/formik",
        element: <FormikPage />,
      },
      {
        path: "/shadcn",
        element: <ShadcnForm />,
      },
      {
        path: "/tanstack",
        element: <TanstackPage />,
      },
      {
        path: "/protected-page",
        element: <ProtectedPage />,
        loader: protectedLoader,
        // children: [
        //   {
        //     index: true,
        //     element: <ProtectedPage />,
        //   },
        // ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => (
  <RouterProvider
    router={router}
    fallbackElement={
      <main>
        <h1>loading...</h1>
      </main>
    }
  />
);

export default App;
