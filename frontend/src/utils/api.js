// Centralized API utility for making requests to the backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Make an authenticated API request
 * @param {string} endpoint - The API endpoint (e.g., '/api/auth/me')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<Response>} - The fetch response
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  // Get token from localStorage
  const token = localStorage.getItem('esac_token');

  // Merge headers with Authorization if token exists
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  // For FormData, let the browser set Content-Type automatically
  if (config.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  try {
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

/**
 * Convenience method for GET requests
 */
export function apiGet(endpoint, options = {}) {
  return apiRequest(endpoint, { ...options, method: 'GET' });
}

/**
 * Convenience method for POST requests
 */
export function apiPost(endpoint, data, options = {}) {
  return apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Convenience method for PUT requests
 */
export function apiPut(endpoint, data, options = {}) {
  return apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Convenience method for DELETE requests
 */
export function apiDelete(endpoint, options = {}) {
  return apiRequest(endpoint, { ...options, method: 'DELETE' });
}

/**
 * Convenience method for PUT requests with FormData (for file uploads)
 */
export function apiPutFormData(endpoint, formData, options = {}) {
  return apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: formData,
  });
}

export default { apiRequest, apiGet, apiPost, apiPut, apiDelete, apiPutFormData };
