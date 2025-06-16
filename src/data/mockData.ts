export interface DoctorPerformance {
  id: string;
  name: string;
  specialization: string;
  patients: number;
  revenue: number;
  appointments: number;
  satisfaction: number;
  utilization: number;
}

export const doctorPerformanceData: DoctorPerformance[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    specialization: 'Ophthalmology',
    patients: 120,
    revenue: 450000,
    appointments: 150,
    satisfaction: 95,
    utilization: 88
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    specialization: 'Optometry',
    patients: 95,
    revenue: 380000,
    appointments: 120,
    satisfaction: 92,
    utilization: 85
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    specialization: 'Ophthalmology',
    patients: 110,
    revenue: 420000,
    appointments: 140,
    satisfaction: 94,
    utilization: 90
  }
]; 

export interface AppointmentData {
  date: string;
  booked: number;
  completed: number;
  cancelled: number;
  noShow: number;
}

export interface BranchPerformance {
  id: string;
  name: string;
  revenue: number;
  growth: number;
  patients: number;
  appointments: number;
  utilization: number;
}

export interface CustomerDemographic {
  ageGroup: string;
  count: number;
  percentage: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  target?: number;
  growth: number;
}

export interface ServicePerformance {
  serviceId: string;
  serviceName: string;
  revenue: number;
  appointments: number;
  growth: number;
}

export interface PaymentMethodData {
  methodId: string;
  methodName: string;
  amount: number;
  count: number;
  percentage: number;
}

export const appointmentData: AppointmentData[] = [
  {
    date: '2024-01-01',
    booked: 45,
    completed: 40,
    cancelled: 3,
    noShow: 2
  },
  {
    date: '2024-01-02',
    booked: 52,
    completed: 48,
    cancelled: 2,
    noShow: 2
  }
];

export const branchPerformance: BranchPerformance[] = [
  {
    id: '1',
    name: 'สาขาหลัก',
    revenue: 1500000,
    growth: 12.5,
    patients: 450,
    appointments: 600,
    utilization: 85
  },
  {
    id: '2',
    name: 'สาขาดาวน์ทาวน์',
    revenue: 1200000,
    growth: 8.3,
    patients: 380,
    appointments: 500,
    utilization: 78
  }
];

export const customerDemographics: CustomerDemographic[] = [
  {
    ageGroup: '18-25',
    count: 150,
    percentage: 20
  },
  {
    ageGroup: '26-35',
    count: 225,
    percentage: 30
  },
  {
    ageGroup: '36-45',
    count: 180,
    percentage: 24
  },
  {
    ageGroup: '46-55',
    count: 120,
    percentage: 16
  },
  {
    ageGroup: '56+',
    count: 75,
    percentage: 10
  }
];

export const revenueData: RevenueData[] = [
  {
    date: '2024-01-01',
    revenue: 125000,
    target: 120000,
    growth: 8.5
  },
  {
    date: '2024-01-02',
    revenue: 135000,
    target: 125000,
    growth: 12.3
  }
];

export const servicePerformance: ServicePerformance[] = [
  {
    serviceId: 'S001',
    serviceName: 'ตรวจสายตาทั่วไป',
    revenue: 450000,
    appointments: 300,
    growth: 15.2
  },
  {
    serviceId: 'S002',
    serviceName: 'ผ่าตัดต้อกระจก',
    revenue: 800000,
    appointments: 80,
    growth: 8.7
  }
];

export const paymentMethodData: PaymentMethodData[] = [
  {
    methodId: 'cash',
    methodName: 'เงินสด',
    amount: 450000,
    count: 120,
    percentage: 35
  },
  {
    methodId: 'card',
    methodName: 'บัตรเครดิต',
    amount: 650000,
    count: 180,
    percentage: 45
  },
  {
    methodId: 'transfer',
    methodName: 'โอนเงิน',
    amount: 200000,
    count: 60,
    percentage: 20
  }
];
