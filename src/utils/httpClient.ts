
import { security } from './security';

interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL = '') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    const fullUrl = `${this.baseURL}${url}`;
    const headers = { ...this.defaultHeaders, ...config.headers };

    // Sanitize request data
    const sanitizedData = data ? security.sanitizeSensitiveData(data) : undefined;

    const options: RequestInit = {
      method,
      headers,
      body: sanitizedData ? JSON.stringify(sanitizedData) : undefined,
    };

    try {
      const response = await fetch(fullUrl, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return security.sanitizeSensitiveData(result);
    } catch (error) {
      throw new Error(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }
}

export const httpClient = new HttpClient();
