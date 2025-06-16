
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Receipt, Plus, Building, TrendingDown } from 'lucide-react';
import CreateExpenseForm from './CreateExpenseForm';

const chartConfig = {
  amount: { label: 'จำนวนเงิน', color: '#ef4444' },
  category: { label: 'หมวดหมู่', color: '#3b82f6' },
};

const ExpenseManagementSection = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock expense data
  const expenseStats = {
    totalExpenses: 530000,
    fixedCosts: 320000,
    variableCosts: 210000,
    monthlyIncrease: 8.5
  };

  const expenseCategories = [
    { name: 'เงินเดือน', amount: 180000, color: '#ef4444' },
    { name: 'ค่าเช่า', amount: 85000, color: '#f97316' },
    { name: 'ค่าไฟฟ้า', amount: 25000, color: '#eab308' },
    { name: 'ค่าโฆษณา', amount: 65000, color: '#22c55e' },
    { name: 'ค่าขนส่ง', amount: 45000, color: '#3b82f6' },
    { name: 'อื่นๆ', amount: 130000, color: '#8b5cf6' }
  ];

  const monthlyExpenses = [
    { month: 'ม.ค.', fixed: 320000, variable: 185000 },
    { month: 'ก.พ.', fixed: 320000, variable: 195000 },
    { month: 'มี.ค.', fixed: 325000, variable: 205000 },
    { month: 'เม.ย.', fixed: 325000, variable: 190000 },
    { month: 'พ.ค.', fixed: 320000, variable: 200000 },
    { month: 'มิ.ย.', fixed: 320000, variable: 210000 }
  ];

  const recentExpenses = [
    { date: '14/06/2025', category: 'ค่าโฆษณา', description: 'Facebook Ads', amount: 15000, branch: 'สำนักงานใหญ่' },
    { date: '13/06/2025', category: 'ค่าขนส่ง', description: 'ขนส่งสินค้า', amount: 8500, branch: 'สาขาสีลม' },
    { date: '13/06/2025', category: 'เงินเดือน', description: 'เงินเดือนพนักงาน', amount: 180000, branch: 'ทุกสาขา' },
    { date: '12/06/2025', category: 'ค่าไฟฟ้า', description: 'ค่าไฟประจำเดือน', amount: 12500, branch: 'สาขาอโซค' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ข้อมูลค่าใช้จ่าย & งบการเงิน</h2>
          <p className="text-gray-600">บริหารจัดการค่าใช้จ่าย สินทรัพย์ และหนี้สิน</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-red-600 hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          บันทึกค่าใช้จ่าย
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ค่าใช้จ่ายรวม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(expenseStats.totalExpenses)}</div>
            <p className="text-sm text-red-500">เดือนนี้</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ต้นทุนคงที่</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(expenseStats.fixedCosts)}</div>
            <p className="text-sm text-orange-500">{((expenseStats.fixedCosts/expenseStats.totalExpenses)*100).toFixed(1)}% ของทั้งหมด</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ต้นทุนแปรผัน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(expenseStats.variableCosts)}</div>
            <p className="text-sm text-yellow-500">{((expenseStats.variableCosts/expenseStats.totalExpenses)*100).toFixed(1)}% ของทั้งหมด</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">เพิ่มขึ้น</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">+{expenseStats.monthlyIncrease}%</div>
            <p className="text-sm text-purple-500">จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expense Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              แนวโน้มค่าใช้จ่ายรายเดือน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyExpenses}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="fixed" fill="#ef4444" name="ต้นทุนคงที่" />
                  <Bar dataKey="variable" fill="#f97316" name="ต้นทุนแปรผัน" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              หมวดหมู่ค่าใช้จ่าย
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${((value / expenseStats.totalExpenses) * 100).toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {expenseCategories.map((category) => (
                <div key={category.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{formatCurrency(category.amount)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            รายการค่าใช้จ่ายล่าสุด
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">วันที่</th>
                  <th className="text-left py-2">หมวดหมู่</th>
                  <th className="text-left py-2">รายละเอียด</th>
                  <th className="text-left py-2">สาขา</th>
                  <th className="text-right py-2">จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((expense, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{expense.date}</td>
                    <td className="py-2">{expense.category}</td>
                    <td className="py-2">{expense.description}</td>
                    <td className="py-2">{expense.branch}</td>
                    <td className="py-2 text-right text-red-600">{formatCurrency(expense.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Financial Position Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            สรุปฐานะการเงิน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">สินทรัพย์</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>เงินสด</span>
                  <span>{formatCurrency(850000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ลูกหนี้การค้า</span>
                  <span>{formatCurrency(320000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>สินค้าคงคลัง</span>
                  <span>{formatCurrency(240000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>อุปกรณ์และเครื่องมือ</span>
                  <span>{formatCurrency(480000)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>รวมสินทรัพย์</span>
                  <span>{formatCurrency(1890000)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-600">หนี้สิน</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>เจ้าหนี้การค้า</span>
                  <span>{formatCurrency(185000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าใช้จ่ายค้างจ่าย</span>
                  <span>{formatCurrency(95000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>สินเชื่อธนาคาร</span>
                  <span>{formatCurrency(650000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ภาษีค้างจ่าย</span>
                  <span>{formatCurrency(85000)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>รวมหนี้สิน</span>
                  <span>{formatCurrency(1015000)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">ส่วนของเจ้าของ</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>ทุนจดทะเบียน</span>
                  <span>{formatCurrency(500000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>กำไรสะสม</span>
                  <span>{formatCurrency(375000)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>รวมส่วนของเจ้าของ</span>
                  <span>{formatCurrency(875000)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Expense Form Modal */}
      {showCreateForm && (
        <CreateExpenseForm 
          onClose={() => setShowCreateForm(false)}
          onSave={(data) => {
            console.log('Expense created:', data);
            setShowCreateForm(false);
          }}
        />
      )}
    </div>
  );
};

export default ExpenseManagementSection;
