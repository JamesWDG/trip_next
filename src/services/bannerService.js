import { api } from "./api";
import { attachToken } from "./authService";
import { API_BASE_URL, ENDPOINTS } from "../constants/endpoints";

function unwrapList(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
}

/** @returns {Promise<any[]>} */
export async function getBannersAdmin() {
  const response = await api.get(ENDPOINTS.CONTENT_ADMIN_BANNERS, {
    headers: attachToken(),
  });
  return unwrapList(response?.data ?? response);
}

/** @returns {Promise<any>} */
export async function createBanner(payload) {
  const response = await api.post(
    ENDPOINTS.CONTENT_ADMIN_BANNERS,
    payload,
    {
      headers: attachToken(),
    },
  );
  return response?.data ?? response;
}

/** @returns {Promise<any>} */
export async function updateBanner(id, payload) {
  const response = await api.put(
    ENDPOINTS.CONTENT_ADMIN_BANNER_BY_ID(id),
    payload,
    {
      headers: attachToken(),
    },
  );
  return response?.data ?? response;
}

/** @returns {Promise<any>} */
export async function deleteBanner(id) {
  const response = await api.remove(ENDPOINTS.CONTENT_ADMIN_BANNER_BY_ID(id), {
    headers: attachToken(),
  });
  return response?.data ?? response;
}

/**
 * Admin-only multipart upload. Appends field `images` for each file.
 * @param {File[]} files
 * @returns {Promise<string[]>} Public URLs for use as banner imageUrl
 */
export async function uploadBannerImages(files) {
  if (!files?.length) {
    throw new Error("No files selected");
  }
  const formData = new FormData();
  for (const f of files) {
    formData.append("images", f);
  }
  const headers = attachToken({});
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.UPLOAD_ADMIN_BANNERS}`, {
    method: "POST",
    headers,
    body: formData,
  });
  const text = await res.text();
  const parsed = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new Error(
      parsed?.message || `Upload failed with status ${res.status}`,
    );
  }
  const urls = parsed?.data?.urls;
  if (!Array.isArray(urls) || !urls.length) {
    throw new Error("Upload response missing urls");
  }
  return urls;
}
