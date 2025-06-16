
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardRevenue from '@/components/dashboard/DashboardRevenue';
import DashboardSalesTimeline from '@/components/dashboard/DashboardSalesTimeline';
import DashboardNetProfit from '@/components/dashboard/DashboardNetProfit';
import DashboardBurnRate from '@/components/dashboard/DashboardBurnRate';
import DashboardRunway from '@/components/dashboard/DashboardRunway';
import DashboardGrowthRate from '@/components/dashboard/DashboardGrowthRate';
import DashboardKPI from '@/components/dashboard/DashboardKPI';
import DashboardAlerts from '@/components/dashboard/DashboardAlerts';

const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="revenue" element={<DashboardRevenue />} />
        <Route path="sales-timeline" element={<DashboardSalesTimeline />} />
        <Route path="net-profit" element={<DashboardNetProfit />} />
        <Route path="burn-rate" element={<DashboardBurnRate />} />
        <Route path="runway" element={<DashboardRunway />} />
        <Route path="growth-rate" element={<DashboardGrowthRate />} />
        <Route path="kpi" element={<DashboardKPI />} />
        <Route path="alerts" element={<DashboardAlerts />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
