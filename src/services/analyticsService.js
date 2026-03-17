import { API_BASE_URL, ENDPOINTS } from "../constants/endpoints";
import { api } from "./api";
import { attachToken } from "./authService";

// JSON helpers
export async function getRevenueSummary(from, to) {
  const response = await api.get(ENDPOINTS.REVENUE_SUMMARY(from, to), {
    headers: attachToken(),
  });
  return response.data;
}

export async function getRevenueByType(from, to) {
  const response = await api.get(ENDPOINTS.REVENUE_BY_TYPE(from, to), {
    headers: attachToken(),
  });
  return response.data;
}

export async function getAdminEarnings(period = "monthly") {
  const response = await api.get(ENDPOINTS.EARNINGS_ANALYTICS(period), {
    headers: attachToken(),
  });
  return response.data;
}

// CSV download helpers (use window.open for file download)
function buildAuthHeaders() {
  const tokenHeaders = attachToken();
  const headers = new Headers();
  Object.entries(tokenHeaders || {}).forEach(([k, v]) => {
    if (v) headers.append(k, v);
  });
  return headers;
}

async function downloadCsv(relativeUrl) {
  const url = `${API_BASE_URL}${relativeUrl}`;
  const headers = buildAuthHeaders();
  const res = await fetch(url, {
    method: "GET",
    headers,
  });
  if (!res.ok) {
    const text = await res.text();
    let message = `Download failed with status ${res.status}`;
    try {
      const parsed = text ? JSON.parse(text) : null;
      if (parsed?.message) message = parsed.message;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }
  const blob = await res.blob();
  const disposition = res.headers.get("Content-Disposition") || "";
  const match = disposition.match(/filename="(.+?)"/);
  const filename = match ? match[1] : "download.csv";
  const link = document.createElement("a");
  const href = window.URL.createObjectURL(blob);
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(href);
}

export function downloadRevenueSummaryCsv(from, to) {
  return downloadCsv(ENDPOINTS.REVENUE_SUMMARY_EXPORT(from, to));
}

export function downloadRevenueByTypeCsv(from, to) {
  return downloadCsv(ENDPOINTS.REVENUE_BY_TYPE_EXPORT(from, to));
}

export function downloadAdminEarningsCsv(period = "monthly") {
  return downloadCsv(ENDPOINTS.EARNINGS_ANALYTICS_EXPORT(period));
}

export function downloadUserOnboardingCsv(scope = "monthly") {
  return downloadCsv(ENDPOINTS.USER_ONBOARDING_EXPORT(scope));
}

