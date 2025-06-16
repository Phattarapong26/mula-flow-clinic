
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, CheckCircle2, Clock } from 'lucide-react';

interface PayrollStatsProps {
  totalEmployees: number;
  paidEmployees: number;
  pendingEmployees: number;
  totalSalary: number;
}

const PayrollStats: React.FC<PayrollStatsProps> = ({
  totalEmployees,
  paidEmployees,
  pendingEmployees,
  totalSalary
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">พนักงานทั้งหมด</p>
              <p className="text-2xl font-bold">{totalEmployees}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">จ่ายแล้ว</p>
              <p className="text-2xl font-bold">{paidEmployees}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">รอจ่าย</p>
              <p className="text-2xl font-bold">{pendingEmployees}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">เงินเดือนรวม</p>
              <p className="text-2xl font-bold">{formatCurrency(totalSalary)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollStats;
