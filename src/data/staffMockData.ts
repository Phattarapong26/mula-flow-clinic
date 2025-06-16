
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
}

export interface MockClaim {
  id: string;
  claimNumber: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  dateSubmitted: string;
  service: string;
}

export interface MockFollowup {
  id: string;
  customerName: string;
  type: string;
  status: 'pending' | 'completed' | 'cancelled';
  dueDate: string;
  notes?: string;
}

// Empty arrays for now - components should migrate to real API calls
export const mockAppointments: MockAppointment[] = [];
export const mockPatients: MockPatient[] = [];
export const mockClaims: MockClaim[] = [];
export const mockFollowups: MockFollowup[] = [];
