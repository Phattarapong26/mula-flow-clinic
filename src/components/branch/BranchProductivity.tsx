
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const branchProductivity = [
  { branch: 'สาขาสยาม', staff: 12, appointments: 456, revenue: 4200000, revenuePerStaff: 350000, appointmentsPerStaff: 38 },
  { branch: 'สาขาทองหล่อ', staff: 10, appointments: 398, revenue: 3800000, revenuePerStaff: 380000, appointmentsPerStaff: 39.8 },
  { branch: 'สาขาอารีย์', staff: 8, appointments: 298, revenue: 2900000, revenuePerStaff: 362500, appointmentsPerStaff: 37.25 },
  { branch: 'สาขาเซ็นทรัล', staff: 6, appointments: 215, revenue: 1950000, revenuePerStaff: 325000, appointmentsPerStaff: 35.8 }
];

const productivityTrend = [
  { month: 'ม.ค.', สยาม: 340000, ทองหล่อ: 365000, อารีย์: 350000, เซ็นทรัล: 310000 },
  { month: 'ก.พ.', สยาม: 345000, ทองหล่อ: 370000, อารีย์: 355000, เซ็นทรัล: 315000 },
  { month: 'มี.ค.', สยาม: 350000, ทองหล่อ: 375000, อารีย์: 360000, เซ็นทรัล: 320000 },
  { month: 'เม.ย.', สยาม: 348000, ทองหล่อ: 378000, อารีย์: 358000, เซ็นทรัล: 322000 },
  { month: 'พ.ค.', สยาม: 352000, ทองหล่อ: 382000, อารีย์: 365000, เซ็นทรัล: 328000 },
  { month: 'มิ.ย.', สยาม: 350000, ทองหล่อ: 380000, อารีย์: 362500, เซ็นทรัล: 325000 }
];

const efficiencyMetrics = [
  { metric: 'Revenue per Staff', สยาม: 85, ทองหล่อ: 92, อารีย์: 88, เซ็นทรัล: 78 },
  { metric: 'Appointments per Staff', สยาม: 88, ทองหล่อ: 95, อารีย์: 85, เซ็นทรัล: 82 },
  { metric: 'Customer Satisfaction', สยาม: 92, ทองหล่อ: 94, อารีย์: 90, เซ็นทรัล: 89 },
  { metric: 'Treatment Success Rate', สยาม: 96, ทองหล่อ: 97, อารีย์: 95, เซ็นทรัล: 94 },
  { metric: 'Staff Utilization', สยาม: 78, ทองหล่อ: 82, อารีย์: 75, เซ็นทรัล: 73 }
];

const BranchProductivity = () => {
  const totalStaff = branchProductivity.reduce((sum, branch) => sum + branch.staff, 0);
  const totalRevenue = branchProductivity.reduce((sum, branch) => sum + branch.revenue, 0);
  const avgProductivity = totalRevenue / totalStaff;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Productivity สาขา</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์ประสิทธิภาพการทำงานของแต่ละสาขา</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Productivity เฉลี่ย</p>
                <p className="text-2xl font-bold">฿{Math.round(avgProductivity).toLocaleString()}</p>
                <p className="text-blue-100 text-xs">ต่อคน/เดือน</p>
              </div>
              <Activity className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">สาขาที่มีประสิทธิภาพสูงสุด</p>
                <p className="text-2xl font-bold">ทองหล่อ</p>
                <p className="text-green-100 text-xs">฿380K/คน</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">พนักงานรวม</p>
                <p className="text-2xl font-bold">{totalStaff}</p>
                <p className="text-purple-100 text-xs">คน</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">เพิ่มขึ้น MoM</p>
                <p className="text-2xl font-bold">+5.8%</p>
                <p className="text-orange-100 text-xs">productivity</p>
              </div>
              <Clock className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue per Staff ตามสาขา</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchProductivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, 'Revenue per Staff']} />
                <Bar dataKey="revenuePerStaff" fill="#3b82f6" name="Revenue per Staff" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>แนวโน้ม Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productivityTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="สยาม" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="ทองหล่อ" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="อารีย์" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="เซ็นทรัล" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายละเอียด Productivity ตามสาขา</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">สาขา</th>
                  <th className="px-6 py-3">จำนวนพนักงาน</th>
                  <th className="px-6 py-3">นัดหมาย/เดือน</th>
                  <th className="px-6 py-3">รายได้/เดือน</th>
                  <th className="px-6 py-3">Revenue per Staff</th>
                  <th className="px-6 py-3">Appointments per Staff</th>
                </tr>
              </thead>
              <tbody>
                {branchProductivity.map((branch, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">{branch.branch}</td>
                    <td className="px-6 py-4">{branch.staff}</td>
                    <td className="px-6 py-4">{branch.appointments}</td>
                    <td className="px-6 py-4">฿{branch.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">฿{branch.revenuePerStaff.toLocaleString()}</td>
                    <td className="px-6 py-4">{branch.appointmentsPerStaff.toFixed(1)}</td>
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

export default BranchProductivity;
