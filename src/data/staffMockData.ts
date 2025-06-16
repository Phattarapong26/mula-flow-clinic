
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
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface ExtendedTask {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string;
  category: string;
  created_at: string;
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
    insurance_provider: 'บริษัทประกันสุขภาพ ABC'
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
    category: 'maintenance',
    created_at: '2024-01-15'
  }
];
