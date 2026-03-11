export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.trip-nxt.com/api/v1/";
  
if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.warn(
    "⚠️ NEXT_PUBLIC_API_BASE_URL is not set. Using fallback base URL.",
  );
}

export const ENDPOINTS = Object.freeze({
  // AUTH
  LOGIN: "user/admin/login",
  LOGOUT: "user/logout",

  // USER
  GET_USERS: (page = 1, limit = 10) => `user/all-users?page=${page}&limit=${limit}`,
});
