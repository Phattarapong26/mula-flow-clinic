
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, TrendingUp, Clock, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const chatVolumeData = [
  { time: '08:00', line: 45, facebook: 23, total: 68 },
  { time: '10:00', line: 67, facebook: 34, total: 101 },
  { time: '12:00', line: 89, facebook: 45, total: 134 },
  { time: '14:00', line: 78, facebook: 41, total: 119 },
  { time: '16:00', line: 56, facebook: 28, total: 84 },
  { time: '18:00', line: 34, facebook: 18, total: 52 }
];

const dailyData = [
  { day: 'จันทร์', messages: 890 },
  { day: 'อังคาร', messages: 756 },
  { day: 'พุธ', messages: 923 },
  { day: 'พฤหัส', messages: 1012 },
  { day: 'ศุกร์', messages: 1156 },
  { day: 'เสาร์', messages: 834 },
  { day: 'อาทิตย์', messages: 678 }
];

const ChatVolume = () => {
  const totalToday = chatVolumeData.reduce((sum, item) => sum + item.total, 0);
  const lineTotal = chatVolumeData.reduce((sum, item) => sum + item.line, 0);
  const facebookTotal = chatVolumeData.reduce((sum, item) => sum + item.facebook, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ปริมาณแชท (LINE / FB)</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์ปริมาณการสนทนาจากทุกช่องทาง</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">LINE Messages</p>
                <p className="text-2xl font-bold">{lineTotal}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Facebook Messages</p>
                <p className="text-2xl font-bold">{facebookTotal}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">ทั้งหมดวันนี้</p>
                <p className="text-2xl font-bold">{totalToday}</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">แนวโน้ม</p>
                <p className="text-2xl font-bold">+15%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ปริมาณแชทตามช่วงเวลา</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chatVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="line" stackId="a" fill="#22c55e" name="LINE" />
                <Bar dataKey="facebook" stackId="a" fill="#3b82f6" name="Facebook" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ปริมาณแชทรายวัน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="messages" stroke="#8b5cf6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatVolume;
