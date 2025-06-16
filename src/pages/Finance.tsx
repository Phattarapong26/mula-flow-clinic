
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FinanceAlertSystem from '@/components/finance/FinanceAlertSystem';
import TotalRevenue from '@/components/finance/TotalRevenue';
import DoctorRevenue from '@/components/finance/DoctorRevenue';
import OutstandingDebt from '@/components/finance/OutstandingDebt';
import BurnRunway from '@/components/finance/BurnRunway';
import OwnerWithdrawal from '@/components/finance/OwnerWithdrawal';
import FinancialStatements from '@/components/finance/FinancialStatements';
import SalaryPayment from '@/components/finance/SalaryPayment';
import LensClaims from '@/components/finance/LensClaims';
import ServiceRevenue from '@/components/finance/ServiceRevenue';
import ChannelRevenue from '@/components/finance/ChannelRevenue';
import BranchRevenue from '@/components/finance/BranchRevenue';
import PopularPromotions from '@/components/finance/PopularPromotions';

const Finance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ระบบการเงิน</h1>
          <p className="text-gray-600">จัดการการเงิน การลงทุน และการวิเคราะห์ทางการเงิน</p>
        </div>
        
        <Routes>
          <Route index element={<FinanceAlertSystem />} />
          <Route path="total-revenue" element={<TotalRevenue />} />
          <Route path="service-revenue" element={<ServiceRevenue />} />
          <Route path="channel-revenue" element={<ChannelRevenue />} />
          <Route path="branch-revenue" element={<BranchRevenue />} />
          <Route path="popular-promotions" element={<PopularPromotions />} />
          <Route path="doctor-revenue" element={<DoctorRevenue />} />
          <Route path="outstanding-debt" element={<OutstandingDebt />} />
          <Route path="burn-runway" element={<BurnRunway />} />
          <Route path="owner-withdrawal" element={<OwnerWithdrawal />} />
          <Route path="financial-statements" element={<FinancialStatements />} />
          <Route path="salary-payment" element={<SalaryPayment />} />
          <Route path="lens-claims" element={<LensClaims />} />
        </Routes>
      </div>
    </div>
  );
};

export default Finance;
