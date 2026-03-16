import React from "react";
import { useMsal } from "@azure/msal-react";

function SuperAdminLogin() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup({
      prompt: "select_account",
      scopes: ["User.Read"],
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.superAdminText}>SUPER ADMIN LOGIN</h1>

      {/* Hourglass image */}
      <img src="/hourglass.png" alt="hourglass" style={styles.hourglass} />

      <h2 style={styles.klyroLogo}>KLYRO</h2>

      <button style={styles.button} onClick={handleLogin}>
        <img src="/microsoft-logo.png" alt="ms icon" style={styles.msIcon} />
        Sign in with Microsoft (SuperAdmin Access)
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    textAlign: "center",
    padding: "20px",
  },
  superAdminText: {
    fontSize: "32px",
    color: "#00ffc8",
    fontWeight: "bold",
    letterSpacing: "3px",
    textShadow: "0px 0px 15px rgba(0,255,200,0.8)",
    marginBottom: "20px",
  },
  hourglass: {
    width: "240px",
    height: "auto",
    marginBottom: "20px",
  },
  klyroLogo: {
    fontSize: "48px",
    fontWeight: "900",
    color: "#1a1a1a",
    letterSpacing: "4px",
    marginBottom: "30px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2B2B2B",
    color: "#ffffff",
    padding: "14px 22px",
    borderRadius: "8px",
    border: "1px solid #444",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
    gap: "10px",
  },
  msIcon: {
    width: "22px",
    height: "22px",
  },
};

export default SuperAdminLogin;
