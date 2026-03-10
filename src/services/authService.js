import { api } from "./api";

const TOKEN_KEY = "trip_next_token";

export function setAuthToken(token) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

export function getAuthHeader() {
  const token = getAuthToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function login(credentials) {
  // credentials: { email, password } ya jo bhi aapke API ke hisaab se ho
  const data = await api.post("/auth/login", credentials);

  if (data?.token) {
    setAuthToken(data.token);
  }

  return data;
}

export async function logout() {
  try {
    await api.post("/auth/logout", null, { headers: getAuthHeader() });
  } catch {
    // ignore API error on logout
  }

  clearAuthToken();
}
