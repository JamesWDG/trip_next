import { api } from "./api";
import { attachToken } from "./authService";
import { ENDPOINTS } from "../constants/endpoints";

function unwrapList(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
}

/** @returns {Promise<any[]>} */
export async function getFoodPromos() {
  const response = await api.get(ENDPOINTS.FOOD_PROMOS, {
    headers: attachToken(),
  });
  return unwrapList(response?.data ?? response);
}

/** @returns {Promise<any>} */
export async function createFoodPromo(payload) {
  const response = await api.post(ENDPOINTS.FOOD_PROMOS, payload, {
    headers: attachToken(),
  });
  return response?.data;
}

/** @returns {Promise<any>} */
export async function updateFoodPromo(id, payload) {
  const response = await api.put(ENDPOINTS.FOOD_PROMO_BY_ID(id), payload, {
    headers: attachToken(),
  });
  return response?.data;
}

/** @returns {Promise<any>} */
export async function deleteFoodPromo(id) {
  const response = await api.remove(ENDPOINTS.FOOD_PROMO_BY_ID(id), {
    headers: attachToken(),
  });
  return response?.data;
}
