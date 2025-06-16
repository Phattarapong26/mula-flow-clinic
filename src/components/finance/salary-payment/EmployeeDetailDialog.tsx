
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EmployeeDetailDialogProps {
  employee: any;
  isOpen: boolean;
  onClose: () => void;
  onPay?: () => void;
}

const EmployeeDetailDialog: React.FC<EmployeeDetailDialogProps> = ({
  employee,
  isOpen,
  onClose,
  onPay
}) => {
  if (!isOpen || !employee) return null;

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

  const payrollHistory = [
    { month: 'พ.ค. 68', amount: employee.netSalary - 5000, status: 'จ่ายแล้ว' },
    { month: 'เม.ย. 68', amount: employee.netSalary - 10000, status: 'จ่ายแล้ว' },
    { month: 'มี.ค. 68', amount: employee.netSalary, status: 'จ่ายแล้ว' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>รายละเอียดพนักงาน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Employee Info */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{employee.employeeName}</h3>
              <p className="text-gray-600">{employee.position}</p>
              <p className="text-sm text-gray-500">รหัสพนักงาน: EMP{employee.id.toString().padStart(3, '0')}</p>
            </div>
            <Badge className={getStatusColor(employee.status)}>
              {employee.status}
            </Badge>
          </div>

          {/* Salary Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">รายละเอียดเงินเดือนประจำเดือน</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between py-1">
                  <span>เงินเดือนพื้นฐาน:</span>
                  <span>{formatCurrency(employee.baseSalary)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>ค่าล่วงเวลา:</span>
                  <span>{formatCurrency(employee.overtime)}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between py-1">
                  <span>โบนัส:</span>
                  <span>{formatCurrency(employee.bonus)}</span>
                </div>
                <div className="flex justify-between py-1 text-red-600">
                  <span>หัก:</span>
                  <span>-{formatCurrency(employee.deductions)}</span>
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>รวมสุทธิ:</span>
              <span>{formatCurrency(employee.netSalary)}</span>
            </div>
          </div>

          {/* Payment History */}
          <div>
            <h4 className="font-medium mb-3">ประวัติการจ่ายเงินเดือน</h4>
            <div className="space-y-2">
              {payrollHistory.map((record, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <span>{record.month}</span>
                  <span>{formatCurrency(record.amount)}</span>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              ปิด
            </Button>
            {employee.status === 'รอจ่าย' && onPay && (
              <Button 
                onClick={() => {
                  onPay();
                  onClose();
                }}
                className="flex-1"
              >
                จ่ายเงินเดือน
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDetailDialog;
