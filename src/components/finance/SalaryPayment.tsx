
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Download,
  Plus,
  Calendar,
  Users
} from 'lucide-react';

import PayrollStats from './salary-payment/PayrollStats';
import PayrollTable from './salary-payment/PayrollTable';
import PaymentConfirmationDialog from './salary-payment/PaymentConfirmationDialog';
import BulkPaymentDialog from './salary-payment/BulkPaymentDialog';
import EmployeeDetailDialog from './salary-payment/EmployeeDetailDialog';

const SalaryPayment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2025-06');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showBulkPayment, setShowBulkPayment] = useState(false);
  const [showEmployeeDetail, setShowEmployeeDetail] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      employeeName: 'นายสมชาย ใจดี',
      position: 'หมอตา',
      baseSalary: 45000,
      overtime: 5000,
      bonus: 8000,
      deductions: 2000,
      netSalary: 56000,
      status: 'จ่ายแล้ว',
      paymentDate: '2025-06-01'
    },
    {
      id: 2,
      employeeName: 'นางสาววิภา สวยงาม',
      position: 'พยาบาล',
      baseSalary: 25000,
      overtime: 3000,
      bonus: 2000,
      deductions: 1500,
      netSalary: 28500,
      status: 'รอจ่าย',
      paymentDate: null
    },
    {
      id: 3,
      employeeName: 'นายประเสริฐ มั่งมี',
      position: 'เจ้าหน้าที่',
      baseSalary: 18000,
      overtime: 2000,
      bonus: 1000,
      deductions: 1000,
      netSalary: 20000,
      status: 'รอจ่าย',
      paymentDate: null
    },
    {
      id: 4,
      employeeName: 'นางสาวจิรายุ มีสุข',
      position: 'เลขานุการ',
      baseSalary: 22000,
      overtime: 1500,
      bonus: 1500,
      deductions: 800,
      netSalary: 24200,
      status: 'รอจ่าย',
      paymentDate: null
    }
  ]);

  const totalSalary = payrollData.reduce((sum, emp) => sum + emp.netSalary, 0);
  const paidEmployees = payrollData.filter(emp => emp.status === 'จ่ายแล้ว').length;
  const pendingEmployees = payrollData.filter(emp => emp.status === 'รอจ่าย').length;

  const filteredData = payrollData.filter(emp =>
    emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePayEmployee = (employeeId: number) => {
    const employee = payrollData.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setShowPaymentDialog(true);
    }
  };

  const handleViewEmployee = (employeeId: number) => {
    const employee = payrollData.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setShowEmployeeDetail(true);
    }
  };

  const confirmPayment = () => {
    if (selectedEmployee) {
      setPayrollData(prev => 
        prev.map(emp => 
          emp.id === selectedEmployee.id 
            ? { ...emp, status: 'จ่ายแล้ว', paymentDate: new Date().toISOString().split('T')[0] }
            : emp
        )
      );
      setShowPaymentDialog(false);
      setSelectedEmployee(null);
    }
  };

  const handleBulkPayment = (selectedEmployeeIds: number[]) => {
    const currentDate = new Date().toISOString().split('T')[0];
    setPayrollData(prev => 
      prev.map(emp => 
        selectedEmployeeIds.includes(emp.id) 
          ? { ...emp, status: 'จ่ายแล้ว', paymentDate: currentDate }
          : emp
      )
    );
    setShowBulkPayment(false);
  };

  const exportReport = () => {
    console.log('Exporting payroll report for:', selectedMonth);
    // Add export functionality here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">จ่ายเงินเดือน</h1>
          <p className="text-gray-600">จัดการการจ่ายเงินเดือนและสวัสดิการพนักงาน</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            ส่งออกรายงาน
          </Button>
          <Button onClick={() => setShowBulkPayment(true)}>
            <Users className="h-4 w-4 mr-2" />
            จ่ายหลายคน
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            จ่ายเงินเดือนใหม่
          </Button>
        </div>
      </div>

      <PayrollStats 
        totalEmployees={payrollData.length}
        paidEmployees={paidEmployees}
        pendingEmployees={pendingEmployees}
        totalSalary={totalSalary}
      />

      {/* Filter Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาพนักงาน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-2 border rounded-lg"
              >
                <option value="2025-06">มิถุนายน 2568</option>
                <option value="2025-05">พฤษภาคม 2568</option>
                <option value="2025-04">เมษายน 2568</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <PayrollTable 
        employees={filteredData}
        selectedMonth={selectedMonth}
        onPayEmployee={handlePayEmployee}
        onViewEmployee={handleViewEmployee}
      />

      <PaymentConfirmationDialog
        employee={selectedEmployee}
        isOpen={showPaymentDialog}
        onConfirm={confirmPayment}
        onCancel={() => {
          setShowPaymentDialog(false);
          setSelectedEmployee(null);
        }}
      />

      <BulkPaymentDialog
        employees={payrollData}
        isOpen={showBulkPayment}
        onConfirm={handleBulkPayment}
        onCancel={() => setShowBulkPayment(false)}
      />

      <EmployeeDetailDialog
        employee={selectedEmployee}
        isOpen={showEmployeeDetail}
        onClose={() => {
          setShowEmployeeDetail(false);
          setSelectedEmployee(null);
        }}
        onPay={() => handlePayEmployee(selectedEmployee?.id)}
      />
    </div>
  );
};

export default SalaryPayment;
