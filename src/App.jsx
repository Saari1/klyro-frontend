import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./msalConfig";
import { getUserProfile } from "./services/graph";

import HeaderBar from "./components/HeaderBar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import AdminTools from "./screens/AdminTools";
import Settings from "./screens/Settings";

import "./theme/global.css";


// ---------------------------------------------------------
// STEP 3: Login Screen
// ---------------------------------------------------------
function LoginScreen() {
  const { instance } = useMsal();

  const login = () => instance.loginRedirect(loginRequest);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Klyro Frontend SPA</h1>
      <p>Please sign in to continue.</p>

      <button
        onClick={login}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Sign In
      </button>
    </div>
  );
}


// ---------------------------------------------------------
// Layout that wraps the authenticated part of the app
// ---------------------------------------------------------
function AppLayout({ children, user }) {
  return (
    <div className="klyro-app">
      <HeaderBar username={user.name} />

      <div className="klyro-main">
        <Sidebar role={user.role} />

        <div className="klyro-content">
          {children}
        </div>
      </div>
    </div>
  );
}


// ---------------------------------------------------------
// MAIN APPLICATION COMPONENT
// ---------------------------------------------------------
export default function App() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  const [userProfile, setUserProfile] = React.useState(null);

  // -------------------------------------------------------
  // STEP 4: Fetch real Microsoft Graph profile
  // -------------------------------------------------------
  React.useEffect(() => {
    if (isAuthenticated && accounts.length > 0) {
      getUserProfile(instance, accounts[0], ["User.Read"])
        .then((data) => {
          // STEP 5: Extract real Azure AD roles from token
          const roles =
            accounts[0]?.idTokenClaims?.roles || ["Participant"];

          setUserProfile({
            name: data.displayName,
            email: data.mail || data.userPrincipalName,
            roles: roles
          });
        })
        .catch((err) => console.error("Graph error:", err));
    }
  }, [isAuthenticated, accounts, instance]);


  // -------------------------------------------------------
  // 1. Not authenticated → show login screen
  // -------------------------------------------------------
  if (!isAuthenticated) {
    return <LoginScreen />;
  }


  // -------------------------------------------------------
  // 2. Authenticated but profile isn’t loaded yet
  // -------------------------------------------------------
  if (!userProfile) {
    return (
      <div style={{ padding: 20 }}>
        Loading profile...
      </div>
    );
  }


  // -------------------------------------------------------
  // STEP 5: Role helpers
  // -------------------------------------------------------
  const hasAdmin = userProfile.roles.includes("Admin");
  const hasSuperAdmin = userProfile.roles.includes("SuperAdmin");

  // Sidebar still expects "role", so pass the primary role:
  const primaryRole = userProfile.roles[0] || "Participant";


  // -------------------------------------------------------
  // 3. Fully authenticated → Render Klyro interface
  // -------------------------------------------------------
  return (
    <AppLayout user={{ name: userProfile.name, role: primaryRole }}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile user={userProfile} />} />
        <Route path="/settings" element={<Settings />} />

        {(hasAdmin || hasSuperAdmin) && (
          <Route path="/admin-tools" element={<AdminTools />} />
        )}

        {/* Example of a SuperAdmin-only route */}
        {hasSuperAdmin && (
          <Route
            path="/sys-root"
            element={<h1>SuperAdmin Control Panel</h1>}
          />
        )}
      </Routes>
    </AppLayout>
  );
}