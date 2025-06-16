import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  status: 'active' | 'inactive';
  branchId: string;
  branchName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCreateInput {
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  branchId: string;
}

class ServiceService {
  async getServices(params?: {
    search?: string;
    status?: Service['status'];
    branchId?: string;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Service[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.branchId) queryParams.append('branchId', params.branchId);
      if (params?.category) queryParams.append('category', params.category);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: Service[]; total: number }>(`/api/services?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load services');
      throw error;
    }
  }

  async getServiceById(id: string): Promise<Service> {
    try {
      const response = await httpClient.get<Service>(`/api/services/${id}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load service details');
      throw error;
    }
  }

  async createService(data: ServiceCreateInput): Promise<Service> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        name: DOMPurify.sanitize(data.name),
        description: DOMPurify.sanitize(data.description),
        category: DOMPurify.sanitize(data.category)
      };

      const response = await httpClient.post<Service>('/api/services', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to create service');
      throw error;
    }
  }

  async updateService(id: string, data: Partial<ServiceCreateInput>): Promise<Service> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<ServiceCreateInput> = {};

      // Handle string fields
      if (data.name) sanitizedData.name = DOMPurify.sanitize(data.name);
      if (data.description) sanitizedData.description = DOMPurify.sanitize(data.description);
      if (data.category) sanitizedData.category = DOMPurify.sanitize(data.category);

      // Handle other fields
      if (data.price) sanitizedData.price = data.price;
      if (data.duration) sanitizedData.duration = data.duration;
      if (data.branchId) sanitizedData.branchId = data.branchId;

      const response = await httpClient.put<Service>(`/api/services/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update service');
      throw error;
    }
  }

  async deleteService(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/services/${id}`, { requireAuth: true });
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error('Failed to delete service');
      throw error;
    }
  }

  async updateServiceStatus(id: string, status: Service['status']): Promise<Service> {
    try {
      const response = await httpClient.patch<Service>(`/api/services/${id}/status`, { status }, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update service status');
      throw error;
    }
  }

  async getServiceCategories(): Promise<string[]> {
    try {
      const response = await httpClient.get<string[]>('/api/services/categories', { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load service categories');
      throw error;
    }
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    try {
      const response = await httpClient.get<Service[]>(`/api/services/category/${encodeURIComponent(category)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load services by category');
      throw error;
    }
  }
}

export const serviceService = new ServiceService(); 