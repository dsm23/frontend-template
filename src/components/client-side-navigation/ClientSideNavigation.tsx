import { useEffect, useState } from "react";
import type { FunctionComponent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { PublicClientApplication } from "@azure/msal-browser";
import { CustomNavigationClient } from "../../utils/CustomNavigationClient";

type Props = {
  pca: PublicClientApplication;
  children: ReactNode;
};

const ClientSideNavigation: FunctionComponent<Props> = ({ pca, children }) => {
  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  pca.setNavigationClient(navigationClient);

  // react-router-dom v6 doesn't allow navigation on the first render - delay rendering of MsalProvider to get around this limitation
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  }, []);

  if (firstRender) {
    return null;
  }

  return <>{children}</>;
};

export { ClientSideNavigation };
