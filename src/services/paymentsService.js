import { api } from "./api";
import { attachToken } from "./authService";
import { ENDPOINTS } from "../constants/endpoints";

/**
 * GET /payments — all rows from Payments (newest first), paginated.
 * @returns {Promise<{ rows: object[], total: number, limit: number, offset: number }>}
 */
export async function getPayments(limit = 50, offset = 0) {
  const response = await api.get(ENDPOINTS.PAYMENTS(limit, offset), {
    headers: attachToken(),
  });
  return response?.data ?? response;
}
