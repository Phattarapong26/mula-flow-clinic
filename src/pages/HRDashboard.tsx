
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, DollarSign, FileText } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Import existing components
import StaffCount from '@/components/hr/StaffCount';
import TurnoverRate from '@/components/hr/TurnoverRate';
import PayrollLoad from '@/components/hr/PayrollLoad';
import RevenuePerStaff from '@/components/hr/RevenuePerStaff';
import TopPerformance from '@/components/hr/TopPerformance';

// Import new components
import AllStaff from '@/components/hr/AllStaff';
import StaffShifts from '@/components/hr/StaffShifts';
import LeaveAttendance from '@/components/hr/LeaveAttendance';
import SalaryApproval from '@/components/hr/SalaryApproval';

const HRDashboard = () => {
  const location = useLocation();

  return (
    <div className="p-6 space-y-6">
      <Routes>
        <Route path="/all-staff" element={<AllStaff />} />
        <Route path="/staff-shifts" element={<StaffShifts />} />
        <Route path="/leave-attendance" element={<LeaveAttendance />} />
        <Route path="/individual-performance" element={<TopPerformance />} />
        <Route path="/staff-history" element={<div className="text-center p-8"><h2 className="text-xl">ประวัติพนักงาน - กำลังพัฒนา</h2></div>} />
        <Route path="/salary-approval" element={<SalaryApproval />} />
        <Route path="/staff-count" element={<StaffCount />} />
        <Route path="/turnover" element={<TurnoverRate />} />
        <Route path="/payroll" element={<PayrollLoad />} />
        <Route path="/revenue-per-staff" element={<RevenuePerStaff />} />
        <Route path="/top-performance" element={<TopPerformance />} />
        <Route index element={
          <div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ระบบ HR/OD</h1>
              <p className="text-gray-600 mt-1">จัดการบุคลากรและการพัฒนาองค์กร</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">พนักงานทั้งหมด</p>
                      <p className="text-2xl font-bold">38</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">ปฏิบัติงาน</p>
                      <p className="text-2xl font-bold">36</p>
                    </div>
                    <UserPlus className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100">Turnover Rate</p>
                      <p className="text-2xl font-bold">7.2%</p>
                    </div>
                    <FileText className="h-8 w-8 text-yellow-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">รายได้ต่อคน</p>
                      <p className="text-2xl font-bold">฿89K</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">กรุณาเลือกเมนูจากแถบด้านข้างเพื่อดูรายละเอียด</p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default HRDashboard;
