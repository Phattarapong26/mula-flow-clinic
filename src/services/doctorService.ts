import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  email: string;
  phone: string;
  branchId: string;
  branchName: string;
  status: 'active' | 'inactive';
  schedule: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface DoctorCreateInput {
  userId: string;
  specialization: string;
  licenseNumber: string;
  email: string;
  phone: string;
  branchId: string;
  schedule: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
}

class DoctorService {
  async getDoctors(params?: {
    search?: string;
    status?: Doctor['status'];
    branchId?: string;
    specialization?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Doctor[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.branchId) queryParams.append('branchId', params.branchId);
      if (params?.specialization) queryParams.append('specialization', params.specialization);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: Doctor[]; total: number }>(`/api/doctors?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load doctors');
      throw error;
    }
  }

  async getDoctorById(id: string): Promise<Doctor> {
    try {
      const response = await httpClient.get<Doctor>(`/api/doctors/${id}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load doctor details');
      throw error;
    }
  }

  async createDoctor(data: DoctorCreateInput): Promise<Doctor> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        email: DOMPurify.sanitize(data.email),
        phone: DOMPurify.sanitize(data.phone),
        specialization: DOMPurify.sanitize(data.specialization),
        licenseNumber: DOMPurify.sanitize(data.licenseNumber)
      };

      const response = await httpClient.post<Doctor>('/api/doctors', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to create doctor');
      throw error;
    }
  }

  async updateDoctor(id: string, data: Partial<DoctorCreateInput>): Promise<Doctor> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<DoctorCreateInput> = {};

      // Handle string fields
      if (data.email) sanitizedData.email = DOMPurify.sanitize(data.email);
      if (data.phone) sanitizedData.phone = DOMPurify.sanitize(data.phone);
      if (data.specialization) sanitizedData.specialization = DOMPurify.sanitize(data.specialization);
      if (data.licenseNumber) sanitizedData.licenseNumber = DOMPurify.sanitize(data.licenseNumber);

      // Handle other fields
      if (data.userId) sanitizedData.userId = data.userId;
      if (data.branchId) sanitizedData.branchId = data.branchId;
      if (data.schedule) sanitizedData.schedule = data.schedule;

      const response = await httpClient.put<Doctor>(`/api/doctors/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update doctor');
      throw error;
    }
  }

  async deleteDoctor(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/doctors/${id}`, { requireAuth: true });
      toast.success('Doctor deleted successfully');
    } catch (error) {
      toast.error('Failed to delete doctor');
      throw error;
    }
  }

  async updateDoctorStatus(id: string, status: Doctor['status']): Promise<Doctor> {
    try {
      const response = await httpClient.patch<Doctor>(`/api/doctors/${id}/status`, { status }, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update doctor status');
      throw error;
    }
  }

  async updateDoctorSchedule(id: string, schedule: DoctorCreateInput['schedule']): Promise<Doctor> {
    try {
      const response = await httpClient.patch<Doctor>(`/api/doctors/${id}/schedule`, { schedule }, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update doctor schedule');
      throw error;
    }
  }

  async getDoctorAvailability(params: {
    doctorId: string;
    date: string;
  }): Promise<{ time: string; available: boolean }[]> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('doctorId', params.doctorId);
      queryParams.append('date', params.date);

      const response = await httpClient.get<{ time: string; available: boolean }[]>(`/api/doctors/availability?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load doctor availability');
      throw error;
    }
  }
}

export const doctorService = new DoctorService(); 