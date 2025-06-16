import axios from 'axios';
import DOMPurify from 'dompurify';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    // Sanitize response data
    if (typeof response.data === 'string') {
      response.data = DOMPurify.sanitize(response.data);
    } else if (typeof response.data === 'object') {
      sanitizeObject(response.data);
    }
    return response;
  },
  (error) => {
    // Handle errors without exposing sensitive information
    const errorMessage = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(DOMPurify.sanitize(errorMessage)));
  }
);

// Helper function to sanitize objects recursively
function sanitizeObject(obj: any) {
  if (!obj || typeof obj !== 'object') return;
  
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string') {
      obj[key] = DOMPurify.sanitize(obj[key]);
    } else if (typeof obj[key] === 'object') {
      sanitizeObject(obj[key]);
    }
  });
}

// Generic API methods
export const apiService = {
  get: async <T>(url: string, params?: any) => {
    try {
      const response = await api.get<T>(url, { params });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  post: async <T>(url: string, data: any) => {
    try {
      const response = await api.post<T>(url, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  put: async <T>(url: string, data: any) => {
    try {
      const response = await api.put<T>(url, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  delete: async <T>(url: string) => {
    try {
      const response = await api.delete<T>(url);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
};

// Error handling
function handleApiError(error: any) {
  if (error.response) {
    // Server responded with error
    const status = error.response.status;
    const message = error.response.data?.message || 'An error occurred';

    switch (status) {
      case 401:
        // Handle unauthorized
        window.location.href = '/login';
        break;
      case 403:
        // Handle forbidden
        console.error('Access denied');
        break;
      case 404:
        // Handle not found
        console.error('Resource not found');
        break;
      default:
        console.error(`Error ${status}: ${message}`);
    }
  } else if (error.request) {
    // Request made but no response
    console.error('No response from server');
  } else {
    // Request setup error
    console.error('Request error:', error.message);
  }
}

export default apiService; 