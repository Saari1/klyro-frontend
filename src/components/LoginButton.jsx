import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../msalConfig";

export default function LoginButton() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <button onClick={handleLogin}>
      Sign In
    </button>
  );
}