
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp, Users, UserMinus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const turnoverData = [
  { month: 'ม.ค.', resigned: 2, hired: 3, turnoverRate: 8.5 },
  { month: 'ก.พ.', resigned: 1, hired: 2, turnoverRate: 4.2 },
  { month: 'มี.ค.', resigned: 3, hired: 1, turnoverRate: 12.5 },
  { month: 'เม.ย.', resigned: 1, hired: 2, turnoverRate: 4.2 },
  { month: 'พ.ค.', resigned: 0, hired: 3, turnoverRate: 0 },
  { month: 'มิ.ย.', resigned: 2, hired: 1, turnoverRate: 8.3 }
];

const departmentTurnover = [
  { department: 'จักษุแพทย์', turnoverRate: 5.2, avgSalary: 120000 },
  { department: 'พยาบาล', turnoverRate: 12.8, avgSalary: 35000 },
  { department: 'ธุรการ', turnoverRate: 15.5, avgSalary: 25000 },
  { department: 'การเงิน', turnoverRate: 8.3, avgSalary: 40000 }
];

const TurnoverRate = () => {
  const avgTurnoverRate = turnoverData.reduce((sum, item) => sum + item.turnoverRate, 0) / turnoverData.length;
  const totalResigned = turnoverData.reduce((sum, item) => sum + item.resigned, 0);
  const totalHired = turnoverData.reduce((sum, item) => sum + item.hired, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Turnover Rate</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์อัตราการลาออกของพนักงาน</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">อัตราเฉลี่ย</p>
                <p className="text-2xl font-bold">{avgTurnoverRate.toFixed(1)}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">ลาออก 6 เดือน</p>
                <p className="text-2xl font-bold">{totalResigned}</p>
              </div>
              <UserMinus className="h-8 w-8 text-orange-200" />
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
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">พนักงานปัจจุบัน</p>
                <p className="text-2xl font-bold">36</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้ม Turnover Rate รายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="turnoverRate" stroke="#ef4444" strokeWidth={3} name="อัตราลาออก %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Turnover Rate ตามแผนก</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentTurnover}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="turnoverRate" fill="#f59e0b" name="อัตราลาออก %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายละเอียดแผนก</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">แผนก</th>
                  <th className="px-6 py-3">อัตราลาออก (%)</th>
                  <th className="px-6 py-3">เงินเดือนเฉลี่ย</th>
                  <th className="px-6 py-3">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {departmentTurnover.map((dept, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">{dept.department}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        dept.turnoverRate > 10 ? 'bg-red-100 text-red-800' : 
                        dept.turnoverRate > 5 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {dept.turnoverRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4">฿{dept.avgSalary.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        dept.turnoverRate > 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {dept.turnoverRate > 10 ? 'ต้องปรับปรุง' : 'ปกติ'}
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

export default TurnoverRate;
