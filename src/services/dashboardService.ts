import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import { 
  DashboardStats, 
  RevenueData, 
  ServicePerformance, 
  AppointmentData,
  CustomerDemographic,
  DoctorPerformance,
  BranchPerformance,
  PaymentMethodData
} from '@/types/dashboard';

class DashboardService {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await httpClient.get<DashboardStats>('/api/dashboard/stats', { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load dashboard statistics');
      throw error;
    }
  }

  async getRevenueData(params?: { startDate?: string; endDate?: string }): Promise<RevenueData[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);

      const response = await httpClient.get<RevenueData[]>(`/api/dashboard/revenue?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load revenue data');
      throw error;
    }
  }

  async getServicePerformance(params?: { startDate?: string; endDate?: string }): Promise<ServicePerformance[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);

      const response = await httpClient.get<ServicePerformance[]>(`/api/dashboard/services?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load service performance data');
      throw error;
    }
  }

  async getAppointmentData(params?: { startDate?: string; endDate?: string }): Promise<AppointmentData[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);

      const response = await httpClient.get<AppointmentData[]>(`/api/dashboard/appointments?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load appointment data');
      throw error;
    }
  }

  async getCustomerDemographics(): Promise<CustomerDemographic[]> {
    try {
      const response = await httpClient.get<CustomerDemographic[]>('/api/dashboard/customer-demographics', { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load customer demographics');
      throw error;
    }
  }

  async getDoctorPerformance(params?: { startDate?: string; endDate?: string }): Promise<DoctorPerformance[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);

      const response = await httpClient.get<DoctorPerformance[]>(`/api/dashboard/doctor-performance?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load doctor performance data');
      throw error;
    }
  }

  async getBranchPerformance(params?: { startDate?: string; endDate?: string }): Promise<BranchPerformance[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);

      const response = await httpClient.get<BranchPerformance[]>(`/api/dashboard/branch-performance?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load branch performance data');
      throw error;
    }
  }

  async getPaymentMethodData(params?: { startDate?: string; endDate?: string }): Promise<PaymentMethodData[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);

      const response = await httpClient.get<PaymentMethodData[]>(`/api/dashboard/payment-methods?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load payment method data');
      throw error;
    }
  }
}

export const dashboardService = new DashboardService(); 