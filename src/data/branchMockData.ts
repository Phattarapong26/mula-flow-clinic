export interface BranchPerformance {
  id: string;
  name: string;
  revenue: number;
  growth: number;
  patients: number;
  appointments: number;
  utilization: number;
  noShowRate: number;
}

export interface BranchTarget {
  month: string;
  revenueTarget: number;
  actualRevenue: number;
  customerTarget: number;
  actualCustomers: number;
  appointmentTarget: number;
  actualAppointments: number;
  achievementRate: number;
}

export const branchTargets: BranchTarget[] = [
  {
    month: 'March 2024',
    revenueTarget: 1500000,
    actualRevenue: 1650000,
    customerTarget: 400,
    actualCustomers: 420,
    appointmentTarget: 500,
    actualAppointments: 520,
    achievementRate: 110
  }
];

export const branchPerformanceData: BranchPerformance[] = [
  {
    id: '1',
    name: 'Main Branch',
    revenue: 1500000,
    growth: 12.5,
    patients: 450,
    appointments: 600,
    utilization: 85,
    noShowRate: 5
  },
  {
    id: '2',
    name: 'Downtown Branch',
    revenue: 1200000,
    growth: 8.3,
    patients: 380,
    appointments: 500,
    utilization: 78,
    noShowRate: 7
  },
  {
    id: '3',
    name: 'Suburban Branch',
    revenue: 900000,
    growth: 15.2,
    patients: 280,
    appointments: 350,
    utilization: 82,
    noShowRate: 4
  }
];

export interface Branch {
  id: string;
  name: string;
  manager: string;
  area: string;
  establishedDate: string;
  address: string;
  phone: string;
  totalStaff: number;
  monthlyRevenue: number;
  monthlyTarget: number;
  status: 'active' | 'inactive';
}

export const branches: Branch[] = [
  {
    id: '1',
    name: 'สาขาหลัก',
    manager: 'นายสมชาย ใจดี',
    area: 'กรุงเทพมหานคร',
    establishedDate: '2020-01-01',
    address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
    phone: '02-123-4567',
    totalStaff: 25,
    monthlyRevenue: 1500000,
    monthlyTarget: 1400000,
    status: 'active'
  },
  {
    id: '2',
    name: 'สาขาดาวน์ทาวน์',
    manager: 'นางสาวสุดา รักดี',
    area: 'กรุงเทพมหานคร',
    establishedDate: '2021-06-01',
    address: '456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500',
    phone: '02-234-5678',
    totalStaff: 18,
    monthlyRevenue: 1200000,
    monthlyTarget: 1100000,
    status: 'active'
  }
];
