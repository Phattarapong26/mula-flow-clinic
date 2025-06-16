
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffInvoicesList from '@/components/staff/invoicing/StaffInvoicesList';
import StaffInvoiceCreate from '@/components/staff/invoicing/StaffInvoiceCreate';
import StaffPaymentProcess from '@/components/staff/invoicing/StaffPaymentProcess';

const StaffInvoicing = () => {
  return (
    <div className="space-y-6">
      <Routes>
        <Route index element={<StaffInvoicesList />} />
        <Route path="create" element={<StaffInvoiceCreate />} />
        <Route path="payment" element={<StaffPaymentProcess />} />
      </Routes>
    </div>
  );
};

export default StaffInvoicing;
