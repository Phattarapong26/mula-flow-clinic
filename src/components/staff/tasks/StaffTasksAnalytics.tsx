
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Clock, CheckCircle, AlertTriangle, Target } from 'lucide-react';

const StaffTasksAnalytics = () => {
  const taskCompletionData = [
    { month: 'ม.ค.', completed: 45, pending: 12, overdue: 3 },
    { month: 'ก.พ.', completed: 52, pending: 8, overdue: 2 },
    { month: 'มี.ค.', completed: 48, pending: 15, overdue: 5 },
    { month: 'เม.ย.', completed: 61, pending: 10, overdue: 1 },
    { month: 'พ.ค.', completed: 58, pending: 7, overdue: 4 },
    { month: 'มิ.ย.', completed: 55, pending: 12, overdue: 2 }
  ];

  const categoryData = [
    { name: 'Claim', value: 35, color: '#8884d8' },
    { name: 'Appointment', value: 28, color: '#82ca9d' },
    { name: 'Patient Management', value: 22, color: '#ffc658' },
    { name: 'อื่นๆ', value: 15, color: '#ff7c7c' }
  ];

  const efficiencyData = [
    { week: 'สัปดาห์ 1', efficiency: 85, target: 80 },
    { week: 'สัปดาห์ 2', efficiency: 88, target: 80 },
    { week: 'สัปดาห์ 3', efficiency: 92, target: 80 },
    { week: 'สัปดาห์ 4', efficiency: 87, target: 80 }
  ];

  const performanceMetrics = {
    totalTasks: 169,
    completedTasks: 145,
    completionRate: 85.8,
    avgCompletionTime: 2.3,
    overdueRate: 3.5,
    efficiencyScore: 88
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">วิเคราะห์ประสิทธิภาพงาน</h1>
          <p className="text-gray-600">ติดตามและวิเคราะห์ประสิทธิภาพการทำงาน</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">งานทั้งหมด</p>
                <p className="text-2xl font-bold">{performanceMetrics.totalTasks}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">เสร็จสิ้น</p>
                <p className="text-2xl font-bold text-green-600">{performanceMetrics.completedTasks}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">อัตราสำเร็จ</p>
                <p className="text-2xl font-bold text-blue-600">{performanceMetrics.completionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">เวลาเฉลี่ย</p>
                <p className="text-2xl font-bold text-purple-600">{performanceMetrics.avgCompletionTime} ชม.</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">เลยกำหนด</p>
                <p className="text-2xl font-bold text-red-600">{performanceMetrics.overdueRate}%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">คะแนนประสิทธิภาพ</p>
                <p className="text-2xl font-bold text-indigo-600">{performanceMetrics.efficiencyScore}</p>
              </div>
              <Badge variant="secondary">A</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มการทำงานรายเดือน</CardTitle>
            <CardDescription>สถิติการทำงานในช่วง 6 เดือนที่ผ่านมา</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#10b981" name="เสร็จสิ้น" />
                <Bar dataKey="pending" fill="#f59e0b" name="รอดำเนินการ" />
                <Bar dataKey="overdue" fill="#ef4444" name="เลยกำหนด" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Categories */}
        <Card>
          <CardHeader>
            <CardTitle>การแบ่งประเภทงาน</CardTitle>
            <CardDescription>สัดส่วนงานแต่ละประเภท</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Trend */}
      <Card>
        <CardHeader>
          <CardTitle>ประสิทธิภาพรายสัปดาห์</CardTitle>
          <CardDescription>เปรียบเทียบประสิทธิภาพกับเป้าหมาย</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="efficiency" stroke="#8884d8" strokeWidth={2} name="ประสิทธิภาพจริง" />
              <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" name="เป้าหมาย" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อเสนะแนะเพื่อปรับปรุงประสิทธิภาพ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">จุดแข็ง</h4>
                <p className="text-sm text-green-700">อัตราการทำงานสำเร็จสูง (85.8%) เกินเป้าหมาย 80%</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">ควรปรับปรุง</h4>
                <p className="text-sm text-yellow-700">งาน Claim ใช้เวลานานกว่าที่กำหนด ควรปรับปรุงกระบวนการ</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">แนวโน้ม</h4>
                <p className="text-sm text-blue-700">ประสิทธิภาพมีแนวโน้มดีขึ้นอย่างต่อเนื่องในช่วง 3 สัปดาห์ที่ผ่านมา</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffTasksAnalytics;
