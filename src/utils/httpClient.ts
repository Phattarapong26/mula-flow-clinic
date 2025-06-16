import { generateCSRFToken, rateLimiter } from './security';
import DOMPurify from 'dompurify';
import { getAuthToken, clearAuthToken, isTokenExpired } from './auth';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  requireAuth?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}

class SecureHttpClient {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  private csrfToken = generateCSRFToken();

  private async makeRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = 30000, // 30 seconds like in api.ts
      requireAuth = true
    } = options;

    // Rate limiting
    const clientId = 'client_' + Date.now();
    if (!rateLimiter.isAllowed(clientId, 10, 60000)) {
      throw new Error('Too many requests. Please try again later.');
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
        ...headers
      };

      if (requireAuth) {
        const token = getAuthToken();
        if (!token || isTokenExpired(token)) {
          clearAuthToken();
          window.location.href = '/login';
          throw new Error('Authentication required or token expired');
        }
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
        signal: controller.signal,
        credentials: 'include',
      };

      if (body && method !== 'GET') {
        const sanitizedBody = this.sanitizeData(body);
        requestOptions.body = JSON.stringify(sanitizedBody);
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, requestOptions);
      clearTimeout(timeoutId);

      // Handle specific error cases
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        switch (response.status) {
          case 401:
            clearAuthToken();
            window.location.href = '/login';
            throw new Error('Authentication required');
          case 403:
            throw new Error('Access forbidden');
          case 429:
            throw new Error('Too many requests');
          default:
            throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }
      }

      let data = await response.json();
      
      // Clear sensitive data from memory for auth endpoints
      if (endpoint.includes('/auth')) {
        setTimeout(() => {
          data = null;
        }, 0);
      }
      
      // Sanitize response data
      const sanitizedData = this.sanitizeData(data);
      
      return {
        success: true,
        data: sanitizedData,
        message: 'Request successful'
      };

    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  private sanitizeData<T>(data: T): T {
    if (typeof data === 'string') {
      return DOMPurify.sanitize(data) as T;
    }
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item)) as T;
    }
    if (data && typeof data === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = this.sanitizeData(value);
      }
      return sanitized as T;
    }
    return data;
  }

  // API Methods
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'POST', body: data });
  }

  async put<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'PUT', body: data });
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'PATCH', body: data });
  }
}

export const httpClient = new SecureHttpClient();
