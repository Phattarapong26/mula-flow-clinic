
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffTreatmentsList from '@/components/staff/treatments/StaffTreatmentsList';
import StaffTreatmentCreate from '@/components/staff/treatments/StaffTreatmentCreate';
import StaffTreatmentHistory from '@/components/staff/treatments/StaffTreatmentHistory';

const StaffTreatments = () => {
  return (
    <div className="space-y-6">
      <Routes>
        <Route index element={<StaffTreatmentsList />} />
        <Route path="create" element={<StaffTreatmentCreate />} />
        <Route path="history" element={<StaffTreatmentHistory />} />
      </Routes>
    </div>
  );
};

export default StaffTreatments;
