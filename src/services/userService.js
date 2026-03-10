import { api } from "./api";
import { getAuthHeader } from "./authService";

function withAuth(options = {}) {
  const headers = {
    ...(options.headers || {}),
    ...getAuthHeader()
  };

  return { ...options, headers };
}

export async function fetchCurrentUser() {
  return api.get("/users/me", withAuth());
}

export async function fetchUsers(params) {
  const searchParams = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  return api.get(`/users${searchParams}`, withAuth());
}

export async function updateUser(userId, payload) {
  return api.put(`/users/${userId}`, payload, withAuth());
}
