
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { config } from '@/config/app';
import { security } from './security';
import { getAuthToken } from './auth';

export interface RequestOptions extends AxiosRequestConfig {
  params?: Record<string, any>;
}

class HttpClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = config.api.baseURL;
    this.timeout = config.api.timeout;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    if (config.security.sanitizeResponses) {
      return security.sanitizeResponse(response.data);
    }
    return response.data;
  }

  private handleError(error: any): never {
    if (error.response?.status === 401) {
      throw new Error(config.errors.unauthorized);
    }
    if (error.response?.status >= 500) {
      throw new Error(config.errors.server);
    }
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error(config.errors.network);
    }
    throw new Error(error.response?.data?.message || config.errors.default);
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    try {
      const response = await axios.get<T>(url, {
        baseURL: this.baseURL,
        timeout: this.timeout,
        headers: this.getHeaders(),
        params: options?.params,
        ...options
      });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    try {
      const response = await axios.post<T>(url, data, {
        baseURL: this.baseURL,
        timeout: this.timeout,
        headers: this.getHeaders(),
        ...options
      });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    try {
      const response = await axios.put<T>(url, data, {
        baseURL: this.baseURL,
        timeout: this.timeout,
        headers: this.getHeaders(),
        ...options
      });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    try {
      const response = await axios.delete<T>(url, {
        baseURL: this.baseURL,
        timeout: this.timeout,
        headers: this.getHeaders(),
        ...options
      });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const httpClient = new HttpClient();
