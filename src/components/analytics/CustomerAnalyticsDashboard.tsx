
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Star,
  Target,
  UserCheck,
  AlertTriangle,
  Filter,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const CustomerAnalyticsDashboard = () => {
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data based on database schema
  const customerSegments = [
    { segment: 'VIP', count: 156, revenue: 2850000, avgSpend: 18269, color: '#8b5cf6' },
    { segment: 'Regular', count: 423, revenue: 1950000, avgSpend: 4609, color: '#06b6d4' },
    { segment: 'New', count: 89, revenue: 285000, avgSpend: 3202, color: '#10b981' },
    { segment: 'At Risk', count: 67, revenue: 125000, avgSpend: 1866, color: '#f59e0b' },
    { segment: 'Inactive', count: 234, revenue: 0, avgSpend: 0, color: '#ef4444' }
  ];

  const customerLifetimeValue = [
    { month: 'ม.ค.', newCustomers: 45, avgCLV: 25000, totalCLV: 1125000 },
    { month: 'ก.พ.', newCustomers: 52, avgCLV: 28000, totalCLV: 1456000 },
    { month: 'มี.ค.', newCustomers: 38, avgCLV: 31000, totalCLV: 1178000 },
    { month: 'เม.ย.', newCustomers: 61, avgCLV: 29000, totalCLV: 1769000 },
    { month: 'พ.ค.', newCustomers: 44, avgCLV: 33000, totalCLV: 1452000 },
    { month: 'มิ.ย.', newCustomers: 56, avgCLV: 35000, totalCLV: 1960000 }
  ];

  const retentionData = [
    { period: 'เดือน 1', retention: 95 },
    { period: 'เดือน 3', retention: 78 },
    { period: 'เดือน 6', retention: 62 },
    { period: 'เดือน 12', retention: 45 },
    { period: 'เดือน 24', retention: 28 }
  ];

  const topCustomers = [
    { id: '1', name: 'คุณสมใจ ใจดี', totalSpent: 125000, visits: 24, lastVisit: '2024-06-10', segment: 'VIP' },
    { id: '2', name: 'คุณมาลี สวยงาม', totalSpent: 98000, visits: 18, lastVisit: '2024-06-12', segment: 'VIP' },
    { id: '3', name: 'คุณนิดา หวานใจ', totalSpent: 75000, visits: 15, lastVisit: '2024-06-08', segment: 'VIP' },
    { id: '4', name: 'คุณประยุทธ์ มีสุข', totalSpent: 65000, visits: 12, lastVisit: '2024-06-14', segment: 'Regular' },
    { id: '5', name: 'คุณสวรรค์ ดีใจ', totalSpent: 58000, visits: 11, lastVisit: '2024-06-11', segment: 'Regular' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getSegmentColor = (segment: string) => {
    const colors = {
      'VIP': 'bg-purple-100 text-purple-800',
      'Regular': 'bg-blue-100 text-blue-800',
      'New': 'bg-green-100 text-green-800',
      'At Risk': 'bg-yellow-100 text-yellow-800',
      'Inactive': 'bg-red-100 text-red-800'
    };
    return colors[segment] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Analytics</h1>
          <p className="text-gray-600">วิเคราะห์ลูกค้าเชิงลึกเพื่อเพิ่มมูลค่าธุรกิจ</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="7d">7 วันที่แล้ว</option>
            <option value="30d">30 วันที่แล้ว</option>
            <option value="90d">90 วันที่แล้ว</option>
            <option value="1y">1 ปีที่แล้ว</option>
          </select>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Customer Segments Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {customerSegments.map((segment) => (
          <Card 
            key={segment.segment}
            className={`cursor-pointer transition-all ${selectedSegment === segment.segment ? 'ring-2 ring-emerald-500' : ''}`}
            onClick={() => setSelectedSegment(segment.segment)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getSegmentColor(segment.segment)}>
                  {segment.segment}
                </Badge>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                ></div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{segment.count}</div>
                <div className="text-sm text-gray-600">ลูกค้า</div>
                <div className="text-lg font-semibold text-emerald-600">
                  {formatCurrency(segment.revenue)}
                </div>
                <div className="text-xs text-gray-500">
                  เฉลี่ย {formatCurrency(segment.avgSpend)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Lifetime Value Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Customer Lifetime Value Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerLifetimeValue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'newCustomers' ? `${value} คน` : formatCurrency(Number(value)),
                    name === 'newCustomers' ? 'ลูกค้าใหม่' : 
                    name === 'avgCLV' ? 'CLV เฉลี่ย' : 'CLV รวม'
                  ]}
                />
                <Line dataKey="avgCLV" stroke="#10b981" strokeWidth={3} name="avgCLV" />
                <Line dataKey="totalCLV" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" name="totalCLV" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Retention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              Customer Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Retention Rate']} />
                <Bar dataKey="retention" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            การกระจายลูกค้าตาม Segment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="count"
                  nameKey="segment"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} คน`, name]} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Segment Insights</h3>
              {customerSegments.map((segment) => (
                <div key={segment.segment} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    ></div>
                    <span className="font-medium">{segment.segment}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{segment.count} คน</div>
                    <div className="text-sm text-gray-600">
                      {((segment.count / customerSegments.reduce((sum, s) => sum + s.count, 0)) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            ลูกค้า Top 5 (High Value Customers)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">ชื่อลูกค้า</th>
                  <th className="text-right p-3">ยอดใช้จ่ายรวม</th>
                  <th className="text-center p-3">จำนวนครั้ง</th>
                  <th className="text-center p-3">เยี่ยมล่าสุด</th>
                  <th className="text-center p-3">Segment</th>
                  <th className="text-center p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{customer.name}</td>
                    <td className="p-3 text-right font-bold text-emerald-600">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="p-3 text-center">{customer.visits} ครั้ง</td>
                    <td className="p-3 text-center">{customer.lastVisit}</td>
                    <td className="p-3 text-center">
                      <Badge className={getSegmentColor(customer.segment)}>
                        {customer.segment}
                      </Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Button size="sm" variant="outline">
                        ดูรายละเอียด
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            แนวทางเพิ่มมูลค่าลูกค้า (Customer Value Optimization)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">เพิ่ม VIP Customers</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Upsell บริการพรีเมียมให้ Regular customers</li>
                <li>• สร้าง loyalty program สำหรับ VIP</li>
                <li>• จัดกิจกรรมพิเศษสำหรับ VIP</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">ลด Customer Churn</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• ติดตาม At Risk customers</li>
                <li>• สร้าง re-engagement campaign</li>
                <li>• วิเคราะห์สาเหตุการหายไป</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">เพิ่ม New Customer</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Referral program จาก VIP customers</li>
                <li>• Digital marketing เป้าหมายใหม่</li>
                <li>• Partnership กับธุรกิจเสริม</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAnalyticsDashboard;
