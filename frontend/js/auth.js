import jwtDecode from "https://cdn.skypack.dev/jwt-decode";

let authState = {
  isAuthenticated: false,
  user: null,
};

export const BACKEND_ORIGIN = "https://simple-pos-api.onrender.com";
// FRONTEND_ORIGIN = "https://simple-pos-api.netlify.app";

function openGoogleAuthPopup() {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const popup = window.open(
    `${BACKEND_ORIGIN}/auth/google`,
    "Google Auth",
    `width=${width},height=${height},left=${left},top=${top}`
  );

  // Immediately check if the pop-up failed to open
  if (!popup || popup.closed || typeof popup.closed === "undefined") {
    window.location.href = `${BACKEND_ORIGIN}/auth/google`;
    return;
  }

  // Listen for message from popup
  window.addEventListener("message", (event) => {
    console.log("PostMessage received:", event.origin, event.data);

    // Accept only messages from the backend URL stated above
    if (event.origin !== BACKEND_ORIGIN) return;

    if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
      const { token } = event.data;
      if (token) localStorage.setItem("token", token); // Store JWT

      let decoded = null;

      try {
        // Decode JWT to extract user info
        decoded = jwtDecode(token);
        console.log("Decoded User Info: ", decoded);
      } catch (err) {
        console.error("JWT decode failed", err);
      }

      authState.isAuthenticated = true;
      authState.user = decoded;

      // Force refresh the page to reinitialize UI and session state; add 100ms to allow popup to close cleanly
      setTimeout(() => {
        window.location.reload();
      }, 100);

      try {
        popup.close();
      } catch (err) {
        console.warn("Popup cannot be closed:", err);
      }
    }
  });
}

async function checkAuthStatus() {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch(`${BACKEND_ORIGIN}/auth/status`, {
      method: "GET",
      headers,
      credentials: "include",
      mode: "cors",
    });

    const data = await response.json();
    authState.isAuthenticated = data.authenticated;
    authState.user = data.user;

    console.log("Auth State:", authState);
    console.log("Cookie in document.cookie:", document.cookie);

    updateAuthUI();
  } catch (error) {
    console.error("Error checking auth status:", error);
  }
}

function updateAuthUI() {
  const loginButton = document.getElementById("loginButton");
  const userInfo = document.getElementById("userInfo");
  const logoutButton = document.getElementById("logoutButton");
  const appMessage = document.getElementById("appMessage");
  const productForm = document.getElementById("productForm");

  productForm.style.display = "none";

  if (authState.isAuthenticated) {
    if (loginButton) loginButton.style.display = "none";
    if (userInfo) {
      userInfo.style.display = "block";
      userInfo.textContent = `Welcome, ${authState.user.displayName}`;
      console.log("userInfo:", userInfo.textContent);
    }
    if (logoutButton) logoutButton.style.display = "block";
    if (appMessage) appMessage.textContent = "Ready for testing";
    productForm.style.display = "flex";
  } else {
    if (loginButton) loginButton.style.display = "block";
    if (userInfo) userInfo.style.display = "none";
    if (logoutButton) logoutButton.style.display = "none";
    if (appMessage)
      appMessage.textContent =
        "Please sign in with Google to access this feature.";
    productForm.style.display = "none";
  }
}

async function handleLogout() {
  try {
    await fetch(`${BACKEND_ORIGIN}/logout`, {
      credentials: "include",
      mode: "cors",
    });

    localStorage.removeItem("token"); // Ensure this is removed from client storage to avoid misuse or attacks; However I removed this line as it messes up the UI by hiding the logout button and productForm

    authState.isAuthenticated = false;
    authState.user = null;
    console.log("Logged out successfully, auth state reset.");
    // Force refresh the page to reinitialize UI and session state
    window.location.reload();

    updateAuthUI();
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");

  if (loginButton) {
    loginButton.addEventListener("click", openGoogleAuthPopup);
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  checkAuthStatus();
});
