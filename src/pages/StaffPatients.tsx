
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffPatientsList from '@/components/staff/patients/StaffPatientsList';
import StaffPatientProfile from '@/components/staff/patients/StaffPatientProfile';
import StaffPatientCreate from '@/components/staff/patients/StaffPatientCreate';

const StaffPatients = () => {
  return (
    <div className="space-y-6">
      <Routes>
        <Route index element={<StaffPatientsList />} />
        <Route path="profile/:id" element={<StaffPatientProfile />} />
        <Route path="create" element={<StaffPatientCreate />} />
      </Routes>
    </div>
  );
};

export default StaffPatients;
