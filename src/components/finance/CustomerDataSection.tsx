
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Plus, TrendingUp, Target } from 'lucide-react';
import CustomerCreateForm from './CustomerCreateForm';

const chartConfig = {
  revenue: { label: 'รายได้', color: '#22c55e' },
  customers: { label: 'ลูกค้า', color: '#3b82f6' },
};

const CustomerDataSection = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock customer data
  const customerStats = {
    totalCustomers: 1247,
    newCustomersThisMonth: 89,
    averageOrderValue: 1485,
    totalRevenue: 2850000,
    repeatCustomers: 654
  };

  const customerSegments = [
    { name: 'VIP', count: 45, revenue: 1250000, color: '#FFD700' },
    { name: 'Premium', count: 156, revenue: 890000, color: '#22c55e' },
    { name: 'Regular', count: 543, revenue: 580000, color: '#3b82f6' },
    { name: 'New', count: 503, revenue: 130000, color: '#f59e0b' }
  ];

  const monthlyCustomerData = [
    { month: 'ม.ค.', newCustomers: 67, revenue: 945000 },
    { month: 'ก.พ.', newCustomers: 73, revenue: 1125000 },
    { month: 'มี.ค.', newCustomers: 82, revenue: 1280000 },
    { month: 'เม.ย.', newCustomers: 76, revenue: 1150000 },
    { month: 'พ.ค.', newCustomers: 95, revenue: 1420000 },
    { month: 'มิ.ย.', newCustomers: 89, revenue: 1485000 }
  ];

  const topCustomers = [
    { name: 'บริษัท ABC จำกัด', revenue: 285000, orders: 24, segment: 'VIP' },
    { name: 'บริษัท XYZ จำกัด', revenue: 156000, orders: 18, segment: 'Premium' },
    { name: 'คุณสมชาย ใจดี', revenue: 89000, orders: 12, segment: 'Premium' },
    { name: 'บริษัท DEF จำกัด', revenue: 67000, orders: 8, segment: 'Regular' },
    { name: 'คุณสมหญิง ใจเย็น', revenue: 45000, orders: 6, segment: 'Regular' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'VIP': return 'bg-yellow-100 text-yellow-800';
      case 'Premium': return 'bg-green-100 text-green-800';
      case 'Regular': return 'bg-blue-100 text-blue-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ข้อมูลลูกค้า</h2>
          <p className="text-gray-600">วิเคราะห์พฤติกรรมลูกค้าและมูลค่าการซื้อ</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มลูกค้าใหม่
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ลูกค้าทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{customerStats.totalCustomers.toLocaleString()}</div>
            <p className="text-sm text-blue-500">คน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ลูกค้าใหม่เดือนนี้</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{customerStats.newCustomersThisMonth}</div>
            <p className="text-sm text-green-500">+12.5% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">AOV เฉลี่ย</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(customerStats.averageOrderValue)}</div>
            <p className="text-sm text-purple-500">ต่อออเดอร์</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">รายได้จากลูกค้า</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(customerStats.totalRevenue)}</div>
            <p className="text-sm text-orange-500">เดือนนี้</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ลูกค้าประจำ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">{customerStats.repeatCustomers}</div>
            <p className="text-sm text-teal-500">52.4% ของทั้งหมด</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Acquisition Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              ลูกค้าใหม่และรายได้รายเดือน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCustomerData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="newCustomers" fill="var(--color-customers)" name="ลูกค้าใหม่" />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" name="รายได้" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              กลุ่มลูกค้าตามมูลค่า
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, count }) => `${name}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {customerSegments.map((segment) => (
                <div key={segment.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                    <span className="text-sm font-medium">{segment.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{segment.count} คน</div>
                    <div className="text-xs text-gray-600">{formatCurrency(segment.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            ลูกค้าชั้นนำ (Top Customers)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">ชื่อลูกค้า</th>
                  <th className="text-right py-2">รายได้รวม</th>
                  <th className="text-center py-2">จำนวนออเดอร์</th>
                  <th className="text-right py-2">AOV</th>
                  <th className="text-center py-2">กลุ่ม</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 font-medium">{customer.name}</td>
                    <td className="py-2 text-right">{formatCurrency(customer.revenue)}</td>
                    <td className="py-2 text-center">{customer.orders}</td>
                    <td className="py-2 text-right">{formatCurrency(customer.revenue / customer.orders)}</td>
                    <td className="py-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSegmentColor(customer.segment)}`}>
                        {customer.segment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Create Form Modal */}
      {showCreateForm && (
        <CustomerCreateForm 
          onClose={() => setShowCreateForm(false)}
          onSave={(data) => {
            console.log('Customer created:', data);
            setShowCreateForm(false);
          }}
        />
      )}
    </div>
  );
};

export default CustomerDataSection;
