
export interface Patient {
  id: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  status: 'active' | 'inactive';
  address: {
    street: string;
    district: string;
    province: string;
    postalCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory: {
    allergies: string[];
    chronicDiseases: string[];
    currentMedications: string[];
    bloodType?: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  notes?: string;
}

export interface Appointment {
  id: string;
  patient: {
    fullName: string;
    age: number;
    gender: 'male' | 'female';
    phone: string;
    email?: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  serviceType: string;
  branchName: string;
  duration: number;
  status: 'confirmed' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
  cost?: number;
  paymentStatus?: 'paid' | 'pending' | 'partial' | 'cancelled';
  followUpRequired?: boolean;
  followUpDate?: string;
}

export const mockPatients: Patient[] = [
  {
    id: 'P001',
    fullName: 'สมชาย รักดี',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    phone: '081-234-5678',
    email: 'somchai@email.com',
    status: 'active',
    address: {
      street: '123 หมู่ 1 ถนนสุขุมวิท',
      district: 'วัฒนา',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110'
    },
    emergencyContact: {
      name: 'สุดา รักดี',
      relationship: 'ภรรยา',
      phone: '082-345-6789'
    },
    medicalHistory: {
      allergies: ['ยาปฏิชีวนะ'],
      chronicDiseases: ['เบาหวาน'],
      currentMedications: ['Metformin'],
      bloodType: 'A+'
    }
  }
];

export const appointments: Appointment[] = [
  {
    id: 'A001',
    patient: {
      fullName: 'สมชาย รักดี',
      age: 38,
      gender: 'male',
      phone: '081-234-5678',
      email: 'somchai@email.com'
    },
    appointmentDate: '2024-01-15',
    appointmentTime: '09:00',
    doctorName: 'นพ.วิชัย ใสใจ',
    serviceType: 'ตรวจสายตาทั่วไป',
    branchName: 'สาขาหลัก',
    duration: 30,
    status: 'confirmed',
    reason: 'ตรวจสายตาประจำปี',
    cost: 1500,
    paymentStatus: 'paid'
  }
];
