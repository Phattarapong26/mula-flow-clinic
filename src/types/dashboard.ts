export interface DashboardStats {
  totalCustomers: number;
  totalRevenue: number;
  appointmentsToday: number;
  activeServices: number;
  pendingPayments: number;
  completedTreatments: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface ServicePerformance {
  name: string;
  revenue: number;
  bookings: number;
  growthRate: number;
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
  name: string;
  appointments: number;
  revenue: number;
  rating: number;
  specialization: string;
}

export interface BranchPerformance {
  name: string;
  revenue: number;
  customers: number;
  appointments: number;
  growth: number;
}

export interface PaymentMethodData {
  method: string;
  count: number;
  amount: number;
  percentage: number;
}
