
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Calendar, DollarSign, Repeat } from 'lucide-react';

interface RecurringExpense {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'weekly' | 'yearly';
  category: string;
  nextDue: string;
  status: 'active' | 'paused' | 'cancelled';
  description: string;
}

const RecurringExpenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const recurringExpenses: RecurringExpense[] = [
    {
      id: 'RE001',
      name: 'ค่าเช่าสำนักงาน',
      amount: 45000,
      frequency: 'monthly',
      category: 'เช่า',
      nextDue: '2025-07-01',
      status: 'active',
      description: 'ค่าเช่าพื้นที่สำนักงานรายเดือน'
    },
    {
      id: 'RE002',
      name: 'ค่าไฟฟ้า',
      amount: 8500,
      frequency: 'monthly',
      category: 'สาธารณูปโภค',
      nextDue: '2025-06-20',
      status: 'active',
      description: 'ค่าไฟฟ้ารายเดือน'
    },
    {
      id: 'RE003',
      name: 'ประกันสังคม',
      amount: 12000,
      frequency: 'monthly',
      category: 'เงินเดือน',
      nextDue: '2025-06-15',
      status: 'active',
      description: 'ประกันสังคมพนักงาน'
    },
    {
      id: 'RE004',
      name: 'ค่าอินเทอร์เน็ต',
      amount: 1200,
      frequency: 'monthly',
      category: 'สาธารณูปโภค',
      nextDue: '2025-06-25',
      status: 'active',
      description: 'ค่าอินเทอร์เน็ตรายเดือน'
    },
    {
      id: 'RE005',
      name: 'ประกันภัยร้าน',
      amount: 15000,
      frequency: 'yearly',
      category: 'ประกันภัย',
      nextDue: '2025-12-01',
      status: 'active',
      description: 'ประกันภัยทรัพย์สินร้าน'
    }
  ];

  const filteredExpenses = recurringExpenses.filter(expense =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'monthly': return 'รายเดือน';
      case 'weekly': return 'รายสัปดาห์';
      case 'yearly': return 'รายปี';
      default: return frequency;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ใช้งาน';
      case 'paused': return 'หยุดชั่วคราว';
      case 'cancelled': return 'ยกเลิก';
      default: return status;
    }
  };

  const totalMonthlyExpenses = recurringExpenses
    .filter(expense => expense.status === 'active')
    .reduce((total, expense) => {
      if (expense.frequency === 'monthly') return total + expense.amount;
      if (expense.frequency === 'weekly') return total + (expense.amount * 4.33);
      if (expense.frequency === 'yearly') return total + (expense.amount / 12);
      return total;
    }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">รายจ่ายประจำ</h1>
          <p className="text-gray-600">จัดการรายจ่ายที่เกิดขึ้นเป็นประจำ</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มรายจ่ายประจำ
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รายจ่ายประจำทั้งหมด</p>
                <p className="text-2xl font-bold">{recurringExpenses.length}</p>
              </div>
              <Repeat className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รายจ่ายใช้งาน</p>
                <p className="text-2xl font-bold">
                  {recurringExpenses.filter(e => e.status === 'active').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ยอดรวมต่อเดือน</p>
                <p className="text-2xl font-bold">{formatCurrency(totalMonthlyExpenses)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหารายจ่ายประจำ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recurring Expenses List */}
      <Card>
        <CardHeader>
          <CardTitle>รายการรายจ่ายประจำ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">รายการ</th>
                  <th className="text-right p-4">จำนวนเงิน</th>
                  <th className="text-center p-4">ความถี่</th>
                  <th className="text-center p-4">หมวดหมู่</th>
                  <th className="text-center p-4">ครบกำหนดถัดไป</th>
                  <th className="text-center p-4">สถานะ</th>
                  <th className="text-center p-4">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{expense.name}</p>
                        <p className="text-sm text-gray-600">{expense.description}</p>
                      </div>
                    </td>
                    <td className="p-4 text-right font-bold">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="outline">{getFrequencyText(expense.frequency)}</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="secondary">{expense.category}</Badge>
                    </td>
                    <td className="p-4 text-center">{expense.nextDue}</td>
                    <td className="p-4 text-center">
                      <Badge className={getStatusColor(expense.status)}>
                        {getStatusText(expense.status)}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecurringExpenses;
