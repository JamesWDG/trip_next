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

  // DASHBOARD
  STATS: "analytics/counts",
  USER_ONBOARDING: "analytics/users-stats",
  USER_ONBOARDING_EXPORT: (scope = "monthly") =>
    `analytics/users-stats/export?scope=${scope}`,
  REVENUE_SUMMARY: (from, to) => {
    const params = [];
    if (from) params.push(`from=${from}`);
    if (to) params.push(`to=${to}`);
    const qs = params.length ? `?${params.join("&")}` : "";
    return `analytics/revenue-summary${qs}`;
  },
  REVENUE_SUMMARY_EXPORT: (from, to) => {
    const params = [];
    if (from) params.push(`from=${from}`);
    if (to) params.push(`to=${to}`);
    const qs = params.length ? `?${params.join("&")}` : "";
    return `analytics/revenue-summary/export${qs}`;
  },
  REVENUE_BY_TYPE: (from, to) => {
    const params = [];
    if (from) params.push(`from=${from}`);
    if (to) params.push(`to=${to}`);
    const qs = params.length ? `?${params.join("&")}` : "";
    return `analytics/revenue-by-type${qs}`;
  },
  REVENUE_BY_TYPE_EXPORT: (from, to) => {
    const params = [];
    if (from) params.push(`from=${from}`);
    if (to) params.push(`to=${to}`);
    const qs = params.length ? `?${params.join("&")}` : "";
    return `analytics/revenue-by-type/export${qs}`;
  },
  EARNINGS_ANALYTICS: (period = "monthly") =>
    `analytics/earnings?period=${period}`,
  EARNINGS_ANALYTICS_EXPORT: (period = "monthly") =>
    `analytics/earnings/export?period=${period}`,

  // USER
  GET_USERS: (page = 1, limit = 10) => `user/all-users?page=${page}&limit=${limit}`,
  CREATE_USER: "user/create-user",
  DELETE_USER: (id) => `user/delete-user/${id}`,
});
