
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, UserMinus, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const departmentData = [
  { name: 'จักษุแพทย์', count: 8, color: '#3b82f6' },
  { name: 'พยาบาล', count: 15, color: '#10b981' },
  { name: 'ธุรการ', count: 6, color: '#f59e0b' },
  { name: 'การเงิน', count: 4, color: '#ef4444' },
  { name: 'อื่นๆ', count: 3, color: '#8b5cf6' }
];

const monthlyData = [
  { month: 'ม.ค.', hired: 2, resigned: 1 },
  { month: 'ก.พ.', hired: 1, resigned: 0 },
  { month: 'มี.ค.', hired: 3, resigned: 2 },
  { month: 'เม.ย.', hired: 1, resigned: 1 },
  { month: 'พ.ค.', hired: 2, resigned: 0 },
  { month: 'มิ.ย.', hired: 1, resigned: 1 }
];

const StaffCount = () => {
  const totalStaff = departmentData.reduce((sum, dept) => sum + dept.count, 0);
  const totalHired = monthlyData.reduce((sum, month) => sum + month.hired, 0);
  const totalResigned = monthlyData.reduce((sum, month) => sum + month.resigned, 0);
  const netGrowth = totalHired - totalResigned;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">จำนวนพนักงานทั้งหมด</h1>
        <p className="text-gray-600 mt-1">รายละเอียดจำนวนพนักงานและการเปลี่ยนแปลง</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">พนักงานทั้งหมด</p>
                <p className="text-2xl font-bold">{totalStaff}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">เข้าใหม่ 6 เดือน</p>
                <p className="text-2xl font-bold">{totalHired}</p>
              </div>
              <UserPlus className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">ลาออก 6 เดือน</p>
                <p className="text-2xl font-bold">{totalResigned}</p>
              </div>
              <UserMinus className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">การเติบโต</p>
                <p className="text-2xl font-bold">+{netGrowth}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>จำนวนพนักงานตามแผนก</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การเข้า-ออกงานรายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hired" fill="#10b981" name="เข้าใหม่" />
                <Bar dataKey="resigned" fill="#ef4444" name="ลาออก" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffCount;
