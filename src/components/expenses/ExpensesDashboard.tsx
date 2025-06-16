
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  AlertTriangle,
  Users,
  Building,
  Zap,
  Package
} from 'lucide-react';

interface ExpenseCategory {
  name: string;
  amount: number;
  budget: number;
  color: string;
  icon: React.ReactNode;
}

interface RecurringExpense {
  id: string;
  name: string;
  amount: number;
  dueDay: number;
  category: string;
  status: 'upcoming' | 'overdue' | 'paid';
}

const ExpensesDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const expenseCategories: ExpenseCategory[] = [
    {
      name: 'เงินเดือนพนักงาน',
      amount: 180000,
      budget: 200000,
      color: 'bg-blue-500',
      icon: <Users className="h-5 w-5" />
    },
    {
      name: 'ค่าเช่าสถานที่',
      amount: 80000,
      budget: 80000,
      color: 'bg-green-500',
      icon: <Building className="h-5 w-5" />
    },
    {
      name: 'สาธารณูปโภค',
      amount: 15000,
      budget: 20000,
      color: 'bg-yellow-500',
      icon: <Zap className="h-5 w-5" />
    },
    {
      name: 'วัสดุสิ้นเปลือง',
      amount: 25000,
      budget: 30000,
      color: 'bg-purple-500',
      icon: <Package className="h-5 w-5" />
    }
  ];

  const recurringExpenses: RecurringExpense[] = [
    {
      id: '1',
      name: 'ค่าเช่าคลินิกสาขาหลัก',
      amount: 50000,
      dueDay: 25,
      category: 'rent',
      status: 'upcoming'
    },
    {
      id: '2',
      name: 'เงินเดือนหมอตา',
      amount: 80000,
      dueDay: 30,
      category: 'salary',
      status: 'upcoming'
    },
    {
      id: '3',
      name: 'ประกันสังคม',
      amount: 15000,
      dueDay: 15,
      category: 'insurance',
      status: 'overdue'
    }
  ];

  const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const totalBudget = expenseCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const budgetUtilization = (totalExpenses / totalBudget) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'ครบกำหนดเร็วๆ นี้';
      case 'overdue': return 'เกินกำหนด';
      case 'paid': return 'ชำระแล้ว';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ดรายจ่าย</h1>
          <p className="text-gray-600">ภาพรวมค่าใช้จ่ายและงบประมาณของคลินิกสายตา</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('monthly')}
          >
            รายเดือน
          </Button>
          <Button 
            variant={selectedPeriod === 'yearly' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('yearly')}
          >
            รายปี
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">รายจ่ายรวม</p>
                <p className="text-3xl font-bold">₿{(totalExpenses / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-10 w-10 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">งบประมาณ</p>
                <p className="text-3xl font-bold">₿{(totalBudget / 1000).toFixed(0)}K</p>
              </div>
              <Calendar className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">ใช้งบ</p>
                <p className="text-3xl font-bold">{budgetUtilization.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">ค้างชำระ</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Categories */}
      <Card>
        <CardHeader>
          <CardTitle>รายจ่ายแยกตามหมวดหมู่</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenseCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₿{category.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">จาก ₿{category.budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${Math.min((category.amount / category.budget) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{((category.amount / category.budget) * 100).toFixed(1)}% ของงบประมาณ</span>
                  <span>เหลือ ₿{(category.budget - category.amount).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recurring Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>ค่าใช้จ่ายประจำ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">รายการ</th>
                  <th className="text-right p-4">จำนวนเงิน</th>
                  <th className="text-center p-4">กำหนดชำระ</th>
                  <th className="text-center p-4">สถานะ</th>
                  <th className="text-center p-4">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {recurringExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{expense.name}</td>
                    <td className="p-4 text-right font-bold">₿{expense.amount.toLocaleString()}</td>
                    <td className="p-4 text-center">วันที่ {expense.dueDay}</td>
                    <td className="p-4 text-center">
                      <Badge className={getStatusColor(expense.status)}>
                        {getStatusText(expense.status)}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        {expense.status !== 'paid' && (
                          <Button size="sm">ชำระ</Button>
                        )}
                        <Button size="sm" variant="outline">แก้ไข</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>การดำเนินการด่วน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>จ่ายเงินเดือน</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Building className="h-6 w-6" />
              <span>ค่าเช่า</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Package className="h-6 w-6" />
              <span>สั่งซื้อวัสดุ</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span>ตั้งเตือนการชำระ</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesDashboard;
