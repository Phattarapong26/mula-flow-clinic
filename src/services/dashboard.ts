import apiService from './api';
import { z } from 'zod';

// Validation schemas
export const overviewSchema = z.object({
  todayAppointments: z.number(),
  todayPatients: z.number(),
  todayRevenue: z.number(),
  todayEyeExams: z.number(),
  todayGlassesOrders: z.number(),
  todayPendingClaims: z.number(),
  monthlyRevenue: z.number(),
  monthlyGrowth: z.number(),
  monthlyAppointments: z.number(),
  monthlyPatients: z.number(),
  monthlyEyeExams: z.number(),
  monthlyGlassesOrders: z.number(),
  monthlyPendingClaims: z.number(),
  yearlyRevenue: z.number(),
  yearlyGrowth: z.number(),
  yearlyAppointments: z.number(),
  yearlyPatients: z.number(),
  yearlyEyeExams: z.number(),
  yearlyGlassesOrders: z.number(),
  yearlyPendingClaims: z.number()
});

export const revenueSchema = z.object({
  monthlyData: z.array(z.object({
    target: z.number(),
    month: z.string(),
    revenue: z.number(),
    growth: z.number(),
    appointments: z.number(),
    patients: z.number()
  })),
  branchData: z.array(z.object({
    name: z.string(),
    revenue: z.number(),
    growth: z.number()
  })),
  serviceData: z.array(z.object({
    name: z.string(),
    revenue: z.number(),
    percentage: z.number()
  }))
});

export const servicePerformanceSchema = z.array(z.object({
  name: z.string(),
  color: z.string(),
  percentage: z.number()
}));

export const salesTimelineSchema = z.array(z.object({
  time: z.string(),
  doctor: z.string(),
  amount: z.number(),
  patient: z.string(),
  service: z.string()
}));

export const runwaySchema = z.object({
  currentRunway: z.number(),
  previousRunway: z.number(),
  cashOnHand: z.number(),
  burnRate: z.number(),
  history: z.array(z.object({
    month: z.string(),
    cashOnHand: z.number(),
    burnRate: z.number(),
    runway: z.number()
  })),
  projection: z.array(z.object({
    month: z.string(),
    cash: z.number(),
    type: z.enum(['actual', 'projection'])
  })),
  scenarios: z.array(z.object({
    name: z.string(),
    burnRate: z.number(),
    runway: z.number(),
    status: z.enum(['excellent', 'good', 'warning', 'danger'])
  })),
  mitigationActions: z.array(z.object({
    name: z.string(),
    impact: z.number(),
    newRunway: z.number(),
    difficulty: z.enum(['easy', 'medium', 'hard'])
  })),
  criticalActions: z.object({
    shortTerm: z.array(z.string()),
    mediumTerm: z.array(z.string()),
    longTerm: z.array(z.string())
  })
});

export const netProfitSchema = z.object({
  currentProfit: z.number(),
  previousProfit: z.number(),
  profitMargin: z.number(),
  history: z.array(z.object({
    month: z.string(),
    profit: z.number()
  })),
  comparison: z.array(z.object({
    month: z.string(),
    revenue: z.number(),
    expenses: z.number()
  })),
  analysis: z.array(z.object({
    title: z.string(),
    description: z.string(),
    impact: z.number()
  })),
  recommendations: z.object({
    revenue: z.array(z.string()),
    expenses: z.array(z.string()),
    efficiency: z.array(z.string())
  })
});

export const kpiSchema = z.object({
  revenue: z.object({
    current: z.number(),
    change: z.number(),
    history: z.array(z.object({
      month: z.string(),
      amount: z.number()
    }))
  }),
  patients: z.object({
    current: z.number(),
    change: z.number()
  }),
  exams: z.object({
    current: z.number(),
    change: z.number()
  }),
  claims: z.object({
    current: z.number(),
    change: z.number()
  }),
  comparison: z.array(z.object({
    month: z.string(),
    patients: z.number(),
    exams: z.number(),
    claims: z.number()
  })),
  analysis: z.array(z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['good', 'warning', 'critical']),
    progress: z.number()
  })),
  recommendations: z.object({
    revenue: z.array(z.string()),
    patients: z.array(z.string()),
    efficiency: z.array(z.string())
  })
});

export const growthRateSchema = z.object({
  revenue: z.object({
    current: z.number(),
    growth: z.number(),
    history: z.array(z.object({
      month: z.string(),
      growth: z.number()
    }))
  }),
  patients: z.object({
    current: z.number(),
    growth: z.number()
  }),
  exams: z.object({
    current: z.number(),
    growth: z.number()
  }),
  claims: z.object({
    current: z.number(),
    growth: z.number()
  }),
  comparison: z.array(z.object({
    month: z.string(),
    patients: z.number(),
    exams: z.number(),
    claims: z.number()
  })),
  analysis: z.array(z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['good', 'warning', 'critical']),
    progress: z.number()
  })),
  recommendations: z.object({
    revenue: z.array(z.string()),
    patients: z.array(z.string()),
    efficiency: z.array(z.string())
  })
});

export const burnRateSchema = z.object({
  currentBurnRate: z.number(),
  monthlyAverage: z.number(),
  projectedBurnRate: z.number(),
  history: z.array(z.object({
    date: z.string(),
    burnRate: z.number()
  })),
  analysis: z.array(z.object({
    title: z.string(),
    description: z.string()
  })),
  recommendations: z.array(z.object({
    title: z.string(),
    description: z.string()
  }))
});

export const alertsSchema = z.object({
  metrics: z.array(z.object({
    name: z.string(),
    value: z.union([z.string(), z.number()]),
    change: z.string(),
    trend: z.enum(['up', 'down'])
  })),
  criticalAlerts: z.array(z.object({
    id: z.number(),
    type: z.enum(['critical', 'warning', 'info']),
    title: z.string(),
    description: z.string(),
    impact: z.enum(['high', 'medium', 'low']),
    timestamp: z.string(),
    category: z.string(),
    actionRequired: z.boolean(),
    resolved: z.boolean()
  })),
  alerts: z.array(z.object({
    id: z.number(),
    type: z.enum(['critical', 'warning', 'info']),
    title: z.string(),
    description: z.string(),
    impact: z.enum(['high', 'medium', 'low']),
    timestamp: z.string(),
    category: z.string(),
    actionRequired: z.boolean(),
    resolved: z.boolean()
  })),
  categories: z.array(z.object({
    name: z.string(),
    count: z.number(),
    critical: z.number()
  })),
  history: z.array(z.object({
    date: z.string(),
    total: z.number(),
    resolved: z.number(),
    critical: z.number()
  })),
  quickActions: z.array(z.object({
    title: z.string(),
    items: z.array(z.string()),
    bgColor: z.string(),
    borderColor: z.string(),
    textColor: z.string()
  }))
});

export const doctorPerformanceSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  specialization: z.string(),
  patients: z.number(),
  revenue: z.number(),
  appointments: z.number(),
  satisfaction: z.number(),
  utilization: z.number()
}));

export type RunwayData = z.infer<typeof runwaySchema>;
export type NetProfitData = z.infer<typeof netProfitSchema>;
export type KPIData = z.infer<typeof kpiSchema>;
export type GrowthRateData = z.infer<typeof growthRateSchema>;
export type BurnRateData = z.infer<typeof burnRateSchema>;
export type AlertsData = z.infer<typeof alertsSchema>;
export type DoctorPerformanceData = z.infer<typeof doctorPerformanceSchema>;

export type OverviewData = z.infer<typeof overviewSchema>;
export type RevenueData = z.infer<typeof revenueSchema>;
export type ServicePerformanceData = z.infer<typeof servicePerformanceSchema>;
export type SalesTimelineData = z.infer<typeof salesTimelineSchema>;

// API endpoints
const endpoints = {
  overview: '/dashboard/overview',
  revenue: '/dashboard/revenue',
  servicePerformance: '/dashboard/service-performance',
  salesTimeline: '/dashboard/sales-timeline',
  runway: '/dashboard/runway',
  netProfit: '/dashboard/net-profit',
  kpi: '/dashboard/kpi',
  growthRate: '/dashboard/growth-rate',
  burnRate: '/dashboard/burn-rate',
  alerts: '/dashboard/alerts',
  doctorPerformance: '/dashboard/doctor-performance'
};

// API service
export const dashboardService = {
  async getOverview(): Promise<OverviewData> {
    const response = await apiService.get(endpoints.overview);
    return overviewSchema.parse(response);
  },

  async getRevenue(): Promise<RevenueData> {
    const response = await apiService.get(endpoints.revenue);
    return revenueSchema.parse(response);
  },

  async getServicePerformance(): Promise<ServicePerformanceData> {
    const response = await apiService.get(endpoints.servicePerformance);
    return servicePerformanceSchema.parse(response);
  },

  async getSalesTimeline(): Promise<SalesTimelineData> {
    const response = await apiService.get(endpoints.salesTimeline);
    return salesTimelineSchema.parse(response);
  },

  getRunway: async () => {
    const response = await apiService.get(endpoints.runway);
    return runwaySchema.parse(response);
  },

  getNetProfit: async () => {
    const response = await apiService.get(endpoints.netProfit);
    return netProfitSchema.parse(response);
  },

  getKPI: async () => {
    const response = await apiService.get(endpoints.kpi);
    return kpiSchema.parse(response);
  },

  getGrowthRate: async () => {
    const response = await apiService.get(endpoints.growthRate);
    return growthRateSchema.parse(response);
  },

  getBurnRate: async (): Promise<BurnRateData> => {
    const response = await apiService.get(endpoints.burnRate);
    return burnRateSchema.parse(response);
  },

  async getAlerts(): Promise<AlertsData> {
    const response = await apiService.get(endpoints.alerts);
    return alertsSchema.parse(response);
  },

  async getDoctorPerformance(): Promise<DoctorPerformanceData> {
    const response = await apiService.get(endpoints.doctorPerformance);
    return doctorPerformanceSchema.parse(response);
  }
}; 