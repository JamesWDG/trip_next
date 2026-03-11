import { api } from "./api";
import { ENDPOINTS } from "../constants/endpoints";
import { attachToken } from "./authService";

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
export async function getUsers(page = 1, limit = 10) {

  const response = await api.get(
    ENDPOINTS.GET_USERS(page, limit),
    { headers: attachToken() }
  );

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
export async function createUser() {
  return await api.post();
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
export async function deleteUser() {
  return await api.remove();
}
