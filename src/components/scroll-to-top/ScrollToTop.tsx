import { useEffect } from "react";
import type { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: FunctionComponent = () => {
  const { pathname } = useLocation();

  const html = document.querySelector("html") as HTMLHtmlElement;

  useEffect(() => {
    html.style.scrollBehavior = "auto";

    document.documentElement.scrollTo(0, 0);

    html.style.scrollBehavior = "smooth";
  }, [pathname]);

  return null;
};

export default ScrollToTop;
