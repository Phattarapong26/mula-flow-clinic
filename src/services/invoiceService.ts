import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  branchId: string;
  branchName: string;
  totalAmount: number;
  vatAmount: number;
  isVatIncluded: boolean;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  paymentMethodId: string;
  paymentMethodName: string;
  externalRef?: string;
  incomeCategory: string;
  items: InvoiceItem[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface InvoiceCreateInput {
  patientId: string;
  branchId: string;
  totalAmount: number;
  vatAmount: number;
  isVatIncluded: boolean;
  paymentMethodId: string;
  externalRef?: string;
  incomeCategory: string;
  items: Omit<InvoiceItem, 'id'>[];
}

class InvoiceService {
  async getInvoices(params?: {
    search?: string;
    paymentStatus?: Invoice['paymentStatus'];
    branchId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Invoice[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.paymentStatus) queryParams.append('paymentStatus', params.paymentStatus);
      if (params?.branchId) queryParams.append('branchId', params.branchId);
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: Invoice[]; total: number }>(`/api/invoices?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load invoices');
      throw error;
    }
  }

  async getInvoiceById(id: string): Promise<Invoice> {
    try {
      const response = await httpClient.get<Invoice>(`/api/invoices/${id}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load invoice details');
      throw error;
    }
  }

  async createInvoice(data: InvoiceCreateInput): Promise<Invoice> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        externalRef: data.externalRef ? DOMPurify.sanitize(data.externalRef) : undefined,
        incomeCategory: DOMPurify.sanitize(data.incomeCategory),
        items: data.items.map(item => ({
          ...item,
          serviceName: DOMPurify.sanitize(item.serviceName)
        }))
      };

      const response = await httpClient.post<Invoice>('/api/invoices', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to create invoice');
      throw error;
    }
  }

  async updateInvoice(id: string, data: Partial<InvoiceCreateInput>): Promise<Invoice> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<InvoiceCreateInput> = {};

      // Handle string fields
      if (data.externalRef) sanitizedData.externalRef = DOMPurify.sanitize(data.externalRef);
      if (data.incomeCategory) sanitizedData.incomeCategory = DOMPurify.sanitize(data.incomeCategory);

      // Handle items
      if (data.items) {
        sanitizedData.items = data.items.map(item => ({
          ...item,
          serviceName: DOMPurify.sanitize(item.serviceName)
        }));
      }

      // Handle other fields
      if (data.totalAmount) sanitizedData.totalAmount = data.totalAmount;
      if (data.vatAmount) sanitizedData.vatAmount = data.vatAmount;
      if (data.isVatIncluded !== undefined) sanitizedData.isVatIncluded = data.isVatIncluded;
      if (data.paymentMethodId) sanitizedData.paymentMethodId = data.paymentMethodId;
      if (data.patientId) sanitizedData.patientId = data.patientId;
      if (data.branchId) sanitizedData.branchId = data.branchId;

      const response = await httpClient.put<Invoice>(`/api/invoices/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update invoice');
      throw error;
    }
  }

  async deleteInvoice(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/invoices/${id}`, { requireAuth: true });
      toast.success('Invoice deleted successfully');
    } catch (error) {
      toast.error('Failed to delete invoice');
      throw error;
    }
  }

  async updateInvoiceStatus(id: string, paymentStatus: Invoice['paymentStatus']): Promise<Invoice> {
    try {
      const response = await httpClient.patch<Invoice>(`/api/invoices/${id}/status`, { paymentStatus }, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update invoice status');
      throw error;
    }
  }

  async getInvoicesByPatient(patientId: string): Promise<Invoice[]> {
    try {
      const response = await httpClient.get<Invoice[]>(`/api/invoices/patient/${patientId}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load patient invoices');
      throw error;
    }
  }

  async getInvoicesByBranch(branchId: string): Promise<Invoice[]> {
    try {
      const response = await httpClient.get<Invoice[]>(`/api/invoices/branch/${branchId}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load branch invoices');
      throw error;
    }
  }
}

export const invoiceService = new InvoiceService(); 