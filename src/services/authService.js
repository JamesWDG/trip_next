import { api } from "./api";
import {
  setStorageItem,
  getStorageItem,
  removeStorageItem,
} from "../utils/storage";
import { ENDPOINTS } from "../constants/endpoints";

// Auth Token Local Storage Key
const TOKEN_KEY = "trip_next_token";

// Attach auth token to headers
export function attachToken(headers = {}) {
  const token = getStorageItem(TOKEN_KEY); // Get Token
  if (token) {
    console.log("Headers updated with the token.");
    return { ...headers, Authorization: `Bearer ${token}` };
  }
  console.log("🚫 No token found. Returning original headers.");
  return headers;
}

// LOGIN
export async function login(credentials) {
  const response = await api.post(ENDPOINTS.LOGIN, credentials);
  
  if (response?.data?.accessToken) setStorageItem(TOKEN_KEY, response.data?.accessToken);

  console.log("✅ Login Successful.");
  return data;
};

// LOGOUT
export async function logout() {
  try {
    
    await api.post(ENDPOINTS.LOGOUT, null, {
      headers: attachToken(),
    });

  } catch (err) {
    console.error("Logout API failed", err);

  } finally {
    removeStorageItem(TOKEN_KEY);
  }
}