
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentConfirmationDialogProps {
  employee: any;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const PaymentConfirmationDialog: React.FC<PaymentConfirmationDialogProps> = ({
  employee,
  isOpen,
  onConfirm,
  onCancel
}) => {
  if (!isOpen || !employee) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ยืนยันการจ่ายเงินเดือน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-lg">{employee.employeeName}</h3>
            <p className="text-gray-600">{employee.position}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>เงินเดือนพื้นฐาน:</span>
              <span>{formatCurrency(employee.baseSalary)}</span>
            </div>
            <div className="flex justify-between">
              <span>OT:</span>
              <span>{formatCurrency(employee.overtime)}</span>
            </div>
            <div className="flex justify-between">
              <span>โบนัส:</span>
              <span>{formatCurrency(employee.bonus)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>หัก:</span>
              <span>-{formatCurrency(employee.deductions)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>สุทธิ:</span>
              <span>{formatCurrency(employee.netSalary)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              ยกเลิก
            </Button>
            <Button 
              onClick={onConfirm}
              className="flex-1"
            >
              ยืนยันการจ่าย
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentConfirmationDialog;
