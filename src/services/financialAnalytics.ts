import axios from 'axios';
import { API_BASE_URL } from '@/config/api';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface NetProfitByBranch {
  branch: string;
  net_profit: number;
  net_margin: string;
  revenue: number;
  costs: number;
  expenses: number;
}

export interface TaxLiability {
  output_vat: number;
  input_vat: number;
  tax_payable: number;
  period: string;
}

export interface GrossMarginPerService {
  service_id: string;
  service_name: string;
  total_sales: number;
  total_cost: number;
  gross_margin: number;
  margin_percentage: string;
}

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

export interface FinancialData {
  netProfitByBranch: NetProfitByBranch[];
  taxLiability: TaxLiability;
  grossMarginPerService: GrossMarginPerService[];
  plStatement: PLStatement[];
  expenseBreakdown: ExpenseBreakdown[];
  doctorKPIs: DoctorKPI[];
  branchEfficiency: BranchEfficiency[];
  customerMetrics: CustomerMetrics;
}

class FinancialAnalyticsService {
  private static instance: FinancialAnalyticsService;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/financial-analytics`;
  }

  public static getInstance(): FinancialAnalyticsService {
    if (!FinancialAnalyticsService.instance) {
      FinancialAnalyticsService.instance = new FinancialAnalyticsService();
    }
    return FinancialAnalyticsService.instance;
  }

  async getFinancialData(params: { 
    startDate?: string; 
    endDate?: string; 
    branchId?: string;
  } = {}): Promise<FinancialData> {
    try {
      const response = await axios.get(this.baseUrl, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching financial data:', error);
      throw new Error('Failed to fetch financial data');
    }
  }

  async getNetProfitByBranch(params: {
    startDate?: string;
    endDate?: string;
    branchId?: string;
  } = {}): Promise<NetProfitByBranch[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/net-profit`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching net profit by branch:', error);
      throw new Error('Failed to fetch net profit data');
    }
  }

  async getTaxLiability(params: {
    period?: string;
    branchId?: string;
  } = {}): Promise<TaxLiability> {
    try {
      const response = await axios.get(`${this.baseUrl}/tax-liability`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching tax liability:', error);
      throw new Error('Failed to fetch tax liability data');
    }
  }

  async getGrossMarginPerService(params: {
    startDate?: string;
    endDate?: string;
    branchId?: string;
  } = {}): Promise<GrossMarginPerService[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/gross-margin`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching gross margin per service:', error);
      throw new Error('Failed to fetch gross margin data');
    }
  }

  async getPLStatement(params: {
    startDate?: string;
    endDate?: string;
    branchId?: string;
  } = {}): Promise<PLStatement[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/pl-statement`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching PL statement:', error);
      throw new Error('Failed to fetch PL statement data');
    }
  }

  async getExpenseBreakdown(params: {
    startDate?: string;
    endDate?: string;
    branchId?: string;
  } = {}): Promise<ExpenseBreakdown[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/expense-breakdown`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching expense breakdown:', error);
      throw new Error('Failed to fetch expense breakdown data');
    }
  }

  async getDoctorKPIs(params: {
    startDate?: string;
    endDate?: string;
    branchId?: string;
  } = {}): Promise<DoctorKPI[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/doctor-kpis`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor KPIs:', error);
      throw new Error('Failed to fetch doctor KPI data');
    }
  }

  async getBranchEfficiency(params: {
    startDate?: string;
    endDate?: string;
    branchId?: string;
  } = {}): Promise<BranchEfficiency[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/branch-efficiency`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching branch efficiency:', error);
      throw new Error('Failed to fetch branch efficiency data');
    }
  }

  async getCustomerMetrics(params: {
    startDate?: string;
    endDate?: string;
    branchId?: string;
  } = {}): Promise<CustomerMetrics> {
    try {
      const response = await axios.get(`${this.baseUrl}/customer-metrics`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching customer metrics:', error);
      throw new Error('Failed to fetch customer metrics data');
    }
  }
}

export const financialAnalyticsService = FinancialAnalyticsService.getInstance();
