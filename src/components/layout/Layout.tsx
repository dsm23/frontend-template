import type { FunctionComponent, ReactNode } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Footer } from "../footer";
import { Header } from "../header";
import { Anchor, Toaster } from "..";

type Props = {
  children?: ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children }) => (
  <>
    <Anchor href="#main-content" className="sr-only focus:not-sr-only">
      Skip to main content
    </Anchor>
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main id="main-content">{children ?? <Outlet />}</main>
      <Footer />
    </div>
    <Toaster />
    <ScrollRestoration />
  </>
);

export default Layout;
