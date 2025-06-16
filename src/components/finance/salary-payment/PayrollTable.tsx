
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Employee {
  id: number;
  employeeName: string;
  position: string;
  baseSalary: number;
  overtime: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: string;
  paymentDate: string | null;
}

interface PayrollTableProps {
  employees: Employee[];
  selectedMonth: string;
  onPayEmployee: (employeeId: number) => void;
  onViewEmployee: (employeeId: number) => void;
}

const PayrollTable: React.FC<PayrollTableProps> = ({
  employees,
  selectedMonth,
  onPayEmployee,
  onViewEmployee
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'จ่ายแล้ว': return 'bg-green-100 text-green-800';
      case 'รอจ่าย': return 'bg-yellow-100 text-yellow-800';
      case 'ยกเลิก': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>รายการเงินเดือน - {selectedMonth}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">ชื่อพนักงาน</th>
                <th className="text-left p-4">ตำแหน่ง</th>
                <th className="text-right p-4">เงินเดือนพื้นฐาน</th>
                <th className="text-right p-4">OT</th>
                <th className="text-right p-4">โบนัส</th>
                <th className="text-right p-4">หัก</th>
                <th className="text-right p-4">สุทธิ</th>
                <th className="text-center p-4">สถานะ</th>
                <th className="text-center p-4">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium">{employee.employeeName}</div>
                  </td>
                  <td className="p-4 text-gray-600">{employee.position}</td>
                  <td className="p-4 text-right">{formatCurrency(employee.baseSalary)}</td>
                  <td className="p-4 text-right">{formatCurrency(employee.overtime)}</td>
                  <td className="p-4 text-right">{formatCurrency(employee.bonus)}</td>
                  <td className="p-4 text-right text-red-600">{formatCurrency(employee.deductions)}</td>
                  <td className="p-4 text-right font-medium">{formatCurrency(employee.netSalary)}</td>
                  <td className="p-4 text-center">
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewEmployee(employee.id)}
                      >
                        ดู
                      </Button>
                      {employee.status === 'รอจ่าย' && (
                        <Button 
                          size="sm"
                          onClick={() => onPayEmployee(employee.id)}
                        >
                          จ่าย
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollTable;
