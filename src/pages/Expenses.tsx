
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ExpensesDashboard from '@/components/expenses/ExpensesDashboard';
import ExpensesList from '@/components/expenses/ExpensesList';
import ExpensesCreate from '@/components/expenses/ExpensesCreate';
import ExpensesAnalytics from '@/components/expenses/ExpensesAnalytics';
import ExpensesCategories from '@/components/expenses/ExpensesCategories';
import MonthlyExpenses from '@/components/expenses/MonthlyExpenses';
import SalaryPayment from '@/components/finance/SalaryPayment';
import RecurringExpenses from '@/components/expenses/RecurringExpenses';
import VendorPayments from '@/components/expenses/VendorPayments';

const Expenses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการรายจ่าย</h1>
          <p className="text-gray-600">ระบบบริหารจัดการค่าใช้จ่ายและต้นทุน</p>
        </div>
        
        <Routes>
          <Route index element={<ExpensesDashboard />} />
          <Route path="monthly" element={<MonthlyExpenses />} />
          <Route path="payroll" element={<SalaryPayment />} />
          <Route path="recurring" element={<RecurringExpenses />} />
          <Route path="vendors" element={<VendorPayments />} />
          <Route path="pending-claims" element={<div>Coming Soon: เคลมที่ยังไม่ได้คืนเงิน</div>} />
          <Route path="anomalies" element={<div>Coming Soon: รายจ่ายผิดปกติ</div>} />
          <Route path="comparison" element={<div>Coming Soon: รายจ่ายเปรียบเทียบ</div>} />
          <Route path="list" element={<ExpensesList />} />
          <Route path="create" element={<ExpensesCreate />} />
          <Route path="analytics" element={<ExpensesAnalytics />} />
          <Route path="categories" element={<ExpensesCategories />} />
        </Routes>
      </div>
    </div>
  );
};

export default Expenses;
