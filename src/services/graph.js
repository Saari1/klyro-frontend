// src/services/graph.js

export async function getUserProfile(instance, account, scopes) {
  const tokenRequest = {
    scopes,
    account
  };

  // Acquire access token
  const response = await instance.acquireTokenSilent(tokenRequest);

  const accessToken = response.accessToken;

  // Call Microsoft Graph
  const graphResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!graphResponse.ok) {
    throw new Error("Failed to fetch profile.");
  }

  return await graphResponse.json();
}