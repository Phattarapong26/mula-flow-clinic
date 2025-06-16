
export interface MockPatient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gender: 'male' | 'female';
  dob: string;
  created_at: string;
  visual_acuity_right?: string;
  visual_acuity_left?: string;
  medical_history?: string;
  allergies?: string;
  insurance_provider?: string;
  address?: {
    street: string;
    district: string;
    province: string;
    postalCode: string;
  };
  emergency_contact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string;
  category: 'follow_up' | 'appointment' | 'inventory' | 'administrative';
  created_at: string;
}

export interface ExtendedTask extends Task {
  updated_at: string;
}

export interface MockAppointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  service: string;
  status: 'booked' | 'confirmed' | 'completed' | 'cancelled' | 'no_show' | 'scheduled';
  customerName: string;
  customerPhone: string;
  branch: string;
  customer_name: string;
  doctor_name: string;
  service_type: string;
  type_name: string;
  appointment_date: string;
  appointment_time: string;
  scheduled_at: string;
  duration_minutes: number;
  notes?: string;
  external_ref?: string;
  customer_id: string;
  doctor_id: string;
  created_at: string;
  cost?: number;
}

export interface MockDoctor {
  id: string;
  name: string;
  specialization: string;
}

export interface MockService {
  id: string;
  name: string;
  price: number;
  duration_minutes: number;
}

export interface MockClaim {
  id: string;
  patientName: string;
  claimType: string;
  amount: number;
  status: string;
  date: string;
  customer_id: string;
  claim_amount: number;
  submitted_date: string;
  external_ref: string;
  customer_name: string;
  insurance_provider: string;
  service_type: string;
  treatment_date: string;
  diagnosis: string;
  notes: string;
  created_at: string;
}

export interface MockFollowUp {
  id: string;
  patientName: string;
  type: string;
  date: string;
  notes: string;
  status: string;
  customer_name: string;
  staff_name: string;
  note: string;
  method: 'phone' | 'line' | 'email' | 'visit';
  result: 'contacted' | 'no_answer' | 'interested' | 'not_interested' | 'scheduled';
  next_follow_date?: string;
  scheduled_date?: string;
  created_at: string;
}

export interface MockTreatment {
  id: string;
  patientName: string;
  treatment: string;
  date: string;
  doctor: string;
  customer_id: string;
  customer_name: string;
  service_name: string;
  doctor_name: string;
  treatment_date: string;
  notes?: string;
  status: string;
}

export interface MockInvoice {
  id: string;
  patientName: string;
  amount: number;
  date: string;
  status: string;
  customer_id: string;
  external_ref?: string;
  payment_method_name?: string;
  created_at?: string;
  items?: Array<{ name: string; quantity: number; price: number }>;
  total_amount?: number;
  payment_status?: string;
}

export const mockPatients: MockPatient[] = [
  {
    id: 'P001',
    name: 'สมชาย รักดี',
    phone: '081-234-5678',
    email: 'somchai@email.com',
    gender: 'male',
    dob: '1985-03-15',
    created_at: '2024-01-01',
    visual_acuity_right: '20/20',
    visual_acuity_left: '20/25',
    medical_history: 'เบาหวาน',
    allergies: 'ยาปฏิชีวนะ',
    insurance_provider: 'บริษัทประกันสุขภาพ ABC',
    address: {
      street: '123 หมู่ 1 ถนนสุขุมวิท',
      district: 'วัฒนา',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110'
    },
    emergency_contact: {
      name: 'สุดา รักดี',
      relationship: 'ภรรยา',
      phone: '082-345-6789'
    }
  }
];

export const mockStaffMembers: StaffMember[] = [
  {
    id: 'S001',
    name: 'นพ.วิชัย ใสใจ',
    role: 'แพทย์',
    email: 'doctor@clinic.com',
    phone: '081-111-1111'
  }
];

export const mockTasks: ExtendedTask[] = [
  {
    id: 'T001',
    title: 'ตรวจสอบอุปกรณ์การแพทย์',
    description: 'ตรวจสอบและบำรุงรักษาอุปกรณ์การแพทย์',
    assigned_to: 'S001',
    status: 'pending',
    priority: 'high',
    due_date: '2024-01-20',
    category: 'administrative',
    created_at: '2024-01-15',
    updated_at: '2024-01-15'
  }
];

export const mockAppointments: MockAppointment[] = [
  {
    id: 'A001',
    patientName: 'สมชาย รักดี',
    doctorName: 'นพ.วิชัย ใสใจ',
    date: '2024-01-15',
    time: '09:00',
    service: 'ตรวจสายตาทั่วไป',
    status: 'confirmed',
    customerName: 'สมชาย รักดี',
    customerPhone: '081-234-5678',
    branch: 'สาขาหลัก',
    customer_name: 'สมชาย รักดี',
    doctor_name: 'นพ.วิชัย ใสใจ',
    service_type: 'ตรวจสายตาทั่วไป',
    type_name: 'ตรวจสายตาทั่วไป',
    appointment_date: '2024-01-15',
    appointment_time: '09:00',
    scheduled_at: '2024-01-15T09:00:00',
    duration_minutes: 60,
    notes: 'ผู้ป่วยมีอาการสายตาสั้น',
    external_ref: 'EXT001',
    customer_id: 'P001',
    doctor_id: 'D001',
    created_at: '2024-01-01',
    cost: 2500
  }
];

export const mockDoctors: MockDoctor[] = [
  {
    id: 'D001',
    name: 'นพ.วิชัย ใสใจ',
    specialization: 'จักษุแพทย์'
  }
];

export const mockServices: MockService[] = [
  {
    id: 'S001',
    name: 'ตรวจสายตาทั่วไป',
    price: 1500,
    duration_minutes: 60
  }
];

export const mockClaims: MockClaim[] = [
  {
    id: 'C001',
    patientName: 'สมชาย รักดี',
    claimType: 'ประกันสุขภาพ',
    amount: 1500,
    status: 'approved',
    date: '2024-01-15',
    customer_id: 'P001',
    claim_amount: 1500,
    submitted_date: '2024-01-15',
    external_ref: 'CLM001',
    customer_name: 'สมชาย รักดี',
    insurance_provider: 'บริษัทประกันสุขภาพ ABC',
    service_type: 'ตรวจสายตาทั่วไป',
    treatment_date: '2024-01-15',
    diagnosis: 'สายตาสั้น',
    notes: 'ผู้ป่วยต้องการใช้ประกันเคลม',
    created_at: '2024-01-15'
  }
];

export const mockFollowUps: MockFollowUp[] = [
  {
    id: 'F001',
    patientName: 'สมชาย รักดี',
    type: 'ตรวจตาม',
    date: '2024-01-20',
    notes: 'ตรวจตามผลการรักษา',
    status: 'pending',
    customer_name: 'สมชาย รักดี',
    staff_name: 'นพ.วิชัย ใสใจ',
    note: 'ตรวจตามผลการรักษา',
    method: 'phone',
    result: 'contacted',
    next_follow_date: '2024-01-25',
    scheduled_date: '2024-01-20',
    created_at: '2024-01-20'
  }
];

export const mockTreatments: MockTreatment[] = [
  {
    id: 'T001',
    patientName: 'สมชาย รักดี',
    treatment: 'ตรวจสายตา',
    date: '2024-01-15',
    doctor: 'นพ.วิชัย ใสใจ',
    customer_id: 'P001',
    customer_name: 'สมชาย รักดี',
    service_name: 'ตรวจสายตา',
    doctor_name: 'นพ.วิชัย ใสใจ',
    treatment_date: '2024-01-15',
    notes: 'ผู้ป่วยมีอาการสายตาสั้น',
    status: 'completed'
  }
];

export const mockInvoices: MockInvoice[] = [
  {
    id: 'I001',
    patientName: 'สมชาย รักดี',
    amount: 1500,
    date: '2024-01-15',
    status: 'paid',
    customer_id: 'P001',
    external_ref: 'INV001',
    payment_method_name: 'เงินสด',
    created_at: '2024-01-15',
    items: [
      { name: 'ตรวจสายตา', quantity: 1, price: 1500 }
    ],
    total_amount: 1500,
    payment_status: 'paid'
  }
];
