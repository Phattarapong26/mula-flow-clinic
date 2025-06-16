
export interface MockTreatment {
  id: string;
  customerName: string;
  serviceName: string;
  doctorName: string;
  treatmentDate: string;
  status: 'completed' | 'active' | 'cancelled';
  notes?: string;
}

export interface MockFollowup {
  id: string;
  patientName: string;
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  type: string;
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'follow_up' | 'appointment' | 'inventory' | 'administrative';
  priority: 'low' | 'medium' | 'high';
  assigned_to: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export const mockTreatments: MockTreatment[] = [
  {
    id: '1',
    customerName: 'สมชาย ใจดี',
    serviceName: 'ตรวจสายตา',
    doctorName: 'นพ.สมศักดิ์ วิชาการ',
    treatmentDate: '2024-01-15T10:00:00Z',
    status: 'completed',
    notes: 'ตรวจพบสายตาสั้น -2.00 D'
  },
  {
    id: '2',
    customerName: 'สมหญิง สวยงาม',
    serviceName: 'แว่นตา',
    doctorName: 'นพ.วิทยา รักษา',
    treatmentDate: '2024-01-16T14:30:00Z',
    status: 'active',
    notes: 'กำลังดำเนินการสั่งทำแว่น'
  }
];

export const mockFollowups: MockFollowup[] = [
  {
    id: '1',
    patientName: 'สมชาย ใจดี',
    scheduledDate: '2024-02-15T10:00:00Z',
    status: 'scheduled',
    type: 'ตรวจตาต่อเนื่อง',
    notes: 'ตรวจสุขภาพตาหลังใส่แว่น 1 เดือน'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'ติดตามผู้ป่วย',
    description: 'โทรติดตามผู้ป่วยหลังผ่าตัด',
    category: 'follow_up',
    priority: 'high',
    assigned_to: 'พยาบาลสมใจ',
    dueDate: '2024-01-20T17:00:00Z',
    status: 'pending',
    created_at: '2024-01-15T09:00:00Z'
  }
];

export const mockAppointments = [
  {
    id: '1',
    patientName: 'สมชาย ใจดี',
    appointmentDate: '2024-01-20T10:00:00Z',
    status: 'scheduled' as const,
    service: 'ตรวจสายตา',
    doctor: 'นพ.สมศักดิ์'
  }
];

export const mockClaims = [
  {
    id: '1',
    type: 'ค่าทำแว่น',
    amount: 5000,
    status: 'pending' as const,
    submittedDate: '2024-01-15T10:00:00Z',
    description: 'เบิกค่าทำแว่นตาพนักงาน'
  }
];
