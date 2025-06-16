
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Package, 
  Users,
  Calendar
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const RevenueBreakdown = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const revenueByService = [
    { name: 'ตรวจตา', value: 450000, color: '#3B82F6' },
    { name: 'แว่นตา', value: 380000, color: '#10B981' },
    { name: 'เลนส์โปรเกรสซีฟ', value: 320000, color: '#F59E0B' },
    { name: 'คอนแทคเลนส์', value: 180000, color: '#EF4444' },
    { name: 'อื่นๆ', value: 120000, color: '#8B5CF6' }
  ];

  const monthlyTrend = [
    { month: 'ม.ค.', revenue: 1200000, growth: 5.2 },
    { month: 'ก.พ.', revenue: 1350000, growth: 12.5 },
    { month: 'มี.ค.', revenue: 1280000, growth: -5.2 },
    { month: 'เม.ย.', revenue: 1420000, growth: 10.9 },
    { month: 'พ.ค.', revenue: 1380000, growth: -2.8 },
    { month: 'มิ.ย.', revenue: 1450000, growth: 5.1 }
  ];

  const revenueByBranch = [
    { branch: 'สาขาหลัก', revenue: 850000, percentage: 58.6 },
    { branch: 'สาขา 2', revenue: 400000, percentage: 27.6 },
    { branch: 'สาขา 3', revenue: 200000, percentage: 13.8 }
  ];

  const totalRevenue = revenueByService.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">รายรับแยกประเภท</h1>
          <p className="text-gray-600">วิเคราะห์รายรับตามบริการและช่วงเวลา</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="week">สัปดาห์นี้</option>
            <option value="month">เดือนนี้</option>
            <option value="quarter">ไตรมาสนี้</option>
            <option value="year">ปีนี้</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รายรับรวม</p>
                <p className="text-2xl font-bold">₿{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% จากเดือนที่แล้ว
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">บริการยอดนิยม</p>
                <p className="text-lg font-bold">ตรวจตา</p>
                <p className="text-xs text-blue-600">₿450,000</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">สาขายอดนิยม</p>
                <p className="text-lg font-bold">สาขาหลัก</p>
                <p className="text-xs text-purple-600">58.6%</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ลูกค้าใหม่</p>
                <p className="text-2xl font-bold">86</p>
                <p className="text-xs text-orange-600">+15% จากเดือนที่แล้ว</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Service */}
        <Card>
          <CardHeader>
            <CardTitle>รายรับตามประเภทบริการ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByService}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {revenueByService.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₿${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มรายรับรายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₿${value.toLocaleString()}`} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Branch */}
      <Card>
        <CardHeader>
          <CardTitle>รายรับตามสาขา</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueByBranch.map((branch, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium">{branch.branch}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold">₿{branch.revenue.toLocaleString()}</span>
                  <Badge variant="outline">{branch.percentage}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>ประสิทธิภาพบริการ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">บริการ</th>
                  <th className="text-right p-4">รายรับ</th>
                  <th className="text-right p-4">สัดส่วน</th>
                  <th className="text-right p-4">จำนวนลูกค้า</th>
                  <th className="text-right p-4">ค่าเฉลี่ย/ลูกค้า</th>
                  <th className="text-center p-4">แนวโน้ม</th>
                </tr>
              </thead>
              <tbody>
                {revenueByService.map((service, index) => {
                  const percentage = (service.value / totalRevenue * 100).toFixed(1);
                  const customers = Math.floor(service.value / (Math.random() * 2000 + 1000));
                  const avgPerCustomer = Math.floor(service.value / customers);
                  
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: service.color }}
                          ></div>
                          <span className="font-medium">{service.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium">₿{service.value.toLocaleString()}</td>
                      <td className="p-4 text-right">{percentage}%</td>
                      <td className="p-4 text-right">{customers}</td>
                      <td className="p-4 text-right">₿{avgPerCustomer.toLocaleString()}</td>
                      <td className="p-4 text-center">
                        <Badge className="bg-green-100 text-green-800">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +{(Math.random() * 10 + 1).toFixed(1)}%
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueBreakdown;
