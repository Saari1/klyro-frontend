import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "cf3afb6e-7043-4a65-bfb3-70b3c05cfebc",
    authority: "https://login.microsoftonline.com/bea8ebd9-d945-4ca9-bb88-3ebbb2350811",
    redirectUri: "https://gray-coast-02848f103.4.azurestaticapps.net/",
    postLogoutRedirectUri: "https://gray-coast-02848f103.4.azurestaticapps.net/"
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: { logLevel: LogLevel.Warning }
  }
};

export const loginRequest = {
  scopes: ["User.Read"]
};