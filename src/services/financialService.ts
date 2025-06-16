import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface PLStatement {
  month: string;
  revenue: number;
  cost_of_sales: number;
  expenses: number;
  net_profit: number;
  margin: number;
}

export interface ExpenseBreakdown {
  category: string;
  total: number;
  percentage: number;
}

export interface DoctorKPI {
  doctor_id: string;
  doctor_name: string;
  revenue_per_hour: number;
  slot_utilization: number;
  average_ticket: number;
  bonus: number;
  efficiency_score: number;
  kpi_score: number;
}

export interface BranchEfficiency {
  branch_id: string;
  branch_name: string;
  revenue_per_staff: number;
  cost_per_staff: number;
  efficiency_score: number;
  profit_margin: number;
}

export interface CustomerMetrics {
  repeat_rate: number;
  churn_risk_count: number;
  aov: number;
  cac: number;
  retention_rate: number;
}

class FinancialService {
  async getPLStatement(period: string): Promise<PLStatement[]> {
    try {
      const response = await httpClient.get<PLStatement[]>(`/api/financial/pl-statement?period=${encodeURIComponent(period)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load profit and loss statement');
      throw error;
    }
  }

  async getExpenseBreakdown(period: string): Promise<ExpenseBreakdown[]> {
    try {
      const response = await httpClient.get<ExpenseBreakdown[]>(`/api/financial/expense-breakdown?period=${encodeURIComponent(period)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load expense breakdown');
      throw error;
    }
  }

  async getDoctorKPIs(period: string): Promise<DoctorKPI[]> {
    try {
      const response = await httpClient.get<DoctorKPI[]>(`/api/financial/doctor-kpis?period=${encodeURIComponent(period)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load doctor KPIs');
      throw error;
    }
  }

  async getBranchEfficiency(period: string): Promise<BranchEfficiency[]> {
    try {
      const response = await httpClient.get<BranchEfficiency[]>(`/api/financial/branch-efficiency?period=${encodeURIComponent(period)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load branch efficiency metrics');
      throw error;
    }
  }

  async getCustomerMetrics(period: string): Promise<CustomerMetrics> {
    try {
      const response = await httpClient.get<CustomerMetrics>(`/api/financial/customer-metrics?period=${encodeURIComponent(period)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load customer metrics');
      throw error;
    }
  }

  async getRevenueData(startDate: string, endDate: string): Promise<any> {
    try {
      const response = await httpClient.get(`/api/financial/revenue?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load revenue data');
      throw error;
    }
  }

  async getExpenseData(startDate: string, endDate: string): Promise<any> {
    try {
      const response = await httpClient.get(`/api/financial/expenses?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load expense data');
      throw error;
    }
  }

  async getProfitData(startDate: string, endDate: string): Promise<any> {
    try {
      const response = await httpClient.get(`/api/financial/profit?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load profit data');
      throw error;
    }
  }
}

export const financialService = new FinancialService(); 