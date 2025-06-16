import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  requiresConfirmation: boolean;
  confirmationTimeInMinutes?: number;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethodCreateInput {
  name: string;
  description?: string;
  isActive: boolean;
  requiresConfirmation: boolean;
  confirmationTimeInMinutes?: number;
  icon?: string;
}

class PaymentMethodService {
  async getPaymentMethods(params?: {
    search?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: PaymentMethod[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: PaymentMethod[]; total: number }>(`/api/payment-methods?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load payment methods');
      throw error;
    }
  }

  async getPaymentMethodById(id: string): Promise<PaymentMethod> {
    try {
      const response = await httpClient.get<PaymentMethod>(`/api/payment-methods/${id}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load payment method details');
      throw error;
    }
  }

  async createPaymentMethod(data: PaymentMethodCreateInput): Promise<PaymentMethod> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        name: DOMPurify.sanitize(data.name),
        description: data.description ? DOMPurify.sanitize(data.description) : undefined,
        icon: data.icon ? DOMPurify.sanitize(data.icon) : undefined
      };

      const response = await httpClient.post<PaymentMethod>('/api/payment-methods', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to create payment method');
      throw error;
    }
  }

  async updatePaymentMethod(id: string, data: Partial<PaymentMethodCreateInput>): Promise<PaymentMethod> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<PaymentMethodCreateInput> = {};

      // Handle string fields
      if (data.name) sanitizedData.name = DOMPurify.sanitize(data.name);
      if (data.description) sanitizedData.description = DOMPurify.sanitize(data.description);
      if (data.icon) sanitizedData.icon = DOMPurify.sanitize(data.icon);

      // Handle boolean fields
      if (data.isActive !== undefined) sanitizedData.isActive = data.isActive;
      if (data.requiresConfirmation !== undefined) sanitizedData.requiresConfirmation = data.requiresConfirmation;

      // Handle number fields
      if (data.confirmationTimeInMinutes !== undefined) sanitizedData.confirmationTimeInMinutes = data.confirmationTimeInMinutes;

      const response = await httpClient.put<PaymentMethod>(`/api/payment-methods/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update payment method');
      throw error;
    }
  }

  async deletePaymentMethod(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/payment-methods/${id}`, { requireAuth: true });
      toast.success('Payment method deleted successfully');
    } catch (error) {
      toast.error('Failed to delete payment method');
      throw error;
    }
  }

  async updatePaymentMethodStatus(id: string, isActive: boolean): Promise<PaymentMethod> {
    try {
      const response = await httpClient.patch<PaymentMethod>(`/api/payment-methods/${id}/status`, { isActive }, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update payment method status');
      throw error;
    }
  }

  async getActivePaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const response = await httpClient.get<PaymentMethod[]>('/api/payment-methods/active', { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load active payment methods');
      throw error;
    }
  }
}

export const paymentMethodService = new PaymentMethodService(); 