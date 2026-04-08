import { api } from "./api";
import { attachToken } from "./authService";
import { ENDPOINTS } from "../constants/endpoints";

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
