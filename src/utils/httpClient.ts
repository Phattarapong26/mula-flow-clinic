
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { config } from '@/config/app';
import { security } from './security';
import { getAuthToken, isTokenExpired, clearAuthToken } from './auth';

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
    if (token && !isTokenExpired(token)) {
      headers.Authorization = `Bearer ${token}`;
    } else if (token && isTokenExpired(token)) {
      clearAuthToken();
      window.location.href = '/login';
      throw new Error('Session expired');
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
    // Don't expose raw backend errors
    if (error.response?.status === 401) {
      clearAuthToken();
      window.location.href = '/login';
      throw new Error('ไม่มีสิทธิ์เข้าถึง กรุณาเข้าสู่ระบบใหม่');
    }
    if (error.response?.status === 403) {
      throw new Error('ไม่มีสิทธิ์ในการดำเนินการนี้');
    }
    if (error.response?.status >= 500) {
      throw new Error('เกิดข้อผิดพลาดจากระบบ กรุณาลองใหม่อีกครั้ง');
    }
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('การเชื่อมต่อใช้เวลานานเกินไป');
    }
    
    // Generic error for any other cases
    throw new Error('เกิดข้อผิดพลาดที่ไม่คาดคิด');
  }

  private validatePath(url: string): string {
    return security.validateApiPath(url);
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    try {
      const validatedUrl = this.validatePath(url);
      const response = await axios.get<T>(validatedUrl, {
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
      const validatedUrl = this.validatePath(url);
      const sanitizedData = security.sanitizeSensitiveData(data);
      const response = await axios.post<T>(validatedUrl, sanitizedData, {
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
      const validatedUrl = this.validatePath(url);
      const sanitizedData = security.sanitizeSensitiveData(data);
      const response = await axios.put<T>(validatedUrl, sanitizedData, {
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

  async patch<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    try {
      const validatedUrl = this.validatePath(url);
      const sanitizedData = security.sanitizeSensitiveData(data);
      const response = await axios.patch<T>(validatedUrl, sanitizedData, {
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
      const validatedUrl = this.validatePath(url);
      const response = await axios.delete<T>(validatedUrl, {
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
