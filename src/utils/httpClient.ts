
import { security, sanitizeObject } from './security';
import { getAuthToken, clearAuthToken } from './auth';

interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  requireAuth?: boolean;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  total?: number;
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

  private getAuthHeaders(): Record<string, string> {
    const token = getAuthToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private handleError(error: any): never {
    console.error('API Error:', error);
    
    // Don't expose raw backend errors
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          clearAuthToken();
          throw new Error('กรุณาเข้าสู่ระบบใหม่');
        case 403:
          throw new Error('ไม่มีสิทธิ์เข้าถึงข้อมูล');
        case 404:
          throw new Error('ไม่พบข้อมูลที่ต้องการ');
        case 422:
          throw new Error('ข้อมูลไม่ถูกต้อง');
        case 500:
          throw new Error('เกิดข้อผิดพลาดในระบบ');
        default:
          throw new Error('เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
      }
    }
    
    if (error.request) {
      throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
    
    throw new Error('เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const fullUrl = `${this.baseURL}${url}`;
    let headers = { ...this.defaultHeaders, ...config.headers };

    // Add authentication if required
    if (config.requireAuth !== false) {
      headers = { ...headers, ...this.getAuthHeaders() };
    }

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
        throw { response: { status: response.status } };
      }

      const result = await response.json();
      
      // Sanitize response data
      const sanitizedResult = sanitizeObject(result);
      
      return sanitizedResult;
    } catch (error) {
      this.handleError(error);
    }
  }

  async get<T>(url: string, config?: RequestConfig, params?: any): Promise<ApiResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<T>('GET', `${url}${queryString}`, undefined, config);
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', url, data, config);
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', url, undefined, config);
  }
}

export const httpClient = new HttpClient();
