import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MessageSquare, Clock, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const offScriptData = [
  { time: '08:00', count: 5, trend: 'up' },
  { time: '10:00', count: 8, trend: 'down' },
  { time: '12:00', count: 3, trend: 'up' },
  { time: '14:00', count: 7, trend: 'stable' },
  { time: '16:00', count: 2, trend: 'down' },
  { time: '18:00', count: 6, trend: 'up' }
];

const categoryBreakdown = [
  { category: 'สอบถามทั่วไป', count: 25, color: '#ef4444' },
  { category: 'ปรึกษาปัญหา', count: 35, color: '#f97316' },
  { category: 'ร้องเรียน', count: 15, color: '#eab308' },
  { category: 'อื่นๆ', count: 25, color: '#84cc16' }
];

const OffScript = () => {
  const totalOffScript = offScriptData.reduce((sum, item) => sum + item.count, 0);
  const avgOffScript = totalOffScript / offScriptData.length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Off Script</h1>
        <p className="text-gray-600 mt-1">การวิเคราะห์ข้อความนอกสคริปต์</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">ทั้งหมด</p>
                <p className="text-2xl font-bold">{totalOffScript}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">เฉลี่ยต่อชั่วโมง</p>
                <p className="text-2xl font-bold">{avgOffScript.toFixed(1)}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">แนวโน้ม</p>
                <p className="text-2xl font-bold">↗</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">ผู้ใช้งาน</p>
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
            <CardTitle>Off Script ตามช่วงเวลา</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={offScriptData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={3} name="จำนวน" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Off Script ตามประเภท</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" name="จำนวน" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายละเอียด Off Script</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ช่วงเวลา</th>
                  <th className="px-6 py-3">จำนวน</th>
                  <th className="px-6 py-3">แนวโน้ม</th>
                  <th className="px-6 py-3">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {offScriptData.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">{item.time}</td>
                    <td className="px-6 py-4">{item.count}</td>
                    <td className="px-6 py-4">
                      <TrendingUp className={`h-4 w-4 ${item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`} />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${item.count > 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {item.count > 5 ? 'สูง' : 'ปกติ'}
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

export default OffScript;
