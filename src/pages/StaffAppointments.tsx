
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffAppointmentsList from '@/components/staff/appointments/StaffAppointmentsList';
import StaffAppointmentCreate from '@/components/staff/appointments/StaffAppointmentCreate';
import StaffAppointmentCalendar from '@/components/staff/appointments/StaffAppointmentCalendar';

const StaffAppointments = () => {
  return (
    <div className="space-y-6">
      <Routes>
        <Route index element={<StaffAppointmentsList />} />
        <Route path="calendar" element={<StaffAppointmentCalendar />} />
        <Route path="create" element={<StaffAppointmentCreate />} />
      </Routes>
    </div>
  );
};

export default StaffAppointments;
