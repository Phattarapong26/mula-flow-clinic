
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyPayroll = [
  { month: 'ม.ค.', totalPayroll: 2850000, employees: 36, avgSalary: 79167 },
  { month: 'ก.พ.', totalPayroll: 2920000, employees: 37, avgSalary: 78919 },
  { month: 'มี.ค.', totalPayroll: 2780000, employees: 35, avgSalary: 79429 },
  { month: 'เม.ย.', totalPayroll: 2890000, employees: 36, avgSalary: 80278 },
  { month: 'พ.ค.', totalPayroll: 3120000, employees: 39, avgSalary: 80000 },
  { month: 'มิ.ย.', totalPayroll: 3050000, employees: 38, avgSalary: 80263 }
];

const departmentPayroll = [
  { department: 'จักษุแพทย์', amount: 960000, percentage: 31.5, color: '#3b82f6' },
  { department: 'พยาบาล', amount: 525000, percentage: 17.2, color: '#10b981' },
  { department: 'ธุรการ', amount: 150000, percentage: 4.9, color: '#f59e0b' },
  { department: 'การเงิน', amount: 160000, percentage: 5.2, color: '#ef4444' },
  { department: 'อื่นๆ', amount: 1255000, percentage: 41.2, color: '#8b5cf6' }
];

const PayrollLoad = () => {
  const currentMonthPayroll = monthlyPayroll[monthlyPayroll.length - 1].totalPayroll;
  const previousMonthPayroll = monthlyPayroll[monthlyPayroll.length - 2].totalPayroll;
  const payrollGrowth = ((currentMonthPayroll - previousMonthPayroll) / previousMonthPayroll * 100);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payroll Load</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์ภาระค่าใช้จ่ายเงินเดือนและสวัสดิการ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">เงินเดือนรวม/เดือน</p>
                <p className="text-2xl font-bold">฿{(currentMonthPayroll / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">เงินเดือนเฉลี่ย</p>
                <p className="text-2xl font-bold">฿{Math.round(monthlyPayroll[monthlyPayroll.length - 1].avgSalary / 1000)}K</p>
              </div>
              <Calculator className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">การเติบโต</p>
                <p className="text-2xl font-bold">{payrollGrowth > 0 ? '+' : ''}{payrollGrowth.toFixed(1)}%</p>
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
                <p className="text-2xl font-bold">{monthlyPayroll[monthlyPayroll.length - 1].employees}</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มเงินเดือนรายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyPayroll}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, 'เงินเดือนรวม']} />
                <Bar dataKey="totalPayroll" fill="#3b82f6" name="เงินเดือนรวม" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การกระจายเงินเดือนตามแผนก</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentPayroll}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ department, percentage }) => `${department}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {departmentPayroll.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, 'เงินเดือน']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายละเอียดเงินเดือนตามแผนก</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">แผนก</th>
                  <th className="px-6 py-3">เงินเดือนรวม</th>
                  <th className="px-6 py-3">สัดส่วน</th>
                  <th className="px-6 py-3">จำนวนคน</th>
                  <th className="px-6 py-3">เฉลี่ยต่อคน</th>
                </tr>
              </thead>
              <tbody>
                {departmentPayroll.map((dept, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">{dept.department}</td>
                    <td className="px-6 py-4">฿{dept.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded mr-2" 
                          style={{ backgroundColor: dept.color }}
                        ></div>
                        {dept.percentage}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {dept.department === 'จักษุแพทย์' ? '8' : 
                       dept.department === 'พยาบาล' ? '15' : 
                       dept.department === 'ธุรการ' ? '6' : 
                       dept.department === 'การเงิน' ? '4' : '5'} คน
                    </td>
                    <td className="px-6 py-4">
                      ฿{Math.round(dept.amount / (
                        dept.department === 'จักษุแพทย์' ? 8 : 
                        dept.department === 'พยาบาล' ? 15 : 
                        dept.department === 'ธุรการ' ? 6 : 
                        dept.department === 'การเงิน' ? 4 : 5
                      )).toLocaleString()}
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

export default PayrollLoad;
