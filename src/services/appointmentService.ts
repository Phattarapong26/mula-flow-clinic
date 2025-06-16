import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { sanitizeObject } from '@/utils/security';
import DOMPurify from 'dompurify';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  branchId: string;
  branchName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentCreateInput {
  patientId: string;
  doctorId: string;
  branchId: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  notes?: string;
}

interface AppointmentResponse {
  data: Appointment[];
}

interface AppointmentStatusUpdate {
  status: Appointment['status'];
}

class AppointmentService {
  private readonly baseUrl = '/api/appointments';

  async getStaffAppointments(date: string): Promise<AppointmentResponse> {
    try {
      const response = await axios.get<AppointmentResponse>(`${this.baseUrl}/staff`, {
        params: { date },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching staff appointments:', error);
      toast({
        variant: "destructive",
        description: "Failed to fetch appointments"
      });
      throw error;
    }
  }

  async updateAppointmentStatus(appointmentId: string, status: Appointment['status']): Promise<void> {
    try {
      await axios.patch<AppointmentStatusUpdate>(
        `${this.baseUrl}/${appointmentId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast({
        variant: "destructive",
        description: "Failed to update appointment status"
      });
      throw error;
    }
  }

  async createAppointment(appointmentData: Omit<Appointment, 'id'>): Promise<Appointment> {
    try {
      const response = await axios.post<Appointment>(
        this.baseUrl,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        variant: "destructive",
        description: "Failed to create appointment"
      });
      throw error;
    }
  }

  async getAppointmentDetails(appointmentId: string): Promise<Appointment> {
    try {
      const response = await axios.get<Appointment>(
        `${this.baseUrl}/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      toast({
        variant: "destructive",
        description: "Failed to fetch appointment details"
      });
      throw error;
    }
  }

  async getAppointments(params?: {
    startDate?: string;
    endDate?: string;
    status?: Appointment['status'];
    doctorId?: string;
    branchId?: string;
    patientId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Appointment[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.doctorId) queryParams.append('doctorId', params.doctorId);
      if (params?.branchId) queryParams.append('branchId', params.branchId);
      if (params?.patientId) queryParams.append('patientId', params.patientId);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await axios.get<{ data: Appointment[]; total: number }>(`${this.baseUrl}?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to load appointments"
      });
      throw error;
    }
  }

  async getAppointmentById(id: string): Promise<Appointment> {
    try {
      const response = await axios.get<Appointment>(
        `${this.baseUrl}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return sanitizeObject(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to load appointment details"
      });
      throw error;
    }
  }

  async updateAppointment(id: string, data: Partial<AppointmentCreateInput>): Promise<Appointment> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<AppointmentCreateInput> = {};

      // Handle string fields
      if (data.date) sanitizedData.date = data.date;
      if (data.time) sanitizedData.time = data.time;
      if (data.type) sanitizedData.type = data.type;
      if (data.notes) sanitizedData.notes = DOMPurify.sanitize(data.notes);

      // Handle other fields
      if (data.duration) sanitizedData.duration = data.duration;
      if (data.doctorId) sanitizedData.doctorId = data.doctorId;
      if (data.branchId) sanitizedData.branchId = data.branchId;
      if (data.patientId) sanitizedData.patientId = data.patientId;

      const response = await axios.put<Appointment>(
        `${this.baseUrl}/${id}`,
        sanitizedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return sanitizeObject(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update appointment"
      });
      throw error;
    }
  }

  async deleteAppointment(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast({
        variant: "destructive",
        description: "Appointment deleted successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to delete appointment"
      });
      throw error;
    }
  }

  async getAvailableSlots(params: {
    doctorId: string;
    date: string;
    branchId: string;
  }): Promise<{ time: string; available: boolean }[]> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('doctorId', params.doctorId);
      queryParams.append('date', params.date);
      queryParams.append('branchId', params.branchId);

      const response = await axios.get<{ time: string; available: boolean }[]>(`${this.baseUrl}/available-slots?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return sanitizeObject(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to load available slots"
      });
      throw error;
    }
  }
}

export const appointmentService = new AppointmentService(); 