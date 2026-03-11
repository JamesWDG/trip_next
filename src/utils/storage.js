const isBrowser = typeof window !== "undefined";

/**
 * Save item to localStorage
 */
export function setStorageItem(key, value) {
  if (!isBrowser) return;
  localStorage.setItem(key, value);
}

/**
 * Get item from localStorage
 */
export function getStorageItem(key) {
  if (!isBrowser) return null;
  return localStorage.getItem(key);
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key) {
  if (!isBrowser) return;
  localStorage.removeItem(key);
}
