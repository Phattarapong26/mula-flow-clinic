
import React from 'react';
import { DashboardRevenue } from '@/components/dashboard/DashboardRevenue';
import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { DashboardBurnRate } from '@/components/dashboard/DashboardBurnRate';
import { DashboardTopBranches } from '@/components/dashboard/DashboardTopBranches';
import { DashboardAppointments } from '@/components/dashboard/DashboardAppointments';
import { DashboardAlerts } from '@/components/dashboard/DashboardAlerts';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">แดชบอร์ด</h1>
      
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardRevenue />
        <DashboardBurnRate />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardTopBranches />
        <DashboardAppointments />
      </div>
      
      <DashboardAlerts />
    </div>
  );
};

export default Dashboard;
