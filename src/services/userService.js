import { api } from "./api";
import { ENDPOINTS } from "../constants/endpoints";
import { attachToken } from "./authService";

// =================== DASHBOARD APIs ===================
/**
 * GET /analytics/users-stats
 * Get user onboarding stats (weekly, monthly, yearly)
 */
export async function getUserOnboarding() {
  const response = await api.get(ENDPOINTS.USER_ONBOARDING, {
    headers: attachToken(),
  });

  return response.data;
}

/**
 * GET /analytics/counts
 * Get dashboard statistics (total users, accommodation owners, restaurant owners, car owners)
 */
export async function getStats() {
  const response = await api.get(ENDPOINTS.STATS, {
    headers: attachToken(),
  });

  return response.data;
}

// =================== USERS APIs ===================
/**
 * GET /users?search=
 * Fetch a list of users with optional search query.
 */
export async function fetchUsers() {
  return await api.get();
}

/**
 * GET /users
 * Get all users.
 */
export async function getUsers(page = 1, limit = 10, role = "") {
  const roleParam = role ? `&role=${role}` : "";
  const response = await api.get(ENDPOINTS.GET_USERS(page, limit) + roleParam, {
    headers: attachToken(),
  });

  return response.data;
}

/**
 * GET /user/:id
 * Get a single user by their ID.
 */
export async function getUserById() {
  return await api.get();
}

/**
 * POST /user/create
 * Create a new user.
 */
export async function createUser(payload) {
  const response = await api.post(ENDPOINTS.CREATE_USER, payload, {
    headers: attachToken(),
  });

  return response;
}

/**
 * PUT /user/:id
 * Update an existing user's data by ID.
 */
export async function updateUser() {
  return await api.put();
}

/**
 * DELETE /user/:id
 * Delete a user by ID.
 */
export async function deleteUser(id) {
  return await api.remove(ENDPOINTS.DELETE_USER(id), {
    headers: attachToken(),
  });
}
