import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface Feedback {
  id: string;
  patient_id: string;
  patient_name: string;
  doctor_id: string;
  doctor_name: string;
  branch_id: string;
  branch_name: string;
  rating: number;
  comment: string;
  category: 'service' | 'doctor' | 'facility' | 'other';
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
  updated_at: string;
}

export interface FeedbackCreateInput {
  patient_id: string;
  doctor_id: string;
  branch_id: string;
  rating: number;
  comment: string;
  category: Feedback['category'];
}

export interface FeedbackStats {
  total_feedback: number;
  average_rating: number;
  rating_distribution: {
    rating: number;
    count: number;
  }[];
  category_distribution: {
    category: Feedback['category'];
    count: number;
  }[];
  recent_trend: {
    date: string;
    average_rating: number;
    count: number;
  }[];
}

class FeedbackService {
  async getFeedbacks(params?: {
    search?: string;
    category?: Feedback['category'];
    status?: Feedback['status'];
    rating?: number;
    branch_id?: string;
    doctor_id?: string;
    patient_id?: string;
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Feedback[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.category) queryParams.append('category', params.category);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.rating) queryParams.append('rating', params.rating.toString());
      if (params?.branch_id) queryParams.append('branch_id', params.branch_id);
      if (params?.doctor_id) queryParams.append('doctor_id', params.doctor_id);
      if (params?.patient_id) queryParams.append('patient_id', params.patient_id);
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: Feedback[]; total: number }>(`/api/feedback?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load feedback');
      throw error;
    }
  }

  async getFeedbackById(id: string): Promise<Feedback> {
    try {
      const response = await httpClient.get<Feedback>(`/api/feedback/${id}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load feedback details');
      throw error;
    }
  }

  async createFeedback(data: FeedbackCreateInput): Promise<Feedback> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        comment: DOMPurify.sanitize(data.comment)
      };

      const response = await httpClient.post<Feedback>('/api/feedback', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to submit feedback');
      throw error;
    }
  }

  async updateFeedback(id: string, data: Partial<FeedbackCreateInput>): Promise<Feedback> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<FeedbackCreateInput> = {};

      // Handle string fields
      if (data.comment) sanitizedData.comment = DOMPurify.sanitize(data.comment);

      // Handle other fields
      if (data.rating) sanitizedData.rating = data.rating;
      if (data.category) sanitizedData.category = data.category;
      if (data.patient_id) sanitizedData.patient_id = data.patient_id;
      if (data.doctor_id) sanitizedData.doctor_id = data.doctor_id;
      if (data.branch_id) sanitizedData.branch_id = data.branch_id;

      const response = await httpClient.put<Feedback>(`/api/feedback/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update feedback');
      throw error;
    }
  }

  async deleteFeedback(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/feedback/${id}`, { requireAuth: true });
      toast.success('Feedback deleted successfully');
    } catch (error) {
      toast.error('Failed to delete feedback');
      throw error;
    }
  }

  async updateFeedbackStatus(id: string, status: Feedback['status']): Promise<Feedback> {
    try {
      const response = await httpClient.patch<Feedback>(`/api/feedback/${id}/status`, { status }, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update feedback status');
      throw error;
    }
  }

  async getFeedbackStats(params?: {
    branch_id?: string;
    doctor_id?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<FeedbackStats> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.branch_id) queryParams.append('branch_id', params.branch_id);
      if (params?.doctor_id) queryParams.append('doctor_id', params.doctor_id);
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);

      const response = await httpClient.get<FeedbackStats>(`/api/feedback/stats?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load feedback statistics');
      throw error;
    }
  }

  async getFeedbackByPatient(patientId: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<{ data: Feedback[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: Feedback[]; total: number }>(`/api/feedback/patient/${patientId}?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load patient feedback');
      throw error;
    }
  }

  async getFeedbackByDoctor(doctorId: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<{ data: Feedback[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: Feedback[]; total: number }>(`/api/feedback/doctor/${doctorId}?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load doctor feedback');
      throw error;
    }
  }
}

export const feedbackService = new FeedbackService(); 