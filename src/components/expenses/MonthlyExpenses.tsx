
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Building, Users, Zap, TrendingUp, TrendingDown } from 'lucide-react';

const MonthlyExpenses = () => {
  const [selectedMonth, setSelectedMonth] = useState('2025-06');

  const expenseCategories = [
    {
      id: 1,
      category: 'ค่าเช่า',
      amount: 180000,
      previousMonth: 180000,
      change: 0,
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      category: 'ค่าพนักงาน',
      amount: 320000,
      previousMonth: 285000,
      change: 12.3,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      category: 'ค่าน้ำค่าไฟ',
      amount: 45000,
      previousMonth: 52000,
      change: -13.5,
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 4,
      category: 'ค่าวัสดุอุปกรณ์',
      amount: 85000,
      previousMonth: 78000,
      change: 9.0,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const detailedExpenses = [
    { id: 1, item: 'ค่าเช่าอาคาร สาขาสยาม', amount: 80000, category: 'ค่าเช่า' },
    { id: 2, item: 'ค่าเช่าอาคาร สาขาเอกมัย', amount: 70000, category: 'ค่าเช่า' },
    { id: 3, item: 'ค่าเช่าอาคาร สาขาอโศก', amount: 30000, category: 'ค่าเช่า' },
    { id: 4, item: 'เงินเดือนหมอ', amount: 200000, category: 'ค่าพนักงาน' },
    { id: 5, item: 'เงินเดือนพยาบาล', amount: 80000, category: 'ค่าพนักงาน' },
    { id: 6, item: 'เงินเดือนเจ้าหน้าที่', amount: 40000, category: 'ค่าพนักงาน' },
    { id: 7, item: 'ค่าไฟฟ้า', amount: 25000, category: 'ค่าน้ำค่าไฟ' },
    { id: 8, item: 'ค่าน้ำประปา', amount: 8000, category: 'ค่าน้ำค่าไฟ' },
    { id: 9, item: 'ค่าแก๊ส', amount: 12000, category: 'ค่าน้ำค่าไฟ' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-red-600';
    if (change < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-red-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-green-600" />;
    return null;
  };

  const totalExpenses = expenseCategories.reduce((sum, category) => sum + category.amount, 0);
  const totalPrevious = expenseCategories.reduce((sum, category) => sum + category.previousMonth, 0);
  const totalChange = ((totalExpenses - totalPrevious) / totalPrevious) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ค่าใช้จ่ายรายเดือน</h1>
          <p className="text-gray-600">ค่าเช่า, ค่าพนักงาน, ค่าน้ำค่าไฟ</p>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {expenseCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${category.bgColor}`}>
                    <Icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{formatCurrency(category.amount)}</div>
                    <div className={`text-sm flex items-center gap-1 ${getChangeColor(category.change)}`}>
                      {getChangeIcon(category.change)}
                      {category.change !== 0 && (
                        <span>{category.change > 0 ? '+' : ''}{category.change}%</span>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900">{category.category}</h3>
                <p className="text-sm text-gray-600">
                  เดือนที่แล้ว: {formatCurrency(category.previousMonth)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Total Summary */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-200">รายจ่ายรวมเดือนนี้</h2>
              <div className="text-3xl font-bold">{formatCurrency(totalExpenses)}</div>
            </div>
            <div className="text-right">
              <p className="text-gray-300">เปรียบเทียบเดือนที่แล้ว</p>
              <div className={`text-xl font-bold flex items-center gap-2 ${getChangeColor(totalChange)}`}>
                {getChangeIcon(totalChange)}
                {totalChange > 0 ? '+' : ''}{totalChange.toFixed(1)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>รายละเอียดค่าใช้จ่าย</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">รายการ</th>
                  <th className="text-left p-4">หมวดหมู่</th>
                  <th className="text-right p-4">จำนวนเงิน</th>
                  <th className="text-center p-4">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {detailedExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{expense.item}</td>
                    <td className="p-4">
                      <Badge variant="outline">{expense.category}</Badge>
                    </td>
                    <td className="p-4 text-right font-bold">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-100 text-green-800">จ่ายแล้ว</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Chart placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>แนวโน้มค่าใช้จ่าย (6 เดือนล่าสุด)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">แผนภูมิแนวโน้มค่าใช้จ่ายจะแสดงที่นี่</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyExpenses;
