
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const staffPerformance = [
  { name: 'นพ.สมชาย', revenue: 450000, patients: 85, avgPerPatient: 5294, department: 'จักษุแพทย์' },
  { name: 'นพ.วิภาวดี', revenue: 380000, patients: 72, avgPerPatient: 5278, department: 'จักษุแพทย์' },
  { name: 'นพ.ประยุทธ์', revenue: 320000, patients: 65, avgPerPatient: 4923, department: 'จักษุแพทย์' },
  { name: 'นาง สมหญิง', revenue: 180000, patients: 120, avgPerPatient: 1500, department: 'พยาบาล' },
  { name: 'นาง ใสใส', revenue: 160000, patients: 105, avgPerPatient: 1524, department: 'พยาบาล' },
  { name: 'นาย บัญชี', revenue: 45000, patients: 0, avgPerPatient: 0, department: 'การเงิน' }
];

const monthlyTrend = [
  { month: 'ม.ค.', revenuePerStaff: 78500, totalRevenue: 2826000, staffCount: 36 },
  { month: 'ก.พ.', revenuePerStaff: 81200, totalRevenue: 3004400, staffCount: 37 },
  { month: 'มี.ค.', revenuePerStaff: 85600, totalRevenue: 2996000, staffCount: 35 },
  { month: 'เม.ย.', revenuePerStaff: 83300, totalRevenue: 2998800, staffCount: 36 },
  { month: 'พ.ค.', revenuePerStaff: 87900, totalRevenue: 3428100, staffCount: 39 },
  { month: 'มิ.ย.', revenuePerStaff: 89200, totalRevenue: 3389600, staffCount: 38 }
];

const RevenuePerStaff = () => {
  const currentMonth = monthlyTrend[monthlyTrend.length - 1];
  const previousMonth = monthlyTrend[monthlyTrend.length - 2];
  const growth = ((currentMonth.revenuePerStaff - previousMonth.revenuePerStaff) / previousMonth.revenuePerStaff * 100);

  const topPerformers = staffPerformance
    .filter(staff => staff.revenue > 0)
    .sort((a, b) => b.avgPerPatient - a.avgPerPatient)
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Revenue per Staff</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์รายได้ต่อพนักงานและประสิทธิภาพการทำงาน</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">รายได้เฉลี่ย/คน</p>
                <p className="text-2xl font-bold">฿{Math.round(currentMonth.revenuePerStaff / 1000)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">รายได้รวม</p>
                <p className="text-2xl font-bold">฿{(currentMonth.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <Target className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">การเติบโต</p>
                <p className="text-2xl font-bold">{growth > 0 ? '+' : ''}{growth.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">จำนวนพนักงาน</p>
                <p className="text-2xl font-bold">{currentMonth.staffCount}</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มรายได้ต่อพนักงาน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, 'รายได้ต่อคน']} />
                <Line type="monotone" dataKey="revenuePerStaff" stroke="#10b981" strokeWidth={3} name="รายได้ต่อคน" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers - รายได้ต่อผู้ป่วย</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPerformers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, 'รายได้ต่อผู้ป่วย']} />
                <Bar dataKey="avgPerPatient" fill="#3b82f6" name="รายได้ต่อผู้ป่วย" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ประสิทธิภาพรายบุคคล</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ชื่อ</th>
                  <th className="px-6 py-3">แผนก</th>
                  <th className="px-6 py-3">รายได้รวม</th>
                  <th className="px-6 py-3">จำนวนผู้ป่วย</th>
                  <th className="px-6 py-3">รายได้ต่อผู้ป่วย</th>
                  <th className="px-6 py-3">อันดับ</th>
                </tr>
              </thead>
              <tbody>
                {staffPerformance
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((staff, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">{staff.name}</td>
                    <td className="px-6 py-4">{staff.department}</td>
                    <td className="px-6 py-4">฿{staff.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">{staff.patients}</td>
                    <td className="px-6 py-4">฿{staff.avgPerPatient.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        index < 2 ? 'bg-green-100 text-green-800' : 
                        index < 4 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        #{index + 1}
                      </span>
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

export default RevenuePerStaff;
