import { API_BASE_URL } from "../constants/endpoints";

export async function request(endpoint, options = {}) {
  const {
    method = "GET",
    headers: customHeaders = {},
    data,
    ...restOptions
  } = options;

  const headers = {
    "Content-Type": "application/json",
    ...(customHeaders || {}),
  };
  
  const config = {
    method,
    headers,
    ...restOptions,
    ...(data !== undefined && { body: JSON.stringify(data) }),
  };

  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, config);

  const text = await response.text();
  const parsedData = text ? JSON.parse(text) : text;

  if (!response.ok) {
    const error = new Error(
      parsedData?.message || `Request failed with status ${response.status}`,
    );
    error.status = response.status;
    error.data = parsedData;
    throw error;
  }

  // COMMENT LATER
  console.log(`=========== FETCH RESPONSE ===========`);
  console.log(parsedData);

  return parsedData;
}

export const api = {
  get: (endpoint, options = {}) =>
    request(endpoint, { method: "GET", ...(options || {}) }),

  post: (endpoint, data, options = {}) =>
    request(endpoint, { method: "POST", data, ...(options || {}) }),

  put: (endpoint, data, options = {}) =>
    request(endpoint, { method: "PUT", data, ...(options || {}) }),

  patch: (endpoint, data, options = {}) =>
    request(endpoint, { method: "PATCH", data, ...(options || {}) }),

  remove: (endpoint, options = {}) =>
    request(endpoint, { method: "DELETE", ...(options || {}) }),
};
