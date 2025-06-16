
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface BulkPaymentDialogProps {
  employees: any[];
  isOpen: boolean;
  onConfirm: (selectedEmployees: number[]) => void;
  onCancel: () => void;
}

const BulkPaymentDialog: React.FC<BulkPaymentDialogProps> = ({
  employees,
  isOpen,
  onConfirm,
  onCancel
}) => {
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  if (!isOpen) return null;

  const pendingEmployees = employees.filter(emp => emp.status === 'รอจ่าย');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const handleEmployeeToggle = (employeeId: number) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmployees(
      selectedEmployees.length === pendingEmployees.length 
        ? [] 
        : pendingEmployees.map(emp => emp.id)
    );
  };

  const totalAmount = pendingEmployees
    .filter(emp => selectedEmployees.includes(emp.id))
    .reduce((sum, emp) => sum + emp.netSalary, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader>
          <CardTitle>จ่ายเงินเดือนหลายคน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 overflow-y-auto">
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={selectedEmployees.length === pendingEmployees.length}
              onCheckedChange={handleSelectAll}
            />
            <span className="font-medium">เลือกทั้งหมด ({pendingEmployees.length} คน)</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {pendingEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox 
                  checked={selectedEmployees.includes(employee.id)}
                  onCheckedChange={() => handleEmployeeToggle(employee.id)}
                />
                <div className="flex-1">
                  <div className="font-medium">{employee.employeeName}</div>
                  <div className="text-sm text-gray-600">{employee.position}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatCurrency(employee.netSalary)}</div>
                </div>
              </div>
            ))}
          </div>

          {selectedEmployees.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">รวมเงินเดือนที่จ่าย:</span>
                <span className="font-bold text-lg">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="text-sm text-gray-600">
                จำนวนพนักงาน: {selectedEmployees.length} คน
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              ยกเลิก
            </Button>
            <Button 
              onClick={() => onConfirm(selectedEmployees)}
              disabled={selectedEmployees.length === 0}
              className="flex-1"
            >
              จ่ายเงินเดือน ({selectedEmployees.length} คน)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkPaymentDialog;
