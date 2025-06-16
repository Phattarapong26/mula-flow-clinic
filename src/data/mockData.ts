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