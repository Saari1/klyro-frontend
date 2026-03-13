import React from "react";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

// ✅ Correct MSAL config import — this is the ONLY correct path
import { msalConfig } from "./auth/msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <div>
        <h1>Klyro Frontend</h1>
        <p>MSAL Authentication is now configured correctly.</p>
      </div>
    </MsalProvider>
  );
}

export default App;
