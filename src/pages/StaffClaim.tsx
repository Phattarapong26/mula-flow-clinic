
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffClaimDashboard from '@/components/staff/claim/StaffClaimDashboard';
import StaffClaimCreate from '@/components/staff/claim/StaffClaimCreate';
import StaffClaimHistory from '@/components/staff/claim/StaffClaimHistory';
import StaffClaimTracking from '@/components/staff/claim/StaffClaimTracking';

const StaffClaim = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ระบบเคลม</h1>
          <p className="text-gray-600">จัดการเคลมประกันและการเรียกร้องค่าสินไหมทดแทน</p>
        </div>
        
        <Routes>
          <Route index element={<StaffClaimDashboard />} />
          <Route path="create" element={<StaffClaimCreate />} />
          <Route path="history" element={<StaffClaimHistory />} />
          <Route path="tracking" element={<StaffClaimTracking />} />
        </Routes>
      </div>
    </div>
  );
};

export default StaffClaim;
