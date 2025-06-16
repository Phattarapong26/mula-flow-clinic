
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, Star, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const doctorUsageData = [
  { name: 'นพ.สมชาย', appointments: 45, hours: 38, rating: 4.8 },
  { name: 'นพ.วิภาวดี', appointments: 42, hours: 35, rating: 4.7 },
  { name: 'นพ.ประยุทธ์', appointments: 38, hours: 32, rating: 4.6 },
  { name: 'นพ.สุขใส', appointments: 35, hours: 30, rating: 4.5 },
];

const DoctorUsage = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">การใช้งานต่อหมอ</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์ประสิทธิภาพการทำงานของแพทย์</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">หมอทั้งหมด</p>
                <p className="text-2xl font-bold">{doctorUsageData.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">นัดเฉลี่ย/หมอ</p>
                <p className="text-2xl font-bold">{Math.round(doctorUsageData.reduce((a, b) => a + b.appointments, 0) / doctorUsageData.length)}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold">{(doctorUsageData.reduce((a, b) => a + b.rating, 0) / doctorUsageData.length).toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>สถิติการใช้งานหมอ</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={doctorUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="appointments" fill="#3b82f6" name="จำนวนนัด" />
              <Bar dataKey="hours" fill="#10b981" name="ชั่วโมงทำงาน" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorUsage;
