
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const queueData = [
  { time: '08:00', waitingTime: 15, patients: 8, efficiency: 85 },
  { time: '09:00', waitingTime: 25, patients: 12, efficiency: 75 },
  { time: '10:00', waitingTime: 35, patients: 18, efficiency: 65 },
  { time: '11:00', waitingTime: 45, patients: 22, efficiency: 55 },
  { time: '12:00', waitingTime: 20, patients: 10, efficiency: 80 },
  { time: '13:00', waitingTime: 15, patients: 8, efficiency: 85 },
  { time: '14:00', waitingTime: 30, patients: 15, efficiency: 70 },
  { time: '15:00', waitingTime: 40, patients: 20, efficiency: 60 },
  { time: '16:00', waitingTime: 35, patients: 18, efficiency: 65 },
  { time: '17:00', waitingTime: 25, patients: 12, efficiency: 75 },
  { time: '18:00', waitingTime: 20, patients: 8, efficiency: 80 }
];

const dailyQueue = [
  { day: 'จันทร์', avgWait: 28, totalPatients: 145, peakTime: '11:00' },
  { day: 'อังคาร', avgWait: 32, totalPatients: 158, peakTime: '15:00' },
  { day: 'พุธ', avgWait: 25, totalPatients: 167, peakTime: '10:00' },
  { day: 'พฤหัส', avgWait: 30, totalPatients: 172, peakTime: '14:00' },
  { day: 'ศุกร์', avgWait: 35, totalPatients: 189, peakTime: '11:00' },
  { day: 'เสาร์', avgWait: 22, totalPatients: 134, peakTime: '09:00' },
  { day: 'อาทิตย์', avgWait: 18, totalPatients: 98, peakTime: '10:00' }
];

const queueCapacity = [
  { hour: '08:00', capacity: 20, actual: 8, utilization: 40 },
  { hour: '09:00', capacity: 20, actual: 12, utilization: 60 },
  { hour: '10:00', capacity: 20, actual: 18, utilization: 90 },
  { hour: '11:00', capacity: 20, actual: 22, utilization: 110 },
  { hour: '12:00', capacity: 15, actual: 10, utilization: 67 },
  { hour: '13:00', capacity: 15, actual: 8, utilization: 53 },
  { hour: '14:00', capacity: 20, actual: 15, utilization: 75 },
  { hour: '15:00', capacity: 20, actual: 20, utilization: 100 },
  { hour: '16:00', capacity: 20, actual: 18, utilization: 90 },
  { hour: '17:00', capacity: 15, actual: 12, utilization: 80 }
];

const QueueAnalysis = () => {
  const avgWaitTime = queueData.reduce((sum, item) => sum + item.waitingTime, 0) / queueData.length;
  const totalPatients = queueData.reduce((sum, item) => sum + item.patients, 0);
  const avgEfficiency = queueData.reduce((sum, item) => sum + item.efficiency, 0) / queueData.length;
  const peakHour = queueData.reduce((max, item) => item.patients > max.patients ? item : max);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">วิเคราะห์คิว</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์ระบบคิวและเวลารอของผู้ป่วย</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">เวลารอเฉลี่ย</p>
                <p className="text-2xl font-bold">{Math.round(avgWaitTime)} นาที</p>
              </div>
              <Clock className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">ผู้ป่วยรวม</p>
                <p className="text-2xl font-bold">{totalPatients}</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">ประสิทธิภาพ</p>
                <p className="text-2xl font-bold">{Math.round(avgEfficiency)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Peak Hour</p>
                <p className="text-2xl font-bold">{peakHour.time}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>เวลารอและจำนวนผู้ป่วยตามช่วงเวลา</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={queueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area yAxisId="left" type="monotone" dataKey="waitingTime" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="เวลารอ (นาที)" />
                <Bar yAxisId="right" dataKey="patients" fill="#3b82f6" name="จำนวนผู้ป่วย" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ประสิทธิภาพการให้บริการ</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={queueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} name="ประสิทธิภาพ %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>การใช้งานกำลังการรองรับ</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={queueCapacity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="capacity" fill="#d1d5db" name="กำลังการรองรับ" />
                <Bar dataKey="actual" fill="#3b82f6" name="ผู้ป่วยจริง" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>สรุปรายวัน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyQueue.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{day.day}</p>
                    <p className="text-sm text-gray-600">Peak: {day.peakTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">เวลารอเฉลี่ย</p>
                    <p className="font-semibold">{day.avgWait} นาที</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">ผู้ป่วยรวม</p>
                    <p className="font-semibold">{day.totalPatients} คน</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      day.avgWait < 20 ? 'bg-green-100 text-green-800' : 
                      day.avgWait < 30 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {day.avgWait < 20 ? 'ดีเยี่ยม' : day.avgWait < 30 ? 'ปานกลาง' : 'ต้องปรับปรุง'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QueueAnalysis;
