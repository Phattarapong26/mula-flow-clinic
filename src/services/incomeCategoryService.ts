import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface IncomeCategory {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  color?: string;
  icon?: string;
  parentId?: string;
  parentName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IncomeCategoryCreateInput {
  name: string;
  description?: string;
  isActive: boolean;
  color?: string;
  icon?: string;
  parentId?: string;
}

class IncomeCategoryService {
  async getIncomeCategories(params?: {
    search?: string;
    isActive?: boolean;
    parentId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: IncomeCategory[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
      if (params?.parentId) queryParams.append('parentId', params.parentId);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: IncomeCategory[]; total: number }>(`/api/income-categories?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load income categories');
      throw error;
    }
  }

  async getIncomeCategoryById(id: string): Promise<IncomeCategory> {
    try {
      const response = await httpClient.get<IncomeCategory>(`/api/income-categories/${id}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load income category details');
      throw error;
    }
  }

  async createIncomeCategory(data: IncomeCategoryCreateInput): Promise<IncomeCategory> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        name: DOMPurify.sanitize(data.name),
        description: data.description ? DOMPurify.sanitize(data.description) : undefined,
        color: data.color ? DOMPurify.sanitize(data.color) : undefined,
        icon: data.icon ? DOMPurify.sanitize(data.icon) : undefined
      };

      const response = await httpClient.post<IncomeCategory>('/api/income-categories', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to create income category');
      throw error;
    }
  }

  async updateIncomeCategory(id: string, data: Partial<IncomeCategoryCreateInput>): Promise<IncomeCategory> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<IncomeCategoryCreateInput> = {};

      // Handle string fields
      if (data.name) sanitizedData.name = DOMPurify.sanitize(data.name);
      if (data.description) sanitizedData.description = DOMPurify.sanitize(data.description);
      if (data.color) sanitizedData.color = DOMPurify.sanitize(data.color);
      if (data.icon) sanitizedData.icon = DOMPurify.sanitize(data.icon);

      // Handle boolean fields
      if (data.isActive !== undefined) sanitizedData.isActive = data.isActive;

      // Handle parent ID
      if (data.parentId) sanitizedData.parentId = data.parentId;

      const response = await httpClient.put<IncomeCategory>(`/api/income-categories/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update income category');
      throw error;
    }
  }

  async deleteIncomeCategory(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/income-categories/${id}`, { requireAuth: true });
      toast.success('Income category deleted successfully');
    } catch (error) {
      toast.error('Failed to delete income category');
      throw error;
    }
  }

  async updateIncomeCategoryStatus(id: string, isActive: boolean): Promise<IncomeCategory> {
    try {
      const response = await httpClient.patch<IncomeCategory>(`/api/income-categories/${id}/status`, { isActive }, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update income category status');
      throw error;
    }
  }

  async getActiveIncomeCategories(): Promise<IncomeCategory[]> {
    try {
      const response = await httpClient.get<IncomeCategory[]>('/api/income-categories/active', { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load active income categories');
      throw error;
    }
  }

  async getIncomeCategoryTree(): Promise<IncomeCategory[]> {
    try {
      const response = await httpClient.get<IncomeCategory[]>('/api/income-categories/tree', { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load income category tree');
      throw error;
    }
  }

  async getSubCategories(parentId: string): Promise<IncomeCategory[]> {
    try {
      const response = await httpClient.get<IncomeCategory[]>(`/api/income-categories/${parentId}/subcategories`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load subcategories');
      throw error;
    }
  }
}

export const incomeCategoryService = new IncomeCategoryService(); 