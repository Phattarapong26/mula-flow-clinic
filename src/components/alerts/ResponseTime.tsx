
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Timer, TrendingDown, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const responseTimeData = [
  { hour: '08:00', avgTime: 2.3, target: 3.0 },
  { hour: '10:00', avgTime: 1.8, target: 3.0 },
  { hour: '12:00', avgTime: 4.2, target: 3.0 },
  { hour: '14:00', avgTime: 3.1, target: 3.0 },
  { hour: '16:00', avgTime: 2.5, target: 3.0 },
  { hour: '18:00', avgTime: 1.9, target: 3.0 }
];

const staffPerformance = [
  { name: 'สมใจ', avgTime: 1.8, messages: 145 },
  { name: 'วิภาดา', avgTime: 2.1, messages: 132 },
  { name: 'ประยุทธ์', avgTime: 2.5, messages: 128 },
  { name: 'สุขใส', avgTime: 3.2, messages: 95 }
];

const ResponseTime = () => {
  const avgResponseTime = responseTimeData.reduce((sum, item) => sum + item.avgTime, 0) / responseTimeData.length;
  const targetTime = 3.0;
  const performance = ((targetTime - avgResponseTime) / targetTime * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Response Time</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์ความเร็วในการตอบกลับลูกค้า</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">เวลาตอบเฉลี่ย</p>
                <p className="text-2xl font-bold">{avgResponseTime.toFixed(1)} นาที</p>
              </div>
              <Clock className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">เป้าหมาย</p>
                <p className="text-2xl font-bold">{targetTime} นาที</p>
              </div>
              <Target className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">ประสิทธิภาพ</p>
                <p className="text-2xl font-bold">{performance}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">เร็วที่สุด</p>
                <p className="text-2xl font-bold">1.2 นาที</p>
              </div>
              <Timer className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Response Time ตามช่วงเวลา</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value} นาที`, name === 'avgTime' ? 'เวลาเฉลี่ย' : 'เป้าหมาย']} />
                <Line type="monotone" dataKey="avgTime" stroke="#3b82f6" strokeWidth={3} name="เวลาเฉลี่ย" />
                <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} name="เป้าหมาย" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ประสิทธิภาพพนักงาน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={staffPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'avgTime' ? `${value} นาที` : `${value} ข้อความ`,
                  name === 'avgTime' ? 'เวลาเฉลี่ย' : 'จำนวนข้อความ'
                ]} />
                <Bar dataKey="avgTime" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponseTime;
