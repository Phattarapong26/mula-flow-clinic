import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from '@/hooks/use-toast';
import DOMPurify from 'dompurify';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  status: 'active' | 'inactive';
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
}

export interface QueueStats {
  average_wait_time: number;
  daily_queue_count: number;
  peak_hour: string;
  customer_satisfaction: number;
}

export interface BranchCreateInput {
  name: string;
  address: string;
  province: string;
  phone: string;
  email?: string;
  manager_id: string;
  opening_hours: string;
  established: string;
}

export interface BranchTarget {
  id: string;
  branchId: string;
  month: string;
  revenueTarget: number;
  customerTarget: number;
  appointmentTarget: number;
  actualRevenue: number;
  actualCustomers: number;
  actualAppointments: number;
  achievementRate: number;
}

export interface BranchStaff {
  id: string;
  branchId: string;
  branchName: string;
  name: string;
  position: 'doctor' | 'optometrist' | 'nurse' | 'receptionist' | 'technician' | 'manager';
  department: 'medical' | 'customer_service' | 'administration' | 'technical';
  email: string;
  phone: string;
  hire_date: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  qualifications: string[];
  performance_score: number;
  created_at: string;
  updated_at: string;
}

export interface BranchFinance {
  id: string;
  year: number;
  month: string;
  revenue: number;
  expense: number;
  profit: number;
  target: number;
}

interface BranchExpense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface CreateStaffData {
  branchId: string;
  name: string;
  position: BranchStaff['position'];
  department: BranchStaff['department'];
  email: string;
  phone: string;
  hire_date: string;
  salary: number;
  qualifications: string;
  performance_score: number;
}

interface BranchProfit {
  id: string;
  branchId: string;
  branchName: string;
  month: string;
  year: number;
  revenue: number;
  expenses: number;
  netProfit: number;
  profitMargin: number;
  created_at: string;
}

interface ExpenseBreakdown {
  category: string;
  value: number;
  color: string;
}

interface ProfitResponse {
  profitData: BranchProfit[];
  expenseBreakdown: ExpenseBreakdown[];
}

interface BranchRevenue {
  branchId: string;
  branchName: string;
  revenue: number;
  growth: number;
  customers: number;
  staff: number;
  revenuePerStaff: number;
  target: number;
  achievement: number;
}

interface BranchRevenueResponse {
  data: BranchRevenue[];
}

interface BranchAnalysis {
  id: string;
  branch: string;
  status: 'excellent' | 'good' | 'average' | 'concern';
  revenue: number;
  profitMargin: number;
  customerGrowth: number;
  recommendation: 'expand' | 'maintain' | 'improve' | 'evaluate';
  reasons: string[];
  action: string;
  priority: 'high' | 'medium' | 'low';
}

interface MarketAnalysis {
  area: string;
  marketSize: string;
  competition: string;
  potential: string;
  demographics: string;
  recommendation: string;
  status: 'recommended' | 'pending' | 'not-recommended';
}

interface BranchAnalysisResponse {
  data: BranchAnalysis[];
}

interface MarketAnalysisResponse {
  data: MarketAnalysis[];
}

export interface RevenueRecord {
  id: string;
  branchId: string;
  branchName: string;
  month: string;
  year: number;
  revenue: number;
  target: number;
  achievement: number;
  services: {
    eyeExam: number;
    glasses: number;
    contactLens: number;
    surgery: number;
  };
  created_at: string;
}

export interface RevenueRecordCreate {
  branchId: string;
  month: string;
  year: number;
  revenue: number;
  target: number;
  services: {
    eyeExam: number;
    glasses: number;
    contactLens: number;
    surgery: number;
  };
}

export interface RevenueResponse {
  data: RevenueRecord[];
}

export type ExpenseCategory = 'rent' | 'utilities' | 'supplies' | 'salary' | 'other';
export type PaymentMethod = 'cash' | 'credit_card' | 'bank_transfer' | 'other';
export type ExpenseStatus = 'pending' | 'paid' | 'cancelled';

export interface Expense {
  id: string;
  branchId: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  description: string;
  payment_method: PaymentMethod;
  status: ExpenseStatus;
  created_at: string;
  updated_at: string;
}

export interface ExpenseCreate {
  branchId: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  description: string;
  payment_method: PaymentMethod;
}

export interface ExpenseResponse {
  data: Expense[];
}

export class BranchService {
  private static instance: BranchService;

  private constructor() {}

  public static getInstance(): BranchService {
    if (!BranchService.instance) {
      BranchService.instance = new BranchService();
    }
    return BranchService.instance;
  }

  async getBranches(params?: {
    search?: string;
    status?: Branch['status'];
    province?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }): Promise<{ data: Branch[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.province) queryParams.append('province', params.province);
      if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: Branch[]; total: number }>(`/api/branches?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to load branches"
      });
      throw error;
    }
  }

  async getBranchById(id: string): Promise<Branch> {
    try {
      const response = await httpClient.get<Branch>(`/api/branches/${id}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to load branch details"
      });
      throw error;
    }
  }

  async createBranch(branch: Omit<Branch, 'id'>): Promise<Branch> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...branch,
        name: DOMPurify.sanitize(branch.name),
        address: DOMPurify.sanitize(branch.address),
        phone: DOMPurify.sanitize(branch.phone),
        email: DOMPurify.sanitize(branch.email),
        manager: DOMPurify.sanitize(branch.manager)
      };

      const response = await httpClient.post<Branch>('/api/branches', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to create branch"
      });
      throw error;
    }
  }

  async updateBranch(id: string, branch: Partial<Branch>): Promise<Branch> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<Branch> = {};
      if (branch.name) sanitizedData.name = DOMPurify.sanitize(branch.name);
      if (branch.address) sanitizedData.address = DOMPurify.sanitize(branch.address);
      if (branch.phone) sanitizedData.phone = DOMPurify.sanitize(branch.phone);
      if (branch.email) sanitizedData.email = DOMPurify.sanitize(branch.email);
      if (branch.manager) sanitizedData.manager = DOMPurify.sanitize(branch.manager);
      if (branch.status) sanitizedData.status = branch.status;
      if (branch.openingHours) sanitizedData.openingHours = branch.openingHours;

      const response = await httpClient.put<Branch>(`/api/branches/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update branch"
      });
      throw error;
    }
  }

  async deleteBranch(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/branches/${id}`, { requireAuth: true });
      toast({
        variant: "destructive",
        description: "Branch deleted successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to delete branch"
      });
      throw error;
    }
  }

  async getQueueStats(branchId: string): Promise<QueueStats> {
    try {
      const response = await httpClient.get<QueueStats>(`/api/branches/${branchId}/queue-stats`, { requireAuth: true });
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to fetch queue statistics"
      });
      throw error;
    }
  }

  async getBranchTargets(branchId: string, month: string): Promise<BranchTarget[]> {
    try {
      const response = await httpClient.get<BranchTarget[]>(`/api/branches/${branchId}/targets?month=${encodeURIComponent(month)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to load branch targets"
      });
      throw error;
    }
  }

  async updateBranchTarget(branchId: string, month: string, data: Partial<Omit<BranchTarget, 'id' | 'branchId' | 'month'>>): Promise<BranchTarget> {
    try {
      const response = await httpClient.put<BranchTarget>(`/api/branches/${branchId}/targets/${month}`, data, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update branch target"
      });
      throw error;
    }
  }

  async getBranchPerformance(branchId: string, period: string): Promise<any> {
    try {
      const response = await httpClient.get(`/api/branches/${branchId}/performance?period=${encodeURIComponent(period)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to load branch performance"
      });
      throw error;
    }
  }

  async getBranchStaff(branchId?: string): Promise<{ data: BranchStaff[] }> {
    try {
      const url = branchId ? `/branches/${branchId}/staff` : '/staff';
      const response = await httpClient.get<BranchStaff[]>(url, { requireAuth: true });
      return { data: sanitizeObject(response.data) };
    } catch (error) {
      console.error('Error fetching branch staff:', error);
      toast({
        variant: "destructive",
        description: "Failed to fetch staff data"
      });
      throw error;
    }
  }

  async getBranchFinances(branchId: string, params?: {
    year?: number;
    month?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: BranchFinance[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.year) queryParams.append('year', params.year.toString());
      if (params?.month) queryParams.append('month', params.month);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: BranchFinance[]; total: number }>(`/api/branches/${branchId}/finances?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to load branch finances"
      });
      throw error;
    }
  }

  async getBranchExpenses(branchId?: string): Promise<ExpenseResponse> {
    try {
      const params = new URLSearchParams();
      if (branchId) params.append('branchId', branchId);

      const response = await axios.get<ExpenseResponse>(`${API_URL}/branches/expenses?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching branch expenses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch branch expenses",
        variant: "destructive"
      });
      throw error;
    }
  }

  async createStaff(data: CreateStaffData): Promise<{ data: BranchStaff }> {
    try {
      const response = await httpClient.post<BranchStaff>('/staff', {
        ...data,
        qualifications: data.qualifications.split(',').map(q => q.trim()).filter(q => q),
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, { requireAuth: true });
      return { data: sanitizeObject(response.data) };
    } catch (error) {
      console.error('Error creating staff:', error);
      toast({
        variant: "destructive",
        description: "Failed to create staff member"
      });
      throw error;
    }
  }

  async getBranchProfit(branchId?: string, period: string = '6months'): Promise<{ data: ProfitResponse }> {
    try {
      const response = await axios.get<ProfitResponse>(`/api/branches/profit`, {
        params: {
          branchId,
          period
        }
      });
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching branch profit:', error);
      toast({
        variant: "destructive",
        description: "Failed to fetch profit data"
      });
      throw error;
    }
  }

  async exportProfitReport(branchId?: string, period: string = '6months'): Promise<void> {
    try {
      const response = await axios.get<Blob>('/api/branches/profit/export', {
        params: {
          branchId,
          period
        },
        responseType: 'blob'
      });
      
      // Create a download link
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `profit-report-${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting profit report:', error);
      toast({
        variant: "destructive",
        description: "Failed to export profit report"
      });
      throw error;
    }
  }

  async getBranchRevenue(branchId?: string, period?: string): Promise<RevenueResponse> {
    try {
      const params = new URLSearchParams();
      if (branchId) params.append('branchId', branchId);
      if (period) params.append('period', period);

      const response = await axios.get<RevenueResponse>(`${API_URL}/branches/revenue?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching branch revenue:', error);
      toast({
        title: "Error",
        description: "Failed to fetch branch revenue data",
        variant: "destructive"
      });
      throw error;
    }
  }

  async createRevenueRecord(data: RevenueRecordCreate): Promise<RevenueRecord> {
    try {
      const response = await axios.post<RevenueRecord>(`${API_URL}/branches/revenue`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating revenue record:', error);
      toast({
        title: "Error",
        description: "Failed to create revenue record",
        variant: "destructive"
      });
      throw error;
    }
  }

  async exportRevenueReport(branchId?: string, period?: string): Promise<void> {
    try {
      const params = new URLSearchParams();
      if (branchId) params.append('branchId', branchId);
      if (period) params.append('period', period);

      const response = await axios.get(`${API_URL}/branches/revenue/export?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data as BlobPart]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `revenue-report-${new Date().toISOString()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting revenue report:', error);
      toast({
        title: "Error",
        description: "Failed to export revenue report",
        variant: "destructive"
      });
      throw error;
    }
  }

  async getBranchAnalysis(): Promise<BranchAnalysisResponse> {
    try {
      const response = await axios.get<BranchAnalysisResponse>('/api/branches/analysis');
      return response.data;
    } catch (error) {
      console.error('Error fetching branch analysis:', error);
      toast({
        variant: "destructive",
        description: "Failed to fetch branch analysis data"
      });
      throw error;
    }
  }

  async getMarketAnalysis(): Promise<MarketAnalysisResponse> {
    try {
      const response = await axios.get<MarketAnalysisResponse>('/api/branches/market-analysis');
      return response.data;
    } catch (error) {
      console.error('Error fetching market analysis:', error);
      toast({
        variant: "destructive",
        description: "Failed to fetch market analysis data"
      });
      throw error;
    }
  }

  async createExpense(data: ExpenseCreate): Promise<Expense> {
    try {
      const response = await axios.post<Expense>(`${API_URL}/branches/expenses`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      toast({
        title: "Error",
        description: "Failed to create expense",
        variant: "destructive"
      });
      throw error;
    }
  }
}

export const branchService = BranchService.getInstance(); 