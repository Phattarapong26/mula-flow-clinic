
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

export interface BranchStaff {
  id: string;
  name: string;
  position: string;
  salary: number;
  performance: number;
  branchId: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CreateStaffData {
  name: string;
  position: string;
  salary: number;
  branchId: string;
  email: string;
  phone: string;
}

export interface ExpenseCreate {
  description: string;
  amount: number;
  category: ExpenseCategory;
  paymentMethod: PaymentMethod;
  branchId: string;
  date: string;
}

export type ExpenseCategory = 'rent' | 'utilities' | 'supplies' | 'equipment' | 'marketing' | 'staff' | 'other';
export type PaymentMethod = 'cash' | 'credit' | 'bank_transfer' | 'check';
export type ExpenseStatus = 'pending' | 'approved' | 'paid' | 'rejected';

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

  // New methods for missing functionality
  async getBranchFinances(branchId: string): Promise<{ data: any[] }> {
    try {
      const response = await httpClient.get<any[]>(`/api/branches/${branchId}/finances`);
      return { data: sanitizeObject(response.data) };
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลการเงินได้');
      throw error;
    }
  }

  async getBranchStaff(branchId: string): Promise<{ data: BranchStaff[] }> {
    try {
      const response = await httpClient.get<BranchStaff[]>(`/api/branches/${branchId}/staff`);
      return { data: sanitizeObject(response.data) };
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลพนักงานได้');
      throw error;
    }
  }

  async getBranchExpenses(branchId: string): Promise<{ data: any[] }> {
    try {
      const response = await httpClient.get<any[]>(`/api/branches/${branchId}/expenses`);
      return { data: sanitizeObject(response.data) };
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลค่าใช้จ่ายได้');
      throw error;
    }
  }

  async createExpense(data: ExpenseCreate): Promise<any> {
    try {
      const sanitizedData = {
        ...data,
        description: DOMPurify.sanitize(data.description)
      };
      const response = await httpClient.post<any>('/api/expenses', sanitizedData);
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('ไม่สามารถสร้างรายการค่าใช้จ่ายได้');
      throw error;
    }
  }

  async getBranchProfit(branchId?: string, period?: string): Promise<{ data: any }> {
    try {
      const params = new URLSearchParams();
      if (branchId) params.append('branchId', branchId);
      if (period) params.append('period', period);
      
      const response = await httpClient.get<any>(`/api/branches/profit?${params.toString()}`);
      return { data: sanitizeObject(response.data) };
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลกำไรได้');
      throw error;
    }
  }

  async exportProfitReport(branchId?: string, period?: string): Promise<void> {
    try {
      const params = new URLSearchParams();
      if (branchId) params.append('branchId', branchId);
      if (period) params.append('period', period);
      
      // Simulate export functionality
      toast.success('กำลังส่งออกรายงาน...');
    } catch (error) {
      toast.error('ไม่สามารถส่งออกรายงานได้');
      throw error;
    }
  }

  async getQueueStats(branchId?: string): Promise<{ data: any }> {
    try {
      const params = branchId ? `?branchId=${branchId}` : '';
      const response = await httpClient.get<any>(`/api/branches/queue-stats${params}`);
      return { data: sanitizeObject(response.data) };
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลคิวได้');
      throw error;
    }
  }

  async getBranchAnalysis(branchId: string): Promise<any> {
    try {
      const response = await httpClient.get<any>(`/api/branches/${branchId}/analysis`);
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลวิเคราะห์สาขาได้');
      throw error;
    }
  }

  async getMarketAnalysis(): Promise<any> {
    try {
      const response = await httpClient.get<any>('/api/market/analysis');
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลวิเคราะห์ตลาดได้');
      throw error;
    }
  }

  async getBranchRevenue(params?: any): Promise<{ data: any[] }> {
    try {
      const queryParams = new URLSearchParams(params);
      const response = await httpClient.get<any[]>(`/api/branches/revenue?${queryParams.toString()}`);
      return { data: sanitizeObject(response.data) };
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลรายได้สาขาได้');
      throw error;
    }
  }

  async exportRevenueReport(): Promise<void> {
    try {
      // Simulate export functionality
      toast.success('กำลังส่งออกรายงาน...');
    } catch (error) {
      toast.error('ไม่สามารถส่งออกรายงานได้');
      throw error;
    }
  }

  async createStaff(data: CreateStaffData): Promise<BranchStaff> {
    try {
      const sanitizedData = {
        ...data,
        name: DOMPurify.sanitize(data.name),
        position: DOMPurify.sanitize(data.position),
        email: DOMPurify.sanitize(data.email),
        phone: DOMPurify.sanitize(data.phone)
      };
      const response = await httpClient.post<BranchStaff>('/api/staff', sanitizedData);
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('ไม่สามารถสร้างข้อมูลพนักงานได้');
      throw error;
    }
  }
}

export const branchService = new BranchService();
