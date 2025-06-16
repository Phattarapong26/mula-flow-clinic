
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffFollowupList from '@/components/staff/followup/StaffFollowupList';
import StaffFollowupCreate from '@/components/staff/followup/StaffFollowupCreate';
import StaffCrmTasks from '@/components/staff/followup/StaffCrmTasks';

const StaffFollowup = () => {
  return (
    <div className="space-y-6">
      <Routes>
        <Route index element={<StaffFollowupList />} />
        <Route path="create" element={<StaffFollowupCreate />} />
        <Route path="tasks" element={<StaffCrmTasks />} />
      </Routes>
    </div>
  );
};

export default StaffFollowup;
