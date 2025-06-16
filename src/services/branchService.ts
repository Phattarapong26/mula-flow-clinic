
import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  status: 'active' | 'inactive';
  openingHours: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
  services: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BranchCreateInput {
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  openingHours: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
  services: string[];
}

class BranchService {
  async getBranches(params?: {
    search?: string;
    status?: Branch['status'];
    page?: number;
    limit?: number;
  }): Promise<{ data: Branch[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: Branch[]; total: number }>(`/api/branches?${queryParams.toString()}`);
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลสาขาได้');
      throw error;
    }
  }

  async getBranchById(id: string): Promise<Branch> {
    try {
      const response = await httpClient.get<Branch>(`/api/branches/${id}`);
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('ไม่สามารถโหลดรายละเอียดสาขาได้');
      throw error;
    }
  }

  async createBranch(data: BranchCreateInput): Promise<Branch> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        name: DOMPurify.sanitize(data.name),
        address: DOMPurify.sanitize(data.address),
        phone: DOMPurify.sanitize(data.phone),
        email: DOMPurify.sanitize(data.email),
        manager: DOMPurify.sanitize(data.manager)
      };

      const response = await httpClient.post<Branch>('/api/branches', sanitizedData);
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('ไม่สามารถสร้างสาขาได้');
      throw error;
    }
  }

  async updateBranch(id: string, data: Partial<BranchCreateInput>): Promise<Branch> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<BranchCreateInput> = {};

      if (data.name) sanitizedData.name = DOMPurify.sanitize(data.name);
      if (data.address) sanitizedData.address = DOMPurify.sanitize(data.address);
      if (data.phone) sanitizedData.phone = DOMPurify.sanitize(data.phone);
      if (data.email) sanitizedData.email = DOMPurify.sanitize(data.email);
      if (data.manager) sanitizedData.manager = DOMPurify.sanitize(data.manager);
      if (data.openingHours) sanitizedData.openingHours = data.openingHours;
      if (data.services) sanitizedData.services = data.services;

      const response = await httpClient.put<Branch>(`/api/branches/${id}`, sanitizedData);
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('ไม่สามารถอัปเดตสาขาได้');
      throw error;
    }
  }

  async deleteBranch(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/branches/${id}`);
      toast.success('ลบสาขาเรียบร้อยแล้ว');
    } catch (error) {
      toast.error('ไม่สามารถลบสาขาได้');
      throw error;
    }
  }

  async updateBranchStatus(id: string, status: Branch['status']): Promise<Branch> {
    try {
      const response = await httpClient.patch<Branch>(`/api/branches/${id}/status`, { status });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('ไม่สามารถอัปเดตสถานะสาขาได้');
      throw error;
    }
  }

  async getActiveBranches(): Promise<Branch[]> {
    try {
      const response = await httpClient.get<Branch[]>('/api/branches/active');
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('ไม่สามารถโหลดสาขาที่เปิดใช้งานได้');
      throw error;
    }
  }
}

export const branchService = new BranchService();
