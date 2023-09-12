import { LogLevel } from "@azure/msal-browser";
import type { Configuration, RedirectRequest } from "@azure/msal-browser";

const instance = import.meta.env.MAINSITE_B2C_INSTANCE;
const domain = import.meta.env.MAINSITE_B2C_DOMAIN;
const signUpSignInPolicy = import.meta.env.MAINSITE_B2C_SIGNUP_SIGNIN_POLICY;
const passwordResetPolicy = import.meta.env.MAINSITE_B2C_PASSWORD_RESET_POLICY;
const clientId = import.meta.env.MAINSITE_B2C_CLIENT_ID;
const apiScope = import.meta.env.MAINSITE_B2C_API_SCOPE;

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
const b2cPolicies = {
  names: {
    signUpSignIn: signUpSignInPolicy,
    passwordReset: passwordResetPolicy,
  },
  authorities: {
    signUpSignIn: {
      authority: `${instance}/${signUpSignInPolicy}`,
    },
    passwordReset: {
      authority: `${instance}/${passwordResetPolicy}`,
    },
  },
  //   authorityDomain: "msidlabb2c.b2clogin.com",
  authorityDomain: domain,
} as const;

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [import.meta.env.MAINSITE_B2C_DOMAIN],
    redirectUri: "/callbacks",
    postLogoutRedirectUri: "https://www.westminster.gov.uk/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
        }
      },
    },
  },
};

export const loginRequest: RedirectRequest = {
  prompt: "login",
  authority: b2cPolicies.authorities.signUpSignIn.authority,
  scopes: [apiScope],
};
