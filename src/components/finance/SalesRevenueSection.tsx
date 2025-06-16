
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Plus, FileText, Building } from 'lucide-react';
import CreateTransactionForm from './CreateTransactionForm';

const chartConfig = {
  revenue: { label: 'รายได้', color: '#22c55e' },
  cost: { label: 'ต้นทุน', color: '#ef4444' },
  profit: { label: 'กำไร', color: '#3b82f6' },
};

const SalesRevenueSection = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock data
  const monthlyData = [
    { month: 'ม.ค.', revenue: 1200000, cost: 600000, profit: 600000 },
    { month: 'ก.พ.', revenue: 1350000, cost: 680000, profit: 670000 },
    { month: 'มี.ค.', revenue: 1580000, cost: 790000, profit: 790000 },
    { month: 'เม.ย.', revenue: 1420000, cost: 710000, profit: 710000 },
    { month: 'พ.ค.', revenue: 1680000, cost: 840000, profit: 840000 },
    { month: 'มิ.ย.', revenue: 1850000, cost: 920000, profit: 930000 }
  ];

  const branchData = [
    { name: 'สาขาสีลม', value: 45, revenue: 832000 },
    { name: 'สาขาอโซค', value: 30, revenue: 555000 },
    { name: 'สาขาลาดพร้าว', value: 25, revenue: 463000 }
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b'];

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
          <h2 className="text-2xl font-bold text-gray-900">ข้อมูลยอดขาย / รายได้ / กำไร</h2>
          <p className="text-gray-600">วิเคราะห์ผลการดำเนินงานและความสามารถในการทำกำไร</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          สร้างออเดอร์ขาย
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">รายได้รวมเดือนนี้</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">฿1,850,000</div>
            <p className="text-sm text-green-500">+10.1% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">กำไรขั้นต้น</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">฿930,000</div>
            <p className="text-sm text-blue-500">อัตรากำไร 50.3%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ต้นทุนขาย</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">฿920,000</div>
            <p className="text-sm text-red-500">49.7% ของรายได้</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">จำนวนออเดอร์</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">1,247</div>
            <p className="text-sm text-purple-500">+15.2% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              แนวโน้มรายได้และกำไรรายเดือน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" name="รายได้" />
                  <Bar dataKey="cost" fill="var(--color-cost)" name="ต้นทุน" />
                  <Bar dataKey="profit" fill="var(--color-profit)" name="กำไร" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Branch Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              สัดส่วนรายได้ตามสาขา
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={branchData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {branchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {branchData.map((branch, index) => (
                <div key={branch.name} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{branch.name}</span>
                  <span className="text-sm text-gray-600">{formatCurrency(branch.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            รายการขายล่าสุด
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">วันที่</th>
                  <th className="text-left py-2">หมายเลขออเดอร์</th>
                  <th className="text-left py-2">ลูกค้า</th>
                  <th className="text-left py-2">สาขา</th>
                  <th className="text-right py-2">จำนวนเงิน</th>
                  <th className="text-right py-2">กำไร</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">14/06/2025</td>
                  <td className="py-2">SO-2025-001247</td>
                  <td className="py-2">บริษัท ABC จำกัด</td>
                  <td className="py-2">สีลม</td>
                  <td className="py-2 text-right">฿85,000</td>
                  <td className="py-2 text-right text-green-600">฿42,500</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">14/06/2025</td>
                  <td className="py-2">SO-2025-001246</td>
                  <td className="py-2">คุณสมชาย ใจดี</td>
                  <td className="py-2">อโซค</td>
                  <td className="py-2 text-right">฿12,500</td>
                  <td className="py-2 text-right text-green-600">฿6,250</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">13/06/2025</td>
                  <td className="py-2">SO-2025-001245</td>
                  <td className="py-2">บริษัท XYZ จำกัด</td>
                  <td className="py-2">ลาดพร้าว</td>
                  <td className="py-2 text-right">฿156,000</td>
                  <td className="py-2 text-right text-green-600">฿78,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Transaction Form Modal */}
      {showCreateForm && (
        <CreateTransactionForm 
          onClose={() => setShowCreateForm(false)}
          onSave={(data) => {
            console.log('Transaction created:', data);
            setShowCreateForm(false);
          }}
        />
      )}
    </div>
  );
};

export default SalesRevenueSection;
