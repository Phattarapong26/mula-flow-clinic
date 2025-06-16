
// Temporary mock data for components that haven't been fully migrated yet
export interface MockAppointment {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  service: string;
  branch: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  appointment_date?: string;
  appointment_time?: string;
  customer_name?: string;
  service_type?: string;
  doctor_name?: string;
  doctorName?: string;
  duration_minutes?: number;
  created_at?: string;
  customer_id?: string;
  type_name?: string;
  scheduled_at?: string;
  external_ref?: string;
  cost?: number;
}

export interface MockPatient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gender: 'male' | 'female';
  dob: string;
  insurance_provider?: string;
  visual_acuity_right?: string;
  visual_acuity_left?: string;
  medical_history?: string;
  allergies?: string;
  created_at: string;
  address?: string;
  emergency_contact?: string;
}

export interface MockClaim {
  id: string;
  claimNumber: string;
  customerName: string;
  customer_name?: string;
  amount: number;
  claim_amount?: number;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  dateSubmitted: string;
  submitted_date?: string;
  service: string;
  service_type?: string;
  insurance_provider?: string;
  notes?: string;
}

export interface MockFollowup {
  id: string;
  customerName: string;
  type: string;
  status: 'pending' | 'completed' | 'cancelled';
  dueDate: string;
  notes?: string;
}

export interface MockDoctor {
  id: string;
  name: string;
  specialization: string;
  available: boolean;
}

export interface MockService {
  id: string;
  name: string;
  duration: number;
  price: number;
}

export interface MockTreatment {
  id: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  date: string;
  status: string;
  notes?: string;
}

export interface MockInvoice {
  id: string;
  patientId: string;
  amount: number;
  status: string;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  dueDate: string;
  assignee?: string;
}

// Empty arrays for now - components should migrate to real API calls
export const mockAppointments: MockAppointment[] = [];
export const mockPatients: MockPatient[] = [];
export const mockClaims: MockClaim[] = [];
export const mockFollowups: MockFollowup[] = [];
export const mockFollowUps: MockFollowup[] = []; // Alternative naming
export const mockDoctors: MockDoctor[] = [];
export const mockServices: MockService[] = [];
export const mockTreatments: MockTreatment[] = [];
export const mockInvoices: MockInvoice[] = [];
export const mockTasks: Task[] = [];
