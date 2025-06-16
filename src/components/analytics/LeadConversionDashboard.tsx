
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  Target,
  PhoneCall,
  MessageSquare,
  Star,
  DollarSign,
  Calendar,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, FunnelChart } from 'recharts';

const LeadConversionDashboard = () => {
  const [selectedSource, setSelectedSource] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock lead conversion data
  const conversionSummary = {
    totalLeads: 1250,
    convertedLeads: 425,
    conversionRate: 34.0,
    avgConversionTime: 12.5,
    totalRevenue: 8750000,
    avgRevenuePerConversion: 20588
  };

  const leadSources = [
    { source: 'Facebook Ads', leads: 450, conversions: 153, rate: 34.0, cost: 285000, revenue: 3150000, color: '#3b82f6' },
    { source: 'Google Ads', leads: 320, conversions: 128, rate: 40.0, cost: 425000, revenue: 2640000, color: '#10b981' },
    { source: 'LINE Official', leads: 280, conversions: 84, rate: 30.0, cost: 45000, revenue: 1730000, color: '#06d6a0' },
    { source: 'Walk-in', leads: 125, conversions: 38, rate: 30.4, cost: 0, revenue: 780000, color: '#f59e0b' },
    { source: 'Referral', leads: 75, conversions: 22, rate: 29.3, cost: 15000, revenue: 450000, color: '#8b5cf6' }
  ];

  const conversionFunnel = [
    { stage: 'Lead', count: 1250, percentage: 100 },
    { stage: 'Qualified', count: 875, percentage: 70.0 },
    { stage: 'Consulted', count: 625, percentage: 50.0 },
    { stage: 'Quoted', count: 500, percentage: 40.0 },
    { stage: 'Converted', count: 425, percentage: 34.0 }
  ];

  const conversionTimeline = [
    { month: 'ม.ค.', leads: 195, conversions: 66, rate: 33.8, revenue: 1360000 },
    { month: 'ก.พ.', leads: 218, conversions: 74, rate: 33.9, revenue: 1520000 },
    { month: 'มี.ค.', leads: 189, conversions: 68, rate: 36.0, revenue: 1400000 },
    { month: 'เม.ย.', leads: 205, conversions: 71, rate: 34.6, revenue: 1460000 },
    { month: 'พ.ค.', leads: 224, conversions: 78, rate: 34.8, revenue: 1605000 },
    { month: 'มิ.ย.', leads: 219, conversions: 68, rate: 31.1, revenue: 1405000 }
  ];

  const leadQuality = [
    { quality: 'Hot Leads', count: 125, conversionRate: 65.6, avgRevenue: 35000, color: '#ef4444' },
    { quality: 'Warm Leads', count: 380, conversionRate: 42.1, avgRevenue: 22000, color: '#f59e0b' },
    { quality: 'Cold Leads', count: 745, conversionRate: 18.9, avgRevenue: 12000, color: '#06b6d4' }
  ];

  const topConverters = [
    { id: 1, staff: 'คุณสมใจ ดีใจ', conversions: 45, rate: 68.2, revenue: 980000, avgDeal: 21778 },
    { id: 2, staff: 'คุณมาลี สวยใจ', conversions: 38, rate: 59.4, revenue: 820000, avgDeal: 21579 },
    { id: 3, staff: 'คุณนิดา หวานใจ', conversions: 35, rate: 54.7, revenue: 756000, avgDeal: 21600 },
    { id: 4, staff: 'คุณประยุทธ์ มีเฮง', conversions: 31, rate: 50.8, revenue: 682000, avgDeal: 22000 },
    { id: 5, staff: 'คุณสวรรค์ ดีมาก', conversions: 28, rate: 48.3, revenue: 630000, avgDeal: 22500 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Hot Leads': return 'bg-red-100 text-red-800';
      case 'Warm Leads': return 'bg-orange-100 text-orange-800';
      case 'Cold Leads': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Conversion Dashboard</h1>
          <p className="text-gray-600">ระบบติดตามและเพิ่มประสิทธิภาพการแปลง Lead</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">ทุกช่องทาง</option>
            <option value="facebook">Facebook Ads</option>
            <option value="google">Google Ads</option>
            <option value="line">LINE Official</option>
            <option value="walkin">Walk-in</option>
            <option value="referral">Referral</option>
          </select>
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
        </div>
      </div>

      {/* Lead Conversion Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Lead ทั้งหมด</p>
                <p className="text-2xl font-bold">{conversionSummary.totalLeads.toLocaleString()}</p>
                <p className="text-blue-100 text-xs">+18.5% จากเดือนที่แล้ว</p>
              </div>
              <Users className="h-8 w-8 text-blue-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold">{conversionSummary.conversionRate}%</p>
                <p className="text-green-100 text-xs">{conversionSummary.convertedLeads} conversions</p>
              </div>
              <Target className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">เวลาแปลงเฉลี่ย</p>
                <p className="text-2xl font-bold">{conversionSummary.avgConversionTime} วัน</p>
                <p className="text-purple-100 text-xs">จาก Lead ถึง Customer</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Revenue per Lead</p>
                <p className="text-2xl font-bold">{formatCurrency(conversionSummary.avgRevenuePerConversion)}</p>
                <p className="text-orange-100 text-xs">Average deal size</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Sources Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Lead Sources Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Source</th>
                  <th className="text-center p-3">Leads</th>
                  <th className="text-center p-3">Conversions</th>
                  <th className="text-center p-3">Rate</th>
                  <th className="text-right p-3">Cost</th>
                  <th className="text-right p-3">Revenue</th>
                  <th className="text-center p-3">ROI</th>
                </tr>
              </thead>
              <tbody>
                {leadSources.map((source, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: source.color }}
                        ></div>
                        <span className="font-medium">{source.source}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">{source.leads}</td>
                    <td className="p-3 text-center font-bold text-green-600">{source.conversions}</td>
                    <td className="p-3 text-center">
                      <Badge className={source.rate > 35 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {source.rate}%
                      </Badge>
                    </td>
                    <td className="p-3 text-right">{formatCurrency(source.cost)}</td>
                    <td className="p-3 text-right font-bold">{formatCurrency(source.revenue)}</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-blue-100 text-blue-800">
                        {source.cost > 0 ? ((source.revenue / source.cost - 1) * 100).toFixed(0) : '∞'}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Conversion Rate Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'rate' ? `${value}%` :
                    name === 'revenue' ? formatCurrency(Number(value)) :
                    `${value} คน`,
                    name === 'rate' ? 'Conversion Rate' :
                    name === 'revenue' ? 'Revenue' :
                    name === 'leads' ? 'Total Leads' : 'Conversions'
                  ]}
                />
                <Line dataKey="rate" stroke="#10b981" strokeWidth={3} name="rate" />
                <Line dataKey="leads" stroke="#3b82f6" strokeWidth={2} name="leads" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Quality Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Lead Quality Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadQuality}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quality" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'conversionRate' ? `${value}%` :
                    name === 'avgRevenue' ? formatCurrency(Number(value)) :
                    `${value} คน`,
                    name === 'conversionRate' ? 'Conversion Rate' :
                    name === 'avgRevenue' ? 'Avg Revenue' : 'Count'
                  ]}
                />
                <Bar dataKey="conversionRate" fill="#3b82f6" name="conversionRate" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Lead Conversion Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[60px]">
                      <div className="text-2xl font-bold text-gray-900">{stage.count}</div>
                      <div className="text-xs text-gray-600">{stage.percentage}%</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{stage.stage}</h3>
                      {index > 0 && (
                        <div className="text-sm text-gray-600">
                          Drop: {(conversionFunnel[index-1].count - stage.count).toLocaleString()} คน 
                          ({((conversionFunnel[index-1].count - stage.count) / conversionFunnel[index-1].count * 100).toFixed(1)}%)
                        </div>
                      )}
                    </div>
                  </div>
                  <div 
                    className="h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded"
                    style={{ width: `${stage.percentage}%`, maxWidth: '300px' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Converting Staff */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5 text-green-600" />
            Top Converting Staff
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topConverters.map((staff, index) => (
              <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[40px]">
                    <Badge className={
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      #{index + 1}
                    </Badge>
                  </div>
                  <div>
                    <div className="font-medium">{staff.staff}</div>
                    <div className="text-sm text-gray-600">
                      {staff.conversions} conversions | Rate: {staff.rate}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{formatCurrency(staff.revenue)}</div>
                  <div className="text-sm text-gray-600">
                    เฉลี่ย {formatCurrency(staff.avgDeal)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-600" />
            แนวทางเพิ่มประสิทธิภาพ Lead Conversion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">เพิ่ม Conversion Rate</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• ปรับปรุง sales script และ process</li>
                <li>• Training ทีมขายให้มีประสิทธิภาพ</li>
                <li>• ใช้ CRM ติดตาม lead อย่างเป็นระบบ</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">เพิ่มคุณภาพ Lead</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• กำหนด lead scoring criteria</li>
                <li>• ปรับ targeting ในการโฆษณา</li>
                <li>• สร้าง qualifying questions</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">ลดเวลาการแปลง</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• ตอบสนอง lead ภายใน 5 นาที</li>
                <li>• สร้าง urgency และ limited offer</li>
                <li>• ใช้ automation ในการ follow-up</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadConversionDashboard;
