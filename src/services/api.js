const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

if (!API_BASE_URL) {
  // This will show up in the server / browser console to help during setup
  // but it won't break the app at runtime.
  // eslint-disable-next-line no-console
  console.warn("NEXT_PUBLIC_API_BASE_URL is not set. Using fallback base URL.");
}

async function request(endpoint, options = {}) {
  const {
    method = "GET",
    data,
    headers: customHeaders,
    ...restOptions
  } = options;

  const headers = {
    "Content-Type": "application/json",
    ...(customHeaders || {})
  };

  const config = {
    method,
    headers,
    ...restOptions
  };

  if (data !== undefined) {
    config.body = JSON.stringify(data);
  }

  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, config);

  const text = await response.text();
  let parsedBody = null;

  if (text) {
    try {
      parsedBody = JSON.parse(text);
    } catch {
      parsedBody = text;
    }
  }

  if (!response.ok) {
    const error = new Error(
      parsedBody?.message || `Request failed with status ${response.status}`
    );
    error.status = response.status;
    error.body = parsedBody;
    throw error;
  }

  return parsedBody;
}

export const api = {
  get(endpoint, options) {
    return request(endpoint, { ...(options || {}), method: "GET" });
  },
  post(endpoint, data, options) {
    return request(endpoint, { ...(options || {}), method: "POST", data });
  },
  put(endpoint, data, options) {
    return request(endpoint, { ...(options || {}), method: "PUT", data });
  },
  patch(endpoint, data, options) {
    return request(endpoint, { ...(options || {}), method: "PATCH", data });
  },
  delete(endpoint, options) {
    return request(endpoint, { ...(options || {}), method: "DELETE" });
  }
};
