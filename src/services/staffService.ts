import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'technician';
  department: string;
  branch_id: string;
  branch_name: string;
  status: 'active' | 'inactive' | 'on_leave';
  join_date: string;
  salary: number;
  performance_score: number;
  specialization?: string;
  license_number?: string;
  created_at: string;
  updated_at: string;
}

export interface StaffCreateInput {
  name: string;
  email: string;
  phone: string;
  role: Staff['role'];
  department: string;
  branch_id: string;
  specialization?: string;
  license_number?: string;
  salary: number;
}

export interface StaffPerformance {
  id: string;
  staff_id: string;
  period: string;
  metrics: {
    patient_satisfaction: number;
    appointment_completion: number;
    revenue_generated: number;
    treatment_success: number;
  };
  overall_score: number;
  feedback_count: number;
  created_at: string;
}

export interface StaffSchedule {
  id: string;
  staff_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  appointment_count: number;
  break_time: {
    start: string;
    end: string;
  }[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: 'follow_up' | 'appointment' | 'inventory' | 'administrative';
  createdAt: string;
  completedAt?: string;
}

export interface FollowUp {
  id: string;
  customerId: string;
  customerName: string;
  staffName: string;
  type: 'appointment_reminder' | 'medication_reminder' | 'check_up' | 'treatment_follow_up';
  status: 'pending' | 'completed' | 'cancelled';
  scheduledDate: string;
  note: string;
  priority: 'low' | 'medium' | 'high';
  method: 'phone' | 'line' | 'email' | 'visit';
  result: 'contacted' | 'no_answer' | 'interested' | 'not_interested' | 'scheduled';
  nextFollowDate?: string;
  createdAt: string;
}

class StaffService {
  async getStaff(params?: {
    search?: string;
    role?: Staff['role'];
    department?: string;
    branch_id?: string;
    status?: Staff['status'];
    page?: number;
    limit?: number;
  }): Promise<{ data: Staff[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.role) queryParams.append('role', params.role);
      if (params?.department) queryParams.append('department', params.department);
      if (params?.branch_id) queryParams.append('branch_id', params.branch_id);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: Staff[]; total: number }>(`/api/staff?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load staff');
      throw error;
    }
  }

  async getStaffById(id: string): Promise<Staff> {
    try {
      const response = await httpClient.get<Staff>(`/api/staff/${id}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load staff details');
      throw error;
    }
  }

  async createStaff(data: StaffCreateInput): Promise<Staff> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        name: DOMPurify.sanitize(data.name),
        email: DOMPurify.sanitize(data.email),
        phone: DOMPurify.sanitize(data.phone),
        department: DOMPurify.sanitize(data.department),
        specialization: data.specialization ? DOMPurify.sanitize(data.specialization) : undefined,
        license_number: data.license_number ? DOMPurify.sanitize(data.license_number) : undefined
      };

      const response = await httpClient.post<Staff>('/api/staff', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to create staff');
      throw error;
    }
  }

  async updateStaff(id: string, data: Partial<StaffCreateInput>): Promise<Staff> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<StaffCreateInput> = {};

      // Handle string fields
      if (data.name) sanitizedData.name = DOMPurify.sanitize(data.name);
      if (data.email) sanitizedData.email = DOMPurify.sanitize(data.email);
      if (data.phone) sanitizedData.phone = DOMPurify.sanitize(data.phone);
      if (data.department) sanitizedData.department = DOMPurify.sanitize(data.department);
      if (data.specialization) sanitizedData.specialization = DOMPurify.sanitize(data.specialization);
      if (data.license_number) sanitizedData.license_number = DOMPurify.sanitize(data.license_number);

      // Handle other fields
      if (data.role) sanitizedData.role = data.role;
      if (data.branch_id) sanitizedData.branch_id = data.branch_id;
      if (data.salary) sanitizedData.salary = data.salary;

      const response = await httpClient.put<Staff>(`/api/staff/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update staff');
      throw error;
    }
  }

  async deleteStaff(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/staff/${id}`, { requireAuth: true });
      toast.success('Staff deleted successfully');
    } catch (error) {
      toast.error('Failed to delete staff');
      throw error;
    }
  }

  async updateStaffStatus(id: string, status: Staff['status']): Promise<Staff> {
    try {
      const response = await httpClient.patch<Staff>(`/api/staff/${id}/status`, { status }, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update staff status');
      throw error;
    }
  }

  async getStaffPerformance(staffId: string, params?: {
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: StaffPerformance[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: StaffPerformance[]; total: number }>(`/api/staff/${staffId}/performance?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load staff performance');
      throw error;
    }
  }

  async getStaffSchedule(staffId: string, params?: {
    start_date?: string;
    end_date?: string;
    status?: StaffSchedule['status'];
  }): Promise<StaffSchedule[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);
      if (params?.status) queryParams.append('status', params.status);

      const response = await httpClient.get<StaffSchedule[]>(`/api/staff/${staffId}/schedule?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load staff schedule');
      throw error;
    }
  }

  async updateStaffSchedule(staffId: string, scheduleId: string, data: Partial<StaffSchedule>): Promise<StaffSchedule> {
    try {
      const response = await httpClient.put<StaffSchedule>(`/api/staff/${staffId}/schedule/${scheduleId}`, data, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update staff schedule');
      throw error;
    }
  }

  async getTasks(staffId: string, params?: {
    status?: Task['status'];
    priority?: Task['priority'];
    category?: Task['category'];
  }): Promise<Task[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.append('status', params.status);
      if (params?.priority) queryParams.append('priority', params.priority);
      if (params?.category) queryParams.append('category', params.category);

      const response = await httpClient.get<Task[]>(`/api/staff/${staffId}/tasks?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load tasks');
      throw error;
    }
  }

  async createTask(data: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        title: DOMPurify.sanitize(data.title),
        description: DOMPurify.sanitize(data.description)
      };

      const response = await httpClient.post<Task>('/api/tasks', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to create task');
      throw error;
    }
  }

  async updateTask(id: string, data: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<Omit<Task, 'id' | 'createdAt'>> = {};

      // Handle string fields
      if (data.title) sanitizedData.title = DOMPurify.sanitize(data.title);
      if (data.description) sanitizedData.description = DOMPurify.sanitize(data.description);

      // Handle other fields
      if (data.status) sanitizedData.status = data.status;
      if (data.priority) sanitizedData.priority = data.priority;
      if (data.category) sanitizedData.category = data.category;
      if (data.dueDate) sanitizedData.dueDate = data.dueDate;
      if (data.completedAt) sanitizedData.completedAt = data.completedAt;

      const response = await httpClient.put<Task>(`/api/tasks/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update task');
      throw error;
    }
  }

  async getFollowUps(staffId: string, params?: {
    status?: FollowUp['status'];
    type?: FollowUp['type'];
    priority?: FollowUp['priority'];
  }): Promise<FollowUp[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.append('status', params.status);
      if (params?.type) queryParams.append('type', params.type);
      if (params?.priority) queryParams.append('priority', params.priority);

      const response = await httpClient.get<FollowUp[]>(`/api/staff/${staffId}/follow-ups?${queryParams.toString()}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load follow-ups');
      throw error;
    }
  }

  async createFollowUp(data: Omit<FollowUp, 'id' | 'createdAt'>): Promise<FollowUp> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        customerName: DOMPurify.sanitize(data.customerName),
        staffName: DOMPurify.sanitize(data.staffName),
        note: DOMPurify.sanitize(data.note)
      };

      const response = await httpClient.post<FollowUp>('/api/follow-ups', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to create follow-up');
      throw error;
    }
  }

  async updateFollowUp(id: string, data: Partial<Omit<FollowUp, 'id' | 'createdAt'>>): Promise<FollowUp> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<Omit<FollowUp, 'id' | 'createdAt'>> = {};

      // Handle string fields
      if (data.customerName) sanitizedData.customerName = DOMPurify.sanitize(data.customerName);
      if (data.staffName) sanitizedData.staffName = DOMPurify.sanitize(data.staffName);
      if (data.note) sanitizedData.note = DOMPurify.sanitize(data.note);

      // Handle other fields
      if (data.status) sanitizedData.status = data.status;
      if (data.type) sanitizedData.type = data.type;
      if (data.priority) sanitizedData.priority = data.priority;
      if (data.method) sanitizedData.method = data.method;
      if (data.result) sanitizedData.result = data.result;
      if (data.scheduledDate) sanitizedData.scheduledDate = data.scheduledDate;
      if (data.nextFollowDate) sanitizedData.nextFollowDate = data.nextFollowDate;

      const response = await httpClient.put<FollowUp>(`/api/follow-ups/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update follow-up');
      throw error;
    }
  }
}

export const staffService = new StaffService(); 