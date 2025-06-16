
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffTasksList from '@/components/staff/tasks/StaffTasksList';
import StaffTasksCalendar from '@/components/staff/tasks/StaffTasksCalendar';
import StaffTasksAnalytics from '@/components/staff/tasks/StaffTasksAnalytics';
import StaffTasksCreate from '@/components/staff/tasks/StaffTasksCreate';

const StaffTasks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการงาน</h1>
          <p className="text-gray-600">บริหารจัดการงานและติดตามความคืบหน้า</p>
        </div>
        
        <Routes>
          <Route index element={<StaffTasksList />} />
          <Route path="calendar" element={<StaffTasksCalendar />} />
          <Route path="analytics" element={<StaffTasksAnalytics />} />
          <Route path="create" element={<StaffTasksCreate />} />
        </Routes>
      </div>
    </div>
  );
};

export default StaffTasks;
