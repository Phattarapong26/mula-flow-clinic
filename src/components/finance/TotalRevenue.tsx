
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';

const TotalRevenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const revenueData = {
    daily: {
      current: 28500,
      target: 30000,
      previous: 25200,
      growth: 13.1
    },
    monthly: {
      current: 850000,
      target: 1000000,
      previous: 720000,
      growth: 18.1
    },
    yearly: {
      current: 9200000,
      target: 12000000,
      previous: 8100000,
      growth: 13.6
    }
  };

  const monthlyBreakdown = [
    { month: 'ม.ค.', revenue: 720000, target: 800000, achieved: 90 },
    { month: 'ก.พ.', revenue: 780000, target: 800000, achieved: 97.5 },
    { month: 'มี.ค.', revenue: 850000, target: 850000, achieved: 100 },
    { month: 'เม.ย.', revenue: 920000, target: 900000, achieved: 102.2 },
    { month: 'พ.ค.', revenue: 780000, target: 950000, achieved: 82.1 },
    { month: 'มิ.ย.', revenue: 950000, target: 1000000, achieved: 95 }
  ];

  const currentData = revenueData[selectedPeriod];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getAchievementColor = (percentage: number) => {
    if (percentage >= 100) return 'text-green-600 bg-green-100';
    if (percentage >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">รายได้รวม</h1>
          <p className="text-gray-600">ติดตามรายได้รายวัน รายเดือน และเปรียบเทียบกับเป้าหมาย</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedPeriod === 'daily' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('daily')}
          >
            รายวัน
          </Button>
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
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">รายได้ปัจจุบัน</p>
                <p className="text-2xl font-bold">{formatCurrency(currentData.current)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100">เป้าหมาย</p>
                <p className="text-2xl font-bold">{formatCurrency(currentData.target)}</p>
              </div>
              <Target className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-100">ช่วงก่อน</p>
                <p className="text-2xl font-bold">{formatCurrency(currentData.previous)}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-100">การเติบโต</p>
                <p className="text-2xl font-bold">+{currentData.growth}%</p>
              </div>
              {currentData.growth >= 0 ? (
                <TrendingUp className="h-8 w-8 text-orange-200" />
              ) : (
                <TrendingDown className="h-8 w-8 text-orange-200" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Progress */}
      <Card>
        <CardHeader>
          <CardTitle>ความสำเร็จตามเป้าหมาย</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">ความสำเร็จ:</span>
              <span className="text-2xl font-bold">
                {((currentData.current / currentData.target) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((currentData.current / currentData.target) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatCurrency(currentData.current)}</span>
              <span>{formatCurrency(currentData.target)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>รายได้แยกรายเดือน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">เดือน</th>
                  <th className="text-right p-4">รายได้</th>
                  <th className="text-right p-4">เป้าหมาย</th>
                  <th className="text-right p-4">สำเร็จ (%)</th>
                  <th className="text-center p-4">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {monthlyBreakdown.map((month) => (
                  <tr key={month.month} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{month.month}</td>
                    <td className="p-4 text-right font-bold">{formatCurrency(month.revenue)}</td>
                    <td className="p-4 text-right text-gray-600">{formatCurrency(month.target)}</td>
                    <td className="p-4 text-right font-medium">{month.achieved}%</td>
                    <td className="p-4 text-center">
                      <Badge className={getAchievementColor(month.achieved)}>
                        {month.achieved >= 100 ? 'บรรลุ' : month.achieved >= 80 ? 'ใกล้เป้า' : 'ต่ำกว่าเป้า'}
                      </Badge>
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

const monthlyBreakdown = [
  { month: 'ม.ค.', revenue: 720000, target: 800000, achieved: 90 },
  { month: 'ก.พ.', revenue: 780000, target: 800000, achieved: 97.5 },
  { month: 'มี.ค.', revenue: 850000, target: 850000, achieved: 100 },
  { month: 'เม.ย.', revenue: 920000, target: 900000, achieved: 102.2 },
  { month: 'พ.ค.', revenue: 780000, target: 950000, achieved: 82.1 },
  { month: 'มิ.ย.', revenue: 950000, target: 1000000, achieved: 95 }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  }).format(amount);
};

const getAchievementColor = (percentage: number) => {
  if (percentage >= 100) return 'text-green-600 bg-green-100';
  if (percentage >= 80) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
};

export default TotalRevenue;
