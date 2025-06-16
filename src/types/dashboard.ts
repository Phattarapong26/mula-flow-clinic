
export interface DashboardStats {
  totalRevenue: number;
  totalAppointments: number;
  totalCustomers: number;
  totalServices: number;
  revenueGrowth: number;
  appointmentGrowth: number;
  customerGrowth: number;
  averageOrderValue: number;
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

export interface AppointmentData {
  date: string;
  booked: number;
  completed: number;
  cancelled: number;
  noShow: number;
}

export interface CustomerDemographic {
  ageGroup: string;
  count: number;
  percentage: number;
}

export interface DoctorPerformance {
  doctorId: string;
  doctorName: string;
  appointments: number;
  revenue: number;
  rating: number;
}

export interface BranchPerformance {
  branchId: string;
  branchName: string;
  revenue: number;
  appointments: number;
  utilization: number;
}

export interface PaymentMethodData {
  methodId: string;
  methodName: string;
  amount: number;
  count: number;
  percentage: number;
}
